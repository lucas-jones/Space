package ship;

import milkshake.math.Vector2;
import nape.shape.Circle;
import nape.geom.Vec2;
import milkshake.math.Vector2;
import nape.space.Space;
import milkshake.components.phsyics.PhysicsEntity;
import nape.phys.BodyType;
import nape.phys.Body;
import ship.part.joint.Joint;
import ship.part.ShipPart;
import milkshake.core.DisplayObject;

using Lambda;

class Ship extends DisplayObject
{
	private var core:ShipPart;
	private var parts:Array<ShipPart> = [];
	private var space:Space;

	public function new(id:String, core:ShipPart, space:Space)
	{
		super(id);

		this.space = space;

		this.core = core;
		addPart(core);
	}

	public function addPart(newPart:ShipPart, ?newPartJoint:Joint, ?shipJoint:Joint):Void
	{
		addNode(newPart);
		parts.push(newPart);
		space.bodies.add(newPart.body);

		if(newPartJoint != null && shipJoint != null) addConnection(newPartJoint, shipJoint);
	}

	public function addConnection(shipJoint:Joint, newPartJoint:Joint):Void
	{
		trace('Connecting ${newPartJoint.part.id}:${newPartJoint.id} to ${shipJoint.part.id}:${shipJoint.id}');
		newPartJoint.part.connectTo(newPartJoint, shipJoint);
	}

	public function getJointById(id:String):Joint
	{
		for (p in parts)
		{
			var joint = p.joints.find(function(j:Joint) {
				return j.id == id;
			});

			if (joint != null) return joint;
		}

		return null;
	}

	override function set_position(value:Vector2):Vector2
	{
		if(this.core != null)
		{
			this.core.body.position.x = value.x;
			this.core.body.position.y = value.y;
		}

		return super.set_position(value);
	}

	override function set_rotation(value:Float):Float
	{
		if(this.core != null)
		{
			this.core.body.rotation = value;
		}

		return super.set_rotation(value);
	}

	override public function update(delta:Float):Void
	{
		//Update the x, y and rotation values for the node.
		if(this.core != null)
		{
			this.x = this.core.body.position.x;
			this.y = this.core.body.position.y;
			//TODO Fix relative rotation
			//call super so we dont effect core body
			//super.set_rotation(this.core.body.rotation);

		}

		super.update(delta);
	}

	override function get_position():Vector2
	{
		if(this.core != null)
		{
			return new Vector2(core.body.position.x, core.body.position.y);
		}

		return super.get_position();
		//return 
	}
}
