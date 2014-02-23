function Effect(width, height, effect) {
	

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

	this.tryRemove = function(){
		now = new Date().getTime() / 1000;
		if (created-now >1.0)
			global.screen.container.addChild(this.sprite);
	}
	
	this.created = new Date().getTime() / 1000;

	this.texture = new PIXI.Texture.fromImage("assets/effects/"+effect);
	this.sprite = new PIXI.Sprite(this.texture);

	if (effect == 'dodgeright' || effect == 'dodgeleft'){
		this.setPos(this.sprite,config.width/2-175,config.height/2-175);
		this.setDim(this.sprite,350,350);
	} else {
		this.setDim(this.sprite,config.width,config.height);
	}


	global.screen.container.addChild(this.sprite);
	effects.push(this.self);
}

effects = [];