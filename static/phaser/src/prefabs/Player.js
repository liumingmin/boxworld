
// You can write more code here

/* START OF COMPILED CODE */

class Player extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 78, y ?? 37);

		// sword
		const sword = scene.add.sprite(4, 9, "item", "weapon/two_handed_sword.png");
		sword.scaleX = 0.5;
		sword.scaleY = 0.5;
		sword.setOrigin(0, 1);
		this.add(sword);

		// player_climb_player_climb_1
		const player_climb_player_climb_1 = scene.add.sprite(0, 0, "atlas", "player/idle/player-idle-2");
		this.add(player_climb_player_climb_1);

		// this (components)
		const thisPhysics = new Physics(this);
		thisPhysics.bodyGravity = 500;
		const thisPhysicsBody = new PhysicsBody(this);
		thisPhysicsBody.bodyX = 12;
		thisPhysicsBody.bodyWidth = 8;
		thisPhysicsBody.bodyHeight = 16;

		// player_climb_player_climb_1 (components)
		const player_climb_player_climb_1StartAnimation = new StartAnimation(player_climb_player_climb_1);
		player_climb_player_climb_1StartAnimation.animationKey = "player/idle/player-idle";

		this.sword = sword;
		this.player_climb_player_climb_1 = player_climb_player_climb_1;

		/* START-USER-CTR-CODE */

		this.playerSprite = player_climb_player_climb_1;
		this.hurtFlag = false;

		this.scene.time.addEvent({
			loop: true,
			delay: 500,
			callback: () => {

				this.hurtFlag = false;
			}
		});

		this.scene.events.on("update", () => this.updatePlayer());

		this.swordTween = this.scene.add.tween({
            targets: this.sword,
            ease: 'Sine.easeInOut',
			rotation: (3.14*2 - (3.14*1.6)),
            duration: 100,
            delay: 50,
            repeat: 0,
            yoyo: true
        });

		this.swordTweenFlip = this.scene.add.tween({
            targets: this.sword,
            ease: 'Sine.easeInOut',
			rotation: (3.14*2 - (3.14*1.8)),
            duration: 100,
            delay: 50,
            repeat: 0,
            yoyo: true
        });
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Sprite} */
	sword;
	/** @type {Phaser.GameObjects.Sprite} */
	player_climb_player_climb_1;

	/* START-USER-CODE */
	swordTween;
	swordTweenFlip;
	/**
	 * @return {Phaser.Physics.Arcade.Body} 
	 */
	getBody() {
		return this.body;
	}

	updatePlayer() {

		if (this.hurtFlag) {

			this.playerSprite.play("player/hurt/player-hurt", true);
		}
	}

	setFlipX(f){
		this.playerSprite.flipX = f;
		this.sword.flipX = f;
		if(this.sword.flipX){
			//this.sword.x = -19;
			//this.sword.setOrigin(-0.8, 1);
		}else{
			//this.sword.x = 4;
			//this.sword.setOrigin(0, 1);
		}
	}

	hurtPlayer() {

		if (this.hurtFlag) {

			return;
		}

		this.hurtFlag = true;

		//this.hurtTimer.start();

		const body = this.getBody();

		body.velocity.y = -100;

		body.velocity.x = (this.scale.x == 1) ? -100 : 100;
	}

	rotateSword(){
		if(this.sword.flipX){
			this.swordTween.play();
		}else{
			this.swordTween.play();
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
