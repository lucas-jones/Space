package ship.part;

import milkshake.math.Vector2;
import ship.part.joint.Joint;

class Cockpit extends ShipPart
{
	public static inline var TOP_JOINT:String = 'cockpit_top';
	public static inline var BOTTOM_JOINT:String = 'cockpit_bottom';
	public static inline var LEFT_JOINT:String = 'cockpit_left';
	public static inline var RIGHT_JOINT:String = 'cockpit_right';

	public function new()
	{
		super('cockpit', 'cockpitGreen_7.png',
		[
			new Joint(TOP_JOINT, new Vector2(0, -37.5)),
			new Joint(BOTTOM_JOINT, new Vector2(0, 37.5)),
			new Joint(LEFT_JOINT, new Vector2(-24, 0)),
			new Joint(RIGHT_JOINT, new Vector2(24, 0))
		]);
	}
}
