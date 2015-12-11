package ship.part;

import milkshake.math.Vector2;
import milkshake.utils.Color;
import milkshake.utils.GraphicsHelper;
import milkshake.utils.Globals;
import ship.part.joint.Joint;
import pixi.core.textures.Texture;
import milkshake.core.Sprite;

using Lambda;

class ShipPart extends Sprite
{
	public var joints(default, null):Map<String, Joint>;

	public var connection:JointConnection;

	private var dirty:Bool = false;

	public function new(id:String, frameId:String, joints:Array<Joint>)
	{
		super(Texture.fromFrame(frameId), id);
		this.anchor = new Vector2(0.5, 0.5);

		this.joints = new Map();

		joints.iter(function(j:Joint):Void
		{
			this.joints[j.id] = j;
			j.part = this;

			if(Globals.DEBUG)
			{
				addNode(GraphicsHelper.generateRectangle(10, 10, Color.RED, true),
				{
					position: j.position
				});
			}
		});
	}

	public function connectTo(joint:Joint, shipJoint:Joint):Void
	{
		connection = { partJoint: joint, otherJoint: shipJoint };
		dirty = true;
	}

	override public function update(delta:Float):Void
	{
		super.update(delta);

		if(connection != null && dirty)
		{
			var otherPartPosition = connection.otherJoint.part.position;
			var otherJointPosition = connection.otherJoint.position;

			position = Vector2.subtraction(Vector2.addition(otherPartPosition, otherJointPosition), connection.partJoint.position);

			dirty = false;
		}
	}
}
