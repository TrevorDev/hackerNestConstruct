$(document).ready(onReady)
function onReady()
{
	global.screen = new Screen(800, 600);

	global.character = new Character(config.width/2-250, 100, 500, 500, "assets/characters/");

	resize();
	requestAnimFrame(update);
}
