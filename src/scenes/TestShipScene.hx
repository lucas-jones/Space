package scenes;

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
import ship.ShipBuilder;
import ship.Ship;
import milkshake.math.Vector2;
import milkshake.utils.Globals;
import milkshake.core.Sprite;
import pixi.core.textures.Texture;
import milkshake.assets.SpriteSheets;
import milkshake.utils.Color;
import milkshake.game.scene.Scene;

class TestShipScene extends Scene
{
	private var ship:Ship;

	private var planetDisplay:Planet;
	private var planet:Body;

	private var space:Space;

	private var followCam:FollowCamera;

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

		var cockpit, engine, gun1, gun2, gun3, gun4, gun5;
		ship = new ShipBuilder('andrews sick ship', space)
			.setCore(cockpit = new Cockpit())
			.addPart(engine = new Engine(), engine.getJointByType(Engine.BOTTOM_JOINT).id, cockpit.getJointByType(Cockpit.TOP_JOINT).id)
			.addPart(gun1 = new Gun(), gun1.getJointByType(Gun.TOP_JOINT).id, cockpit.getJointByType(Cockpit.BOTTOM_JOINT).id)
			.addPart(gun2 = new Gun(), gun2.getJointByType(Gun.TOP_JOINT).id, cockpit.getJointByType(Cockpit.LEFT_JOINT).id)
			.addPart(gun3 = new Gun(), gun3.getJointByType(Gun.TOP_JOINT).id, cockpit.getJointByType(Cockpit.RIGHT_JOINT).id)
			.addPart(gun4 = new Gun(), gun4.getJointByType(Gun.TOP_JOINT).id, gun3.getJointByType(Gun.BOTTOM_JOINT_LEFT).id)
			.addPart(gun5 = new Gun(), gun5.getJointByType(Gun.TOP_JOINT).id, gun2.getJointByType(Gun.BOTTOM_JOINT_RIGHT).id)
			.build();

		addNode(ship,
		{
			position: new Vector2(2800, 0),
			anchor: Vector2.HALF,
		});



		followCam.target = ship;

		addPlanet();

		if(Globals.DEBUG)
		{
			addNode(new PhysicsDebug(space));
			untyped window.ship = ship;
		}
		samplePoint = new Body();
        samplePoint.shapes.add(new Circle(0.001));


		untyped window.ship = ship;
	}

	function addPlanet():Void
	{
		//Add test planet
		planet = new Body(BodyType.KINEMATIC);
		var planetShape = new Circle(1200);
		planet.shapes.add(planetShape);
		planet.mass = 100;
		space.bodies.add(planet);
		// planet.position = new Vec2(Globals.SCREEN_CENTER.x - 200, Globals.SCREEN_HEIGHT + 800);

		var grass = Texture.fromImage("assets/images/textures/grass_side.png");
		var dirt = Texture.fromImage("assets/images/textures/dirt.png");

		addNode(planetDisplay = new scenes.planet.Planet(grass, dirt));
	}

	override public function update(delta:Float):Void
	{
		super.update(delta);

		space.step(1 / 24);
		planetaryGravity(planet, 1 / 24);
		// planet.rotation += 0.003;

		planetDisplay.position.x = planet.position.x;
		planetDisplay.position.y = planet.position.y;
		planetDisplay.rotation = planet.rotation;
	}


	private var samplePoint:Body;

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

			for (i in 0 ... space.liveBodies.length)
			{
				var body:Body = space.liveBodies.at(i);
				// Find closest points between bodies.
				samplePoint.position.set(body.position);
				var distance:Float = nape.geom.Geom.distanceBody(planet, samplePoint, closestA, closestB);

				// Cut gravity off, well before distance threshold.
				// if (distance > 100) {
				// 	continue;
				// }

				// Gravitational force.
				var force:Vec2 = closestA.sub(body.position, true);

				// We don't use a true description of gravity, as it doesn't 'play' as nice.
				force.length = body.mass * 1e6 / (distance * distance);

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
