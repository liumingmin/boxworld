package box2d

import (
	"fmt"

	"github.com/lafriks/go-tiled"
	"github.com/liumingmin/box2d"
)

type BodyUserData struct {
	BodyId string
}

func loadmap(world *box2d.B2World) {
	bd := box2d.MakeB2BodyDef()
	bd.Type = box2d.B2BodyType.B2_staticBody

	var fixDef = box2d.MakeB2FixtureDef()
	fixDef.Friction = 0.99
	fixDef.Restitution = 0.51
	fixDef.Density = 1.0
	fixDef.Filter = box2d.MakeB2Filter()
	fixDef.Filter.GroupIndex = 1

	gameMap, _ := tiled.LoadFromFile("asset/island.tmx")
	for _, object := range gameMap.ObjectGroups {
		for _, ob := range object.Objects {
			if len(ob.PolyLines) > 0 {
				createPolylineBody(world, &bd, &fixDef, object.ID, ob.PolyLines)
			}

			if len(ob.PolyLines) > 0 {
				createPolygonBody(world, &bd, &fixDef, object.ID, ob.Polygons)
			}
		}
	}
}

func createPolylineBody(world *box2d.B2World, bodyDef *box2d.B2BodyDef, fixDef *box2d.B2FixtureDef, id uint32, polyLines []*tiled.PolyLine) {
	for _, line := range polyLines {
		vs := make([]box2d.B2Vec2, len(*line.Points))
		for pi, pt := range *line.Points {
			vs[pi] = box2d.MakeB2Vec2(pt.X, pt.Y)
		}
		shape := box2d.MakeB2ChainShape()
		shape.CreateChain(vs, len(vs))
		fixDef.Shape = &shape

		body := world.CreateBody(bodyDef)
		userData := BodyUserData{BodyId: fmt.Sprint(id)}
		body.SetUserData(userData)
		body.CreateFixtureFromDef(fixDef)

		worldBodies.Store(userData.BodyId, body)
	}
}

func createPolygonBody(world *box2d.B2World, bodyDef *box2d.B2BodyDef, fixDef *box2d.B2FixtureDef, id uint32, polygons []*tiled.Polygon) {
	for _, polygon := range polygons {
		vs := make([]box2d.B2Vec2, len(*polygon.Points))
		for pi, pt := range *polygon.Points {
			vs[pi] = box2d.MakeB2Vec2(pt.X, pt.Y)
		}

		shape := box2d.MakeB2PolygonShape()
		shape.Set(vs, len(vs))
		fixDef.Shape = &shape

		body := world.CreateBody(bodyDef)
		userData := BodyUserData{BodyId: fmt.Sprint(id)}
		body.SetUserData(userData)

		body.CreateFixtureFromDef(fixDef)

		worldBodies.Store(userData.BodyId, body)
	}
}
