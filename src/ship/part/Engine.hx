package ship.part;

import milkshake.math.Vector2;
import ship.part.joint.Joint;

class Engine extends ShipPart
{
	public static inline var TOP_JOINT:String = 'engine_top';
	public static inline var BOTTOM_JOINT:String = 'engine_bottom';

	public function new()
	{
		super('engine', 'engine2.png',
		[
			new Joint(TOP_JOINT, new Vector2(0, -14)),
			new Joint(BOTTOM_JOINT, new Vector2(0, 14))
		]);
	}
}
