package main

import (
	"context"
	"encoding/json"
	"fmt"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/liumingmin/box2d"
	"github.com/liumingmin/goutils/log"
	"github.com/liumingmin/goutils/ws"
)

var pWorld *box2d.B2World

func main() {
	pWorld = createWorld()

	go func() {
		for {
			pWorld.Step(1.0/60.0, 100, 1000)
			pWorld.ClearForces()

			time.Sleep(time.Second / 60)
		}
	}()

	go func() {
		for {
			updateWorld(pWorld)
			time.Sleep(time.Second / 10)
		}
	}()

	e := gin.Default()
	e.Static("/static", "./static")
	e.GET("/join", JoinGame)
	e.Run(":8003")
}

var worldBodies sync.Map

func createWorld() *box2d.B2World {
	gravity := box2d.MakeB2Vec2(0.0, -10)
	world := box2d.MakeB2World(gravity)

	var fixDef = box2d.MakeB2FixtureDef()
	fixDef.Friction = 0.99
	fixDef.Restitution = 0.51
	fixDef.Density = 1.0

	polyShape := &box2d.B2PolygonShape{}
	polyShape.SetAsBox(20, 2)
	fixDef.Shape = polyShape

	var bodyDef = box2d.MakeB2BodyDef()
	bodyDef.Awake = false
	bodyDef.Type = box2d.B2BodyType.B2_staticBody
	bodyDef.Position = box2d.B2Vec2{10, 400.0/30.0 + 1.8}

	world.CreateBody(&bodyDef).CreateFixtureFromDef(&fixDef)

	bodyDef.Position.Set(10, -1.8)
	world.CreateBody(&bodyDef).CreateFixtureFromDef(&fixDef)

	polyShape.SetAsBox(2, 14)
	bodyDef.Position.Set(-1.8, 13)
	world.CreateBody(&bodyDef).CreateFixtureFromDef(&fixDef)

	bodyDef.Position.Set(21.8, 13)
	world.CreateBody(&bodyDef).CreateFixtureFromDef(&fixDef)

	var bodiesNum = 13
	bodyDef.Type = box2d.B2BodyType.B2_dynamicBody
	for i := 0; i < bodiesNum; i++ {
		polyShapeDyn := &box2d.B2PolygonShape{}
		fixDef.Shape = polyShapeDyn
		polyShapeDyn.SetAsBox(0.4, 0.4)

		bodyDef.Position.X = float64(((i + 1) * 2) % 8)
		bodyDef.Position.Y = 3

		bodyDef.UserData = &BodyUserData{
			BodyId: fmt.Sprint(i),
		}

		world.CreateBody(&bodyDef).CreateFixtureFromDef(&fixDef)
	}

	var nextBody = world.GetBodyList()
	for {
		if nextBody == nil {
			break
		}

		userData, _ := nextBody.GetUserData().(*BodyUserData)

		if userData != nil && userData.BodyId != "" {
			worldBodies.Store(userData.BodyId, nextBody)
		}

		nextBody = nextBody.GetNext()
	}

	return &world
}

func JoinGame(ctx *gin.Context) {
	connMeta := &ws.ConnectionMeta{
		UserId:   ctx.DefaultQuery("uid", "1"),
		Typed:    0,
		DeviceId: "",
		Version:  0,
		Charset:  0,
	}
	_, err := ws.Accept(ctx, ctx.Writer, ctx.Request, connMeta,
		nil, &connCallback{}, []int{})
	if err != nil {
		log.Error(ctx, "Accept client connection failed. error: %v", err)
		return
	}
}

type connCallback struct {
}

func (c *connCallback) ConnFinished(clientId string) {

}
func (c *connCallback) DisconnFinished(clientId string) {

}

type BodyUserData struct {
	BodyId string
}

type BodyState struct {
	Pos             box2d.B2Vec2
	Angle           float64
	LinearVelocity  box2d.B2Vec2
	AngularVelocity float64
}

func updateWorld(world *box2d.B2World) {
	var body = world.GetBodyList()
	var update = make(map[string]interface{})
	var isUpdateNeeded = false

	for {
		if body == nil {
			break
		}

		userData, _ := body.GetUserData().(*BodyUserData)

		if userData != nil && userData.BodyId != "" && body.IsAwake() {
			update[userData.BodyId] = &BodyState{
				Pos:             body.GetPosition(),
				Angle:           body.GetAngle(),
				LinearVelocity:  body.GetLinearVelocity(),
				AngularVelocity: body.GetAngularVelocity(),
			}
			isUpdateNeeded = true
		}

		body = body.GetNext()
	}

	if isUpdateNeeded {
		sendToClients(2, update, nil)
	}
}

func sendToClients(protoId int32, data interface{}, except *ws.Connection) {
	d, _ := json.Marshal(data)
	packet := &ws.P_MESSAGE{
		ProtocolId: protoId,
		Data:       d,
	}

	ws.Clients.RangeConnsByFunc(func(s string, connection *ws.Connection) bool {
		connection.SendMsg(context.Background(), packet, nil)
		return true
	})
}

func Jump(ctx context.Context, conn *ws.Connection, msg *ws.P_MESSAGE) error {
	bodyIntfs, ok := worldBodies.Load(conn.UserId())
	if !ok {
		return nil
	}
	body, _ := bodyIntfs.(*box2d.B2Body)

	//body.SetAwake(true)
	body.ApplyLinearImpulse(box2d.B2Vec2{X: 3, Y: 3}, body.GetPosition(), true)
	//body.ApplyForce(box2d.B2Vec2{X: 8, Y: -15}, body.GetPosition(), true)
	//body.SetAngularVelocity(1.5)

	//updateWorld(pWorld)
	return nil
}

func init() {
	ws.RegisterHandler(12, Jump)
}
