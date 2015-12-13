package scenes;

import nape.phys.BodyType;
import nape.phys.Body;
import nape.shape.Circle;
import milkshake.components.phsyics.PhysicsDebug;
import nape.geom.Vec2;
import nape.space.Space;
import scenes.planet.Planet;
import ship.part.Engine;
import ship.part.Cockpit;
import ship.part.Gun;
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

	private var planetDisplay:Planet;
	private var planet:Body;

	private var space:Space;

	public function new()
	{
		super("TestShipScene", [ "assets/images/dino/stars.png", SpriteSheets.SHIPPARTS, SpriteSheets.LASERS], CameraPresets.DEFAULT, Color.BLUE);

		space = new Space(new Vec2(2, 5));
	}

	override public function create():Void
	{
		addNode(new Sprite(Texture.fromImage("assets/images/dino/stars.png")));

		var ship = new ShipBuilder('andrews sick ship', space)
			.setCore(new Cockpit())
			.addPart(new Engine(), Engine.BOTTOM_JOINT, Cockpit.TOP_JOINT)
			.addPart(new Gun(), Gun.TOP_JOINT, Cockpit.BOTTOM_JOINT)
			.build();

		addNode(ship,
		{
			anchor: Vector2.HALF,
			position: new Vector2(Globals.SCREEN_CENTER.x, Globals.SCREEN_CENTER.y)
		});

		addPlanet();

		addNode(new PhysicsDebug(space));

		untyped window.ship = ship;
	}

	function addPlanet():Void
	{
		//Add test planet
		planet = new Body(BodyType.KINEMATIC);
		var planetShape = new Circle(300);
		planet.shapes.add(planetShape);
		space.bodies.add(planet);
		planet.position = new Vec2(Globals.SCREEN_CENTER.x, Globals.SCREEN_HEIGHT);

		var grass = Texture.fromImage("assets/images/textures/grass_side.png");
		var dirt = Texture.fromImage("assets/images/textures/dirt.png");

		addNode(planetDisplay = new scenes.planet.Planet(grass, dirt));
	}

	override public function update(delta:Float):Void
	{
		super.update(delta);

		space.step(1 / 24);

		planet.rotation += 0.03;

		planetDisplay.position.x = planet.position.x;
		planetDisplay.position.y = planet.position.y;
		planetDisplay.rotation = planet.rotation;
	}
}
