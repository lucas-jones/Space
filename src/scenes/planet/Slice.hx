package scenes.planet;

import milkshake.math.Vector2;
import milkshake.utils.MathHelper;

class Slice 
{
	public var parent(default, null):Slice;

	public var childA(default, null):Slice;
	public var childB(default, null):Slice;

	public var minX(default, null):Float;
	public var maxX(default, null):Float;

	public var isSliced(default, null):Bool;
	public var splits(default, null):Int;

	public var height(default, null):Float;
	public var crustHeight(default, null):Float;
	

	public function new(?parent:Slice, minX:Float = 0, maxX:Float = 360, height:Float = 1200, crustHeight:Float = 50)
	{
		this.parent = parent;

		this.minX = minX;
		this.maxX = maxX;

		this.height = height;
		this.crustHeight = crustHeight;

		this.isSliced = false;
		this.splits = 0;
	}

	public function slice()
	{
		if(isSliced)
		{
			childA.slice();
			childB.slice();
		}
		else
		{
			var width = maxX - minX;			
			childA = new Slice(this, minX, minX + (width / 2), height, crustHeight);
			childB = new Slice(this, minX + (width / 2), maxX, height, crustHeight);

			isSliced = true;			
		}

		splits++;
	}

	public function unslice()
	{
		if(isSliced)
		{
			childA.unslice();
			childB.unslice();
		}
		else
		{
			childA = null;
			childB = null;

			isSliced = false;

			if(parent != null) parent.isSliced = false;
		}

		splits--;
	}

	public function generatePolygon(polygon:Array<Vector2>, scale:Float = 1):Array<Vector2>
	{
		if(isSliced)
		{
			childA.generatePolygon(polygon, scale);
			childB.generatePolygon(polygon, scale);
		}
		else
		{
			var left:Float = 0;
			var right:Float = 0;

			//left = TestScene.perlin.noise2d(minX / 40, 0, 1, 3, 0) * 30;
			//right = TestScene.perlin.noise2d(maxX / 40, 0, 1, 3, 0) * 30;

			var lower = height - crustHeight;
			var topLeft = new Vector2(Math.cos(MathHelper.toRadians(minX)) * (height + left), Math.sin(MathHelper.toRadians(minX)) * (height + left));
			var topRight = new Vector2(Math.cos(MathHelper.toRadians(maxX)) * (height + right), Math.sin(MathHelper.toRadians(maxX)) * (height + right));
			var bottomRight = new Vector2(Math.cos(MathHelper.toRadians(maxX)) * (lower + right), Math.sin(MathHelper.toRadians(maxX)) * (lower + right));
			var bottomLeft = new Vector2(Math.cos(MathHelper.toRadians(minX)) * (lower + left), Math.sin(MathHelper.toRadians(minX)) * (lower + left));

			polygon.push(new Vector2(topLeft.x, topLeft.y));
			polygon.push(new Vector2(topRight.x, topRight.y));
			polygon.push(new Vector2(bottomRight.x, bottomRight.y));
			polygon.push(new Vector2(bottomLeft.x, bottomLeft.y));
		}

		return polygon;
	}


	public function generateUnderbelly(polygon:Array<Vector2>, scale:Float = 1):Array<Vector2>
	{
		if(isSliced)
		{
			childA.generateUnderbelly(polygon, scale);
			childB.generateUnderbelly(polygon, scale);
		}
		else
		{
			var width = maxX - minX *	 scale;

			var left:Float = 0;
			var right:Float = 0;

			// left = TestScene.perlin.noise2d(minX / 40, 0, 1, 3, 0) * 30;
			// right = TestScene.perlin.noise2d(maxX / 40, 0, 1, 3, 0) * 30;

			var lower = height - crustHeight;
			var bottomRight = new Vector2(Math.cos(MathHelper.toRadians(maxX)) * (lower + right), Math.sin(MathHelper.toRadians(maxX)) * (lower + right));
			var bottomLeft = new Vector2(Math.cos(MathHelper.toRadians(minX)) * (lower + left), Math.sin(MathHelper.toRadians(minX)) * (lower + left));
			
			polygon.push(new Vector2(bottomLeft.x, bottomLeft.y));
			polygon.push(new Vector2(bottomRight.x, bottomRight.y));
			polygon.push(Vector2.ZERO);
		}

		return polygon;
	}

	public function generateUV(uv:Array<Vector2>)
	{
		if(isSliced)
		{
			childA.generateUV(uv);
			childB.generateUV(uv);
		}
		else
		{
			var ulti = 3; //5

			var x = minX / ulti;
			var length = (maxX - minX) / ulti;

			uv.push(new Vector2(x, 0));
			uv.push(new Vector2(x + length, 0));
			uv.push(new Vector2(x + length, 1));
			uv.push(new Vector2(x, 1));
		}

		return uv;
	}

	static var indexCache:Int = 0;
	public function generateIndicies(indicies:Array<Int>)
	{
		if(isSliced)
		{
			childA.generateIndicies(indicies);
			childB.generateIndicies(indicies);
		}
		else
		{
			var index = Math.floor(indicies.length / 6) * 4;

			indicies.push(index + 0);
			indicies.push(index + 1);
			indicies.push(index + 2);
			indicies.push(index + 3);
			indicies.push(index + 0);
			indicies.push(index + 2);
		}

		return indicies;
	}
}