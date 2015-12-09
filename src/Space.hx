package ;

import milkshake.Milkshake;
import milkshake.utils.Globals;

@:expose
class Space
{
	static function main()
	{
		var milkshake = Milkshake.boot(new Settings(Globals.SCREEN_WIDTH, Globals.SCREEN_HEIGHT));

		milkshake.scenes.addScene(new scenes.TestScene());
	}
}