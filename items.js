class Crystal {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        //choose 1 and uncomment the class as necessary
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/crystal.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/gem.png");

        // for crystal.png
        this.width = 24;
        this.height = 34;
        // if animation, uncomment
        this.animation = new Animator(this.spritesheet, 0, 40, this.width, this.height, 5, 0.5, 4, false, true);


        // for gem.png
        // this.width = 115;
        // this.height = 95;

    }

    update() {

    }

    draw(ctx) {
        // for crystal.png with animation
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE / 1.5);

        //for crystal.png without animation
        //ctx.drawImage(this.spritesheet, 55, 40, this.width, this.height, this.x, this.y, this.width * PARAMS.SCALE / 2, this.height * PARAMS.SCALE / 2);

        // for gem.png
        //ctx.drawImage(this.spritesheet, 135, 145, this.width, this.height, this.x, this.y, this.width * PARAMS.SCALE / 5, this.height * PARAMS.SCALE / 5);


        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE, this.height * PARAMS.SCALE);
    }
}



class Coin {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/coin.png");
        this.width = 172;
        this.height = 172;
        this.animation = new Animator(this.spritesheet, 20, 40, this.width, this.height, 6, 0.2, 26, false, true);
    }

    update() {

    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE / 10);

        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE / 10, this.height * PARAMS.SCALE / 10);
    }
}



class Key {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/key.png");

        this.width = 250;//220, 270
        this.height = 150;//90, 170
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 55, 85, this.width, this.height, this.x, this.y, this.width * PARAMS.SCALE / 10, this.height * PARAMS.SCALE / 10);
        //55, 85 or 76, 126

        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE / 10, this.height * PARAMS.SCALE / 10);
    }
}

class Lock {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/lock.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/lockeddoors.png");

        this.width = 200;
        this.height = 300;
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 297, 355, this.width, this.height, this.x, this.y, this.width * PARAMS.SCALE / 5, this.height * PARAMS.SCALE / 5);
        //55, 85 or 76, 126

        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE / 5, this.height * PARAMS.SCALE / 5);
    }
}

class Box {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boxes.png");

        this.width = 250;
        this.height = 250;
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 55, 45, this.width, this.height, this.x, this.y, this.width * PARAMS.SCALE / 8, this.height * PARAMS.SCALE / 8);
        //55, 85 or 76, 126

        //for testing boundaries
        // ctx.fillStyle = "Black";
        // ctx.strokeStyle = "Black";
        // ctx.strokeRect(this.x, this.y, this.width * PARAMS.SCALE / 8, this.height * PARAMS.SCALE / 8);
    }
}