package ship;

import milkshake.core.Node;

class ResourceManager extends Node
{
	public static inline var MAX_ENERGY:Float = 100;

	public var energy(default, null):Float = 100;
	public var propulsion:Float = 0;
	public var weapons:Float = 0;
	public var shield:Float = 0;

	private var rechargeRate:Float = 0.1;

	public function new(rechargeRate:Float = 0.1)
	{
		super('resource-manager');
		this.rechargeRate = rechargeRate;
	}

	override public function update(delta:Float):Void
	{
		if(energy < MAX_ENERGY) energy += rechargeRate;

		energy -= propulsion;

		super.update(delta);
	}
}
