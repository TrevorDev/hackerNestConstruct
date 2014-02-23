function resize()
{

	var width = $(window).width(); 
	var height = $(window).height(); 
	
	if(width > config.width)width  = config.width;
	if(height > config.height)height = config.height;
	
	maxX = width;
	minX = 0;
	maxY = height;
	minY = 0;
	
	var w = $(window).width() / 2 - width/2;
	var h = $(window).height() / 2 - height/2;
	
	global.screen.renderer.view.style.left = $(window).width() / 2 - width/2 + "px"
	global.screen.renderer.view.style.top = $(window).height() / 2 - height/2 + "px"
	
	global.screen.renderer.resize(width, height);
	$('canvas').height = 100;
}

function update()
{
	var rand = Math.floor((Math.random()*10));
	var speed = Math.random()+0.5;
	var now = new Date().getTime() / 1000;
	resize();
	if ((now - global.char_computer.updated) > speed){
		if (rand == 5)
			global.char_computer.frameAction("head");
		else if ((rand >= 7) && (rand <=9))
			global.char_computer.frameAction("left");
		else if ((rand >= 3) && (rand <=6))
			global.char_computer.frameAction("right");
		else
			global.char_computer.frameAction("middle");
	}
	global.screen.render();
	if (!global.finished)
		requestAnimFrame(update);
	else {
		this.global.end_game.frameAction(""); //force select default option
		if (global.hp_player.health == 0){
			this.global.end_game.score("lose");
		}
		else if (global.hp_computer.health == 0){
			this.global.end_game.score("win");
		}
	}
}