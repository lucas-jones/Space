package ship.part;

import milkshake.math.GUID;
import milkshake.components.input.Key;
import nape.geom.Vec2;
import milkshake.math.Vector2;
import ship.part.joint.Joint;
import nape.shape.Circle;
import nape.phys.BodyType;
import nape.phys.Body;
import nape.shape.Polygon;

class Wheel extends ShipPart
{
	public static inline var TOP_JOINT:String = 'wheel_top';

	public var speed:Float = 10;

    var wheel:Body;
	public function new(?id:String)
	{
		super('wheel', id != null ? id : GUID.short(),
		[
			new Joint(TOP_JOINT, new Vector2(-30, -30))
		]);

        wheel = new Body(BodyType.DYNAMIC);
        wheel.shapes.add(new Circle(20));

        addShape(new Polygon(Polygon.box(10, 10)));

        haxe.Timer.delay(() ->
        {
            wheel.space = body.space;
            var weld:nape.constraint.PivotJoint = new nape.constraint.PivotJoint(this.body, wheel, new Vec2(0, 0), new Vec2(0, 0));
            body.space.constraints.add(weld);
        }, 100);
	}

	override public function update(delta:Float):Void
	{
		if(active)
		{
			if(milk.input.isDown(Key.D))
			{
				wheel.applyAngularImpulse(50 * speed);
			}
		}

		super.update(delta);
	}
}