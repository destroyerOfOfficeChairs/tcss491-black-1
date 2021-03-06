class Hero {
	constructor(game, x, y){
		Object.assign(this, { game, x, y });		
        this.game.hero = this;
		this.name = "H e r o";
		
		this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knightFullSpriteSheet.png");
        
        this.scale = 2;
		this.width = 16;
        this.height = 16;

        this.hide = false;
        this.state = 0; // 0 if idle, 1 if moving, 2 if attacking
        this.facing = 0; // 0 = right, 1 = left, 2 = down, 3 = up
        this.velocity = { x: 0, y: 0 };

        this.maxHealth = 200;
		this.stats = [200, 30, 6, 7]; // [hp, att, def, spd]
        this.canPass = false;

        this.dist = 0; // distance in pixels that the player has walked since the last battle
        this.lastPosition = {x:this.x, y:this.y}; // This is checked on every update to calculate this.dist

        this.timeElapsed = 0;
        this.timeElapsedBasic = 0;

        this.battle = false;
        this.basicAttack = false;
        this.specialAttack = false;
        
        this.updateBB();
		this.animations = [];
		this.loadAnimations();
    };

    reset() {
        this.battle = false;
		this.stats = [this.maxHealth, 10, 2, 7]; // [hp, att, def]
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
    }
	
	loadAnimations() {
        for (var i = 0; i < 3; i++) { // 3 states (idle, walking, attacking)
            this.animations.push([]);
            for (var j = 0; j < 4; j++) { // 4 directions (right, left, down, up)
                this.animations[i].push([]);
            }
        }

        // idle right
        this.animations[0][0] = new Animator(this.spritesheet, 32, 0, this.width, this.height, 1, 10, 0, false, true, false);
        
        // idle left
        this.animations[0][1] = new Animator(this.spritesheet, 16, 0, this.width, this.height, 1, 10, 0, false, true, false);
        
        // idle down
        this.animations[0][2] = new Animator(this.spritesheet, 0, 0, this.width, this.height, 1, 10, 0, false, true, false);
        
        // idle up
        this.animations[0][3] = new Animator(this.spritesheet, 48, 0, this.width, this.height, 1, 10, 0, false, true, false);
        


        // walking right
        this.animations[1][0] = new Animator(this.spritesheet, 0, 48, this.width, this.height, 4, 0.15, 0, false, true, false);
        
        // walking left
        this.animations[1][1] = new Animator(this.spritesheet, 0, 32, this.width, this.height, 4, 0.15, 0, false, true, false);
        
        // walking down
        this.animations[1][2] = new Animator(this.spritesheet, 0, 16, this.width, this.height, 4, 0.15, 0, false, true, false);
        
        // walking up
        this.animations[1][3] = new Animator(this.spritesheet, 0, 64, this.width, this.height, 4, 0.15, 0, false, true, false);



        // attacking right
        this.animations[2][0] = new Animator(this.spritesheet, 1, 112, this.width, this.height, 4, 0.09, 0, false, true, false);
        
        // attacking left
        this.animations[2][1] = new Animator(this.spritesheet, 0, 96, this.width, this.height, 4, 0.09, 0, false, true, false);
        
        // attacking down
        this.animations[2][2] = new Animator(this.spritesheet, 0, 80, this.width, this.height, 4, 0.09, 0, false, true, false);
        
        // attacking up
        this.animations[2][3] = new Animator(this.spritesheet, 0, 128, this.width, this.height, 4, 0.09, 0, false, true, false);

    };
	
	update() {
        const TICK = this.game.clockTick;
        const MIN_WALK = 1 * PARAMS.SCALE;
        const MAX_WALK = 2 * PARAMS.SCALE;

		if (!this.battle) {

            // updates the distance travelled since the last battle. For use in calculating when to enter
            // a random battle.
            this.dist += Math.abs(this.x - this.lastPosition.x) + Math.abs(this.y - this.lastPosition.y);
            this.lastPosition.x = this.x;
            this.lastPosition.y = this.y;

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
		} else {
            this.dist = 0;
			this.facing = 1;
			this.stillAttacking = this.state == 2 && !this.animations[2][this.facing].cycled;
			this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;

			if (this.basicAttack || this.game.attack1 || this.stillAttacking) { // attacks during its turn
				this.state = 2;
                if (this.basicAttack) {
                    this.timeElapsedBasic += this.game.clockTick;
                    if (this.timeElapsedBasic > 1) {
                        this.basicAttack = false;
                        this.timeElapsedBasic = 0;
                    }
                }
			}
		}

        if (this.game.attack2 || this.specialAttack) {
            if (this.timeElapsed == 0 && (this.game.camera.battle || this.game.camera.bossBattle)) {
                this.game.addEntity(new SuperSlash(this.game, this.x, this.y, this.facing, this));
            }
            this.timeElapsed += TICK;
            if (this.timeElapsed >= 1) {
                this.timeElapsed = 0;
                this.specialAttack = false;
            }
        } else {
            this.timeElapsed = 0;
        }

        // update position
        if (this.velocity.x < 0) {
            this.x += Math.floor(this.velocity.x * 50 * TICK * PARAMS.SCALE);
        } else {
            this.x += Math.ceil(this.velocity.x * 50 * TICK * PARAMS.SCALE);
        }

        if (this.velocity.y < 0) {
            this.y += Math.floor(this.velocity.y * 50 * TICK * PARAMS.SCALE);
        } else {
            this.y += Math.ceil(this.velocity.y * 50 * TICK * PARAMS.SCALE);
        }
        this.updateBB();

        //collisions
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Crystal) {
                    entity.removeFromWorld = true;
                    that.game.pause = true;
                    that.game.addEntity(new CrystalChoice(that.game));
                }

                if (entity instanceof Potion) {
                    entity.removeFromWorld = true;
                    that.game.camera.potions += 1;
                }

                if (entity instanceof Coin) {
                    entity.removeFromWorld = true;
                    that.game.camera.coins++;
                }

                if (entity instanceof Portal) {
                    that.game.changeLevel = true;
                }

                if (entity instanceof Key) {
                    entity.removeFromWorld = true;
                    that.game.camera.keys++;
                }

                if (entity instanceof Lock) {
                    if (that.game.camera.keys > 0) {
                        entity.removeFromWorld = true;
                        that.game.camera.keys--;
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
                    if (that.game.attack1) {
                        entity.removeFromWorld = true;
                        if (entity.item != null) {
                            if (entity.item == "coin") {
                                that.game.addEntity(new Coin(that.game, entity.x + 5, entity.y + 5));
                            } else if (entity.item == "crystal") {
                                that.game.addEntity(new Crystal(that.game, entity.x + 5, entity.y + 5));
                            } else if (entity.item == "key") {
                                that.game.addEntity(new Key(that.game, entity.x + 5, entity.y + 5));
                            } else if (entity.item == "potion") {
                                that.game.addEntity(new Potion(that.game, entity.x + 5, entity.y + 5));
                            } else if (entity.item == "portal") {
                                that.game.addEntity(new Portal(that.game, entity.x + 5, entity.y + 5));
                            }
                        }
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
                    if (that.BB.collide(entity.topBB)) {
                        that.velocity.y += -MAX_WALK;
                    }
                    if (that.BB.collide(entity.bottomBB)) {
                        that.velocity.y += MAX_WALK;
                    }
                    if (that.BB.collide(entity.leftBB)) {
                        that.velocity.x += -MAX_WALK;
                    }
                    if (that.BB.collide(entity.rightBB)) {
                        that.velocity.x += MAX_WALK;
                    }
                }

                if (entity instanceof Wall) {
                    if (that.BB.collide(entity.topBB)) {
                        that.velocity.y += -MAX_WALK;
                    }
                    if (that.BB.collide(entity.bottomBB)) {
                        that.velocity.y += MAX_WALK;
                    }
                    if (that.BB.collide(entity.leftBB)) {
                        that.velocity.x += -MAX_WALK;
                    }
                    if (that.BB.collide(entity.rightBB)) {
                        that.velocity.x += MAX_WALK;
                    }
                }
            }
        });
    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Red";
        ctx.fillRect(mmX + this.x * this.game.levelToMapRatio, mmY + this.y * this.game.levelToMapRatio, this.width * PARAMS.SCALE * this.scale * this.game.levelToMapRatio, this.height * PARAMS.SCALE * this.scale * this.game.levelToMapRatio);
    }

    draw(ctx) {
        if (!this.hide) {
            let xPosition = this.x;
            let yPosition = this.y;
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, xPosition - this.game.camera.x, yPosition - this.game.camera.y, PARAMS.SCALE * this.scale);
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            }
        }
    };
};



class Cleric {
	constructor(game, x, y){
		Object.assign(this, { game, x, y });
		this.name = "C l e r i c";
        this.hide = false;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Hero.png");
        
        this.scale = 1/2;
		this.width = 32;
        this.height = 50;

        this.state = 0; // 0 if idle, 1 if moving, 2 if attacking
        this.facing = 0; // 0 = right, 1 = left, 2 = down, 3 = up
        this.velocity = { x: 0, y: 0 };
		this.stats = [120, 20, 4, 4]; // stats = [hp, att, def, spd]
        
        this.timeElapsed = 0;
        this.timeElapsedSpecial = 0;

        this.battle = false;
        this.basicAttack = false;
        this.specialAttack = false;
		
		this.animations = [];
		this.loadAnimations();
        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
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
        this.animations[2][0] = new Animator(this.spritesheet, 130, 143, this.width, this.height, 2, 0.09, 96, false, true, false);
        
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

		if (!this.game.camera.battle && !this.game.camera.bossBattle) {
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
		} else {
			this.facing = 1;
			this.stillAttacking = this.state == 2 && !this.animations[2][this.facing].cycled;

			this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;
			if (this.specialAttack || this.game.attack2) { // attacks during its turn
                if (this.specialAttack) {
                    this.timeElapsedSpecial += this.game.clockTick;
                    if (this.timeElapsedSpecial > 1) {
                        this.specialAttack = false;
                        this.timeElapsedSpecial = 0;
                    }
                }
			}
		}

        if (this.game.attack1 || this.stillAttacking || this.basicAttack) {
            if (this.timeElapsed == 0) {
                this.game.addEntity(new SpiritBall(this.game, this.x, this.y, this.facing, this));
            }
            this.timeElapsed += TICK;
            if (this.timeElapsed >= 1) {
                this.timeElapsed = 0;
                this.basicAttack = false;
            }
        } else {
            this.timeElapsed = 0;
        }
    };

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (!this.hide) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE * this.scale);
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            }
        }
    };
};

class Archer {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
		
		this.name = "A r c h e r";
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/archer.png");
        this.hide = false;
        this.animations = [];

        this.facing = 0; // 0 = left, 1 = right, 2 = up, 3 = down
        this.state = 0;   // 0 = standing still, 1 = shooting
        this.scale = 5/8;
		this.width = 55;
        this.height = 55;

        this.velocity = { x: 0, y: 0 };
        this.stats = [190, 26, 12, 6]; // hp, att, def, spd
        this.canShoot = false;
        this.projectile = 0; // 0 is arrow, 1 is missile

        this.stillAttacking = false;
        this.stillAttackingSpecial = false;
        this.timeElapsed = 0;
        this.timeElapsedBasic = 0;
        this.timeElapsedSpecial = 0;

        this.battle = false;
        this.basicAttack = false;
        this.specialAttack = false;

        this.animations=[];
        this.loadAnimations();

        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
    };

    loadAnimations() {
        for (var i = 0; i < 2; i++) { // 2 states
            this.animations.push([]);
            for (var j = 0; j < 4; j++) { // 4 directions
                this.animations[i].push([]);
            }
        }

        // idle right
        this.animations[0][0] = new Animator(this.spritesheet, 12, 200, this.width, this.height, 1, 10, 9, false, true);

        // idle left
        this.animations[0][1] = new Animator(this.spritesheet, -2, 72, this.width, this.height, 1, 10, 9, false, true);

        // idle up
        this.animations[0][2] = new Animator(this.spritesheet, 5, 10, this.width, this.height + 5, 1, 10, 14, false, true);

        // idle down
        this.animations[0][3] = new Animator(this.spritesheet, 6, 142, this.width, this.height, 1, 10, 14, false, true);

        // shooting right
        this.animations[1][0] = new Animator(this.spritesheet, 12, 200, this.width, this.height, 13, 0.1, 9, false, true);
        
        // shooting left
        this.animations[1][1] = new Animator(this.spritesheet, -2, 72, this.width, this.height, 13, 0.1, 9, false, true);
        
        // shooting up
        this.animations[1][2] = new Animator(this.spritesheet, 5, 10, this.width, this.height + 5, 13, 0.1, 9, false, true);
        
        // shooting down
        this.animations[1][3] = new Animator(this.spritesheet, 6, 142, this.width, this.height, 13, 0.1, 9, false, true);
    }

    update() {
        const TICK = this.game.clockTick;
        const MIN_WALK = 1 * PARAMS.SCALE;
        const MAX_WALK = 2 * PARAMS.SCALE;

		if (!this.battle) {
			if (this.game.down && !this.game.up) { // keyboard input of down
				this.facing = 3;
				this.velocity.y += MIN_WALK;
			} else if (!this.game.down && this.game.up) { // keyboard input of up
				this.facing = 2;
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

		} else {
			this.facing = 1;
			
		}
        this.stillAttacking = this.state == 1 && !this.animations[1][this.facing].cycled;

        if (this.game.attack1 || this.basicAttack) {
            this.projectile = 0;
        } else if (this.game.attack2 || this.specialAttack) {
            this.projectile = 1;
        }

		this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;
		if (this.game.attack1 || this.game.attack2 || this.stillAttacking || this.basicAttack || this.specialAttack) { // attacks when B or V is pressed
			this.state = 1;
            if (!this.hide && this.timeElapsed >= 0.8 && this.timeElapsed <= 0.85 && this.canShoot) {
                if (this.projectile == 0) {
                    this.game.addEntity(new Arrow(this.game, this.x, this.y, this.facing, this));
                } else if (this.projectile == 1) {
                    this.game.addEntity(new Missile(this.game, this.x, this.y, this.facing, this));
                }
                this.canShoot = false;
            }
            this.timeElapsed += TICK;
            if (this.timeElapsed >= 1.25) {
                this.timeElapsed = 0;
                this.canShoot = true;
                this.basicAttack = false;
                this.specialAttack = false;
            }
		} else if ((!this.game.attack1 || this.game.attack2) && !this.stillAttacking) {
            this.timeElapsed = 0;
            this.canShoot = true;
            this.state = 0;
        }        
    };

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (!this.hide) {
            let xPosition = this.x;
            let yPosition = this.y;
    
            //adjusting the positions of the drawings to make it fit because the png sucks
            if (this.facing == 1) { // if facing left or up
                xPosition -= (7 * PARAMS.SCALE * this.scale);
            } 
            else if (this.facing == 3 || this.facing == 2) { // if facing up
                 yPosition += (5 * PARAMS.SCALE * this.scale);
            } 
    
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, xPosition -  this.game.camera.x, yPosition- this.game.camera.y, PARAMS.SCALE * this.scale);
            
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            }
        }
    };
    
}

class Mage {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

		this.name = "M a g e";
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mage.png");
        this.hide = false;
        this.animations = [];

        this.facing = 0; // 0 = right, 1 = left
        this.animations=[];
        this.state = 0; // 0 = idle, 1 = attack

        this.scale = 1/4;
        this.width = 102;
        this.height = 120;

        this.velocity = { x: 0, y: 0 };
		this.battle = false;
        this.stats = [160, 36, 8, 5]; // hp, att, def, spd
        this.stillAttacking = false;

        this.timeElapsed = 0;
        this.timeElapsedBasic = 0;
        this.basicAttack = false;
        this.specialAttack = false;
        
        this.animations.push(new Animator(this.spritesheet, 24, 24, this.width, this.height, 2, 0.5, 102, false, true));
        this.animations.push(new Animator(this.spritesheet, 31, 228, this.width, this.height, 2, 0.5, 95, false, true));
        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
    };

    update() {
        const TICK = this.game.clockTick;
        const MIN_WALK = 1 * PARAMS.SCALE;
        const MAX_WALK = 2 * PARAMS.SCALE;

		if (!this.battle) {
			if (this.game.down && !this.game.up) { // keyboard input of down
				this.velocity.y += MIN_WALK;
			} else if (!this.game.down && this.game.up) { // keyboard input of up
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

		} else {
			this.facing = 1;
			this.stillAttacking = this.state == 2 && !this.animations[this.facing].cycled;

			this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;
			if (this.basicAttack || this.game.attack1 || this.stillAttacking) { // attacks during its turn
				this.state = 2;
                if (this.basicAttack) {
                    this.timeElapsedBasic += this.game.clockTick;
                    if (this.timeElapsedBasic > 1) {
                        this.basicAttack = false;
                        this.timeElapsedBasic = 0;
                    }
                }
			}
		}

        if (this.game.attack2 || this.specialAttack) {
            if (this.timeElapsed == 0) {
                this.game.addEntity(new FireBall(this.game, this.x, this.y, this.facing, this));
            }
            this.timeElapsed += TICK;
            if (this.timeElapsed >= 1) {
                this.timeElapsed = 0;
                this.specialAttack = false;
            }
        } else {
            this.timeElapsed = 0;
        }
    };

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (!this.hide) {
            if(this.facing == 0) {
                this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE * this.scale);
            } else if (this.facing == 1) {
                this.animations[1].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE * this.scale);
            }
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            }
        }
    };
    
}