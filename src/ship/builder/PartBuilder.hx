package ship.builder;

import ship.builder.ShipBuilder.Connection;
import ship.part.joint.Joint;
import js.Error;
import ship.part.Cockpit;
import ship.part.Gun;
import ship.builder.ShipBuilder.ShipPartDescriptor;
import ship.part.Engine;
import ship.part.ShipPart;
import ship.part.LandingGear;

class PartBuilder
{
	public static function fromDescriptor(descriptor:ShipPartDescriptor):ShipPart
	{
		switch(descriptor.type)
		{
			case 'engine':
				 return new Engine(descriptor.id);
			case 'gun':
				return new Gun(descriptor.id);
			case 'cockpit':
				return new Cockpit(descriptor.id);
			case 'landing-gear':
				return new LandingGear(descriptor.id);
			default:
				throw new Error('${descriptor.type} not found!');
		}
	}

	public static function toDescriptor(part:ShipPart):ShipPartDescriptor
	{
		var descriptor:ShipPartDescriptor =
		{
			type: part.type,
			id: part.id
		}

		return descriptor;
	}

	public static function getConnections(part:ShipPart):Array<Connection>
	{
		return [ for(j in part.joints.iterator()) if(j.isConnected && j.isConnector) j.getConnection() ];
	}
}
