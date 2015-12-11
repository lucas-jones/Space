package ship.part;

import haxe.Timer;
import milkshake.components.input.Input;
import milkshake.math.Vector2;
import ship.part.joint.Joint;

class Gun extends ShipPart
{
	private var input:Input;

	private var bullet:Bullet;

	public function new()
	{
		super('gun', 'gun00.png',
		[
			new Joint('gun_top', new Vector2(0, -18)),
			new Joint('gun_bottom', new Vector2(0, 18))
		]);

		input = new Input();
	}

	private function createBullet():Void
	{
		addNode(bullet = new Bullet(),
		{
			position: new Vector2(-8, 0)
		});

		Timer.delay(function():Void
		{
			removeNode(bullet);
			bullet = null;
		}, 500 );
	}

	override public function update(delta:Float):Void
	{
		super.update(delta);

		if(input.isDown(32))
		{
			if(bullet == null) createBullet();
		}
	}
}
