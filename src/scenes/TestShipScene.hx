package scenes;

import milkshake.core.Sprite;
import pixi.core.textures.Texture;
import milkshake.assets.SpriteSheets;
import milkshake.utils.Color;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.game.scene.Scene;

class TestShipScene extends Scene
{
	public function new()
	{
		super("TestShipScene", [ "assets/images/dino/stars.png", SpriteSheets.SHIPPARTS], CameraPresets.DEFAULT, Color.BLUE);
	}

	override public function create():Void
	{
		addNode(new Sprite(Texture.fromImage("assets/images/dino/stars.png")));


	}
}
