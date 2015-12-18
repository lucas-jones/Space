package player;

import nape.shape.Polygon;
import nape.space.Space;
import nape.phys.Body;
import nape.phys.BodyType;
import milkshake.math.Vector2;
import pixi.core.textures.Texture;
import milkshake.core.Sprite;
import milkshake.core.DisplayObject;

class Player extends DisplayObject
{
	public var body:Body;

	public function new(space:Space)
	{
		super('player');

		scale = Vector2.EQUAL(0.1);
		var texture;
		addNode(new Sprite(texture = Texture.fromFrame("alienBeige_stand.png")));

		body = new Body(BodyType.DYNAMIC);
		body.shapes.add(new Polygon(Polygon.box(texture.width * scale.x, texture.height * scale.y)));
		space.bodies.add(body);
	}
}
