class Dragon {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/dragon.png");
		this.name = "D r a g o n";
        this.scale = 1;
        this.width = 94;
        this.height = 94;
        this.state = 0; // 0 if idle, 1 if moving, 2 if attacking
        this.facing = 0; // 0 = right, 1 = left, 2 = down, 3 = up
        this.velocity = { x: 0, y: 0 };
		this.stats = [500, 150, 150]; // stats = [hp, att, def]

        this.timeElapsed = 0;
        this.stillAttacking = false;
        this.hasShadowBall = true;

        this.animations = [];
        this.loadAnimations();

        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        
        this.leftBB = new BoundingBox(this.x, this.y, this.width * 1/2 * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.rightBB = new BoundingBox(this.x + this.width * 1/2 * PARAMS.SCALE * this.scale, this.y, this.width * 1/2 * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.topBB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * 1/2 * PARAMS.SCALE * this.scale);
        this.bottomBB = new BoundingBox(this.x, this.y + this.height * 1/2 * PARAMS.SCALE * this.scale, this.width * PARAMS.SCALE * this.scale, this.height * 1/2 * PARAMS.SCALE * this.scale);

        // this.leftBB = new BoundingBox(this.x - 1/8 * this.width * PARAMS.SCALE * this.scale, this.y + this.height * PARAMS.SCALE * this.scale * 3/8, this.width * PARAMS.SCALE * this.scale * 1/4, this.height * PARAMS.SCALE * this.scale * 1/4);
        // this.rightBB = new BoundingBox(this.x + this.width * PARAMS.SCALE * this.scale * 7/8, this.y + this.height * PARAMS.SCALE * this.scale * 3/8, this.width * PARAMS.SCALE * this.scale * 1/4, this.height * PARAMS.SCALE * this.scale * 1/4);
        // this.topBB = new BoundingBox(this.x + this.width * PARAMS.SCALE * this.scale * 1/2, this.y - this.height * 1/8 * PARAMS.SCALE * this.scale, this.width * PARAMS.SCALE * this.scale * 1/4, this.height * PARAMS.SCALE * this.scale * 1/4);
        // this.bottomBB = new BoundingBox(this.x + this.width * PARAMS.SCALE * this.scale * 1/4, this.y + this.height * 7/8 * PARAMS.SCALE * this.scale, this.width * PARAMS.SCALE * this.scale * 1/4, this.height * PARAMS.SCALE * this.scale * 1/4);
    
    }

    loadAnimations() {
        for (var i = 0; i < 3; i++) { // 3 states (idle, walking, attacking)
            this.animations.push([]);
            for (var j = 0; j < 4; j++) { // 4 directions (right, left, down, up)
                this.animations[i].push([]);
            }
        }

        // idle right
        this.animations[0][0] = new Animator(this.spritesheet, 0, 194, this.width, this.height, 1, 10, 1, false, true, false);
        
        // idle left
        this.animations[0][1] = new Animator(this.spritesheet, 2, 98, this.width, this.height, 1, 10, 1, false, true, false);
        
        // idle down
        this.animations[0][2] = new Animator(this.spritesheet, 0, 2, this.width, this.height, 1, 10, 1, false, true, false);
        
        // idle up
        this.animations[0][3] = new Animator(this.spritesheet, 2, 288, this.width, this.height, 1, 10, 1, false, true, false);
        


        // moving right
        this.animations[1][0] = new Animator(this.spritesheet, 0, 194, this.width, this.height, 4, 0.1, 3, false, true, false);
        
        // moving left
        this.animations[1][1] = new Animator(this.spritesheet, 2, 98, this.width, this.height, 4, 0.1, 3, true, true, false);
        
        // moving down
        this.animations[1][2] = new Animator(this.spritesheet, 0, 2, this.width, this.height, 4, 0.1, 3, false, true, false);
        
        // moving up
        this.animations[1][3] = new Animator(this.spritesheet, 2, 288, this.width, this.height, 4, 0.1, 3, false, true, false);



        // attacking right
        this.animations[2][0] = this.animations[1][0];
        
        // attacking left
        this.animations[2][1] = this.animations[1][1];
        
        // attacking down
        this.animations[2][2] = this.animations[1][2];
        
        // attacking up
        this.animations[2][3] = this.animations[1][3];

    }

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

        // if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
        // if (this.velocity.x <= -MAX_WALK) this.velocity.x = -MAX_WALK;
        // if (this.velocity.y >= MAX_WALK) this.velocity.y = MAX_WALK;
        // if (this.velocity.y <= -MAX_WALK) this.velocity.y = -MAX_WALK;

        this.stillAttacking = this.state == 2 && !this.animations[2][this.facing].cycled;

        this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;
        if (this.game.attack1 || this.stillAttacking) { // attacks when B is pressed
            this.state = 2;
        }

        // update position
        //this.x += this.velocity.x //* TICK * PARAMS.SCALE;
        //this.y += this.velocity.y //* TICK * PARAMS.SCALE;

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
		

        if (this.game.attack2) {
            if (this.timeElapsed == 0) {
                this.game.addEntity(new ShadowBall(this.game, this.x, this.y, this.facing, this));
                this.hasShadowBall = true;
            }
            this.timeElapsed += TICK;
            if (this.timeElapsed >= 2) {
                this.timeElapsed = 0;
                //this.game.attack2 = false;
            }
        } else {
            this.timeElapsed = 0;
        }
    }

    draw(ctx) {
        let xPosition = this.x;
        let yPosition = this.y;
        
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, xPosition-this.game.camera.x, yPosition-this.game.camera.y, PARAMS.SCALE * this.scale);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
        }

        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x -  this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
    }
}





class Goblin {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/goblin.png");
		this.name = "G o b l i n";
        this.scale = 3/4;
        this.width = 57;
        this.height = 57;
        this.state = 0; // 0 if idle, 1 if moving, 2 if attacking
        this.facing = 0; // 0 = right, 1 = left, 2 = down, 3 = up
        this.velocity = { x: 0, y: 0 };
		this.stats = [50, 5, 1];
		// stats = [hp, att, def]

        this.stillAttacking = false;

        this.animations = [];
        this.loadAnimations();

        //this.animation = new Animator(this.spritesheet, 80, 205, 30, 50, 8, 0.15, 34, false, true);
        //this.loadAnimations(spritesheet);
        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x - 1/8 * this.width * PARAMS.SCALE * this.scale, this.y + this.height * PARAMS.SCALE * this.scale * 3/8, this.width * PARAMS.SCALE * this.scale * 1/4, this.height * PARAMS.SCALE * this.scale * 1/4);
        this.rightBB = new BoundingBox(this.x + this.width * PARAMS.SCALE * this.scale * 7/8, this.y + this.height * PARAMS.SCALE * this.scale * 3/8, this.width * PARAMS.SCALE * this.scale * 1/4, this.height * PARAMS.SCALE * this.scale * 1/4);
        this.topBB = new BoundingBox(this.x + this.width * PARAMS.SCALE * this.scale * 1/2, this.y - this.height * 1/8 * PARAMS.SCALE * this.scale, this.width * PARAMS.SCALE * this.scale * 1/4, this.height * PARAMS.SCALE * this.scale * 1/4);
        this.bottomBB = new BoundingBox(this.x + this.width * PARAMS.SCALE * this.scale * 1/4, this.y + this.height * 7/8 * PARAMS.SCALE * this.scale, this.width * PARAMS.SCALE * this.scale * 1/4, this.height * PARAMS.SCALE * this.scale * 1/4);
    
    }

    loadAnimations() {
        for (var i = 0; i < 3; i++) { // 3 states (idle, walking, attacking)
            this.animations.push([]);
            for (var j = 0; j < 4; j++) { // 4 directions (right, left, down, up)
                this.animations[i].push([]);
            }
        }

        // idle right
        this.animations[0][0] = new Animator(this.spritesheet, -1, 193, this.width, this.height, 1, 10, 34, false, true, false);
        
        // idle left
        this.animations[0][1] = new Animator(this.spritesheet, 9, 67, this.width, this.height, 1, 10, 34, false, true, false);
        
        // idle down
        this.animations[0][2] = new Animator(this.spritesheet, 5, 126, this.width, this.height, 1, 10, 34, false, true, false);
        
        // idle up
        this.animations[0][3] = new Animator(this.spritesheet, 4, 8, this.width, this.height, 1, 10, 34, false, true, false);
        


        // walking right
        this.animations[1][0] = new Animator(this.spritesheet, -1, 193, this.width, this.height, 7, 0.1, 7, false, true, false);
        
        // walking left
        this.animations[1][1] = new Animator(this.spritesheet, 9, 67, this.width, this.height, 7, 0.1, 7, true, true, false);
        
        // walking down
        this.animations[1][2] = new Animator(this.spritesheet, 5, 126, this.width, this.height, 7, 0.1, 7, false, true, false);
        
        // walking up
        this.animations[1][3] = new Animator(this.spritesheet, 4, 8, this.width, this.height, 7, 0.1, 7, false, true, false);



        // attacking right
        this.animations[2][0] = new Animator(this.spritesheet, -1, 451, this.width + 7, this.height, 5, 0.1, 0, false, true, false);
        
        // attacking left
        this.animations[2][1] = new Animator(this.spritesheet, 0, 323, this.width, this.height, 5, 0.1, 7, true, true, false);
        
        // attacking down
        this.animations[2][2] = new Animator(this.spritesheet, 5, 383, this.width, this.height + 7, 5, 0.1, 7, false, true, false);
        
        // attacking up
        this.animations[2][3] = new Animator(this.spritesheet, 4, 255, this.width, this.height + 7, 5, 0.1, 7, false, true, false);

    }

    update() {
        const TICK = this.game.clockTick;
        const MIN_WALK = 1 * PARAMS.SCALE;
        const MAX_WALK = 2 * PARAMS.SCALE;

        if (this.game.down && !this.game.up) { // keyboard input of down
            this.facing = 2;
            //this.velocity.y += MIN_WALK;
        } else if (!this.game.down && this.game.up) { // keyboard input of up
            this.facing = 3;
            //this.velocity.y -= MIN_WALK;
        } else {
            // do nothing
            this.velocity.y = 0;
        }

        if (this.game.right && !this.game.left) { //keyboard input of right
            this.facing = 0;
            //this.velocity.x += MIN_WALK;
        } else if (!this.game.right && this.game.left) { // keyboard input of left
            this.facing = 1;
            //this.velocity.x -= MIN_WALK;
        } else {
            // do nothing
            this.velocity.x = 0;
        }

        // if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
        // if (this.velocity.x <= -MAX_WALK) this.velocity.x = -MAX_WALK;
        // if (this.velocity.y >= MAX_WALK) this.velocity.y = MAX_WALK;
        // if (this.velocity.y <= -MAX_WALK) this.velocity.y = -MAX_WALK;

        this.stillAttacking = this.state == 2 && !this.animations[2][this.facing].cycled;

        this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;
        if (this.game.attack1 || this.stillAttacking) { // attacks when B is pressed
            this.state = 2;
        }

        // update position
        //this.x += this.velocity.x //* TICK * PARAMS.SCALE;
        //this.y += this.velocity.y //* TICK * PARAMS.SCALE;

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
		
    }

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
        
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, xPosition-this.game.camera.x, yPosition-this.game.camera.y, PARAMS.SCALE * this.scale);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
        }

        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x -  this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
    }
}



class Bat {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bat.png");
		this.name = "B a t";
        this.scale = 1;
        this.width = 33;
        this.height = 33;
        this.facing = 0; // 0 = right, 1 = left, 2 = down, 3 = up
        //this.steps = 0; // number of steps has taken
        this.velocity = { x: 0, y: 0 };
		this.stats = [25, 3, 0];
		// stats = [hp, att, def]
		
        this.animations = [];
        this.loadAnimations();
        //this.animation = new Animator(this.spritesheet, 80, 205, 30, 50, 8, 0.15, 34, false, true);

        //this.loadAnimations(spritesheet);
        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.rightBB = new BoundingBox(this.x + this.width * PARAMS.SCALE * this.scale, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.topBB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, 1);
        this.bottomBB = new BoundingBox(this.x, this.y + this.height * PARAMS.SCALE * this.scale, this.width * PARAMS.SCALE * this.scale, 1);
    
    }

    loadAnimations() {
        for (var i = 0; i < 4; i++) { // 4 directions (right, left, down, up)
            this.animations.push([]);
        }

        // moving right
        this.animations[0] = new Animator(this.spritesheet, 8, 82, this.width, this.height, 3, 0.1, 15, false, true);
        
        // moving left
        this.animations[1] = new Animator(this.spritesheet, 8, 210, this.width, this.height, 3, 0.1, 15, false, true);
        
        // moving down
        this.animations[2] = new Animator(this.spritesheet, 8, 144, this.width, this.height, 3, 0.1, 15, false, true);
        
        // moving up
        this.animations[3] = new Animator(this.spritesheet, 8, 16, this.width, this.height, 3, 0.1, 15, false, true);

    }

    update() {
        const TICK = this.game.clockTick;
        const MIN_WALK = 1 * PARAMS.SCALE;
        const MAX_WALK = 2 * PARAMS.SCALE;

        if (this.game.down && !this.game.up) { // keyboard input of down
            this.facing = 2;
            //this.velocity.y += MIN_WALK;
        } else if (!this.game.down && this.game.up) { // keyboard input of up
            this.facing = 3;
            //this.velocity.y -= MIN_WALK;
        } else {
            // do nothing
            this.velocity.y = 0;
        }

        if (this.game.right && !this.game.left) { //keyboard input of right
            this.facing = 0;
            //this.velocity.x += MIN_WALK;
        } else if (!this.game.right && this.game.left) { // keyboard input of left
            this.facing = 1;
            //this.velocity.x -= MIN_WALK;
        } else {
            // do nothing
            this.velocity.x = 0;
        }

        // if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
        // if (this.velocity.x <= -MAX_WALK) this.velocity.x = -MAX_WALK;
        // if (this.velocity.y >= MAX_WALK) this.velocity.y = MAX_WALK;
        // if (this.velocity.y <= -MAX_WALK) this.velocity.y = -MAX_WALK;

        this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;

        // update position
        //this.x += this.velocity.x //* TICK * PARAMS.SCALE;
        //this.y += this.velocity.y //* TICK * PARAMS.SCALE;
        
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
    }

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, PARAMS.SCALE * this.scale);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
        }
        
        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE, this.height * PARAMS.SCALE);
    }
}



class Skeleton {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/skeleton.png");
        this.background = ASSET_MANAGER.getAsset("./sprites/DungeonBackground.png");
		this.name = "S k e l e t o n";
        this.scale = 3/4;
        this.width = 30;
        this.height = 50;
        this.state = 0; // 0 if idle, 1 if moving
        this.facing = 0; // 0 = right, 1 = left, 2 = down, 3 = up
        //this.steps = 0; // number of steps skeleton has taken
        this.velocity = { x: 0, y: 0 };
		this.stillAttacking = false;
		this.stats = [75, 8, 3];
		// stats = [hp, att, def]
		
        this.animations = [];
        this.loadAnimations();
        //this.animation = new Animator(this.spritesheet, 80, 205, 30, 50, 8, 0.15, 34, false, true);

        //this.loadAnimations(spritesheet);
        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.rightBB = new BoundingBox(this.x + this.width * PARAMS.SCALE * this.scale, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.topBB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, 1);
        this.bottomBB = new BoundingBox(this.x, this.y + this.height * PARAMS.SCALE * this.scale, this.width * PARAMS.SCALE * this.scale, 1);
    
    }

    loadAnimations() {
        for (var i = 0; i < 2; i++) { // 2 states (idle, walking)
            this.animations.push([]);
            for (var j = 0; j < 4; j++) { // 4 directions (right, left, down, up)
                this.animations[i].push([]);
            }
        }

        // idle right
        this.animations[0][0] = new Animator(this.spritesheet, 17, 205, this.width, this.height, 1, 10, 34, false, true);
        
        // idle left
        this.animations[0][1] = new Animator(this.spritesheet, 18, 77, this.width, this.height, 1, 10, 34, false, true);
        
        // idle down
        this.animations[0][2] = new Animator(this.spritesheet, 337, 142, this.width, this.height, 1, 10, 34, false, true);
        
        // idle up
        this.animations[0][3] = new Animator(this.spritesheet, 337, 14, this.width, this.height, 1, 10, 34, false, true);
        


        // walking right
        this.animations[1][0] = new Animator(this.spritesheet, 80, 205, this.width, this.height, 8, 0.1, 34, false, true);
        
        // walking left
        this.animations[1][1] = new Animator(this.spritesheet, 82, 77, this.width, this.height, 8, 0.1, 34, false, true);
        
        // walking down
        this.animations[1][2] = new Animator(this.spritesheet, 81, 142, this.width, this.height, 8, 0.1, 34, false, true);
        
        // walking up
        this.animations[1][3] = new Animator(this.spritesheet, 81, 14, this.width, this.height, 8, 0.1, 34, false, true);

    }

    update() {
        const TICK = this.game.clockTick;
        const MIN_WALK = 1 * PARAMS.SCALE;
        const MAX_WALK = 2 * PARAMS.SCALE;

        if (this.game.down && !this.game.up) { // keyboard input of down
            this.facing = 2;
            //this.velocity.y += MIN_WALK;
        } else if (!this.game.down && this.game.up) { // keyboard input of up
            this.facing = 3;
            //this.velocity.y -= MIN_WALK;
        } else {
            // do nothing
            this.velocity.y = 0;
        }

        if (this.game.right && !this.game.left) { //keyboard input of right
            this.facing = 0;
            //this.velocity.x += MIN_WALK;
        } else if (!this.game.right && this.game.left) { // keyboard input of left
            this.facing = 1;
            //this.velocity.x -= MIN_WALK;
        } else {
            // do nothing
            this.velocity.x = 0;
        }

        // if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
        // if (this.velocity.x <= -MAX_WALK) this.velocity.x = -MAX_WALK;
        // if (this.velocity.y >= MAX_WALK) this.velocity.y = MAX_WALK;
        // if (this.velocity.y <= -MAX_WALK) this.velocity.y = -MAX_WALK;

        this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;

        // update position
        //this.x += this.velocity.x //* TICK * PARAMS.SCALE;
        //this.y += this.velocity.y //* TICK * PARAMS.SCALE;

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
		
		this.stillAttacking = this.state == 1 && !this.animations[1][this.facing].cycled;

        this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;
        if (this.game.attack1 || this.stillAttacking) { // attacks when B is pressed
            this.state = 1;
        }
		
    }

    draw(ctx) {
        //ctx.drawImage(this.background, 0, 0, 288 * 3.6, 160 * 3.6);


        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, PARAMS.SCALE * this.scale);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
        }
        
        //for testing boundaries of skeleton
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE, this.height * PARAMS.SCALE);


        // this.animations[this.facing].drawFrame(this.game.clockTick, ctx, -100  + this.steps * 2, 300, 4);
        // this.steps++;
        // if (this.steps === 550) {
        //     this.steps = 0;
        // }

        //ctx.drawImage(this.spritesheet, 20, 205, 25, 50, 100, 100, 25 * 2, 50 * 2);

        //ctx.drawImage(this.spritesheet, 0, 0, 576 * 1.5, 256 * 1.5);
        //ctx.drawImage(this.spritesheet, 0, 0, 576, 256);
    }
}