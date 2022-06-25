
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// map
		const map = this.add.tilemap("map");
		map.addTilesetImage("tileset", "tileset");

		// back3
		const back3 = this.add.image(0, 0, "back");
		back3.setOrigin(0, 0);

		// back2
		const back2 = this.add.image(768, 0, "back");
		back2.setOrigin(0, 0);

		// back1
		const back1 = this.add.image(384, 0, "back");
		back1.setOrigin(0, 0);

		// middle5
		const middle5 = this.add.image(528, 80, "middle");
		middle5.setOrigin(0, 0);

		// middle4
		const middle4 = this.add.image(704, 80, "middle");
		middle4.setOrigin(0, 0);

		// middle3
		const middle3 = this.add.image(880, 80, "middle");
		middle3.setOrigin(0, 0);

		// middle2
		const middle2 = this.add.image(176, 80, "middle");
		middle2.setOrigin(0, 0);

		// middle1
		const middle1 = this.add.image(352, 80, "middle");
		middle1.setOrigin(0, 0);

		// middle
		const middle = this.add.image(0, 80, "middle");
		middle.setOrigin(0, 0);

		// layer
		const layer = map.createLayer("Tile Layer 1", ["tileset"], 0, 0);

		// tree
		const tree = this.add.image(496, 67, "atlas-props", "tree");
		tree.setOrigin(0, 0);

		// bush
		const bush = this.add.image(160, 132, "atlas-props", "bush");
		bush.setOrigin(0, 0);

		// sign
		const sign = this.add.image(176, 300, "atlas-props", "sign");
		sign.setOrigin(0, 0);

		// skulls
		const skulls = this.add.image(240, 310, "atlas-props", "skulls");
		skulls.setOrigin(0, 0);

		// face_block
		const face_block = this.add.image(368, 304, "atlas-props", "face-block");
		face_block.setOrigin(0, 0);

		// shrooms
		const shrooms = this.add.image(448, 320, "atlas-props", "shrooms");
		shrooms.setOrigin(0, 0);

		// house
		const house = this.add.image(768, 53, "atlas-props", "house");
		house.setOrigin(0, 0);

		// cherry
		const cherry = new Cherry(this, 480, 80);
		this.add.existing(cherry);

		// cherry_1
		const cherry_1 = new Cherry(this, 496, 80);
		this.add.existing(cherry_1);

		// cherry_2
		const cherry_2 = new Cherry(this, 512, 80);
		this.add.existing(cherry_2);

		// cherry_3
		const cherry_3 = new Cherry(this, 368, 273);
		this.add.existing(cherry_3);

		// cherry_4
		const cherry_4 = new Cherry(this, 400, 272);
		this.add.existing(cherry_4);

		// cherry_5
		const cherry_5 = new Cherry(this, 384, 272);
		this.add.existing(cherry_5);

		// gem
		const gem = new Gem(this, 64, 96);
		this.add.existing(gem);

		// gem_1
		const gem_1 = new Gem(this, 48, 96);
		this.add.existing(gem_1);

		// gem_2
		const gem_2 = new Gem(this, 80, 96);
		this.add.existing(gem_2);

		// gem_3
		const gem_3 = new Gem(this, 672, 256);
		this.add.existing(gem_3);

		// gem_1_1
		const gem_1_1 = new Gem(this, 672, 208);
		this.add.existing(gem_1_1);

		// gem_2_1
		const gem_2_1 = new Gem(this, 704, 192);
		this.add.existing(gem_2_1);

		// frog
		const frog = new Frog(this, 240, 144);
		this.add.existing(frog);

		// frog_1
		const frog_1 = new Frog(this, 553, 324);
		this.add.existing(frog_1);

		// eagle
		const eagle = new Eagle(this, 528, 96);
		this.add.existing(eagle);

		// eagle_2
		const eagle_2 = new Eagle(this, 96, 96);
		this.add.existing(eagle_2);

		// opossum
		const opossum = new Opossum(this, 678, 147);
		this.add.existing(opossum);

		// opossum_1
		const opossum_1 = new Opossum(this, 368, 320);
		this.add.existing(opossum_1);

		// player
		const player = new Player(this, 738, 121);
		this.add.existing(player);
		player.flipX = true;
		player.flipY = false;

		// left_button
		const left_button = this.add.image(26, 170, "left-button");
		left_button.scaleX = 0.39899614692006335;
		left_button.scaleY = 0.39899614692006335;
		left_button.tintTopLeft = 16627125;

		// right_button
		const right_button = this.add.image(70, 170, "right-button");
		right_button.scaleX = 0.39899614692006335;
		right_button.scaleY = 0.39899614692006335;
		right_button.tintTopLeft = 16627125;

		// jump_button
		const jump_button = this.add.image(262, 170, "jump-button");
		jump_button.scaleX = 0.39899614692006335;
		jump_button.scaleY = 0.39899614692006335;
		jump_button.tintTopLeft = 16627125;

		// prefab1
		// const prefab1 = new Prefab1(this, 799, 144);
		// this.add.existing(prefab1);

		// lists
		const items = [cherry, cherry_1, cherry_2, cherry_3, cherry_4, cherry_5, gem, gem_1, gem_2, gem_3, gem_1_1, gem_2_1];
		const enemies = [frog_1, frog, opossum_1, opossum, eagle, eagle_2];

		// eagle (components)
		const eagleCharacterMove = new CharacterMove(eagle);
		eagleCharacterMove.deltaY = 50;
		eagleCharacterMove.duration = 1000;

		// eagle_2 (components)
		const eagle_2CharacterMove = new CharacterMove(eagle_2);
		eagle_2CharacterMove.deltaY = 50;
		eagle_2CharacterMove.duration = 1000;

		// left_button (components)
		new FixedToCamera(left_button);
		new ControllerButton(left_button);

		// right_button (components)
		new FixedToCamera(right_button);
		new ControllerButton(right_button);

		// jump_button (components)
		new FixedToCamera(jump_button);
		new ControllerButton(jump_button);

		this.layer = layer;
		this.player = player;
		this.left_button = left_button;
		this.right_button = right_button;
		this.jump_button = jump_button;
		this.map = map;
		this.items = items;
		this.enemies = enemies;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layer;
	/** @type {Player} */
	player;
	/** @type {Phaser.GameObjects.Image} */
	left_button;
	/** @type {Phaser.GameObjects.Image} */
	right_button;
	/** @type {Phaser.GameObjects.Image} */
	jump_button;
	/** @type {Array<Cherry|Gem>} */
	items;
	/** @type {Array<Frog|Opossum|Eagle>} */
	enemies;

	/* START-USER-CODE */

	create() {

		this.editorCreate();

		this.initColliders();

		this.bindKeys();

		this.initCamera();

		this.initWs();
	}

	initCamera() {

		const cam = this.cameras.main;
		cam.setBounds(0, 0, this.layer.width, this.layer.height);
		cam.setRoundPixels(true);
	}


	update() {

		this.movePlayer();

		const cam = this.cameras.main;

		const col = Math.floor(this.player.x / cam.width);
		const row = Math.floor(this.player.y / cam.height);

		cam.scrollX = col * cam.width;
		cam.scrollY = row * cam.height;
	}

	movePlayer() {

		if (this.player.hurtFlag) {

			return;
		}

		const body = this.player.getBody();

		const jumpDown = this.wasd.jump.isDown || ControllerButton.getComponent(this.jump_button).isDown;
		const leftDown = this.wasd.left.isDown || ControllerButton.getComponent(this.left_button).isDown;
		const rightDown = this.wasd.right.isDown || ControllerButton.getComponent(this.right_button).isDown;

		if (jumpDown && body.onFloor()) {

			this.player.getBody().velocity.y = -170;
		}

		var vel = 150;

		var aniKey = "";
		if (leftDown) {

			this.player.getBody().velocity.x = -vel;
			aniKey="player/run/player-run";
			this.player.playerSprite.play(aniKey, true);
			this.player.setFlipX(true);

		} else if (rightDown) {

			this.player.getBody().velocity.x = vel;
			aniKey = "player/run/player-run";
			this.player.playerSprite.play(aniKey, true);
			this.player.setFlipX(false);

		} else {

			this.player.getBody().velocity.x = 0;

			if (this.wasd.crouch.isDown) {
				aniKey = "player/crouch/player-crouch";
				this.player.playerSprite.play(aniKey, true);

			} else {
				aniKey = "player/idle/player-idle";
				this.player.playerSprite.play(aniKey, true);
			}
		}

		// jump animation

		if (this.player.getBody().velocity.y < 0) {
			aniKey = "player/jump/player-jump-1";
			this.player.playerSprite.play(aniKey, true);

		} else if (this.player.getBody().velocity.y > 0) {
			aniKey = "player/jump/player-jump-2";
			this.player.playerSprite.play(aniKey, true);
		}

		this.sendPlayerToServer(this.player,aniKey);
	}

	syncOtherPlayers(pl,pos){
		pl.setPosition(pos.x,pos.y);
		pl.setFlipX(pos.fx==1);
		pl.body.velocity.x = pos.vx;
		pl.body.velocity.y = pos.vy;
		if(pos.ani!=""){
			pl.play(pos.ani, true);
		}
	}

	bindKeys() {

		this.wasd = {
			jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true),
			left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT, true),
			right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT, true),
			crouch: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN, true)
		};
	}


	initColliders() {

		this.map.setCollision([27, 29, 31, 33, 35, 37, 77, 81, 86, 87, 127, 129, 131, 133, 134, 135, 83, 84, 502, 504, 505, 529, 530, 333, 335, 337, 339, 366, 368, 262, 191, 193, 195, 241, 245, 291, 293, 295]);
		this.setTopCollisionTiles([35, 36, 84, 86, 134, 135, 366, 367, 368, 262]);

		this.physics.add.collider(this.player, this.layer);
		this.physics.add.collider(this.enemies, this.layer);
		this.physics.add.overlap(this.player, this.items, this.pickItem, null, this);
		this.physics.add.overlap(this.player, this.enemies, this.checkAgainstEnemies, null, this);
	}

	/**
	 * @param {Player} player
	 * @param {Phaser.GameObjects.Sprite} enemy
	 */
	checkAgainstEnemies(player, enemy) {

		if ((player.y + player.body.height * 0.5 < enemy.y) && player.body.velocity.y > 0) {

			this.add.existing(new EnemyDeath(this, enemy.x, enemy.y));

			enemy.destroy();

			player.body.velocity.y = -200;

		} else {

			this.player.hurtPlayer();
		}
	}	

	/**
	 * @param {Player} player
	 * @param {Phaser.GameObjects.Sprite} item
	 */
	pickItem(player, item) {

		this.add.existing(new FeedbackItem(this, item.x, item.y));

		item.destroy();
	}

	/**
	 * @param {number[]} tiles
	 */
	setTopCollisionTiles(tiles) {

		const tileSet = new Set(tiles);

		for (let x = 0; x < this.map.width; x++) {

			for (let y = 0; y < this.map.height; y++) {

				const tile = this.layer.getTileAt(x, y);

				if (tile && tileSet.has(tile.index)) {

					tile.setCollision(false, false, true, false);
				}
			}
		}
	}

	ws;
	connected;

	sendPlayerToServer(pl,aniKey){
		if (!this.ws || !this.connected){
			return ;
		}

		let pos = JSON.stringify({"x":pl.body.x,"y":pl.body.y,"fx":(pl.flipX?1:0),
		"vx":pl.body.velocity.x,"vy":pl.body.velocity.y,"dn":(this.wasd.crouch.isDown?1:0),
		"ani":aniKey});

		let wsMessage = new proto.ws.P_MESSAGE;
		wsMessage.setProtocolId(4);
		wsMessage.setData(this.encode(pos));
		let wsBin = wsMessage.serializeBinary();
		this.ws.send(wsBin);
	}

	players;
	initWs(){
		this.ws = null;
		this.connected = false;
		this.players = {};

		this.ws = new WebSocket("ws://127.0.0.1:8003/join?uid="+this.uuid());

		this.ws.onopen =  () =>{
			this.ws.binaryType = 'arraybuffer'; //必须加上此类型
			console.log('Client has connected to the server!');
			this.connected = true;
		};
		this.ws.onerror =(error) =>{
			console.log(error);
		};
		this.ws.onmessage =(e) =>{
			let wsMessage = proto.ws.P_MESSAGE.deserializeBinary(e.data)
			switch (wsMessage.getProtocolId()) {
				case 2:
					//str array
					var playerIds = JSON.parse(this.decode(wsMessage.getData()));
					for(var i=0;i<playerIds.length;i++){
						if(this.players[playerIds[i]]){
							continue;
						}

						const playerInstance = new Player(this, 738, 121);
						this.add.existing(playerInstance);
						playerInstance.setFlipX(true);
						this.physics.add.collider(playerInstance, this.layer);
						this.players[playerIds[i]] = playerInstance;
					}
					break;
				case 3:
					var playerIds = JSON.parse(this.decode(wsMessage.getData()));
					for(var i=0;i<playerIds.length;i++){
						if(!this.players[playerIds[i]]){
							continue;
						}

						this.players[playerIds[i]].destroy();
					}
					break;
				case 4:
				   //object array
				   let updatePoses = this.decode(wsMessage.getData());
				   let playerPos = JSON.parse(updatePoses); 	
					for(var i=0;i<playerPos.length;i++){
						let pl = playerPos[i];
						const playerInstance =this.players[pl.id];

						if(playerInstance){
							this.syncOtherPlayers(playerInstance, pl);
						}
					}
					break;
			}
		};
		this.ws.onclose = (e) =>{
			console.log('The client has disconnected!');
			this.connected = false;
		};
	}

	 encode(text) {
        return new TextEncoder("utf-8").encode(text);
    }

     decode(uint8array) {
        if (uint8array.length > 0) {
            return new TextDecoder("utf-8").decode(uint8array);
        }
        return uint8array
    }

	uuid() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = "-";

		var uuid = s.join("");
		return uuid;
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
