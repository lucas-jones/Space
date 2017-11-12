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

class Moon extends DisplayObject
{
	var crust:Slice;
	var crustPolygon:Polygon;
	var corePolygon:SmartPolygon;

	public var size(default, null):Float;
	public var angle:Float;

	public function new(size:Float = 500)
	{
		super();

		this.size = size;

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
		addNode(crustPolygon = new Polygon(Texture.fromImage("assets/images/moon_surface.png"), verts, uvs, indicies));

		var coreVerts = crust.generateUnderbelly([]);
		addNode(corePolygon = new SmartPolygon(Texture.fromImage("assets/images/moon.png"), coreVerts, 4, SmartPolygon.QUAD_INDICE(), 1, SmartPolygon.PATTERN_UV(1)));

		angle = Random.float(0, 360);

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

	override public function update(deltaTime:Float):Void
	{
		super.update(deltaTime);
	}
}
