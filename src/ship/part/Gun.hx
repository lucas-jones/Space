package ship.part;

import haxe.Timer;
import milkshake.components.input.Input;
import milkshake.math.Vector2;
import ship.part.joint.Joint;

class Gun extends ShipPart
{
	public static inline var TOP_JOINT:String = 'gun_top';
	public static inline var BOTTOM_JOINT_LEFT:String = 'gun_bottom_left';
	public static inline var BOTTOM_JOINT_RIGHT:String = 'gun_bottom_right';

	private var input:Input;

	private var bullets:Array<Bullet>;

	public function new()
	{
		super('gun', 'gun00.png',
		[
			new Joint(TOP_JOINT, new Vector2(0, -18)),
			new Joint(BOTTOM_JOINT_LEFT, new Vector2(-8, 18), 90),
			new Joint(BOTTOM_JOINT_RIGHT, new Vector2(8, 18), -90)
		]);

		input = new Input();
		bullets = [];
	}

	private function createBullet():Void
	{
		var bullet = new Bullet();
		addNode(bullet,
		{
			position: new Vector2(-4, 0)
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
		if(input.isDown(32))
		{
			createBullet();
		}

		super.update(delta);
	}
}
