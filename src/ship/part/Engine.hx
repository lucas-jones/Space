package ship.part;

import milkshake.math.GUID;
import milkshake.components.input.Key;
import milkshake.core.Sprite;
import scenes.particle.ParticlePresets;
import milkshake.utils.MathHelper;
import milkshake.core.ParticleEmitter;
import nape.geom.Vec2;
import milkshake.components.input.Input;
import milkshake.math.Vector2;
import ship.part.joint.Joint;
import pixi.core.textures.Texture;

class Engine extends ShipPart
{
	public static inline var TOP_JOINT:String = 'engine_top';
	public static inline var BOTTOM_JOINT:String = 'engine_bottom';

	public var speed:Float = 2;

	private var input:Input;

	private var emitter:ParticleEmitter;

	public function new(?id:String)
	{
		super('engine', id != null ? id : GUID.short(),
		[
			new Joint(TOP_JOINT, new Vector2(0, -14)),
			new Joint(BOTTOM_JOINT, new Vector2(0, 14))
		]);

		input = new Input();

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

		if(input.isDown(Key.W))
		{
			body.applyImpulse(body.localVectorToWorld(new Vec2(0, 1 * speed)));
			emitter.visible = true;
		}

		if(input.isDown(Key.S))
		{
			body.applyImpulse(body.localVectorToWorld(new Vec2(0, -1 * speed)));
		}

		if(input.isDown(Key.A))
		{
			body.applyAngularImpulse(-50 * speed);
		}

		if(input.isDown(Key.D))
		{
			body.applyAngularImpulse(50 * speed);
		}

		emitter.update(delta);

		super.update(delta);
	}
}