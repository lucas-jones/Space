package scenes.camera;

import milkshake.game.scene.camera.Camera;
import milkshake.utils.Globals;
import milkshake.game.scene.camera.CameraPresets;

class SpaceCameraPresets extends CameraPresets
{
	public static var FOLLOW(get, null):Array<Camera>;

	public static function get_FOLLOW():Array<Camera>
	{
		return [ new FollowCamera("MAIN", 0, 0, Globals.SCREEN_WIDTH, Globals.SCREEN_HEIGHT) ];
	}
}
