class CastleWall1 {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPG_Buildings_CASTLE_v1.0/castle_interriors.png");
        this.scale = 1;
        this.width = 96;
        this.height = 128;
    }
    update() {

    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet,
            512,
            31,
            this.width,
            this.height,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width * PARAMS.SCALE * this.scale,
            this.height * PARAMS.SCALE * this.scale);
    };
}

class CastleFloor1 {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPG_Buildings_CASTLE_v1.0/castle_interriors.png");
        this.scale = 1;
        this.width = 64;
        this.height = 64;
    }
    update() {

    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet,
            448,
            1120,
            this.width,
            this.height,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width * PARAMS.SCALE * this.scale,
            this.height * PARAMS.SCALE * this.scale);
    };
}

class CastleFloor2 {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPG_Buildings_CASTLE_v1.0/castle_interriors.png");
        this.scale = 1;
        this.width = 128;
        this.height = 160;
    }
    update() {

    }
    draw(ctx) {
        ctx.drawImage(this.spritesheet,
            448,
            416,
            this.width,
            this.height,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width * PARAMS.SCALE * this.scale,
            this.height * PARAMS.SCALE * this.scale);
    };
}