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
			anchor: Vector2.HALF,
			position: new Vector2(Globals.SCREEN_CENTER.x, Globals.SCREEN_CENTER.y)
		});

		followCam.target = ship;

		addPlanet();

		if(Globals.DEBUG)
		{
			addNode(new PhysicsDebug(space));
			untyped window.ship = ship;
		}
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

		planet.rotation += 0.003;

		planetDisplay.position.x = planet.position.x;
		planetDisplay.position.y = planet.position.y;
		planetDisplay.rotation = planet.rotation;
	}
}
