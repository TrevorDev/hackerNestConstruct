$(document).ready(onReady)
function onReady()
{
	global.screen = new Screen(800, 600);

	//global.char_player = new Character(config.width/2-250, 100, 500, 500, "assets/characters/player", false);
	global.char_computer = new Character(config.width/2-250, 100, 500, 500, "assets/characters/computer", true);

	resize();
	requestAnimFrame(update);
}
