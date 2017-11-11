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

import milkshake.utils.Random;

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

	public static var GRASS_ASSETS = [
		"assets/images/backgrounds/grass1.png",
		"assets/images/backgrounds/grass2.png",
		"assets/images/backgrounds/grass3.png",
		"assets/images/backgrounds/grass4.png",
		"assets/images/backgrounds/grass5.png",
		"assets/images/backgrounds/grass6.png"
	];

	var crust:Slice;
	var crustPolygon:Polygon;
	var corePolygon:SmartPolygon;

	var clouds:DisplayObject;

	var sky:scenes.planet.PlanetSky;
	var sun:scenes.planet.PlanetSky;

	var size:Float;

	public function new(crustTexture:Texture, coreTexture:Texture, snow:Bool = true, size:Float = 200)
	{
		super();

		this.size = size;

		addNode(sky = new scenes.planet.PlanetSky("assets/images/sky.png"));
		addNode(sun = new scenes.planet.PlanetSky("assets/images/sky_set3.png"));

		for(x in 0 ... 40)
		{
			addNode(addDecoration(new Sprite(Texture.fromImage(Random.fromArray(snow ? SNOW_TREE_ASSETS : TREE_ASSETS))), Random.float(0, 360)));
		}

		for(x in 0 ... 20)
		{
			addNode(addDecoration(new Sprite(Texture.fromImage(Random.fromArray(GRASS_ASSETS))), Random.float(0, 360)));
		}

		addNode(clouds = new DisplayObject());
		
		for(x in 0 ... 20)
		{
			clouds.addNode(addDecoration(new Sprite(Texture.fromImage(Random.fromArray(CLOUD_ASSETS))), Random.float(0, 360), 1700));
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
		addNode(crustPolygon = new Polygon(crustTexture, verts, uvs, indicies));

		var coreVerts = crust.generateUnderbelly([]);
		addNode(corePolygon = new SmartPolygon(coreTexture, coreVerts, 4, SmartPolygon.QUAD_INDICE(), 1, SmartPolygon.PATTERN_UV(1)));

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
	}

	function addDecoration(sprite:Sprite, angle:Float, offset:Float = 1196):Sprite
	{
		sprite.position = Vector2.RADIAN(angle, size);
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
	}
}
