package scenes.camera;

import milkshake.core.Entity;
import milkshake.game.scene.camera.Camera;
import milkshake.utils.MathHelper;

class FollowCamera extends Camera
{
	public var target:Entity;

	public var zoom:Float;

	override public function update(delta:Float):Void
	{
		if(target != null)
		{
			targetPosition.x = target.x;
			targetPosition.y = target.y;
			targetRotation = MathHelper.lerp(targetRotation, target.rotation, 0.05);
		}

		targetZoom = MathHelper.lerp(targetZoom, zoom, 0.04);
		

		super.update(delta);
	}
}
