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
	public var joints(default, null):Map<String, Joint>;
	public var body(default, null):Body;

	private var sprite:Sprite;

	public function new(type:String, ?id:String, ?joints:Array<Joint>)
	{
		super(id != null ? id : GUID.short());

		this.type = type;
		this.body = new Body(BodyType.DYNAMIC);
		this.body.mass = 2;
		this.joints = new Map();
		if(joints != null) joints.iter(addJoint);
	}

	public function addJoint(joint:Joint):Void
	{
		joints[joint.type] = joint;
		joint.part = this;

		if(Globals.DEBUG)
		{
			addNode(GraphicsHelper.generateRectangle(10, 10, Color.Red, true), { position: joint.position });
		}
	}

	public function getJointByType(type:String):Joint
	{
		return joints[type];
	}

	public function addShape(shape:Shape):Void
	{
		body.shapes.add(shape);
	}

	public function addShapeFromTexture(texture:Texture):Void
	{
		addShape(new Polygon(Polygon.box(texture.width, texture.height)));
	}

	override public function update(delta:Float):Void
	{
		super.update(delta);

		displayObject.position = displayObject.toLocal(new Point(body.position.x, body.position.y));
		displayObject.rotation = body.rotation;
	}
}
