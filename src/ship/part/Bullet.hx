package ship.part;

import milkshake.math.Vector2;
import pixi.core.textures.Texture;
import milkshake.core.Sprite;

class Bullet extends Sprite
{
	public function new()
	{
		super(Texture.fromFrame('laserBlue01.png'), 'bullet');
	}

	override public function update(delta:Float):Void
	{
		position = new Vector2(position.x, position.y + 20);
		super.update(delta);
	}
}
