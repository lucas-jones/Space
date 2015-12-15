package ship.builder;

import nape.space.Space;
import ship.part.joint.Joint;
import ship.part.ShipPart;

using Lambda;

class ShipBuilder
{
	public static function fromDescriptor(shipDescriptor:ShipDescriptor, space:Space):Ship
	{
		var core = PartBuilder.fromDescriptor(shipDescriptor.core);
		var parts = shipDescriptor.parts.map(PartBuilder.fromDescriptor);

		return new ShipBuilder(
			shipDescriptor.name,
			space,
			core,
			parts,
			shipDescriptor.connections
		).build();
	}

	public static function toDescriptor(ship:Ship):ShipDescriptor
	{
		var descriptor:ShipDescriptor =
		{
			name: ship.name,
			core: PartBuilder.toDescriptor(ship.core),
			parts: [ for(p in ship.parts.iterator()) PartBuilder.toDescriptor(p) ],
			connections: [ for(p in ship.parts.iterator()) for(c in PartBuilder.getConnections(p)) c ]
		}

		return descriptor;
	}

	public var name(default, null):String;
	public var space(default, null):Space;
	public var core(default, null):ShipPart;
	public var parts(default, null):Array<ShipPart>;
	public var jointConnections(default, null):Array<Connection>;

	public function new(name:String, space:Space, ?core:ShipPart, ?parts:Array<ShipPart>, ?jointConnections:Array<Connection>)
	{
		this.name = name;
		this.space = space;
		this.core = core;
		this.parts = parts != null ? parts : [];
		this.jointConnections = jointConnections != null ? jointConnections : [];
	}

	public function addPart(part:ShipPart, newPartJoint:Joint, shipJoint:Joint):ShipBuilder
	{
		parts.push(part);
		jointConnections.push(
		{
			newPartId: part.id,
			newPartJointType: newPartJoint.type,
			shipPartId: shipJoint.part.id,
			shipJointType: shipJoint.type
		});

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

		this.parts.iter(function(p) if(p.id != this.core.id) ship.addPart(p));

		for (connection in jointConnections)
		{
			var shipJoint:Joint = ship.getPartById(connection.shipPartId).getJointByType(connection.shipJointType);
			var newPartJoint:Joint = ship.getPartById(connection.newPartId).getJointByType(connection.newPartJointType);

			shipJoint.connectTo(newPartJoint);
		}

		return ship;
	}
}

typedef Connection =
{
	var newPartId:String;
	var newPartJointType:String;
	var shipPartId:String;
	var shipJointType:String;
}

typedef ShipDescriptor =
{
	var name:String;
	var core:ShipPartDescriptor;
	var parts:Array<ShipPartDescriptor>;
	var connections:Array<Connection>;
}

typedef ShipPartDescriptor =
{
	var type:String;
	var id:String;
}