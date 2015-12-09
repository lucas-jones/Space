package scenes;

import motion.easing.Linear;
import milkshake.assets.SpriteSheets;
import milkshake.core.Sprite;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.game.scene.Scene;
import milkshake.math.Vector2;
import milkshake.utils.Color;
import milkshake.utils.Globals;
import motion.easing.Elastic;
import pixi.core.textures.Texture;

using milkshake.utils.TweenUtils;

class TestScene extends Scene
{
	var world:Sprite;
	var logo:Sprite;
	var moon:Sprite;

	public function new()
	{
		super("TestScene", [ "assets/images/dino/stars.png" ], CameraPresets.DEFAULT, Color.BLUE);
	}

	override public function create():Void
	{
		super.create();

		addNode(new Sprite(Texture.fromImage("assets/images/dino/stars.png")));

		addNode(logo = new Sprite(Texture.fromImage("assets/images/dino/logo.png")),
		{
			anchor: Vector2.HALF,
			position: new Vector2(Globals.SCREEN_CENTER.x, 140)
		});

		addNode(world = new Sprite(Texture.fromImage("assets/images/dino/world.png")),
		{
			anchor: Vector2.HALF,
			position: new Vector2(Globals.SCREEN_CENTER.x, Globals.SCREEN_HEIGHT + 200),
			scale: Vector2.EQUAL(0.8)
		});

		addNode(moon = new Sprite(Texture.fromImage("assets/images/dino/moon.png")),
		{
			anchor: Vector2.HALF,
			position: new Vector2(203,173),
			rotation: -0.2,
			scale: Vector2.EQUAL(1)
		});

		world.tweenFrom(2, { y: Globals.SCREEN_HEIGHT * 2 }).delay(1).ease(Elastic.easeOut);
		logo.tweenFrom(1, { y: -200 }).delay(1).ease(Elastic.easeOut);
		moon.tweenFrom(1, {x: -200}).delay(2).ease(Elastic.easeOut).onComplete(function(){
			moon.scale.tween(1, { x: 1.25, y: 1.25 }).ease(Linear.easeNone).repeat().reflect();
			moon.tween(1, { rotation: 0.2 }).ease(Linear.easeNone).repeat().reflect();
		});
	}

	override public function update(deltaTime:Float):Void
	{
		super.update(deltaTime);

		world.rotation += 0.001 * deltaTime;
	}
}