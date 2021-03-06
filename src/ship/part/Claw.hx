package ship.part;

import milkshake.components.input.Key;
import milkshake.math.GUID;
import milkshake.core.Sprite;
import nape.phys.BodyType;
import pixi.core.textures.Texture;
import haxe.Timer;
import milkshake.math.Vector2;
import ship.part.joint.Joint;
import nape.shape.Polygon;
import nape.geom.Vec2;
import nape.constraint.WeldJoint;
import milkshake.core.Graphics;
import milkshake.utils.Color;
import milkshake.utils.MathHelper;

class Claw extends ShipPart
{
	public static inline var BOTTOM_JOINT:String = 'bottom';

	private var graphic:milkshake.core.Graphics;

	public function new(?id:String)
	{
		super('claw', id != null ? id : GUID.short(),
		[
			new Joint(BOTTOM_JOINT, new Vector2(0, -5))
		]);

		var texture = Texture.fromFrame('beamLong1.png');
		addNode(new Sprite(texture), { anchor: new Vector2(0.5, 0.5), position: new Vector2(-20, 0) });
		addNode(new Sprite(texture), { anchor: new Vector2(0.5, 0.5), position: new Vector2(20, 0), scale: new Vector2(-1, 1) });

		addShape(new Polygon(Polygon.box(50, 10)));

		body.type = nape.phys.BodyType.DYNAMIC;

		graphic = new milkshake.core.Graphics();

		// X

		Timer.delay(() -> {
			parent.addNode(graphic);
		}, 100);
	}

	var weld:WeldJoint;

	override public function update(delta:Float):Void
	{
		var rotation = body.rotation - (Math.PI / 2);
		var x = Math.cos(rotation) * 40;
		var y = Math.sin(rotation) * 40;
		var ray = nape.geom.Ray.fromSegment(new Vec2(body.position.x, body.position.y), new Vec2(body.position.x - x, body.position.y - y ));

		graphic.graphics.clear();
		graphic.graphics.lineStyle(2, Color.Yellow);
		graphic.graphics.moveTo(ray.origin.x, ray.origin.y);
		graphic.graphics.lineTo(ray.origin.x - ray.direction.x, ray.origin.y - ray.direction.y);

		var _ray = body.space.rayCast(ray);
		this.alpha = _ray != null ? 1 : 0.2;

		if(active)
		{
			if(milk.input.isDownOnce(Key.C))
			{
				if(weld != null)
				{
					body.space.constraints.remove(weld);
					weld.active = false;
					weld = null;
				}
				else if(_ray != null)
				{
					trace("Weld");
					//body.type = body.type == BodyType.STATIC ? BodyType.DYNAMIC : BodyType.STATIC;
					// var weld = new WeldJoint(body, _ray.shape.body,
					// new Vec2(0, 0),
					// new Vec2(body.position.x + x, body.position.y + y ), 0);

					var hit = new Vec2(ray.origin.x, ray.origin.y);

					weld = new WeldJoint(body, _ray.shape.body,
						new Vec2(0, 0),
						_ray.shape.body.worldPointToLocal(hit),
						MathHelper.toRadians(MathHelper.toDegrees(-rotation) - 60) // No idea why this is 60ish off
					);

					weld.stiff = true;
					weld.breakUnderForce = true;
					weld.removeOnBreak = true;
					weld.maxForce = 200000;
					body.space.constraints.add(weld);
				}
			}
		}

		super.update(delta);
	}
}
