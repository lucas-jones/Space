package ;

import milkshake.Milkshake;
import milkshake.utils.Globals;

@:expose
class SpaceGame
{
	static function main()
	{
		var milkshake = Milkshake.boot(new Settings(Globals.SCREEN_WIDTH, Globals.SCREEN_HEIGHT));

		milkshake.scenes.addScene(new scenes.TestPlayerScene());
		//milkshake.scenes.addScene(new scenes.TestShipScene());
	}
}
