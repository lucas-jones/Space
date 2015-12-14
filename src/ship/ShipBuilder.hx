package ship;

import nape.space.Space;
import milkshake.math.Vector2;
import ship.part.joint.Joint;
import ship.part.ShipPart;

using Lambda;

class ShipBuilder
{
	public static function fromDescriptor(shipDescriptor:ShipDescriptor, space:Space):Ship
	{
		var parts = shipDescriptor.parts.map(PartBuilder.fromDescriptor);

		var connections = new Map<String, String>();
		shipDescriptor.parts.iter(function(d:ShipPartDescriptor):Void
		{
			d.joints.iter(function(j:JointDescriptor):Void
			{
				connections[j.id] = j.pairJointId;
			});
		});

		return new ShipBuilder(
			shipDescriptor.name,
			space,
			PartBuilder.fromDescriptor(shipDescriptor.core),
			parts,
			connections
		).build();
	}

	public var name(default, null):String;
	public var space(default, null):Space;
	public var core(default, null):ShipPart;
	public var parts(default, null):Array<ShipPart>;
	public var jointConnections(default, null):Map<String, String>;

	public function new(name:String, space:Space, ?core:ShipPart, ?parts:Array<ShipPart>, ?jointConnections:Map<String, String>)
	{
		this.name = name;
		this.space = space;
		this.core = core;
		this.parts = parts != null ? parts : [];
		this.jointConnections = jointConnections != null ? jointConnections : new Map();
	}

	public function addPart(part:ShipPart, newPartJointId:String, shipJointId:String):ShipBuilder
	{
		parts.push(part);
		jointConnections[shipJointId] = newPartJointId;
		return this;
	}

	public function setCore(part:ShipPart):ShipBuilder
	{
		this.core = part;
		return this;
	}

	public function build():Ship
	{
		var ship = new Ship(this.name, this.core, this.space);

		this.parts.iter(function(p) ship.addPart(p));

		for (k in jointConnections.keys())
		{
			var shipJoint:Joint = ship.getJointById(k);
			var newPartJoint:Joint = ship.getJointById(jointConnections[k]);

			shipJoint.connectTo(newPartJoint);
		}

		return ship;
	}
}

class PartBuilder
{
	public static function fromDescriptor(descriptor:ShipPartDescriptor):ShipPart
	{
		return new ShipPart(descriptor.id, descriptor.frameId, descriptor.joints.map(JointBuilder.fromDescriptor));
	}

	public function new() { }
}

class JointBuilder
{
	public static function fromDescriptor(descriptor:JointDescriptor):Joint
	{
		return new Joint(descriptor.id, new Vector2(descriptor.x, descriptor.y));
	}

	public function new() { }
}

typedef ShipDescriptor =
{
	var name:String;
	var core:ShipPartDescriptor;
	var parts:Array<ShipPartDescriptor>;
}

typedef ShipPartDescriptor =
{
	var type:String;
	var id:String;
	var frameId:String;
	var joints:Array<JointDescriptor>;
}

typedef JointDescriptor =
{
	var id:String;
	var x:Float;
	var y:Float;
	var pairJointId:String;
}