function EndGame(player_win, spritePath){

	this.button = document.createElement("input");
    this.button.type = "button";
    this.button.value = "im a button";
    this.button.onclick = func;
    global.screen.container.addChild(button);

	this.frameAction = function(){
		if (this.health == 3)
			this.sprite.texture = this.texture_two;
		else if (this.health == 2)
			this.sprite.texture = this.texture_one;
		else if (this.health == 1)
			this.sprite.texture = this.texture_zero;
		this.health-=1;
	}

	this.setPos = function(x,y){
		this.x = x;
		this.y = y;
		this.sprite.x = x;
		this.sprite.y = y;
	}
	this.setDim = function(x,y){
		this.width = x;
		this.height = y;
		this.sprite.width = x;
		this.sprite.height = y;
	}

	this.health = 3;
	if (player_win)
		this.texture_score = new PIXI.Texture.fromImage(spritePath+'/win.png');
	else
		this.texture_score = new PIXI.Texture.fromImage(spritePath+'/lose.png');
	this.texture_again = new PIXI.Texture.fromImage(spritePath+'/one.png');
	this.texture_quit = new PIXI.Texture.fromImage(spritePath+'/two.png');

	this.sprite_score = new PIXI.Sprite(this.texture_score);
	global.screen.container.addChild(this.sprite);

	this.setPos(x,y);
	this.setDim(width,height);
	
}