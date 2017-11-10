package scenes;

import player.Player;
import milkshake.core.Graphics;
import haxe.Json;
import milkshake.utils.MathHelper;
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
import milkshake.components.input.Input;
import milkshake.components.input.Key;
import nape.geom.Geom;

using utils.PhysicsUtils;

class TestShipScene extends Scene
{
	private var ship:Ship;
	private var followCam:FollowCamera;
	private var space:Space;

	private var planetDisplay:Planet;
	private var planets:Array<Body>;
	private var player:Player;

	private var orbit:Graphics;

	private var input:Input;

	public function new()
	{
		super("TestShipScene", [ "assets/images/dino/stars.png", SpriteSheets.SHIPPARTS, SpriteSheets.LASERS, SpriteSheets.PLAYER], SpaceCameraPresets.FOLLOW, Color.Blue);

		followCam = cast cameras.currentCamera;
		followCam.targetZoom = 1.5;

		space = new Space(new Vec2(0, 0));

		input = new Input();

		planets = [];
	}
	var sky:Graphics;
	override public function create():Void
	{
		addNode(new Background(Texture.fromImage("assets/images/backgrounds/darkPurple.png")));

		addNode(sky = milkshake.utils.GraphicsHelper.generateRectangle(100000, 100000, Color.SkyBlue, true));



		addPlanet(new Vector2(0, 3000));
		addPlanet(new Vector2(0, -3000), true);

		ship = ShipBuilder.fromDescriptor(Json.parse(CompileTime.readFile("assets/ships/andrews_sick_ship.json")), space);

		addNode(ship,
		{
			position: new Vector2(-2000, -3000),
			anchor: Vector2.HALF
		});

		followCam.target = ship;
		followCam.zoom = 0.5;

		if(Globals.DEBUG)
		{
			var graphic = new milkshake.core.Graphics();

			// X
			graphic.graphics.lineStyle(2, Color.Red);
			graphic.graphics.moveTo(-10000, 0);
			graphic.graphics.lineTo(10000, 0);

			// Y
			graphic.graphics.lineStyle(2, Color.Red);
			graphic.graphics.moveTo(0, -10000);
			graphic.graphics.lineTo(0, 10000);

			addNode(graphic);
			addNode(new PhysicsDebug(space));
			
			untyped window.ship = ship;
		}

		addNode(orbit = new milkshake.core.Graphics());
	}

	function addPlanet(position:Vector2, snow:Bool = false)
	{
		var grass = snow ? Texture.fromImage("assets/images/tundra.png") : Texture.fromImage("assets/images/grass.png");
		var dirt = snow ? Texture.fromImage("assets/images/ice.png") : Texture.fromImage("assets/images/dirt.png");

		addNode(new Planet(grass, dirt, snow),
		{
			position: position
		});

		var planet = new Body(BodyType.KINEMATIC);
		var planetShape = new Circle(1200);
		planet.shapes.add(planetShape);
		planet.mass = 1;

		planet.position = new nape.geom.Vec2(position.x, position.y);
		space.bodies.add(planet);

		planets.push(planet);

		return planet;
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

		return ship;
	}
	var playerLaunched:Bool = false;
	override public function update(delta:Float):Void
	{
		super.update(delta);

		planets.sort(function(a:Body, b:Body)
		{
			var aValue = Vector2.distance(a.position.toVector2(), followCam.target.position);
			var bValue = Vector2.distance(b.position.toVector2(), followCam.target.position);

			return (aValue > bValue) ? 1 : -1;
		});

		

		var distance = Vector2.distance(planets[0].position.toVector2(), followCam.target.position);
		sky.alpha = 0;
		// sky.alpha = MathHelper.clamp(MathHelper.map(1535, 2000, 1, 0, distance), 0, 1);
	
		// if(player == null)
		// {
			followCam.zoom = (distance > 2000) ? 0.25 : (player == null) ? 0.5 : 1;
		// }
		

		input.update(delta);

		if(input.isDown(Key.P) && playerLaunched == false)
		{
			followCam.fixedRotation = false;//

			addNode(player = new Player(space),
			{
				position: ship.position
			});

			followCam.target = player;
			followCam.zoom = 1.5;

			playerLaunched = true;
		}

		space.step(1 / 24);

		orbit.graphics.clear();

		planetaryGravity(planets[0], 1 / 24);

		for(planet in planets) {
			

			orbit.graphics.lineStyle(2, Color.White);
			// orbit.graphics.drawCircle(planet.position.x, planet.position.y, 2000);

			if(distance > 2000)
			{
				orbit.graphics.moveTo(planet.position.x, planet.position.y);
				orbit.graphics.lineTo(followCam.target.x, followCam.target.y);
			}
		}
	}

	private function planetaryGravity(planet:Body, deltaTime:Float):Void
	{
			// Apply a gravitational impulse to all bodies
			// pulling them to the closest point of a planetary body.
			//
			// Because this is a constantly applied impulse, whose value depends
			// only on the positions of the objects, we can set the 'sleepable'
			// of applyImpulse to be true and permit these bodies to still go to
			// sleep.
			//
			// Applying a 'sleepable' impulse to a sleeping Body has no effect
			// so we may as well simply iterate over the non-sleeping bodies.
			var closestA:Vec2 = Vec2.get();
			var closestB:Vec2 = Vec2.get();

			for(body in space.liveBodies)
			{
				// Find closest points between bodies.



				var distance:Float = Geom.distanceBody(planet, body, closestA, closestB);

				// Cut gravity off, well before distance threshold.
				// if (distance > 100) {
				//     continue;
				// }

				// Gravitational force.
				var force:Vec2 = closestA.sub(body.position, true);
				var distance = Vector2.distance(new Vector2(planet.position.x, planet.position.y), followCam.target.position);
				if(player != null && body == player.body) player.rotation = force.angle - milkshake.utils.MathHelper.toRadians(90);
				// We don't use a true description of gravity, as it doesn't 'play' as nice.
				force.length = 20 * MathHelper.clamp(MathHelper.map(1535, 2000, 1, 0, distance), 0, 1);

				// Impulse to be applied = force * deltaTime
				body.applyImpulse(
					/*impulse*/ force.muleq(deltaTime),
					/*position*/ null, // implies body.position
					/*sleepable*/ true
				);
			}

			closestA.dispose();
			closestB.dispose();
    }
}
