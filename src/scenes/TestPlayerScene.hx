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
import nape.geom.Geom;

class TestPlayerScene extends Scene
{
	private var player:Player;
	private var planet:Body;

	private var space:Space;
	private var followCam:FollowCamera;

	public function new()
	{
		super("TestPlayerScene", [ SpriteSheets.PLAYER ], SpaceCameraPresets.FOLLOW, Color.Blue);

		followCam = cast cameras.currentCamera;
		// followCam.targetZoom = 2.5;
		followCam.fixedRotation = false;//

		space = new Space(new Vec2(0, 0));
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
		planet = new Body(BodyType.KINEMATIC);
		var planetShape = new Circle(1200);
		var planetPos = new Vector2(Globals.SCREEN_CENTER.x, Globals.SCREEN_CENTER.y);
		planet.shapes.add(planetShape);
		planet.mass = 1;
		
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

		var b = new Vector2(Globals.SCREEN_CENTER.x, Globals.SCREEN_CENTER.y);
		var a = player.position;

		planetaryGravity(planet, 1 / 24);

		

		super.update(deltaTime);
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
                player.rotation = force.angle - milkshake.utils.MathHelper.toRadians(90);
                // We don't use a true description of gravity, as it doesn't 'play' as nice.
                force.length = 10;

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
