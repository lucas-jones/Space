package scenes;

import ship.part.Gun;
import ship.part.joint.Joint;
import ship.part.ShipPart;
import ship.ShipBuilder;
import ship.Ship;
import milkshake.math.Vector2;
import milkshake.utils.Globals;
import milkshake.core.Sprite;
import pixi.core.textures.Texture;
import milkshake.assets.SpriteSheets;
import milkshake.utils.Color;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.game.scene.Scene;

class TestShipScene extends Scene
{
	private var ship:Ship;

	public function new()
	{
		super("TestShipScene", [ "assets/images/dino/stars.png", SpriteSheets.SHIPPARTS, SpriteSheets.LASERS], CameraPresets.DEFAULT, Color.BLUE);
	}

	override public function create():Void
	{
		addNode(new Sprite(Texture.fromImage("assets/images/dino/stars.png")));

		var ship = new ShipBuilder('andrews sick ship')
			.setCore(new ShipPart('core', 'cockpitGreen_7.png',
			[
				new Joint('core_top', new Vector2(0, -37.5)),
				new Joint('core_bottom', new Vector2(0, 37.5))
			]))
			.addPart(new ShipPart('engine', 'engine2.png',
			[
				new Joint('engine_top', new Vector2(0, -14)),
				new Joint('engine_bottom', new Vector2(0, 14))
			]), 'engine_bottom', 'core_top')
			.addPart(new Gun(), 'gun_top', 'core_bottom')
			.build();

		addNode(ship,
		{
			anchor: Vector2.HALF,
			position: new Vector2(Globals.SCREEN_CENTER.x, Globals.SCREEN_CENTER.y)
		});

		untyped window.ship = ship;
	}
}
