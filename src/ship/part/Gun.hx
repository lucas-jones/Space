package ship.part;

import milkshake.math.GUID;
import milkshake.core.Sprite;
import pixi.core.textures.Texture;
import haxe.Timer;
import milkshake.math.Vector2;
import ship.part.joint.Joint;

class Gun extends ShipPart
{
	public static inline var TOP_JOINT:String = 'gun_top';
	public static inline var BOTTOM_JOINT_LEFT:String = 'gun_bottom_left';
	public static inline var BOTTOM_JOINT_RIGHT:String = 'gun_bottom_right';

	private var bullets:Array<Bullet>;

	public function new(?id:String)
	{
		super('gun', id != null ? id : GUID.short(),
		[
			new Joint(TOP_JOINT, new Vector2(0, -18)),
			new Joint(BOTTOM_JOINT_LEFT, new Vector2(-8, 18), 90),
			new Joint(BOTTOM_JOINT_RIGHT, new Vector2(8, 18), -90)
		]);

		var texture = Texture.fromFrame('gun00.png');
		addNode(sprite = new Sprite(texture), { anchor: new Vector2(0.5, 0.5) });
		addShapeFromTexture(texture);

		bullets = [];
	}

	private function createBullet():Void
	{
		var bullet = new Bullet();

		parent.addNode(bullet,
		{
			position: new Vector2(body.position.x, body.position.y),
			rotation: body.rotation
		});

		bullets.push(bullet);

		Timer.delay(function():Void
		{
			removeNode(bullet);
			bullets.remove(bullet);
		}, 5000);
	}

	override public function update(delta:Float):Void
	{
		if(active)
		{
			if(milk.input.isDown(32))
			{
				createBullet();
			}
		}

		super.update(delta);
	}
}
