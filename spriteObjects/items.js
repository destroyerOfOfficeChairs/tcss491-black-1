class Crystal {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        //choose 1 and uncomment the class as necessary
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/crystal.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/gem.png");

        // for crystal.png
        this.scale = 2/3;
        this.width = 24;
        this.height = 34;

        // if animation, uncomment
        this.animation = new Animator(this.spritesheet, 0, 40, this.width, this.height, 5, 0.5, 4, false, true);


        // for gem.png
        // this.width = 115;
        // this.height = 95;

        this.BB = new BoundingBox(this.x + 1/8 * this.width * PARAMS.SCALE * this.scale, this.y, 3/4 * this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
    }

    update() {

    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        // for crystal.png with animation
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE * this.scale);

        //for crystal.png without animation
        //ctx.drawImage(this.spritesheet, 55, 40, this.width, this.height, this.x, this.y, this.width * PARAMS.SCALE / 2, this.height * PARAMS.SCALE / 2);

        // for gem.png
        //ctx.drawImage(this.spritesheet, 135, 145, this.width, this.height, this.x, this.y, this.width * PARAMS.SCALE / 5, this.height * PARAMS.SCALE / 5);

        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE, this.height * PARAMS.SCALE);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height); 
        }
    }
}



class Coin {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/coin.png");
        this.scale = 1/10;
        this.width = 172;
        this.height = 172;
        this.animation = new Animator(this.spritesheet, 20, 40, this.width, this.height, 6, 0.2, 26, false, true);

        this.BB = new BoundingBox(this.x + 1/8 * this.width * PARAMS.SCALE * this.scale, this.y, 3/4 * this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
    }

    update() {

    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE * this.scale);

        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE / 10, this.height * PARAMS.SCALE / 10);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}



class Key {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/key.png");

        this.scale = 1/10;
        this.width = 250;//220, 270
        this.height = 150;//90, 170

        this.BB = new BoundingBox(this.x + 1/8 * this.width * PARAMS.SCALE * this.scale, this.y, 3/4 * this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
    }

    update() {

    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 55, 85, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        //55, 85 or 76, 126

        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE / 10, this.height * PARAMS.SCALE / 10);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}

class Lock {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/lock.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/lockeddoors.png");

        this.scale = 1/5;
        this.width = 200;
        this.height = 300;

        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.rightBB = new BoundingBox(this.x + this.width * PARAMS.SCALE * this.scale, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.topBB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, 1);
        this.bottomBB = new BoundingBox(this.x, this.y + this.height * PARAMS.SCALE * this.scale, this.width * PARAMS.SCALE * this.scale, 1);
    
    }

    update() {

    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 297, 355, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        //55, 85 or 76, 126

        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE / 5, this.height * PARAMS.SCALE / 5);

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

class Box {
    constructor(game, x, y, item) {
        Object.assign(this, { game, x, y, item });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boxes.png");

        this.scale = 1/8;
        this.width = 250;
        this.height = 250;

        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.rightBB = new BoundingBox(this.x + this.width * PARAMS.SCALE * this.scale, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.topBB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, 1);
        this.bottomBB = new BoundingBox(this.x, this.y + this.height * PARAMS.SCALE * this.scale, this.width * PARAMS.SCALE * this.scale, 1);
    
    }

    update() {

    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 55, 45, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        //55, 85 or 76, 126

        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE / 8, this.height * PARAMS.SCALE / 8);

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