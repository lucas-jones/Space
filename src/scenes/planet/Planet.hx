package scenes.planet;

import milkshake.core.DisplayObject;
import milkshake.core.Sprite;
import milkshake.math.Vector2;
import milkshake.utils.Color;
import milkshake.utils.Globals;
import milkshake.utils.MathHelper;
import pixi.core.textures.Texture;
import scenes.planet.Slice;
import scenes.polygon.Polygon;
import scenes.polygon.SmartPolygon;
import nape.phys.BodyType;
import nape.phys.Body;
import nape.shape.Circle;
import nape.geom.Vec2;
import nape.space.Space;

import milkshake.utils.Random;

typedef PlanetType =
{
	var bushes:Array<String>;
	var clouds:Array<String>;
	var trees:Array<String>;
	var crust:Texture;
	var core:Texture;
}

class Planet extends DisplayObject
{
	public static var TREE_ASSETS = [
		"assets/images/backgrounds/tree01.png",
		"assets/images/backgrounds/tree02.png",
		"assets/images/backgrounds/tree03.png",
		"assets/images/backgrounds/tree05.png",
		"assets/images/backgrounds/tree07.png",
		"assets/images/backgrounds/tree08.png",
		"assets/images/backgrounds/tree10.png",
		"assets/images/backgrounds/tree11.png",
		"assets/images/backgrounds/tree13.png",
		"assets/images/backgrounds/tree14.png",
		"assets/images/backgrounds/tree20.png",
		"assets/images/backgrounds/tree21.png"
	];

	public static var SNOW_TREE_ASSETS = [
		"assets/images/backgrounds/tree04.png",
		"assets/images/backgrounds/tree6.png",
		"assets/images/backgrounds/tree12.png",
		"assets/images/backgrounds/tree15.png",
		"assets/images/backgrounds/tree29.png",
		"assets/images/backgrounds/tree33.png",
		"assets/images/backgrounds/tree35.png",
	];

	public static var CLOUD_ASSETS = [
		"assets/images/backgrounds/cloud1.png",
		"assets/images/backgrounds/cloud2.png",
		"assets/images/backgrounds/cloud3.png",
		"assets/images/backgrounds/cloud4.png",
		"assets/images/backgrounds/cloud5.png",
		"assets/images/backgrounds/cloud6.png",
		"assets/images/backgrounds/cloud7.png",
		"assets/images/backgrounds/cloud8.png",
		"assets/images/backgrounds/cloud9png",
	];

	public static var BUSH_ASSETS = [
		"assets/images/backgrounds/grass1.png",
		"assets/images/backgrounds/grass2.png",
		"assets/images/backgrounds/grass3.png",
		"assets/images/backgrounds/grass4.png",
		"assets/images/backgrounds/grass5.png",
		"assets/images/backgrounds/grass6.png"
	];

	public static var SNOW_PLANET:PlanetType =
	{
		bushes: BUSH_ASSETS,
		clouds: CLOUD_ASSETS,
		trees: SNOW_TREE_ASSETS,
		crust: Texture.fromImage("assets/images/tundra.png"),
		core: Texture.fromImage("assets/images/ice.png"),
	}

	public static var GRASS_PLANET:PlanetType =
	{
		bushes: BUSH_ASSETS,
		clouds: CLOUD_ASSETS,
		trees: TREE_ASSETS,
		crust: Texture.fromImage("assets/images/grass.png"),
		core: Texture.fromImage("assets/images/dirt.png"),
	}

	var crust:Slice;
	var crustPolygon:Polygon;
	var corePolygon:SmartPolygon;

	var clouds:DisplayObject;

	var sky:scenes.planet.PlanetSky;
	var sun:scenes.planet.PlanetSky;

	public var moon:Moon;
	var moonContainer:DisplayObject;
	public var moonBody:Body;

	public var size(default, null):Float;

	public function new(type:PlanetType, size:Float = 1200, hasMoon = false)
	{
		super();

		this.size = size;

		addNode(sky = new scenes.planet.PlanetSky("assets/images/sky.png", size - 10));
		addNode(sun = new scenes.planet.PlanetSky("assets/images/sky_set3.png", size - 10));

		for(x in 0 ... 40)
		{
			addNode(addDecoration(new Sprite(Texture.fromImage(Random.fromArray(type.trees))), Random.float(0, 360), size - 5));
		}

		for(x in 0 ... 20)
		{
			addNode(addDecoration(new Sprite(Texture.fromImage(Random.fromArray(type.bushes))), Random.float(0, 360), size - 5));
		}

		addNode(clouds = new DisplayObject());

		for(x in 0 ... 20)
		{
			clouds.addNode(addDecoration(new Sprite(Texture.fromImage(Random.fromArray(type.clouds))), Random.float(0, 360), size + 500));
		}

		crust = new Slice(null, 0, 360, size);

		crust.slice();
		crust.slice();
		crust.slice();
		crust.slice();
		crust.slice();
		crust.slice();

		var verts = crust.generatePolygon([]);
		var uvs = crust.generateUV([]);
		var indicies = crust.generateIndicies([]);
		addNode(crustPolygon = new Polygon(type.crust, verts, uvs, indicies));

		var coreVerts = crust.generateUnderbelly([]);
		addNode(corePolygon = new SmartPolygon(type.core, coreVerts, 4, SmartPolygon.QUAD_INDICE(), 1, SmartPolygon.PATTERN_UV(1)));

		// if(Globals.DEBUG)
		// {
		// 	var graphic = new milkshake.core.Graphics();
		// 	graphic.graphics.lineStyle(2, Color.Red, 1);
		// 	graphic.graphics.beginFill(0xFF0000, 0.2);
		// 	graphic.graphics.drawCircle(0, 0, 1500);
		// 	addNode(graphic);

		// 	var graphic = new milkshake.core.Graphics();
		// 	graphic.graphics.lineStyle(2, 0xffa500, 1);
		// 	graphic.graphics.beginFill(0xffa500, 0.2);
		// 	graphic.graphics.drawCircle(0, 0, 2500);
		// 	addNode(graphic);
		// }

		if(hasMoon)
		{
			addNode(moonContainer = new DisplayObject());
			var moon:Moon;
			moonContainer.addNode(moon = new Moon(500));
			moon.position = Vector2.RADIAN(Random.float(0, 360), size + 1500);

			moonBody = new Body(BodyType.KINEMATIC);
			var shape = new Circle(size);
			moonBody.shapes.add(shape);
			moonBody.mass = 1;
			moonBody.position = new nape.geom.Vec2(moon.position.x, moon.position.y);
		}
	}

	function addDecoration(sprite:Sprite, angle:Float, offset:Float = 1196):Sprite
	{
		sprite.position = Vector2.RADIAN(angle, offset);
		sprite.rotation = angle + MathHelper.toRadians(90);
		sprite.pivot = new Vector2(0.5, 1);
		sprite.anchor = new Vector2(0.5, 1);

		return sprite;
	}

	var time:Float = 0;
	override public function update(deltaTime:Float):Void
	{
		super.update(deltaTime);

		time += deltaTime;

		sky.alpha = 1 + Math.sin(time / 2000);
		sun.alpha = 1 - (1 + Math.sin(time / 2000));
		// trace(time + " " + sky.alpha);
		// sun.alpha = 0;//Math.cos(deltaTime) + 0.5;

		clouds.rotation += milkshake.utils.MathHelper.toRadians(0.01);

		if(moon != null)
		{
			moon.rotation += milkshake.utils.MathHelper.toRadians(0.01);
		}
	}
}
