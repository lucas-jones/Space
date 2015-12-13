package scenes.polygon;

import js.html.Float32Array;
import js.html.Int16Array;
import milkshake.math.Vector2;
import pixi.core.textures.Texture;
import pixi.mesh.Mesh;

class Polygon extends milkshake.core.DisplayObject
{
	@:isVar public var vertices:Array<Vector2>;
	@:isVar public var uvs:Array<Vector2>;
	@:isVar public var indices:Array<Int>;
	
	var mesh:Mesh;

	public static function flattern(value:Array<Vector2>):Array<Float>
	{
		var output = [];

		for(a in value)
		{
			output.push(a.x);
			output.push(a.y);
		}

		return output;
	}

	function get_vertices():Array<Vector2>
	{
		return vertices;
	}

	function get_uvs():Array<Vector2>
	{
		return uvs;
	}

	function get_indices():Array<Int>
	{
		return indices;
	}

	function set_vertices(value:Array<Vector2>):Array<Vector2>
	{
		vertices = value;

		mesh.vertices = new Float32Array(flattern(vertices));

		return vertices;
	}

	function set_uvs(value:Array<Vector2>):Array<Vector2>
	{
		uvs = value;

		mesh.uvs = new Float32Array(flattern(uvs));

		return uvs;
	}

	function set_indices(value:Array<Int>):Array<Int>
	{
		indices = value;

		mesh.indices = new Int16Array(indices);

		return indices;
	}


	public function new(texture:Texture, ?vertices:Array<Vector2>, ?uvs:Array<Vector2>, ?indices:Array<Int>)
	{
		super();

		mesh = new Mesh(texture,
			new Float32Array([]),
			new Float32Array([]),
			new Int16Array([]), 0);

		// 0 = MESH
		// 1 = TRIANGLES

		set_uvs(uvs);
		set_vertices(vertices);
		set_indices(indices);

		mesh.dirty = true;

		this.displayObject.addChild(mesh);
	}
}