package ship.part;

import pixi.core.math.Point;
import nape.geom.Vec2;
import nape.constraint.WeldJoint;
import js.Error;
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
	public var joints(default, null):Map<String, Joint>;
	public var body(default, null):Body;
	public var shipConnection:JointConnection;

	private var dirty:Bool = false;

	public function new(id:String, frameId:String, joints:Array<Joint>, ?shape:Shape)
	{
		super(id);

		//Add displayobject
		var texture = Texture.fromFrame(frameId);
		addNode(new Sprite(texture),
		{
			anchor: new Vector2(0.5, 0.5)
		});

		//setup physics
		shape = shape == null ? new Polygon(Polygon.box(texture.width, texture.height)) : shape;
		body = new Body(BodyType.DYNAMIC);
		body.shapes.add(shape);

		//setup joints
		this.joints = new Map();
		joints.iter(addJoint);
	}

	public function addJoint(joint:Joint):Void
	{
		this.joints[joint.id] = joint;
		joint.part = this;

		if(Globals.DEBUG)
		{
			addNode(GraphicsHelper.generateRectangle(10, 10, Color.RED, true),
			{
				position: joint.position
			});
		}
	}

	public function connectTo(joint:Joint, shipJoint:Joint):Void
	{
		if(shipJoint.isConnected()) throw new Error('Tried to connect ${joint.id} to ${shipJoint.id} which is already connected');

		shipConnection = { partJoint: joint, otherJoint: shipJoint };
		joint.pairJoint = shipJoint;
		shipJoint.pairJoint = joint;

		//TODO Weld parts together
//		var weld = new WeldJoint(shipJoint.part.body, joint.part.body,
//			new Vec2(shipJoint.position.x, shipJoint.position.y),
//			new Vec2(joint.position.x, joint.position.y));

		dirty = true;
	}

	public function syncBodyToDisplayObject()
	{
		//BIG HACKS
		//This is coupled directly to the ship's set rotation and position
		var globalPosition = new Vector2(displayObject.position.x + displayObject.parent.position.x,
			displayObject.position.y + displayObject.parent.position.y);

		var globalRotation = displayObject.rotation + displayObject.parent.rotation;

		trace('Setting $id\'s physics body to ${globalPosition.x} ${globalPosition.y}');
		body.position = new Vec2(globalPosition.x, globalPosition.y);
		body.rotation = globalRotation;
	}

	override public function update(delta:Float):Void
	{
		super.update(delta);

		if(shipConnection != null && dirty)
		{
			//If dirty, update parts position relative to joints and move body.
			var otherPartPosition = shipConnection.otherJoint.part.position;
			var otherJointPosition = shipConnection.otherJoint.position;

			position = Vector2.subtraction(Vector2.addition(otherPartPosition, otherJointPosition), shipConnection.partJoint.position);
			//TODO Joint rotation
			syncBodyToDisplayObject();

			dirty = false;
		}
		else
		{
			//Set parts position to physic bodies position
			//BIG HACKS
			position = new Vector2(body.position.x - displayObject.parent.position.x, body.position.y - displayObject.parent.position.y);
			rotation = body.rotation - displayObject.parent.rotation;
		}
	}
}
