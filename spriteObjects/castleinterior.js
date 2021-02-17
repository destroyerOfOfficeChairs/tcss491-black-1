class CastleWall1Mid {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPG_Buildings_CASTLE_v1.0/castle_interriors.png");
        this.scale = 1;
        this.width = 32;
        this.height = 159;

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
        ctx.drawImage(this.spritesheet,
            544,
            0,
            this.width,
            this.height,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width * PARAMS.SCALE * this.scale,
            this.height * PARAMS.SCALE * this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
        }
    };
}

class CastleWall1LeftCorner {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPG_Buildings_CASTLE_v1.0/castle_interriors.png");
        this.scale = 1;
        this.width = 31;
        this.height = 159;

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
        ctx.drawImage(this.spritesheet,
            513,
            0,
            this.width,
            this.height,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width * PARAMS.SCALE * this.scale,
            this.height * PARAMS.SCALE * this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
        }
    };
}

class CastleWall1RightCorner {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPG_Buildings_CASTLE_v1.0/castle_interriors.png");
        this.scale = 1;
        this.width = 31;
        this.height = 159;

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
        ctx.drawImage(this.spritesheet,
            576,
            0,
            this.width,
            this.height,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width * PARAMS.SCALE * this.scale,
            this.height * PARAMS.SCALE * this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
        }
    };
}

class CastleWall1RightEdge {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPG_Buildings_CASTLE_v1.0/castle_interriors.png");
        this.scale = 1;
        this.width = 16;
        this.height = 16;

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
        ctx.drawImage(this.spritesheet,
            239,
            110,
            this.width,
            this.height,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width * PARAMS.SCALE * this.scale,
            this.height * PARAMS.SCALE * this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
        }
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

    drawMinimap(ctx, mmX, mmY) {
        
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

    drawMinimap(ctx, mmX, mmY) {
        
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