$(document).ready(onReady)

function getURLParameter(name) {
	var ret = decodeURIComponent((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
  return ret == "null" ? null : ret;
}

function onReady()
{
	global.screen = new Screen(800, 600);

	if(getURLParameter("imageUrl")){
		new Background(0, 0, config.width, config.height, getURLParameter("imageUrl"));
	}
	//global.char_player = new Character(config.width/2-250, 100, 500, 500, "assets/characters/player", false);
	global.char_computer = new Character(config.width/2-500, 100, 1000, 500, "assets/characters/computer");

	resize();
	requestAnimFrame(update);
}
