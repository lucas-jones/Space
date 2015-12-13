package scenes.polygon;

import milkshake.math.Vector2;
import pixi.core.textures.Texture;
import scenes.polygon.Polygon;

class SmartPolygon extends Polygon
{
	public static function PATTERN_UV(scale:Float = 1):Int->Array<Vector2>->Array<Vector2>
	{
		return function(index:Int, vertices:Array<Vector2>)
		{
			return [ vertices[0].clone().devf(scale) ];
		};
	}

	public static function QUAD_INDICE():Int->Array<Vector2>->Array<Int>
	{
		return function(index, verts)
		{
			return [
				index,
				index + 1,
				index + 2,

				index + 2,
				index + 3,
				index + 0
			];
		};
	}

	public function new(texture:Texture, vertices:Array<Vector2>, indiceSize:Int, indiceBuilder:Int->Array<Vector2>->Array<Int>, uvSize:Int, uvBuilder:Int->Array<Vector2>->Array<Vector2>)
	{
		super(texture, vertices, [], []);

		var _indices = [];

		for(index in 0 ... Math.floor(vertices.length / indiceSize))
		{
			var out = [];
			for(offet in 0 ... indiceSize)
			{
				out.push(vertices[index + offet]);
			}

			_indices = _indices.concat(indiceBuilder(index * indiceSize, out));
		}

		var _uvs = [];

		for(index in 0 ... Math.floor(vertices.length / uvSize))
		{
			var out = [];
			for(offet in 0 ... uvSize)
			{
				out.push(vertices[index + offet]);
			}

			_uvs = _uvs.concat(uvBuilder(index * uvSize, out));
		}

		this.set_indices(_indices);
		this.set_uvs(_uvs);
	}
}