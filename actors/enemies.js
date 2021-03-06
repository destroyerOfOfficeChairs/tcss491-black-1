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
		this.stats = this.game.camera.bossStats; // stats = [hp, att, def, spd]

        this.timeElapsed = 0;
        this.stillAttacking = false;
        this.hasShadowBall = true;
		this.removeFromWorld = false;

        this.basicAttack = false;
        this.specialAttack = false;
        this.timeElapsedBasic = 0;

        this.animations = [];
        this.loadAnimations();
        this.updateBB();
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

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
        this.leftBB = new BoundingBox(this.x, this.y, this.width * 1/2 * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.rightBB = new BoundingBox(this.x + this.width * 1/2 * PARAMS.SCALE * this.scale, this.y, this.width * 1/2 * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.topBB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * 1/2 * PARAMS.SCALE * this.scale);
        this.bottomBB = new BoundingBox(this.x, this.y + this.height * 1/2 * PARAMS.SCALE * this.scale, this.width * PARAMS.SCALE * this.scale, this.height * 1/2 * PARAMS.SCALE * this.scale);
    };

    update() {
        const TICK = this.game.clockTick;
        const MIN_WALK = 1 * PARAMS.SCALE;
        const MAX_WALK = 2 * PARAMS.SCALE;

        this.updateBB();

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
        }

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

        if (this.game.attack2 || this.specialAttack) {
            if (this.timeElapsed == 0) {
                this.game.addEntity(new ShadowBall(this.game, this.x, this.y, this.facing, this));
                this.hasShadowBall = true;
            }
            this.timeElapsed += TICK;
            if (this.timeElapsed >= 2) {
                this.timeElapsed = 0;
                this.specialAttack = false;
            }
        } else {
            this.timeElapsed = 0;
        }
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE * this.scale);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
        }
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
		this.stats = [140, 40, 6, 2]; // stats = [hp, att, def, spd]
        this.canShoot = true;
		this.removeFromWorld = false;

        this.basicAttack = false;
        this.specialAttack = false;
        this.stillAttacking = false;

        this.timeelapsed = 0;
        this.timeElapsedBasic = 0;

        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
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

        if (!this.game.camera.battle) {
            if (this.game.down && !this.game.up) { // keyboard input of down
                this.facing = 2;
            } else if (!this.game.down && this.game.up) { // keyboard input of up
                this.facing = 3;
            } else {
                // do nothing
                this.velocity.y = 0;
            }
    
            if (this.game.right && !this.game.left) { //keyboard input of right
                this.facing = 0;
            } else if (!this.game.right && this.game.left) { // keyboard input of left
                this.facing = 1;
            } else {
                // do nothing
                this.velocity.x = 0;
            }
        }

        this.updateBB();

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

        if (this.game.attack2 || this.specialAttack) {
            if (this.timeElapsed >= 0 && this.canShoot) {
                this.game.addEntity(new Laser(this.game, this.x, this.y, this.facing, this));
                this.canShoot = false;
            }
            this.timeElapsed += TICK;
            if (this.timeElapsed >= 1) {
                this.timeElapsed = 0;
                this.canShoot = true;
                this.specialAttack = false;
            }
        } else {
            this.timeElapsed = 0;
            this.canShoot = true;
        }
    }

    drawMinimap(ctx, mmX, mmY) {
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
        this.velocity = { x: 0, y: 0 };
		this.stats = [100, 32, 20, 3]; // stats = [hp, att, def, spd]
        this.canShoot = false;
		this.removeFromWorld = false;

        this.basicAttack = false;
        this.specialAttack = false;

        this.timeElapsed = 0;
        this.timeElapsedBasic = 0;
		
        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
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

        if (!this.game.camera.battle) {
            if (this.game.down && !this.game.up) { // keyboard input of down
                this.facing = 2;
            } else if (!this.game.down && this.game.up) { // keyboard input of up
                this.facing = 3;
            } else {
                // do nothing
                this.velocity.y = 0;
            }
    
            if (this.game.right && !this.game.left) { //keyboard input of right
                this.facing = 0;
            } else if (!this.game.right && this.game.left) { // keyboard input of left
                this.facing = 1;
            } else {
                // do nothing
                this.velocity.x = 0;
            }
        }

        this.updateBB();

        this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;

        if (this.basicAttack || this.game.attack1) { // attacks during its turn
            if (this.basicAttack) {
                this.timeElapsedBasic += this.game.clockTick;
                if (this.timeElapsedBasic > 1) {
                    this.basicAttack = false;
                    this.timeElapsedBasic = 0;
                }
            }
        }

        if (this.game.attack2 || this.specialAttack) {
            if (this.timeElapsed >= 0 && this.canShoot) {
                this.game.addEntity(new SonicWave(this.game, this.x, this.y, this.facing, this));
                this.canShoot = false;
            }
            this.timeElapsed += TICK;
            if (this.timeElapsed >= 1) {
                this.timeElapsed = 0;
                this.canShoot = true;
                this.specialAttack = false;
            }
        } else {
            this.timeElapsed = 0;
            this.canShoot = true;
        }
    }

    drawMinimap(ctx, mmX, mmY) {
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
    }
}



class Skeleton {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/skeleton.png");
		this.name = "S k e l e t o n";
        this.scale = 3/4;
        this.width = 30;
        this.height = 50;
        
        this.state = 0; // 0 if idle, 1 if moving
        this.facing = 0; // 0 = right, 1 = left, 2 = down, 3 = up
        this.velocity = { x: 0, y: 0 };
		this.stillAttacking = false;
        this.canShoot = false;
		this.removeFromWorld = false;

        this.basicAttack = false;
        this.specialAttack = false;

        this.timeElapsed = 0;
        this.timeElapsedBasic = 0;
        this.timeElapsedSpecial = 0;

		this.stats = [200, 50, 10, 1]; // stats = [hp, att, def, spd]
		
        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
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

        if (!this.game.camera.battle) {
            if (this.game.down && !this.game.up) { // keyboard input of down
                this.facing = 2;
            } else if (!this.game.down && this.game.up) { // keyboard input of up
                this.facing = 3;
            } else {
                // do nothing
                this.velocity.y = 0;
            }
    
            if (this.game.right && !this.game.left) { //keyboard input of right
                this.facing = 0;
            } else if (!this.game.right && this.game.left) { // keyboard input of left
                this.facing = 1;
            } else {
                // do nothing
                this.velocity.x = 0;
            }
        }

        this.updateBB();

        this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;
		
		this.stillAttacking = this.state == 1 && !this.animations[1][this.facing].cycled;

        this.state = (this.velocity.x == 0 && this.velocity.y == 0) ? 0 : 1;

        if (this.basicAttack || this.game.attack1 || this.stillAttacking) { // attacks during its turn
            this.state = 1;
            if (this.basicAttack) {
                this.timeElapsedBasic += this.game.clockTick;
                if (this.timeElapsedBasic > 1) {
                    this.basicAttack = false;
                    this.timeElapsedBasic = 0;
                }
            }
        }

        if (this.basicAttack || this.game.attack1 || this.stillAttacking) {
            if (this.timeElapsed >= 0 && this.canShoot) {
                this.game.addEntity(new BoneDart(this.game, this.x, this.y, this.facing, this));
                this.canShoot = false;
            }
            this.timeElapsed += TICK;
            if (this.timeElapsed >= 1) {
                this.timeElapsed = 0;
                this.canShoot = true;
            }
        } else if (!this.game.attack1 && !this.stillAttacking) {
            this.timeElapsed = 0;
            this.canShoot = true;
        }

        if (this.specialAttack || this.game.attack2) { // attacks during its turn
            if (this.specialAttack) {
                this.timeElapsedSpecial += this.game.clockTick;
                if (this.timeElapsedSpecial > 1) {
                    this.specialAttack = false;
                    this.timeElapsedSpecial= 0;
                }
            }
        }
		
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y, PARAMS.SCALE * this.scale);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
        }
    }
}