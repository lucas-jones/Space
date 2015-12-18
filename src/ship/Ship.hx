package ship;

import ship.builder.ShipBuilder.ShipDescriptor;
import milkshake.math.GUID;
import milkshake.math.Vector2;
import nape.geom.Vec2;
import nape.space.Space;
import nape.phys.Body;
import ship.part.joint.Joint;
import ship.part.ShipPart;
import milkshake.core.DisplayObject;

using Lambda;

class Ship extends DisplayObject
{
	public var name(default, null):String;
	public var core(default, null):ShipPart;
	public var parts(default, null):Map<String, ShipPart>;

	private var space:Space;

	public function new(name:String, core:ShipPart, space:Space)
	{
		super(GUID.short());

		this.name = name;
		this.space = space;
		this.core = core;

		parts = new Map();
		addPart(core);
	}

	public function addPart(newPart:ShipPart, ?newPartJoint:Joint, ?shipJoint:Joint):Void
	{
		addNode(newPart);
		parts[newPart.id] = newPart;
		space.bodies.add(newPart.body);

		if(newPartJoint != null && shipJoint != null) shipJoint.connectTo(newPartJoint);
	}

	public function getPartById(id:String):ShipPart
	{
		return parts[id];
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
			//call super so we dont effect core body
			super.set_rotation(this.core.body.rotation);
		}

		super.update(delta);

		//We never need to rotate this displayobject as the children handle it themselves.
		displayObject.rotation = 0;
	}

	override function get_position():Vector2
	{
		if(this.core != null)
		{
			return new Vector2(core.body.position.x, core.body.position.y);
		}

		return super.get_position();
	}
}
