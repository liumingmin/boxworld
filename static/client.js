var id = null;
var lastIntervalTime = new Date().getTime();
let ws = null;
//window.setInterval(ping, 1000);



function setupCanvas() {
	var debugDraw = new b2DebugDraw();

	debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
	debugDraw.SetDrawScale(30.0);
	debugDraw.SetFillAlpha(0.5);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

	world.SetDebugDraw(debugDraw);
}

function _jump() {
	let wsMessage = new proto.ws.P_MESSAGE;
	wsMessage.setProtocolId(12);
	let wsBin = wsMessage.serializeBinary();
	ws.send(wsBin);
}

function init() {
	setupWorld(0);
	setupCanvas();

	window.setInterval(update, 1000 / 60);

	var body;

	function update() {
	   var newTime = new Date().getTime()
	   lastIntervalTime = newTime;		
	   world.Step(1 / 60, 10, 10);
	   world.DrawDebugData();
	   world.ClearForces();
	}
}
         
//helpers
         
//http://js-tut.aardon.de/js-tut/tutorial/position.html
function getElementPosition(element) {
	var elem = element, tagname = "", x = 0, y = 0;
           
	while((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
		y += elem.offsetTop;
		x += elem.offsetLeft;

		tagname = elem.tagName.toUpperCase();

		if(tagname == "BODY") elem = 0;

		if(typeof(elem) == "object") {
			if(typeof(elem.offsetParent) == "object") elem = elem.offsetParent;
		}

		return {x: x, y: y};
	}
}

function updateWorld(data) {
	var body = world.GetBodyList();
	do {
		var userData = body.GetUserData();
		if(userData && userData.bodyId && data[userData.bodyId]){		
			var update = data[userData.bodyId];

			console.log(update);
			//console.log('position difference:', (body.GetPosition().y - update.p.y) * 30, body.GetLinearVelocity().y);
			
			body.SetAwake(true);			
			body.SetPosition({x:update.Pos.X, y:update.Pos.Y});
			body.SetAngle(update.Angle);
			body.SetLinearVelocity({x:update.LinearVelocity.X,y:update.LinearVelocity.Y});
			body.SetAngularVelocity(update.AngularVelocity);
		}
	} while (body = body.GetNext());
}


ws = new WebSocket("ws://"+xhost + ':' + xport+"/join?uid=1");
ws.onopen = function () {
	ws.binaryType = 'arraybuffer'; //必须加上此类型
	console.log('Client has connected to the server!');
	connected = true;
};
ws.onerror = function (error) {
	console.log(error);
};
ws.onmessage = function (e) {
	let wsMessage = proto.ws.P_MESSAGE.deserializeBinary(e.data)
	switch (wsMessage.getProtocolId()) {
		case 2:

			let data = JSON.parse(Uint8ArrayToString(wsMessage.getData()));
			console.log(data);
			updateWorld(data);
			break;
	}
};
ws.onclose = function (e) {
	console.log('The client has disconnected!');
	connected = false;
};


function Uint8ArrayToString(fileData){
	var dataString = "";
	for (var i = 0; i < fileData.length; i++) {
		dataString += String.fromCharCode(fileData[i]);
	}

	return dataString

}


window.onload = init;
