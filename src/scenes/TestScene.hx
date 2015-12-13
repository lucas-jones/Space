package scenes;

import milkshake.game.scene.Scene;
import milkshake.game.scene.camera.CameraPresets;
import milkshake.utils.Color;
import pixi.core.textures.Texture;
import scenes.planet.Planet;

class TestScene extends Scene
{
	public function new()
	{
		super("TestScene", [ ], CameraPresets.DEFAULT, Color.BLUE);
	}

	override public function create():Void
	{
		var grass = Texture.fromImage("assets/images/textures/grass_side.png");
		var dirt = Texture.fromImage("assets/images/textures/dirt.png");

		addNode(new Planet(grass, dirt),
		{
			position: milkshake.utils.Globals.SCREEN_CENTER
		});
	}

	override public function update(deltaTime:Float):Void
	{
		super.update(deltaTime);
	}
}