package scenes.camera;

import milkshake.core.Entity;
import milkshake.game.scene.camera.Camera;
import milkshake.utils.MathHelper;

class FollowCamera extends Camera
{
	public static var ALWAYS_ROT:Bool = false;

	public var target:Entity;
	public var fixedRotation:Bool = true;
	public var zoom:Float;

	override public function update(delta:Float):Void
	{
		if(target != null)
		{
			targetPosition.x = target.x;
			targetPosition.y = target.y;

			if(!fixedRotation || ALWAYS_ROT)
			{
				targetRotation = MathHelper.lerpAngle(targetRotation, MathHelper.unwrapRadian(target.rotation), 0.05);
			}
		}

		targetZoom = MathHelper.lerp(targetZoom, zoom, 0.04);

		super.update(delta);
	}
}
