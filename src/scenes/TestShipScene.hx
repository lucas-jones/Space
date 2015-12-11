package scenes;

import ship.part.Engine;
import ship.part.Cockpit;
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
			.setCore(new Cockpit())
			.addPart(new Engine(), Engine.BOTTOM_JOINT, Cockpit.TOP_JOINT)
			.addPart(new Gun(), Gun.TOP_JOINT, Cockpit.BOTTOM_JOINT)
//			.addPart(new ShipPart('wing_right', 'wingGreen_6.png',
//			[
//				new Joint('wing_right_left', new Vector2(-21, 0)),
//				new Joint('wing_right_right', new Vector2(21, 0))
//			]), 'wing_right_left', Cockpit.RIGHT_JOINT)
			.build();

		addNode(ship,
		{
			anchor: Vector2.HALF,
			position: new Vector2(Globals.SCREEN_CENTER.x, Globals.SCREEN_CENTER.y)
		});
	}
}
