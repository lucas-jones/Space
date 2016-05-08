package scenes;

import nape.shape.Circle;
import nape.phys.BodyType;
import nape.phys.Body;
import milkshake.math.Vector2;
import milkshake.assets.SpriteSheets;
import nape.geom.Vec2;
import nape.space.Space;
import scenes.camera.FollowCamera;
import scenes.camera.SpaceCameraPresets;
import player.Player;
import milkshake.game.scene.Scene;
import milkshake.utils.Color;
import pixi.core.textures.Texture;
import milkshake.core.Sprite;
import scenes.planet.Planet;
import milkshake.utils.Globals;

class TestPlayerScene extends Scene
{
	private var player:Player;
	private var space:Space;
	private var followCam:FollowCamera;

	public function new()
	{
		super("TestPlayerScene", [ SpriteSheets.PLAYER ], SpaceCameraPresets.FOLLOW, Color.BLUE);

		followCam = cast cameras.currentCamera;
		followCam.targetZoom = 2.5;
		followCam.fixedRotation = false;

		space = new Space(new Vec2(0, 100));
	}

	override public function create():Void
	{
		addScenary();
		addPlanet();
		addPlayer();

		followCam.target = player;
	}

	function addScenary():Void
	{
		addNode(new Background(Texture.fromImage("assets/images/dino/stars.png")));
	}

	function addPlanet():Void
	{
		var grass = Texture.fromImage("assets/images/textures/grass_side.png");
		var dirt = Texture.fromImage("assets/images/textures/dirt.png");

		addNode(new Planet(grass, dirt),
		{
			position: Globals.SCREEN_CENTER
		});
		var planet = new Body(BodyType.KINEMATIC);
		var planetShape = new Circle(1200);
		var planetPos = new Vector2(Globals.SCREEN_CENTER.x, Globals.SCREEN_CENTER.y);
		planet.shapes.add(planetShape);
		planet.mass = 100;
		planet.position = new nape.geom.Vec2(planetPos.x, planetPos.y);
		space.bodies.add(planet);
	}

	function addPlayer():Void
	{
		var playerPosition = milkshake.utils.Globals.SCREEN_CENTER.add(new Vector2(0, -1600));

		addNode(player = new Player(space),
		{
			position: playerPosition
		});
	}

	override public function update(deltaTime:Float):Void
	{
		space.step(1 / 24);
		super.update(deltaTime);
	}
}
