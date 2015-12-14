package ship.part;

import milkshake.math.GUID;
import pixi.core.math.Point;
import nape.geom.Vec2;
import nape.shape.Polygon;
import nape.shape.Shape;
import nape.phys.BodyType;
import nape.phys.Body;
import milkshake.core.DisplayObject;
import milkshake.core.Sprite;
import milkshake.math.Vector2;
import milkshake.utils.Color;
import milkshake.utils.GraphicsHelper;
import milkshake.utils.Globals;
import ship.part.joint.Joint;
import pixi.core.textures.Texture;

using Lambda;

class ShipPart extends DisplayObject
{
	public var type(default, null):String;

	public var joints:Array<Joint> = [];
	public var body(default, null):Body;

	public function new(type:String, frameId:String, joints:Array<Joint>, ?shape:Shape)
	{
		super(GUID.short());

		this.type = type;

		//Add displayobject
		var texture = Texture.fromFrame(frameId);
		addNode(new Sprite(texture), { anchor: new Vector2(0.5, 0.5) });

		//setup physics
		shape = shape == null ? new Polygon(Polygon.box(texture.width, texture.height)) : shape;
		body = new Body(BodyType.DYNAMIC);
		body.shapes.add(shape);

		//setup joints
		joints.iter(addJoint);
	}

	public function addJoint(joint:Joint):Void
	{
		joints.push(joint);
		joint.part = this;

		if(Globals.DEBUG)
		{
			addNode(GraphicsHelper.generateRectangle(10, 10, Color.RED, true), { position: joint.position });
		}
	}

	public function getJointByType(type:String):Joint
	{
		return joints.find(function(j:Joint) {
			return j.type == type;
		});
	}

	override public function update(delta:Float):Void
	{
		super.update(delta);

		displayObject.position = displayObject.toLocal(new Point(body.position.x, body.position.y));
		displayObject.rotation = body.rotation;
	}
}
