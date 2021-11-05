
// You can write more code here

/* START OF COMPILED CODE */

class test extends Phaser.Scene {

	constructor() {
		super("test");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// island
		const island = this.add.tilemap("island");
		island.addTilesetImage("beach_tileset", "beach_tileset");

		// ground
		const ground = island.createLayer("Ground", ["beach_tileset"], 0, 0);

		// fringe
		island.createLayer("Fringe", ["beach_tileset"], 0, 0);

		// over
		island.createLayer("Over", ["beach_tileset"], 0, 0);

		// cherry
		const cherry = new Cherry(this, 706, 320);
		this.add.existing(cherry);

		// left_button
		const left_button = this.add.image(25, 169, "left-button");
		left_button.scaleX = 0.39899614692006335;
		left_button.scaleY = 0.39899614692006335;

		// right_button
		const right_button = this.add.image(68, 169, "right-button");
		right_button.scaleX = 0.39899614692006335;
		right_button.scaleY = 0.39899614692006335;

		// jump_button
		const jump_button = this.add.image(248, 173, "jump-button");
		jump_button.scaleX = 0.39899614692006335;
		jump_button.scaleY = 0.39899614692006335;

		// lists
		const list = []

		this.ground = ground;
		this.island = island;
		this.list = list;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	ground;
	/** @type {Array<any>} */
	list;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		//this.initCamera();
	}

	initCamera() {

		const cam = this.cameras.main;
		cam.setBounds(0, 0, this.ground.width, this.ground.height);
		cam.setRoundPixels(true);
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
