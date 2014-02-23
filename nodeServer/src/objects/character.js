function Character(x, y, width, height, spritePath, controller){
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
	this.frameAction = function(){
		if(this.controller.getKey("left")){
			this.hitDir = "x";
			this.xSpd-=this.moveAcc;
			this.xScale = -1;
		}
		if(this.controller.getKey("right")){
			this.hitDir = "x";
			this.xSpd+=this.moveAcc;
			this.xScale = 1;
		}
		if(this.controller.getKey("up")){
			this.hitDir = "y";
			this.yScale = -1;
			if(!this.jumpKeyDown){
				this.jumpKeyDown = true;
				this.jump()
			}
		}else{
			this.jumpKeyDown = false;
		}
		if(this.controller.getKey("down")){
			this.hitDir = "y";
			this.yScale = 1;
			this.diveKick();
		}

		this.move();
	}

	this.jump = function(){
		if(this.jumpCount < this.maxJumps){
			this.ySpd = -this.jumpPower;
			this.jumpCount++;
		}
	}

	this.diveKick = function(){
		this.ySpd = 10;
		//this.xSpd = 4*this.xScale;
	}

	this.move = function(){
		//console.log(Kiwi.xSpd);
		//this.xSpd = Kiwi.xSpd;
		this.ySpd+= global.currentLevel.gravity;
		this.x+=this.xSpd;
		this.x+=this.checkWallCollision(this.xSpd, 0);
		this.y+=this.ySpd;
		yFix = this.checkWallCollision(0, this.ySpd);
		if(yFix<0){
			this.jumpCount=0;
			this.ySpd = 0;
		}
		this.y+= yFix;

		if(this.y > 500){
			this.x = 500;
			this.y = 0;
			this.xSpd = 0;
			this.ySpd = 0;
			this.percentDmg=0;
		}

		this.setPos(this.x, this.y)
	}

	this.checkWallCollision = function(xMove, yMove){
		for (var i in global.currentLevel.walls){
			if(delta = Collision.rect(this, global.currentLevel.walls[i], xMove, yMove)){
				return delta;
			}
		}
		return 0;
	}
	
	this.texture = new PIXI.Texture.fromImage(spritePath);
	this.hitboxTexture = new PIXI.Texture.fromImage("assets/colors/red.png");
	this.sprite = new PIXI.Sprite(this.texture);
	global.screen.container.addChild(this.sprite)
	this.controller = controller;
	this.xSpd = 0;
	this.ySpd = 0;
	this.x = x;
	this.y = y;
	this.xScale = 1;
	this.yScale = 1;
	this.jumpCount = 0;
	this.jumpKeyDown = false;
	this.percentDmg = 0;

	this.maxJumps = 3;
	this.jumpPower = 10;
	this.width;
	this.height;
	this.setDim(width,height);
	this.moveAcc = 0.2;

	Character.array.push(this)
}

Character.array = []