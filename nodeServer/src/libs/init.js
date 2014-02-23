$(document).ready(onReady)

function getURLParameter(name) {
	var ret = decodeURIComponent((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
  return ret == "null" ? null : ret;
}

function onReady()
{
	global.screen = new Screen(800, 600);

	var controllerA = new Controller({ 
		left: "left",
		right: "right",
		head: "up",
		middle: "down"
	});

	if(getURLParameter("imageUrl")){
		new Background(0, 0, config.width, config.height, getURLParameter("imageUrl"));
	}	
	global.char_computer = new Character(config.width/2-500, 100, 1000, 500, "assets/characters/computer", true);
	global.char_player = new Character(config.width/2-500, 100, 1000, 500, "assets/characters/player", false);
	global.countDown = new CountDown(0, 0, config.width, config.height);
	global.hp_player = new Health(10, 5, 700, 350, "assets/characters/player/health");
	global.hp_computer = new Health(config.width-700-10, 5, 700, 350, "assets/characters/computer/health");

	global.end_game = new EndGame(false, "assets/end");

	resize();
	requestAnimFrame(update);
}
