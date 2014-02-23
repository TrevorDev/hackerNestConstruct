function Character(x, y, width, height, spritePath, ai){

	this.frameAction = function(command){
		this.position = command;
		if (!ai)
			this.sprite.alpha = 0.5;
		if(command == "middle"){ //change sprite default
			this.sprite.texture = this.texture_middle;
		}
		else if(command == "left"){ //change sprite lean left
			this.sprite.texture = this.texture_left;
		}
		else if(command == "right"){ //change sprite lean right
			this.sprite.texture = this.texture_right;
			
		} else{ //HEADBUT THAT DUDE!!
			this.sprite.alpha = 1;
			this.sprite.texture = this.texture_butt;
			if (ai){
				if (global.char_player.position == "middle")
					global.hp_player.frameAction();
			} else {
				if (global.char_computer.position == "middle")
					global.hp_computer.frameAction();
			}

		}
		this.updated = new Date().getTime() / 1000;
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

	this.updated = new Date().getTime() / 1000;
	this.position = "middle";

	this.texture_middle= new PIXI.Texture.fromImage(spritePath+'/HeadHD.png');
	this.texture_right = new PIXI.Texture.fromImage(spritePath+'/RightHD.png');
	this.texture_left = new PIXI.Texture.fromImage(spritePath+'/LeftHD.png');
	this.texture_butt = new PIXI.Texture.fromImage(spritePath+'/ButtHD.png');

	this.sprite = new PIXI.Sprite(this.texture_middle);
	global.screen.container.addChild(this.sprite);

	this.setPos(x,y);
	this.setDim(width,height);
	
}