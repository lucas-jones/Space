package scenes.planet;

import scenes.polygon.SmartPolygon;
import milkshake.math.Vector2;
import milkshake.core.DisplayObject;
import pixi.core.textures.Texture;

class PlanetSky extends DisplayObject
{
    public static function QUAD_INDICE():Int->Array<Vector2>->Array<Int>
	{
		return function(index, verts)
		{
			var res =  [
				index,
				index + 1,
				index + 2,

                index + 1,
				index + 2,
				index + 3
			];
            // 0 - top left
            // 1 - bottom left
            // 2 - top right
            // 3 - bottom right
            // res.reverse();

            return res;
		};
	}


    public static function PATTERN_UV(scale:Float = 1):Int->Array<Vector2>->Array<Vector2>
	{
		return function(index:Int, vertices:Array<Vector2>)
		{
			return [ new Vector2(index / 360, 0.01), new Vector2(index / 360, 1) ];
		};
	}

    public function new(texture:String, size:Float, height:Float = 950)
    {
        super();

        var verts:Array<Vector2> = [];
        var uvs:Array<Vector2> = [];
        var indicies:Array<Int> = [];

        for(x in 0 ... 360)
        {
            
            verts.push(Vector2.RADIAN(milkshake.utils.MathHelper.toRadians(x), size + height));
            verts.push(Vector2.RADIAN(milkshake.utils.MathHelper.toRadians(x), size));

            uvs.push(Vector2.ONE);
            uvs.push(Vector2.ONE);
        }

        var texture = Texture.fromImage(texture);

        var polygon:SmartPolygon = new SmartPolygon(texture, verts, 4, QUAD_INDICE(), 2, PATTERN_UV(10));
        alpha = 0.9;
        addNode(polygon);
        
    }

    
}

