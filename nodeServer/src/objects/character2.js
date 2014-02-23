function Character(x, y, width, height, spritePath){


	this.texture = new PIXI.Texture.fromImage(spritePath);
	this.sprite = new PIXI.Sprite(this.texture);
	global.screen.container.addChild(this.sprite);

	this.lean_left = function(){
		if(this.jumpCount < this.maxJumps){
			this.ySpd = -this.jumpPower;
			this.jumpCount++;
		}
	}

	this.frameAction = function(command){
		position = command;
		if(command == 0){ //change sprite default
		}
		if(command == 1){ //change sprite lean left
		}
		if(command == 2){ //change sprite lean right
		}else{ //HEADBUT THAT SHIT!!
		}
	}

	position = 0
}