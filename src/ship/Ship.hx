package ship;

import milkshake.utils.Color;
import milkshake.utils.GraphicsHelper;
import milkshake.utils.Globals;
import ship.part.joint.Joint;
import ship.part.ShipPart;
import milkshake.core.DisplayObject;

using Lambda;

class Ship extends DisplayObject
{
	private var core:ShipPart;
	private var parts:Array<ShipPart>;

	public function new(id:String, core:ShipPart)
	{
		super(id);

		parts = [];

		this.core = core;
		addPart(core);
	}

	public function addPart(newPart:ShipPart, ?newPartJoint:Joint, ?shipJoint:Joint):Void
	{
		addNode(newPart);
		parts.push(newPart);

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

	override public function update(delta:Float):Void
	{
		super.update(delta);

		this.rotation += 0.001 * delta;
	}
}
