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

		untyped window.ship = ship;

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

		// if(Globals.DEBUG)
		// {
		// 	addNode(new PhysicsDebug(space));
		// 	untyped window.ship = ship;
		// }

		orbit = new milkshake.core.Graphics();
		addNode(orbit);
	}

	var orbit:milkshake.core.Graphics;

	function addPlanet():Void
	{
		//Add test planet
		// planet = new Body(BodyType.KINEMATIC);

		// var planetShape = new Circle(1200);
		// planet.shapes.add(planetShape);
		// planet.mass = 100;
		// space.bodies.add(planet);
		// planet.position = new Vec2(Globals.SCREEN_CENTER.x - 200, Globals.SCREEN_HEIGHT + 800);

		var grass = Texture.fromImage("assets/images/textures/grass_side.png");
		var dirt = Texture.fromImage("assets/images/textures/dirt.png");

		
		addNode(planetDisplay = new scenes.planet.Planet(grass, dirt));


	}
	var apple:Bool = false;
	override public function update(delta:Float):Void
	{
		var distance = Vector2.distance(Vector2.ZERO, ship.position);

		var inOrbit:Bool = false;
		if(distance > 1500 && distance < 2500)
		{
			inOrbit = true;
			var angle = Vector2.angle(Vector2.ZERO, ship.position);

			var targetAngle:Float = angle + milkshake.utils.MathHelper.toRadians(10);

			// trace(targetAngle);

			var targetPosition = new Vector2(Math.cos(targetAngle) * (distance), Math.sin(targetAngle) * (distance));
			// ship.core.body.space = null;
			if(apple == false)
			{
				// ship.core.body.position.x = targetPosition.x;
				// ship.core.body.position.y = targetPosition.y;

				apple = true;
			}
			else
			{
				//if(input)
				//{
					var vector = new Vector2(targetPosition.x, targetPosition.y).sub(new Vector2(ship.position.x, ship.position.y)).devf(10);
					ship.core.body.velocity.x = vector.x;
					ship.core.body.velocity.y = vector.y;
				//}
			}
		}

		// planetDisplay.position.x = planet.position.x;
		// planetDisplay.position.y = planet.position.y;
		// planetDisplay.rotation = planet.rotation;

		super.update(delta);

		space.step(1 / 24);

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
