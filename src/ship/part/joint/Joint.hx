package ship.part.joint;

import ship.builder.ShipBuilder.Connection;
import milkshake.utils.MathHelper;
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
	public var rotation(default, null):Float;

	public var part:ShipPart;
	public var pairJoint(default, null):Joint;
	public var weld(default, null):WeldJoint;

	public var isConnected(get, never):Bool;
	//True if it initited the connection
	public var isConnector(default, null):Bool = false;

	public function new(type:String, ?id:String, ?position:Vector2, rotation:Float = 0, ?pairJoint:Joint)
	{
		this.id = id != null ? id : GUID.short();

		this.type = type;
		this.position = position != null ? position : Vector2.ZERO;
		this.rotation = rotation;
		this.pairJoint = pairJoint;

		this.onConnected = new DirectSignaler(this);
	}

	public function connectTo(joint:Joint):Void
	{
		trace('Connecting ${part.type}:${type}(${part.id}:${id}) to ${joint.part.type}:${joint.type}(${joint.part.id}:${joint.id})');

		if(isConnected || joint.isConnected) throw new Error('Tried to connect a joint that is already connected');

		pairJoint = joint;
		joint.pairJoint = this;
		isConnector = true;

		var weld = new WeldJoint(part.body, joint.part.body,
		new Vec2(position.x, position.y),
		new Vec2(joint.position.x, joint.position.y), MathHelper.toRadians(rotation));

		weld.stiff = true;
		weld.breakUnderForce = true;
		weld.removeOnBreak = true;
		weld.maxForce = 20000;

		part.body.space.constraints.add(weld);

		//Timer.delay(function() {part.body.space.constraints.add(weld);}, 500);

		onConnected.dispatch(this);
	}

	public function get_isConnected():Bool
	{
		return pairJoint != null;
	}

	public function getConnection():Connection
	{
		return
		{
			newPartId: pairJoint.part.id,
			newPartJointType: pairJoint.type,
			shipPartId: part.id,
			shipJointType: type
		}
	}
}