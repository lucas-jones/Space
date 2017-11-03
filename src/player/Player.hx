package player;

import pixi.core.math.Point;
import nape.shape.Circle;
import nape.space.Space;
import nape.phys.Body;
import nape.phys.BodyType;
import nape.geom.Vec2;
import milkshake.math.Vector2;
import milkshake.components.input.Key;
import milkshake.components.input.Input;
import pixi.core.textures.Texture;
import milkshake.core.Sprite;
import milkshake.core.DisplayObject;
import milkshake.utils.Color;


class Player extends DisplayObject
{
	public var body:Body;

	var sprite:Sprite;
	var texture:Texture;
	var input:Input;

	public function new(space:Space)
	{
		super('player');
		input = new Input();

		addNode(sprite = new Sprite(texture = Texture.fromFrame("alienBeige_stand.png")),
		{
			anchor: new Vector2(0.5, 0.5),
			scale: Vector2.EQUAL(0.1),
		});

		body = new Body(BodyType.DYNAMIC);
		body.shapes.add(new Circle(10));
		space.bodies.add(body);

		body.allowRotation = false;

		untyped window.body = body;

		if(milkshake.utils.Globals.DEBUG)
		{
			var graphic = new milkshake.core.Graphics();
			graphic.graphics.lineStyle(2, Color.Green, 1);
			graphic.graphics.beginFill(0xFF0000, 0.2);
			graphic.graphics.drawCircle(0, 0, 10);
			addNode(graphic);
		}
	}

	override function set_position(value:Vector2):Vector2
	{
		if(body != null)
		{
			body.position.x = value.x;
			body.position.y = value.y;
		}
		return super.set_position(value);
	}

	override function set_rotation(value:Float):Float
	{
		if(body != null) body.rotation = value;
		return super.set_rotation(value);
	}

	function canJump():Bool
	{
		if(body != null)
		{
			return body.velocity.y == 0;
		}
		return false;
	}

	override public function update(deltaTime:Float):Void
	{
		input.update(deltaTime);

		if(input.isDown(Key.SPACEBAR) && canJump())
		{
			body.applyImpulse(body.localVectorToWorld(new Vec2(0, -25)));
		}

		if(input.isDown(Key.D))
		{
			body.applyImpulse(body.localVectorToWorld(new Vec2(5, 0)));
		}

		if(input.isDown(Key.A))
		{
			body.applyImpulse(body.localVectorToWorld(new Vec2(-5, 0)));
		}

		if(body != null)
		{
			x = body.position.x;
			y = body.position.y;
			rotation = body.rotation;
		}

		super.update(deltaTime);
	}
}
