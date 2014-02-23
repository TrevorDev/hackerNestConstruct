function Character(x, y, width, height, spritePath){



	this.lean_left = function(){
		if(this.jumpCount < this.maxJumps){
			this.ySpd = -this.jumpPower;
			this.jumpCount++;
		}
	}

	this.frameAction = function(command){
		position = command;
		if(command == "middle"){ //change sprite default
			this.sprite.texture = this.texture_middle;
		}
		else if(command == "left"){ //change sprite lean left
			//this.sprite.texture = this.texture_right;
			//this.sprite.scale.x = -1;
		}
		else if(command == "right"){ //change sprite lean right
			//this.sprite.texture = this.texture_right;
			//this.sprite.scale.x = 1;
			
		}else{ //HEADBUT THAT SHIT!!
			this.sprite.texture = this.texture_butt;
		}
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

	this.position = 0
	this.texture_middle= new PIXI.Texture.fromImage(spritePath+'/Head.png');
	this.texture_right = new PIXI.Texture.fromImage(spritePath+'/Right.png');
	this.texture_butt = new PIXI.Texture.fromImage(spritePath+'/Butt.png');

	this.sprite = new PIXI.Sprite(this.texture_middle);
	global.screen.container.addChild(this.sprite);

	this.setPos(x,y);
	this.setDim(width,height);
	
}