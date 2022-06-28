
// You can write more code here

/* START OF COMPILED CODE */

class Prefab1 extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 134, y ?? 62, texture || "dungeon", frame ?? "altars/qazlal_0.png");

		// this (components)
		new Physics(this);
		const thisPhysicsBody = new PhysicsBody(this);
		thisPhysicsBody.bodyX = 16;
		thisPhysicsBody.bodyY = 16;
		thisPhysicsBody.bodyWidth = 8;
		thisPhysicsBody.bodyHeight = 11;
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "animation6";

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
