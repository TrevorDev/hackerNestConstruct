function EndGame(player_win, spritePath){

	//this.button = document.createElement("input");
    //this.button.type = "button";
    //this.button.value = "im a button";
    //this.button.onclick = func;
    //global.screen.container.addChild(button);

	this.frameAction = function(command){
		if(command == "left"){ //change sprite lean left
			this.sprite_again.alpha = 1.0;
			this.sprite_quit.alpha = 0.5;
			this.selected = "again";
		}
		else if(command == "right"){ //change sprite lean right
			this.sprite_again.alpha = 0.5;
			this.sprite_quit.alpha = 1.0;
			this.selected = "quit";
		}else if(command == "head"){ //HEADBUT THAT DUDE!!
			if (this.selected == "quit"){
				document.location.href = '../';
				//console.log('quit');
			}	
			else if (this.selected == "again"){
				document.location.href = document.URL;
				//console.log('again');
			}
		} else if (command == "") {
			this.sprite_again.alpha = 0.5;
			this.sprite_quit.alpha = 0.5;
		}

		global.screen.render();
	}

	this.setPos = function(sprite,x,y){
		this.x = x;
		this.y = y;
		sprite.x = x;
		sprite.y = y;
	}
	this.setDim = function(sprite,x,y){
		this.width = x;
		this.height = y;
		sprite.width = x;
		sprite.height = y;
	}
	this.selected = "";
	//if (player_win)
	//	this.texture_score = new PIXI.Texture.fromImage(spritePath+'/win.png');
	//else
	//	this.texture_score = new PIXI.Texture.fromImage(spritePath+'/lose.png');
	this.texture_again = new PIXI.Texture.fromImage(spritePath+'/rematch.png');
	this.texture_quit = new PIXI.Texture.fromImage(spritePath+'/quit.png');

	this.sprite_again = new PIXI.Sprite(this.texture_again);
	this.sprite_quit = new PIXI.Sprite(this.texture_quit);

	
	//this.sprite_score = new PIXI.Sprite(this.texture_score);

	global.screen.container.addChild(this.sprite_again);
	global.screen.container.addChild(this.sprite_quit);

	this.setPos(this.sprite_again,config.width/2-125-150,config.height/2-125);
	this.setPos(this.sprite_quit,config.width/2-125+150,config.height/2-125);

	this.setDim(this.sprite_again,250,250);
	this.setDim(this.sprite_quit,250,250);

	this.sprite_again.alpha = 0.0;
	this.sprite_quit.alpha = 0.0;

	//this.frameAction("left");
	
}