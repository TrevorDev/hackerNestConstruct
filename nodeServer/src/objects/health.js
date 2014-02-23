function Health(x,y,width,height,spritePath){


	this.frameAction = function(){
		if (this.health == 3)
			this.sprite.texture = this.texture_two;
		else if (this.health == 2)
			this.sprite.texture = this.texture_one;
		else if (this.health == 1)
			this.sprite.texture = this.texture_zero;
		this.health-=1;
		if (this.health == 0)
			global.finished = true;
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

	this.texture_zero= new PIXI.Texture.fromImage(spritePath+'/zero.png');
	this.texture_one = new PIXI.Texture.fromImage(spritePath+'/one.png');
	this.texture_two = new PIXI.Texture.fromImage(spritePath+'/two.png');
	this.texture_three = new PIXI.Texture.fromImage(spritePath+'/three.png');

	this.sprite = new PIXI.Sprite(this.texture_three);
	global.screen.container.addChild(this.sprite);

	this.setPos(x,y);
	this.setDim(width,height);
	
}