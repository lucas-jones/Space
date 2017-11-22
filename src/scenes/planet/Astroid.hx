package scenes.planet;

import milkshake.core.Graphics;
import milkshake.core.DisplayObject;
import milkshake.utils.Color;
import nape.phys.BodyType;
import nape.phys.Body;
import nape.shape.Circle;
import pixi.core.textures.Texture;
import milkshake.core.Sprite;
import milkshake.math.Vector2;

using utils.PhysicsUtils;

class Astroid extends DisplayObject
{
    public var size(default, null):Float;
    public var body(default, null):Body;

    public function new(size:Float)
    {
        super();

        this.size = size;
    }

    override public function create():Void
    {
        super.create();

        var asset = new Graphics();
		asset.begin(Color.DarkGray);
		asset.graphics.drawCircle(0, 0, size);
        addNode(asset);

        addNode(new Sprite(Texture.fromImage('assets/images/backgrounds/moon_full.png')), {
            scale: Vector2.EQUAL(2.5),
            anchor: Vector2.HALF
        });

        body = new Body(BodyType.DYNAMIC);
		body.shapes.add(new Circle(size));
        body.mass = 0.1;
		body.position = position.toVec2();
    }

    override public function update(delta:Float)
    {
        super.update(delta);

        this.position = body.position.toVector2();
        this.rotation = body.rotation;
    }
}