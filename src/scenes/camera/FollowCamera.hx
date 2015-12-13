package scenes.camera;

import milkshake.utils.Globals;
import milkshake.core.Entity;
import milkshake.game.scene.camera.Camera;

class FollowCamera extends Camera
{
	public var target:Entity;

	override public function update(delta:Float):Void
	{
		if(target != null)
		{
			targetPosition.x = target.x;
			targetPosition.y = target.y;
		}

		super.update(delta);
	}
}
