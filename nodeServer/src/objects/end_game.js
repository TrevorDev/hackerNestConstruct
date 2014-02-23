function EndGame(player_win, spritePath){

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
			this.sprite_win = new PIXI.Sprite(this.texture_win);
			this.sprite_lose = new PIXI.Sprite(this.texture_lose);
			this.sprite_again = new PIXI.Sprite(this.texture_again);
			this.sprite_quit = new PIXI.Sprite(this.texture_quit);


			global.screen.container.addChild(this.sprite_win);
			global.screen.container.addChild(this.sprite_lose);
			global.screen.container.addChild(this.sprite_again);
			global.screen.container.addChild(this.sprite_quit);


			this.setPos(this.sprite_win,config.width/2-125,20);
			this.setPos(this.sprite_lose,config.width/2-125,20);
			this.setPos(this.sprite_again,config.width/2-125-150,config.height/2-125);
			this.setPos(this.sprite_quit,config.width/2-125+150,config.height/2-125);

			this.setDim(this.sprite_win,250,105);
			this.setDim(this.sprite_lose,250,105);
			this.setDim(this.sprite_again,250,250);
			this.setDim(this.sprite_quit,250,250);

			this.sprite_again.alpha = 0.5;
			this.sprite_quit.alpha = 0.5;
		}
		global.screen.render();
	}

	this.score = function(score){
		if (score == "win"){
			this.sprite_win.alpha = 1.0;
			this.sprite_lose.alpha = 0.0;
		}
		else {
			this.sprite_lose.alpha = 1.0;
			this.sprite_win.alpha = 0.0;
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

	this.texture_win = new PIXI.Texture.fromImage(spritePath+'/win.png');
	this.texture_lose = new PIXI.Texture.fromImage(spritePath+'/lose.png');

	this.texture_again = new PIXI.Texture.fromImage(spritePath+'/rematch.png');
	this.texture_quit = new PIXI.Texture.fromImage(spritePath+'/quit.png');

	// this.sprite_win.alpha = 0.0;
	// this.sprite_lose.alpha = 0.0;
	// this.sprite_again.alpha = 0.0;
	// this.sprite_quit.alpha = 0.0;

	//this.frameAction("left");
	
}