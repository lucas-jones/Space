package ship.part;

import milkshake.utils.MathHelper;
import milkshake.math.Vector2;
import pixi.core.textures.Texture;
import milkshake.core.Sprite;

class Bullet extends Sprite
{
	public static inline var SPEED:Float = 10;

	public function new()
	{
		super(Texture.fromFrame('laserRed01.png'), 'bullet');
	}

	override public function update(delta:Float):Void
	{
		position.add(Vector2.RADIAN(rotation + MathHelper.toRadians(90), SPEED));

		super.update(delta);
	}
}
