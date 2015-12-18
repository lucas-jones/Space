package scenes;

import milkshake.core.Graphics;
import haxe.Json;
import scenes.camera.FollowCamera;
import scenes.camera.SpaceCameraPresets;
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
import ship.builder.ShipBuilder;
import ship.Ship;
import milkshake.math.Vector2;
import milkshake.utils.Globals;
import pixi.core.textures.Texture;
import milkshake.assets.SpriteSheets;
import milkshake.utils.Color;
import milkshake.game.scene.Scene;

class TestShipScene extends Scene
{
	private var ship:Ship;
	private var followCam:FollowCamera;
	private var space:Space;

	private var planetDisplay:Planet;
	private var planet:Body;

	private var orbit:Graphics;

	public function new()
	{
		super("TestShipScene", [ "assets/images/dino/stars.png", SpriteSheets.SHIPPARTS, SpriteSheets.LASERS], SpaceCameraPresets.FOLLOW, Color.BLUE);

		followCam = cast cameras.currentCamera;
		followCam.targetZoom = 0.5;

		space = new Space(new Vec2());
	}

	override public function create():Void
	{
		this.addNode(new Background(Texture.fromImage("assets/images/dino/stars.png")));

		ship = ShipBuilder.fromDescriptor(Json.parse(CompileTime.readFile("assets/ships/andrews_sick_ship.json")), space);

		addNode(ship,
		{
			position: new Vector2(2800, -1000),
			anchor: Vector2.HALF
		});

		followCam.target = ship;
		followCam.fixedRotation = false;

		addPlanet();

		if(Globals.DEBUG)
		{
			var graphic = new milkshake.core.Graphics();
// X
			graphic.graphics.lineStyle(2, Color.RED);
			graphic.graphics.moveTo(-10000, 0);
			graphic.graphics.lineTo(10000, 0);

// Y
			graphic.graphics.lineStyle(2, Color.RED);
			graphic.graphics.moveTo(0, -10000);
			graphic.graphics.lineTo(0, 10000);

			addNode(graphic);
			addNode(new PhysicsDebug(space));
			addNode(orbit = new milkshake.core.Graphics());
			untyped window.ship = ship;
		}

	}

	function addPlanet():Void
	{
		//Add test planet
		planet = new Body(BodyType.KINEMATIC);
		var planetShape = new Circle(1200);
		planet.shapes.add(planetShape);
		planet.mass = 100;
		space.bodies.add(planet);
		//planet.position = new Vec2(Globals.SCREEN_CENTER.x - 200, Globals.SCREEN_HEIGHT + 800);

		var grass = Texture.fromImage("assets/images/textures/grass_side.png");
		var dirt = Texture.fromImage("assets/images/textures/dirt.png");

		addNode(planetDisplay = new scenes.planet.Planet(grass, dirt));
	}

	function createShip():Ship
	{
		var cockpit, engine, gun1, gun2, gun3, gun4, gun5;
		var ship = new ShipBuilder('andrews sick ship', space)
			.setCore(cockpit = new Cockpit())
			.addPart(engine = new Engine(), engine.getJointByType(Engine.BOTTOM_JOINT), cockpit.getJointByType(Cockpit.TOP_JOINT))
			.addPart(gun1 = new Gun(), gun1.getJointByType(Gun.TOP_JOINT), cockpit.getJointByType(Cockpit.BOTTOM_JOINT))
			.addPart(gun2 = new Gun(), gun2.getJointByType(Gun.TOP_JOINT), cockpit.getJointByType(Cockpit.LEFT_JOINT))
			.addPart(gun3 = new Gun(), gun3.getJointByType(Gun.TOP_JOINT), cockpit.getJointByType(Cockpit.RIGHT_JOINT))
			.addPart(gun4 = new Gun(), gun4.getJointByType(Gun.TOP_JOINT), gun3.getJointByType(Gun.BOTTOM_JOINT_LEFT))
			.addPart(gun5 = new Gun(), gun5.getJointByType(Gun.TOP_JOINT), gun2.getJointByType(Gun.BOTTOM_JOINT_RIGHT))
			.build();

		var descriptor = ShipBuilder.toDescriptor(ship);
		trace(Json.stringify(descriptor));

		return ship;
	}

	override public function update(delta:Float):Void
	{
		super.update(delta);

		var distance = Vector2.distance(Vector2.ZERO, ship.position);

		var inOrbit:Bool = false;
		if(distance > 1500 && distance < 2500)
		{
			inOrbit = true;
			var angle = Vector2.angle(Vector2.ZERO, ship.position);

			var targetAngle:Float = angle + milkshake.utils.MathHelper.toRadians(10);

			var targetPosition = new Vector2(Math.cos(targetAngle) * (distance), Math.sin(targetAngle) * (distance));

			var vector = new Vector2(targetPosition.x, targetPosition.y).sub(new Vector2(ship.position.x, ship.position.y)).devf(10);
			ship.core.body.velocity.x = vector.x;
			ship.core.body.velocity.y = vector.y;
		}

		space.step(1 / 24);

		if(Globals.DEBUG)
		{
			orbit.graphics.clear();
			orbit.graphics.lineStyle(2, Color.WHITE);
			orbit.graphics.drawCircle(0, 0, distance);

			orbit.graphics.lineStyle(2, Color.GREEN);

			if(inOrbit)
			{
				orbit.graphics.moveTo(0, 0);
				orbit.graphics.lineTo(ship.position.x, ship.position.y);
			}
		}
	}
}
