package scenes;

import milkshake.core.Sprite;
import milkshake.math.Vector2;
import pixi.core.textures.Texture;

class Background extends Sprite
{
	public function new(texture:Texture, id:String="background")
	{
		super(texture, id);

		//Quick hack to override sprite set in super.
		displayObject.removeChild(sprite);

		displayObject.addChild(sprite = new pixi.extras.TilingSprite(texture, 0xFFFFFF, 0xFFFFFF));
		this.position = Vector2.EQUAL(-0xFFFFFF / 2);
	}
}
