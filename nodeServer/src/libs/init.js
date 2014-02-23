$(document).ready(onReady)
function onReady()
{
	global.screen = new Screen(800, 600);

	global.character = new Character(config.width/2+200, 0, 40, 40, "assets/colors/red.png");
	var ground = new Wall(config.width/2 - 500/2, config.height*3/4, 500, 30, "assets/colors/red.png");
	global.currentLevel = new Level([ground]);

	resize();
	requestAnimFrame(update);
}