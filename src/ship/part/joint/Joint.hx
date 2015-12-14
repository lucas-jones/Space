package ship.part.joint;

import js.Error;
import hsl.haxe.direct.DirectSignaler.DirectSignaler;
import hsl.haxe.Signaler.Signaler;
import nape.geom.Vec2;
import nape.constraint.WeldJoint;
import milkshake.math.GUID;
import milkshake.math.Vector2;

class Joint
{
	public var onConnected(default, null):Signaler<Joint>;

	public var id(default, null):String;
	public var type(default, null):String;
	public var position(default, null):Vector2;

	public var part:ShipPart;
	public var pairJoint(default, null):Joint;
	public var weld(default, null):WeldJoint;

	public function new(type:String, position:Vector2, ?pairJoint:Joint)
	{
		this.id = GUID.short();

		this.type = type;
		this.position = position;
		this.pairJoint = pairJoint;

		this.onConnected = new DirectSignaler(this);
	}

	public function connectTo(joint:Joint):Void
	{
		trace('Connecting ${part.type}:${type}(${part.id}:${id}) to ${joint.part.type}:${joint.type}(${joint.part.id}:${joint.id})');

		if(isConnected() || joint.isConnected()) throw new Error('Tried to connect a joint that is already connected');

		pairJoint = joint;
		joint.pairJoint = this;

		var weld = new WeldJoint(part.body, joint.part.body,
		new Vec2(position.x, position.y),
		new Vec2(joint.position.x, joint.position.y));

		weld.stiff = true;
		weld.breakUnderForce = true;
		weld.removeOnBreak = true;
		weld.maxForce = 20000;

		part.body.space.constraints.add(weld);

		onConnected.dispatch(this);
	}

	public function isConnected():Bool
	{
		return pairJoint != null;
	}
}