class Hero {
	constructor(game, x, y){
		Object.assign(this, { game, x, y });
		
		//this.game = game;
		this.x = x;
		this.y = y;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Hero.png");
		
		this.width = 32;
        this.height = 50;
        this.state = 0; // 0 if idle, 1 if moving, 2 if attacking
        this.facing = 0; // 0 = right, 1 = left, 2 = down, 3 = up
        this.velocity = { x: 0, y: 0 };
		
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
        this.animations[2][0] = new Animator(this.spritesheet, 193, 15, this.width + 7, this.height, 5, 0.5, 0, false, true, false);
        
        // attacking left
        this.animations[2][1] = new Animator(this.spritesheet, 225, 15, this.width, this.height, 5, 0.5, 7, true, true, false);
        
        // attacking down
        this.animations[2][2] = new Animator(this.spritesheet, 0, 15, this.width, this.height + 7, 5, 0.5, 7, false, true, false);
        
        // attacking up
        this.animations[2][3] = new Animator(this.spritesheet, 32, 15, this.width, this.height + 7, 5, 0.5, 7, false, true, false);

    };
	
	update() {
        const TICK = this.game.clockTick;
        const MIN_WALK = 1 * PARAMS.SCALE;
        const MAX_WALK = 2 * PARAMS.SCALE;

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

        // update position
        this.x += this.velocity.x //* TICK * PARAMS.SCALE;
        this.y += this.velocity.y //* TICK * PARAMS.SCALE;

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
        
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, xPosition, yPosition, PARAMS.SCALE);

        /*for testing boundaries
        ctx.fillStyle = "Black";
        ctx.strokeStyle = "Black";
        ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE, this.height * PARAMS.SCALE);
		
		this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE)
		*/
    };
};

class Cleric {
	constructor(game, x, y){
		Object.assign(this, { game, x, y });
		
		//this.game = game;
		this.x = x;
		this.y = y;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Hero.png");
		
		this.width = 32;
        this.height = 50;
        this.state = 0; // 0 if idle, 1 if moving, 2 if attacking
        this.facing = 0; // 0 = right, 1 = left, 2 = down, 3 = up
        this.velocity = { x: 0, y: 0 };
		
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
        this.animations[1][1] = new Animator(this.spritesheet, 160, 143, this.width, this.height, 2, 0.15, 96, true, true, false);
        
        // walking down
        this.animations[1][2] = new Animator(this.spritesheet, 64, 143, this.width, this.height, 2, 0.15, 96, false, true, false);
        
        // walking up
        this.animations[1][3] = new Animator(this.spritesheet, 97, 143, this.width, this.height, 2, 0.15, 96, false, true, false);



        // attacking right
        this.animations[2][0] = new Animator(this.spritesheet, 193, 143, this.width + 7, this.height, 5, 0.5, 0, false, true, false);
        
        // attacking left
        this.animations[2][1] = new Animator(this.spritesheet, 225, 143, this.width, this.height, 5, 0.5, 7, true, true, false);
        
        // attacking down
        this.animations[2][2] = new Animator(this.spritesheet, 0, 143, this.width, this.height + 7, 5, 0.5, 7, false, true, false);
        
        // attacking up
        this.animations[2][3] = new Animator(this.spritesheet, 32, 143, this.width, this.height + 7, 5, 0.5, 7, false, true, false);

    };
	
	update() {
        const TICK = this.game.clockTick;
        const MIN_WALK = 1 * PARAMS.SCALE;
        const MAX_WALK = 2 * PARAMS.SCALE;

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

        // update position
        this.x += this.velocity.x //* TICK * PARAMS.SCALE;
        this.y += this.velocity.y //* TICK * PARAMS.SCALE;

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
        
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, xPosition, yPosition, PARAMS.SCALE);

        /*for testing boundaries
        ctx.fillStyle = "Black";
        ctx.strokeStyle = "Black";
        ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE, this.height * PARAMS.SCALE);
		
		this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE)
		*/
    };
};

