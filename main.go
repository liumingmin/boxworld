package main

import (
	"context"
	"encoding/json"

	"github.com/DeanThompson/ginpprof"
	"github.com/gin-gonic/gin"
	"github.com/liumingmin/boxworld/constant"
	"github.com/liumingmin/goutils/log"
	"github.com/liumingmin/goutils/ws"
)

func main() {
	ws.InitServer()

	e := gin.Default()
	e.Static("/static", "./static")
	e.GET("/join", JoinGame)

	ginpprof.WrapGroup(&e.RouterGroup)

	e.Run(":8003")
}

func JoinGame(ctx *gin.Context) {
	connMeta := ws.ConnectionMeta{
		UserId:   ctx.DefaultQuery("uid", "0000"),
		Typed:    0,
		DeviceId: "",
		Version:  0,
		Charset:  0,
	}
	_, err := ws.AcceptGin(ctx, connMeta,
		ws.ConnEstablishHandlerOption(ConnFinished),
		ws.ConnClosedHandlerOption(DisconnFinished),
	)
	if err != nil {
		log.Error(ctx, "Accept client connection failed. error: %v", err)
		return
	}
}

func ConnFinished(conn *ws.Connection) {
	d, _ := json.Marshal([]string{conn.UserId()})

	uids := make([]string, 0)
	ws.ClientConnHub.RangeConnsByFunc(func(s string, connection *ws.Connection) bool {
		if conn.UserId() == connection.UserId() {
			return true
		}
		uids = append(uids, connection.UserId())
		return true
	})

	ws.ClientConnHub.RangeConnsByFunc(func(s string, connection *ws.Connection) bool {
		if conn.UserId() == connection.UserId() {
			d2, _ := json.Marshal(uids)

			packet2 := ws.GetPoolMessage(constant.PROT_JOIN_GAME)
			packet2.PMsg().Data = d2

			connection.SendMsg(context.Background(), packet2, nil)
			return true
		}

		packet := ws.GetPoolMessage(constant.PROT_JOIN_GAME)
		packet.PMsg().Data = d
		connection.SendMsg(context.Background(), packet, nil)
		return true
	})
}
func DisconnFinished(conn *ws.Connection) {
	d, _ := json.Marshal([]string{conn.UserId()})

	ws.ClientConnHub.RangeConnsByFunc(func(s string, connection *ws.Connection) bool {
		if conn.UserId() == connection.UserId() {
			return true
		}
		packet := ws.GetPoolMessage(constant.PROT_LEAVE_GAME)
		packet.PMsg().Data = d

		connection.SendMsg(context.Background(), packet, nil)
		return true
	})
}

type PlayerPos struct {
	Id  string  `json:"id"`
	X   float64 `json:"x"`
	Y   float64 `json:"y"`
	Fx  int     `json:"fx"`
	Vx  float64 `json:"vx"`
	Vy  float64 `json:"vy"`
	Dn  int     `json:"dn"`
	Ani string  `json:"ani"`
}

func sendPlayerPosToClients(ctx context.Context, movedPlayer *PlayerPos) {
	d, _ := json.Marshal([]PlayerPos{*movedPlayer})

	packet := ws.NewMessage()
	packet.PMsg().ProtocolId = constant.PROT_PLAYER_POS
	packet.PMsg().Data = d

	ws.ClientConnHub.RangeConnsByFunc(func(s string, connection *ws.Connection) bool {
		if movedPlayer.Id == connection.UserId() {
			return true
		}

		//packet := ws.GetPoolMessage(constant.PROT_PLAYER_POS)
		connection.SendMsg(ctx, packet, nil)
		return true
	})
}

func updatePlayerPos(ctx context.Context, conn *ws.Connection, msg *ws.Message) error {
	playerPos := PlayerPos{}
	json.Unmarshal(msg.PMsg().Data, &playerPos)
	playerPos.Id = conn.UserId()
	//conn.SetCommDataValue("pos", playerPos)

	sendPlayerPosToClients(ctx, &playerPos)
	return nil
}

func init() {
	ws.RegisterHandler(constant.PROT_PLAYER_POS, updatePlayerPos)
}
