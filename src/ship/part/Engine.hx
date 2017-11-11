package ship.part;

import milkshake.math.GUID;
import milkshake.components.input.Key;
import milkshake.core.Sprite;
import scenes.particle.ParticlePresets;
import milkshake.utils.MathHelper;
import milkshake.core.ParticleEmitter;
import nape.geom.Vec2;
import milkshake.math.Vector2;
import ship.part.joint.Joint;
import pixi.core.textures.Texture;

class Engine extends ShipPart
{
	public static var IN_USE:Bool = false;

	public static inline var TOP_JOINT:String = 'engine_top';
	public static inline var BOTTOM_JOINT:String = 'engine_bottom';

	public var speed:Float = 10;

	private var emitter:ParticleEmitter;

	public function new(?id:String)
	{
		super('engine', id != null ? id : GUID.short(),
		[
			new Joint(TOP_JOINT, new Vector2(0, -14)),
			new Joint(BOTTOM_JOINT, new Vector2(0, 14))
		]);

		addNode(emitter = ParticlePresets.FIRE,
		{
			position: new Vector2(),
			rotation: MathHelper.toRadians(270)
		});

		var texture = Texture.fromFrame('engine2.png');
		addNode(sprite = new Sprite(texture), { anchor: new Vector2(0.5, 0.5) });
		addShapeFromTexture(texture);
	}

	override public function update(delta:Float):Void
	{
		emitter.visible = false;

		if(active)
		{
			if(milk.input.isDown(Key.W))
			{
				body.applyImpulse(body.localVectorToWorld(new Vec2(0, 1 * (milk.input.isDown(Key.SHIFT) ? 10 : speed))));
				emitter.visible = true;
			}

			emitter.scale.x = (milk.input.isDown(Key.SHIFT)) ? 2 : 1;

			if(milk.input.isDown(Key.S))
			{
				body.applyImpulse(body.localVectorToWorld(new Vec2(0, -1 * speed)));
			}

			if(milk.input.isDown(Key.Q))
			{
				body.applyImpulse(body.localVectorToWorld(new Vec2(1 * speed, 0)));
			}

			if(milk.input.isDown(Key.E))
			{
				body.applyImpulse(body.localVectorToWorld(new Vec2(-1 * speed, 0)));
			}

			sprite.rotation = 0;
			emitter.rotation = MathHelper.toRadians(270);

			if(milk.input.isDown(Key.A))
			{
				body.applyAngularImpulse(-50 * speed);
				emitter.rotation = MathHelper.toRadians(270 + 20);
				sprite.rotation = MathHelper.toRadians(10);
			}

			if(milk.input.isDown(Key.D))
			{
				body.applyAngularImpulse(50 * speed);
				emitter.rotation = MathHelper.toRadians(270 - 20);
				sprite.rotation = MathHelper.toRadians(-10);
			}
		}

		IN_USE = emitter.visible;

		emitter.update(delta);

		super.update(delta);
	}
}