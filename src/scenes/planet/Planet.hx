package scenes.planet;

import milkshake.core.DisplayObject;
import milkshake.utils.Color;
import scenes.planet.Slice;
import pixi.core.textures.Texture;
import scenes.polygon.Polygon;
import scenes.polygon.SmartPolygon;

class Planet extends DisplayObject
{
	var crust:Slice;
	var crustPolygon:Polygon;
	var corePolygon:SmartPolygon;

	public function new(crustTexture:Texture, coreTexture:Texture)
	{
		super();

		crust = new Slice();

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
		addNode(corePolygon = new SmartPolygon(coreTexture, coreVerts, 4, SmartPolygon.QUAD_INDICE(), 1, SmartPolygon.PATTERN_UV(50)));


		var graphic = new milkshake.core.Graphics();
		graphic.graphics.lineStyle(2, Color.RED, 1);
		graphic.graphics.beginFill(0xFF0000, 0.2);
		graphic.graphics.drawCircle(0, 0, 1500);
		addNode(graphic);

		var graphic = new milkshake.core.Graphics();
		graphic.graphics.lineStyle(2, 0xffa500, 1);
		graphic.graphics.beginFill(0xffa500, 0.2);
		graphic.graphics.drawCircle(0, 0, 2500);
		addNode(graphic);
	}
}
