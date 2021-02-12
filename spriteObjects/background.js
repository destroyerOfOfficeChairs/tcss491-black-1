class Grass1 {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // you can comment/uncomment to test other grass tiles
        // this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass4.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass2.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPGW_Grassland_v1.3/MainLevBuild.png");
        this.scale = 1;
        this.width = 32;
        this.height = 32;

        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
    };

    update() {

    };

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 128, 1280, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}



class StonePath {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPGW_Grassland_v1.3/MainLevBuild.png");
        this.scale = 1;
        this.width = 60;
        this.height = 60;
        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
    };

    update() {

    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "DarkGoldenRod";
        ctx.fillRect(mmX + this.x * this.game.levelToMapRatio, mmY + this.y * this.game.levelToMapRatio, this.width * PARAMS.SCALE * this.scale * this.game.levelToMapRatio, this.height * PARAMS.SCALE * this.scale * this.game.levelToMapRatio);
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1634, 1570, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}



class DirtPath {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPGW_Grassland_v1.3/MainLevBuild.png");
        this.scale = 1;
        this.width = 50;
        this.height = 50;
    };

    update() {

    };

    drawMinimap(ctx, mmX, mmY) {
        
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1317, 1237, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
    };
}



class Rock {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/stone.png");
        this.scale = 1/8;
        this.width = 270;
        this.height = 270;

        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.rightBB = new BoundingBox(this.x + this.width * PARAMS.SCALE * this.scale, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.topBB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, 1);
        this.bottomBB = new BoundingBox(this.x, this.y + this.height * PARAMS.SCALE * this.scale, this.width * PARAMS.SCALE * this.scale, 1);
    
    };

    update() {

    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Gray";
        ctx.fillRect(mmX + this.x * this.game.levelToMapRatio, mmY + this.y * this.game.levelToMapRatio, this.width * PARAMS.SCALE * this.scale * this.game.levelToMapRatio, this.height * PARAMS.SCALE * this.scale * this.game.levelToMapRatio);
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
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



class Bush {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bush.png");
        this.scale = 1/4;
        this.width = 173;
        this.height = 173;
    };

    update() {

    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "LawnGreen";
        ctx.fillRect(mmX + this.x * this.game.levelToMapRatio, mmY + this.y * this.game.levelToMapRatio, this.width * PARAMS.SCALE * this.scale * this.game.levelToMapRatio, this.height * PARAMS.SCALE * this.scale * this.game.levelToMapRatio);
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
    };
}



class Tree {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPGW_Grassland_v1.3/decorative.png");
        this.scale = 1/2;
        this.width = 130;
        this.height = 155;

        this.BB = new BoundingBox(this.x + 1/8 * this.width * PARAMS.SCALE * this.scale, this.y, 3/4 * this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x + 1/8 * this.width * PARAMS.SCALE * this.scale, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.rightBB = new BoundingBox(this.x + 7/8 * this.width * PARAMS.SCALE * this.scale, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.topBB = new BoundingBox(this.x + 1/8 * this.width * PARAMS.SCALE * this.scale, this.y, 3/4 * this.width * PARAMS.SCALE * this.scale, 1);
        this.bottomBB = new BoundingBox(this.x + 1/8 * this.width * PARAMS.SCALE * this.scale, this.y + this.height * PARAMS.SCALE * this.scale, 3/4 * this.width * PARAMS.SCALE * this.scale, 1);
    
    };

    update() {

    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Green";
        ctx.fillRect(mmX + this.x * this.game.levelToMapRatio, mmY + this.y * this.game.levelToMapRatio, this.width * PARAMS.SCALE * this.scale * this.game.levelToMapRatio, this.height * PARAMS.SCALE * this.scale * this.game.levelToMapRatio);
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 578, 827, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
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



class Water {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPGW_Grassland_v1.3/MainLevBuild.png");
        this.scale = 1/2;
        this.width = 126;
        this.height = 126;

        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.rightBB = new BoundingBox(this.x + this.width * PARAMS.SCALE * this.scale, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.topBB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, 1);
        this.bottomBB = new BoundingBox(this.x, this.y + this.height * PARAMS.SCALE * this.scale, this.width * PARAMS.SCALE * this.scale, 1);
    };

    update() {
        
    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Blue";
        ctx.fillRect(mmX + this.x * this.game.levelToMapRatio, mmY + this.y * this.game.levelToMapRatio, this.width * PARAMS.SCALE * this.scale * this.game.levelToMapRatio, this.height * PARAMS.SCALE * this.scale * this.game.levelToMapRatio);
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1760, 833, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
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


class Wall {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/walls.jpg");
        this.scale = 1/8;
        this.width = 310;
        this.height = 310;

        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.rightBB = new BoundingBox(this.x + this.width * PARAMS.SCALE * this.scale, this.y, 1, this.height * PARAMS.SCALE * this.scale);
        this.topBB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE * this.scale, 1);
        this.bottomBB = new BoundingBox(this.x, this.y + this.height * PARAMS.SCALE * this.scale, this.width * PARAMS.SCALE * this.scale, 1);
    
    };

    update() {

    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Brown";
        // ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH + 5, mmY + this.y / PARAMS.BITWIDTH + 5, this.w / PARAMS.BITWIDTH, 6);
        ctx.fillRect(mmX + this.x * this.game.levelToMapRatio, mmY + this.y * this.game.levelToMapRatio, this.width * PARAMS.SCALE * this.scale * this.game.levelToMapRatio, this.height * PARAMS.SCALE * this.scale * this.game.levelToMapRatio);

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
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