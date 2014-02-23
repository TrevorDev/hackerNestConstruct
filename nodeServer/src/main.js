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
var frame = 0;
var startFrame = 60*1;
function update()
{
	frame++;
	if(frame<=startFrame){
		if(frame==startFrame/3){
			global.countDown.sprite.texture = global.countDown.twoTexture
		}else if(frame==startFrame*2/3){
			global.countDown.sprite.texture = global.countDown.threeTexture
		}else if(frame==startFrame){
			global.countDown.sprite.alpha=0;
		}
		requestAnimFrame(update);
	}else{
		var rand = Math.floor((Math.random()*10));
	var speed = Math.random()+0.5;
	var now = new Date().getTime() / 1000;
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
	if (!global.finished){
		for (var x=0;x<effects.length;x++){
			if (effects[x].tryRemove())
				effects.splice(x,1);
		}
		requestAnimFrame(update);
	}
	else {
		this.global.end_game.frameAction("");
		if (global.hp_player.health == 0)
			this.global.end_game.score("lose");
		else if (global.hp_computer.health == 0)
			this.global.end_game.score("win");
	}
	}
	
	global.screen.render();
}