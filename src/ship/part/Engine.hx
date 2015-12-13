package ship.part;

import nape.geom.Vec2;
import milkshake.components.input.Input;
import haxe.Timer;
import milkshake.math.Vector2;
import ship.part.joint.Joint;

class Engine extends ShipPart
{
	public static inline var TOP_JOINT:String = 'engine_top';
	public static inline var BOTTOM_JOINT:String = 'engine_bottom';

	public var speed:Float = 2;

	private var input:Input;

	public function new()
	{
		super('engine', 'engine2.png',
		[
			new Joint(TOP_JOINT, new Vector2(0, -14)),
			new Joint(BOTTOM_JOINT, new Vector2(0, 14))
		]);

		input = new Input();
	}

	override public function update(delta:Float):Void
	{
		if(input.isDown(Codes.W))
		{
			body.applyImpulse(body.localVectorToWorld(new Vec2(0, 1 * speed)));
		}

		if(input.isDown(Codes.S))
		{
			body.applyImpulse(body.localVectorToWorld(new Vec2(0, -1 * speed)));
		}

		if(input.isDown(Codes.A))
		{
			body.applyAngularImpulse(-50 * speed);
		}

		if(input.isDown(Codes.D))
		{
			body.applyAngularImpulse(50 * speed);
		}

		super.update(delta);
	}
}

class Codes
{
	public static inline var W:Int = 87;
	public static inline var A:Int = 65;
	public static inline var S:Int = 83;
	public static inline var D:Int = 68;
}