package ship;

import milkshake.core.Entity;
import milkshake.math.GUID;
import milkshake.math.Vector2;
import nape.geom.Vec2;
import nape.space.Space;
import nape.phys.Body;
import ship.part.joint.Joint;
import ship.part.ShipPart;
import milkshake.core.DisplayObject;

using Lambda;

class Ship extends Entity
{
	public var name(default, null):String;
	public var core(default, null):ShipPart;
	public var parts(default, null):Map<String, ShipPart>;
	public var resourceManager(default, null):ResourceManager;

	private var displayObject:DisplayObject;
	private var space:Space;

	public function new(name:String, core:ShipPart, space:Space)
	{
		super(GUID.short());

		this.name = name;
		this.space = space;
		this.core = core;
		addNode(this.resourceManager = new ResourceManager());

		displayObject = new DisplayObject('$name-displayObject');

		onAddedToNode.bindVoid(function():Void
		{
			parent.addNode(displayObject);
		});

		onRemovedFromNode.bindVoid(function():Void
		{
			parent.removeNode(displayObject);
		});

		parts = new Map();
		addPart(core);
	}

	public function addPart(newPart:ShipPart, ?newPartJoint:Joint, ?shipJoint:Joint):Void
	{
		displayObject.addNode(newPart);
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

	override function get_rotation():Float
	{
		return super.get_rotation() + milkshake.utils.MathHelper.toRadians(180);
	}

	override public function update(delta:Float):Void
	{
		//Update the x, y and rotation values for the node.
		if(this.core != null)
		{
			this.x = this.core.body.position.x;
			this.y = this.core.body.position.y;
			this.rotation = this.core.body.rotation;
		}

		super.update(delta);
	}
}
