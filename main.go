package main

import (
	"context"
	"encoding/json"

	"github.com/liumingmin/boxworld/constant"

	"github.com/gin-gonic/gin"
	"github.com/liumingmin/goutils/log"
	"github.com/liumingmin/goutils/ws"
)

func main() {

	e := gin.Default()
	e.Static("/static", "./static")
	e.GET("/join", JoinGame)
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
	_, err := ws.AcceptGin(ctx, connMeta, ws.ConnectCbOption(&ConnectCb{connMeta.UserId}))
	if err != nil {
		log.Error(ctx, "Accept client connection failed. error: %v", err)
		return
	}
}

type ConnectCb struct {
	Uid string
}

func (c *ConnectCb) ConnFinished(clientId string) {
	d, _ := json.Marshal([]string{c.Uid})

	uids := make([]string, 0)
	ws.Clients.RangeConnsByFunc(func(s string, connection *ws.Connection) bool {
		if c.Uid == connection.UserId() {
			return true
		}
		uids = append(uids, connection.UserId())
		return true
	})

	ws.Clients.RangeConnsByFunc(func(s string, connection *ws.Connection) bool {
		if c.Uid == connection.UserId() {
			d2, _ := json.Marshal(uids)

			packet2 := ws.GetPMessage()
			packet2.ProtocolId = constant.PROT_JOIN_GAME
			packet2.Data = d2

			connection.SendMsg(context.Background(), packet2, nil)
			return true
		}

		packet := ws.GetPMessage()
		packet.ProtocolId = constant.PROT_JOIN_GAME
		packet.Data = d
		connection.SendMsg(context.Background(), packet, nil)
		return true
	})
}
func (c *ConnectCb) DisconnFinished(clientId string) {
	d, _ := json.Marshal([]string{c.Uid})

	ws.Clients.RangeConnsByFunc(func(s string, connection *ws.Connection) bool {
		if c.Uid == connection.UserId() {
			return true
		}
		packet := ws.GetPMessage()
		packet.ProtocolId = constant.PROT_LEAVE_GAME
		packet.Data = d

		connection.SendMsg(context.Background(), packet, nil)
		return true
	})
}

//type GameMap struct {
//	players sync.Map
//}
//
//func (m *GameMap) Enter(uid string) {
//	m.players.Range(func(key, value interface{}) bool {
//
//		return true
//	})
//}
//
//func (m *GameMap) Leave(uid string) {
//
//}

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
	ws.Clients.RangeConnsByFunc(func(s string, connection *ws.Connection) bool {
		if movedPlayer.Id == connection.UserId() {
			return true
		}

		d, _ := json.Marshal([]PlayerPos{*movedPlayer})

		packet := ws.GetPMessage()
		packet.ProtocolId = constant.PROT_PLAYER_POS
		packet.Data = d

		connection.SendMsg(ctx, packet, nil)
		return true
	})
}

func updatePlayerPos(ctx context.Context, conn *ws.Connection, msg *ws.P_MESSAGE) error {
	playerPos := PlayerPos{}
	json.Unmarshal(msg.Data, &playerPos)
	playerPos.Id = conn.UserId()
	//conn.SetCommDataValue("pos", playerPos)

	sendPlayerPosToClients(ctx, &playerPos)
	return nil
}

func init() {
	ws.RegisterHandler(constant.PROT_PLAYER_POS, updatePlayerPos)
}
