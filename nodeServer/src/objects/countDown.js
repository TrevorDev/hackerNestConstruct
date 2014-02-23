function CountDown(x, y, width, height){
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

	this.oneTexture = new PIXI.Texture.fromImage("assets/countDown/one.png");
	this.twoTexture = new PIXI.Texture.fromImage("assets/countDown/two.png");
	this.threeTexture = new PIXI.Texture.fromImage("assets/countDown/three.png");
	this.sprite = new PIXI.Sprite(this.oneTexture);
	global.screen.container.addChild(this.sprite)
	this.x = 0;
	this.y = 0;
	this.setPos(x,y)
	this.setDim(width,height);
}