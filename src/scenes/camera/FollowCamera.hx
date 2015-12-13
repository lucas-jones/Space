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
			x = -target.x + Globals.SCREEN_CENTER.x;
			y = -target.y + Globals.SCREEN_CENTER.y;
		}

		super.update(delta);
	}
}
