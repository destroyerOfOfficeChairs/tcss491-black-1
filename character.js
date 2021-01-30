class Hero {
	constructor(game, x, y){
		Object.assign(this, { game, x, y });
		
        //this.game = game;
        this.game.hero = this;
        this.attack = 100;
        this.defense = 100;
        this.health = 100;
		this.x = x;
		this.y = y;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Hero.png");
        
        this.scale = 1/2;
		this.width = 32;
        this.height = 50;
        this.state = 0; // 0 if idle, 1 if moving, 2 if attacking
        this.facing = 0; // 0 = right, 1 = left, 2 = down, 3 = up
        this.velocity = { x: 0, y: 0 };
		this.battle = false;
		this.stats = [100, 10, 5];
        // stats = [hp, att, def]
        this.canPass = false;
        
        this.updateBB();
		this.animations = [];
		this.loadAnimations();
		//this.animations.push(new Animator(this.spritesheet, 0, 15, 32, 50, 2, .5, 96, false, true, false));
		//                                                x, y, width, height, frames, speed, spacing, flip, loop, oscillate
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
    };
	
	loadAnimations() {
        for (var i = 0; i < 3; i++) { // 3 states (idle, walking, attacking)
            this.animations.push([]);
            for (var j = 0; j < 4; j++) { // 4 directions (right, left, down, up)
                this.animations[i].push([]);
            }
        }

        // idle right
        this.animations[0][0] = new Animator(this.spritesheet, 193, 15, this.width, this.height, 1, 10, 96, false, true, false);
        
        // idle left
        this.animations[0][1] = new Animator(this.spritesheet, 225, 15, this.width, this.height, 1, 10, 96, false, true, false);
        
        // idle down
        this.animations[0][2] = new Animator(this.spritesheet, 0, 15, this.width, this.height, 1, 10, 96, false, true, false);
        
        // idle up
        this.animations[0][3] = new Animator(this.spritesheet, 32, 15, this.width, this.height, 1, 10, 96, false, true, false);
        


        // walking right
        this.animations[1][0] = new Animator(this.spritesheet, 65, 15, this.width, this.height, 2, 0.15, 96, false, true, false);
        
        // walking left
        this.animations[1][1] = new Animator(this.spritesheet, 96, 15, this.width, this.height, 2, 0.15, 96, true, true, false);
        
        // walking down
        this.animations[1][2] = new Animator(this.spritesheet, 0, 15, this.width, this.height, 2, 0.15, 96, false, true, false);
        
        // walking up
        this.animations[1][3] = new Animator(this.spritesheet, 33, 15, this.width, this.height, 2, 0.15, 96, false, true, false);



        // attacking right
        this.animations[2][0] = new Animator(this.spritesheet, 65, 15, this.width, this.height, 2, 0.09, 96, false, true, false);
        
        // attacking left
        this.animations[2][1] = new Animator(this.spritesheet, 96, 15, this.width, this.height, 2, 0.09, 96, true, true, false);
        
        // attacking down
        this.animations[2][2] = new Animator(this.spritesheet, 0, 15, this.width, this.height + 7, 5, 0.5, 7, false, true, false);
        
        // attacking up
        this.animations[2][3] = new Animator(this.spritesheet, 32, 15, this.width, this.height + 7, 5, 0.5, 7, false, true, false);

    };
	
	update() {
        const TICK = this.game.clockTick;
        const MIN_WALK = 1 * PARAMS.SCALE;
        const MAX_WALK = 2 * PARAMS.SCALE;

		if (this.battle == false) {
			if (this.game.down && !this.game.up) { // keyboard input of down
				this.facing = 2;
				this.velocity.y += MIN_WALK;
			} else if (!this.game.down && this.game.up) { // keyboard input of up
				this.facing = 3;
				this.velocity.y -= MIN_WALK;
			} else {
				// do nothing
				this.velocity.y = 0;
			}

			if (this.game.right && !this.game.left) { //keyboard input of right
				this.facing = 0;
				this.velocity.x += MIN_WALK;
			} else if (!this.game.right && this.game.left) { // keyboard input of left
				this.facing = 1;
				this.velocity.x -= MIN_WALK;
			} else {
				// do nothing
				this.velocity.x = 0;
			}

			if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
			if (this.velocity.x <= -MAX_WALK) this.velocity.x = -MAX_WALK;
			if (this.velocity.y >= MAX_WALK) this.velocity.y = MAX_WALK;
			if (this.velocity.y <= -MAX_WALK) this.velocity.y = -MAX_WALK;

			this.stillAttacking = this.state == 2 && !this.animations[2][this.facing].cycled;

			this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;
			if (this.game.attack1 || this.stillAttacking) { // attacks when B is pressed
				this.state = 2;
			}
		}
		else {
			this.facing = 1;
			this.stillAttacking = this.state == 2 && !this.animations[2][this.facing].cycled;

			this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;
			if (this.game.attack1 || this.stillAttacking) { // attacks when B is pressed
				this.state = 2;
			}
		}
        // update position
        this.x += this.velocity.x; //* TICK * PARAMS.SCALE;
        this.y += this.velocity.y; //* TICK * PARAMS.SCALE;
        this.updateBB();

        // doesn't let sprites go off the canvas
        // if (this.x <= 0) { // restricts west border
        //     this.velocity.x = 0;
        //     this.x = 0;
        // }
        // if (this.y <= 0) { // restricts north border
        //     this.velocity.y = 0;
        //     this.y = 0;
        // }
        // if (this.x >= PARAMS.CANVASWIDTH - (this.width * PARAMS.SCALE)) { // restricts east border
        //     this.velocity.x = 0;
        //     this.x = PARAMS.CANVASWIDTH - (this.width * PARAMS.SCALE);
        // }
        // if (this.y >= PARAMS.CANVASHEIGHT - (this.height * PARAMS.SCALE)) { // restricts south border
        //     this.velocity.y = 0;
        //     this.y = PARAMS.CANVASHEIGHT - (this.height * PARAMS.SCALE);
        // }

        //collisions
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Crystal) {
                    entity.removeFromWorld = true;
                    that.game.camera.crystals++;
                }

                if (entity instanceof Coin) {
                    entity.removeFromWorld = true;
                    that.game.camera.coins++;
                }

                if (entity instanceof Key) {
                    entity.removeFromWorld = true;
                    that.canPass = true;
                }

                if (entity instanceof Lock) {
                    if (that.canPass) {
                        entity.removeFromWorld = true;
                        that.canPass = false;
                    }
                    if (that.BB.collide(entity.topBB)) {
                        that.velocity.y = -MAX_WALK;
                    }
                    if (that.BB.collide(entity.bottomBB)) {
                        that.velocity.y = MAX_WALK;
                    }
                    if (that.BB.collide(entity.leftBB)) {
                        that.velocity.x = -MAX_WALK;
                    }
                    if (that.BB.collide(entity.rightBB)) {
                        that.velocity.x = MAX_WALK;
                    }
                }

                if (entity instanceof Box) {
                    if (that.BB.collide(entity.topBB)) {
                        that.velocity.y = -MAX_WALK;
                    }
                    if (that.BB.collide(entity.bottomBB)) {
                        that.velocity.y = MAX_WALK;
                    }
                    if (that.BB.collide(entity.leftBB)) {
                        that.velocity.x = -MAX_WALK;
                    }
                    if (that.BB.collide(entity.rightBB)) {
                        that.velocity.x = MAX_WALK;
                    }
                }

                if (entity instanceof Rock) {
                    if (that.BB.collide(entity.topBB)) {
                        that.velocity.y = -MAX_WALK;
                    }
                    if (that.BB.collide(entity.bottomBB)) {
                        that.velocity.y = MAX_WALK;
                    }
                    if (that.BB.collide(entity.leftBB)) {
                        that.velocity.x = -MAX_WALK;
                    }
                    if (that.BB.collide(entity.rightBB)) {
                        that.velocity.x = MAX_WALK;
                    }
                }

                if (entity instanceof Bush) {
                    
                }

                if (entity instanceof Tree) {
                    if (that.BB.collide(entity.topBB)) {
                        that.velocity.y = -MAX_WALK;
                    }
                    if (that.BB.collide(entity.bottomBB)) {
                        that.velocity.y = MAX_WALK;
                    }
                    if (that.BB.collide(entity.leftBB)) {
                        that.velocity.x = -MAX_WALK;
                    }
                    if (that.BB.collide(entity.rightBB)) {
                        that.velocity.x = MAX_WALK;
                    }
                }

                if (entity instanceof Water) {
                    // if (that.BB.right > entity.BB.left) { // collided with an object to the east
                        
                    // }
                    // if (that.BB.left < entity.BB.right) { // collided with an object to the west

                    // }
                    // if (that.BB.top < entity.BB.bottom) { // collided with an object to the north

                    // }
                    // if (that.BB.bottom > entity.BB.top) { // collided with an object to the south

                    // }

                    if (that.BB.collide(entity.topBB)) {
                        //that.velocity.y = 0;
                        //that.y = entity.BB.top - (that.height * PARAMS.SCALE * that.scale);
                        
                        that.velocity.y = -MAX_WALK;
                    }
                    if (that.BB.collide(entity.bottomBB)) {
                        // that.velocity.y = 0;
                        // that.y = entity.BB.bottom;
                        
                        that.velocity.y = MAX_WALK;
                    }
                    if (that.BB.collide(entity.leftBB)) {
                        // that.velocity.x = 0;
                        // that.x = entity.BB.left - (that.width * PARAMS.SCALE * that.scale);
                        
                        that.velocity.x = -MAX_WALK;
                    }
                    if (that.BB.collide(entity.rightBB)) {
                        // that.velocity.x = 0;
                        // that.x = entity.BB.right;
                        
                        that.velocity.x = MAX_WALK;
                    }
                    //console.log("hero collided with water");
                }

                if (entity instanceof Wall) {
                    if (that.BB.collide(entity.topBB)) {
                        that.velocity.y = -MAX_WALK;
                    }
                    if (that.BB.collide(entity.bottomBB)) {
                        that.velocity.y = MAX_WALK;
                    }
                    if (that.BB.collide(entity.leftBB)) {
                        that.velocity.x = -MAX_WALK;
                    }
                    if (that.BB.collide(entity.rightBB)) {
                        that.velocity.x = MAX_WALK;
                    }
                }
            }
        });

        //prevents hero from going off the northwest corner of the world

        // if (this.game.camera.x <= 0) {
        //     this.velocity.x = MAX_WALK;
        //     this.x = this.game.camera.heroX;
        // }
        // if (this.game.camera.y <= 0) {
        //     this.velocity.y = MAX_WALK;
        //     this.y = this.game.camera.heroY;
        // }

        if (this.x <= 0) {
            this.velocity.x = MAX_WALK;
        }
        if (this.y <= 0) {
            this.velocity.y = MAX_WALK;
        }
    };

    draw(ctx) {
        let xPosition = this.x;
        let yPosition = this.y;

        //adjusting the positions of the drawings to make it fit because the png sucks
        // if (this.state == 2) { // if attacking
        //     if (this.facing == 1) { // if facing left
        //         xPosition -= (7 * PARAMS.SCALE);
        //     } else if (this.facing == 2) { // if facing down
        //         yPosition -= (1 * PARAMS.SCALE);
        //     } else if (this.facing == 3) { // if facing up
        //         yPosition -= 8 * PARAMS.SCALE;
        //     }
        // }
        
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, xPosition - this.game.camera.x, yPosition - this.game.camera.y, PARAMS.SCALE * this.scale);

        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE, this.height * PARAMS.SCALE);
		/*
		this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE)
        */
        
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};



class Cleric {
	constructor(game, x, y){
		Object.assign(this, { game, x, y });
		
		//this.game = game;
		this.x = x;
		this.y = y;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Hero.png");
        
        this.scale = 1/2;
		this.width = 32;
        this.height = 50;
        this.state = 0; // 0 if idle, 1 if moving, 2 if attacking
        this.facing = 0; // 0 = right, 1 = left, 2 = down, 3 = up
        this.velocity = { x: 0, y: 0 };
		this.battle = true;
		this.stats = [100, 8, 3];
		// stats = [hp, att, def]
		
		this.animations = [];
		this.loadAnimations();
		//this.animations.push(new Animator(this.spritesheet, 0, 15, 32, 50, 2, .5, 96, false, true, false));
		//                                                x, y, width, height, frames, speed, spacing, flip, loop, oscillate
	};
	
	loadAnimations() {
        for (var i = 0; i < 3; i++) { // 3 states (idle, walking, attacking)
            this.animations.push([]);
            for (var j = 0; j < 4; j++) { // 4 directions (right, left, down, up)
                this.animations[i].push([]);
            }
        }

        // idle right
        this.animations[0][0] = new Animator(this.spritesheet, 130, 143, this.width, this.height, 1, 10, 96, false, true, false);
        
        // idle left
        this.animations[0][1] = new Animator(this.spritesheet, 160, 143, this.width, this.height, 1, 10, 96, false, true, false);
        
        // idle down
        this.animations[0][2] = new Animator(this.spritesheet, 64, 143, this.width, this.height, 1, 10, 96, false, true, false);
        
        // idle up
        this.animations[0][3] = new Animator(this.spritesheet, 97, 143, this.width, this.height, 1, 10, 96, false, true, false);
        


        // walking right
        this.animations[1][0] = new Animator(this.spritesheet, 130, 143, this.width, this.height, 2, 0.15, 96, false, true, false);
        
        // walking left
        this.animations[1][1] = new Animator(this.spritesheet, 160, 143, this.width, this.height, 2, 0.15, 96, false, true, false);
        
        // walking down
        this.animations[1][2] = new Animator(this.spritesheet, 64, 143, this.width, this.height, 2, 0.15, 96, false, true, false);
        
        // walking up
        this.animations[1][3] = new Animator(this.spritesheet, 97, 143, this.width, this.height, 2, 0.15, 96, false, true, false);



        // attacking right
        this.animations[2][0] = new Animator(this.spritesheet, 160, 143, this.width, this.height, 2, 0.09, 96, false, true, false);
        
        // attacking left
        this.animations[2][1] = new Animator(this.spritesheet, 160, 143, this.width, this.height, 2, 0.09, 96, false, true, false);
        
        // attacking down
        this.animations[2][2] = new Animator(this.spritesheet, 0, 143, this.width, this.height + 7, 5, 0.5, 7, false, true, false);
        
        // attacking up
        this.animations[2][3] = new Animator(this.spritesheet, 32, 143, this.width, this.height + 7, 5, 0.5, 7, false, true, false);

    };
	
	update() {
        const TICK = this.game.clockTick;
        const MIN_WALK = 1 * PARAMS.SCALE;
        const MAX_WALK = 2 * PARAMS.SCALE;

		if (this.battle == false) {
			if (this.game.down && !this.game.up) { // keyboard input of down
				this.facing = 2;
				this.velocity.y += MIN_WALK;
			} else if (!this.game.down && this.game.up) { // keyboard input of up
				this.facing = 3;
				this.velocity.y -= MIN_WALK;
			} else {
				// do nothing
				this.velocity.y = 0;
			}

			if (this.game.right && !this.game.left) { //keyboard input of right
				this.facing = 0;
				this.velocity.x += MIN_WALK;
			} else if (!this.game.right && this.game.left) { // keyboard input of left
				this.facing = 1;
				this.velocity.x -= MIN_WALK;
			} else {
				// do nothing
				this.velocity.x = 0;
			}

			if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
			if (this.velocity.x <= -MAX_WALK) this.velocity.x = -MAX_WALK;
			if (this.velocity.y >= MAX_WALK) this.velocity.y = MAX_WALK;
			if (this.velocity.y <= -MAX_WALK) this.velocity.y = -MAX_WALK;

			this.stillAttacking = this.state == 2 && !this.animations[2][this.facing].cycled;

			this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;
			if (this.game.attack1 || this.stillAttacking) { // attacks when B is pressed
				this.state = 2;
			}
		}
		else {
			this.facing = 1;
			this.stillAttacking = this.state == 2 && !this.animations[2][this.facing].cycled;

			this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;
			if (this.game.attack1 || this.stillAttacking) { // attacks when B is pressed
				this.state = 2;
			}
		}

        // update position
        //this.x += this.velocity.x //* TICK * PARAMS.SCALE;
        //this.y += this.velocity.y //* TICK * PARAMS.SCALE;

        // doesn't let sprites go off the canvas
        if (this.x <= 0) { // restricts west border
            this.velocity.x = 0;
            this.x = 0;
        }
        if (this.y <= 0) { // restricts north border
            this.velocity.y = 0;
            this.y = 0;
        }
        if (this.x >= PARAMS.CANVASWIDTH - (this.width * PARAMS.SCALE)) { // restricts east border
            this.velocity.x = 0;
            this.x = PARAMS.CANVASWIDTH - (this.width * PARAMS.SCALE);
        }
        if (this.y >= PARAMS.CANVASHEIGHT - (this.height * PARAMS.SCALE)) { // restricts south border
            this.velocity.y = 0;
            this.y = PARAMS.CANVASHEIGHT - (this.height * PARAMS.SCALE);
        }
    };

    draw(ctx) {
        let xPosition = this.x;
        let yPosition = this.y;

        //adjusting the positions of the drawings to make it fit because the png sucks
        if (this.state == 2) { // if attacking
            if (this.facing == 1) { // if facing left
                xPosition -= (7 * PARAMS.SCALE);
            } else if (this.facing == 2) { // if facing down
                yPosition -= (1 * PARAMS.SCALE);
            } else if (this.facing == 3) { // if facing up
                yPosition -= 8 * PARAMS.SCALE;
            }
        }
        
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, xPosition, yPosition, PARAMS.SCALE * this.scale);

        //for testing boundaries
        /*ctx.fillStyle = "Black";
        ctx.strokeStyle = "Black";
        ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE, this.height * PARAMS.SCALE);
		
		this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE)
		*/
    };
};

