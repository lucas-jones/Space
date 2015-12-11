package ship.part.joint;

import milkshake.math.Vector2;

class Joint
{
	public var id:String;
	public var position:Vector2;
	public var pairJoint:Joint;
	public var part:ShipPart;

	public function new(id:String, position:Vector2, ?pairJoint:Joint)
	{
		this.id = id;
		this.position = position;
		this.pairJoint = pairJoint;
	}

	public function isConnected():Bool
	{
		return pairJoint != null;
	}
}

typedef JointConnection =
{
	partJoint:Joint,
	otherJoint:Joint
}