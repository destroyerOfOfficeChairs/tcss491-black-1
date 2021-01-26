class Grass {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // you can comment/uncomment to test other grass tiles
        // this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass4.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass2.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPGW_Grassland_v1.3/MainLevBuild.png");

        // this.width = 1134;
        // this.height = 1134;
    };

    update() {

    };

    // drawMinimap(ctx, mmX, mmY) {
    // }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 128, 1280, 32, 32, this.x - this.game.camera.x, this.y - this.game.camera.y, 32, 32);
    };
}



class StonePath {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPGW_Grassland_v1.3/MainLevBuild.png");

        this.width = 60;
        this.height = 60;
    };

    update() {

    };

    // drawMinimap(ctx, mmX, mmY) {
    // }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1634, 1570, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width, this.height);
    };
}



class DirtPath {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPGW_Grassland_v1.3/MainLevBuild.png");
        this.width = 50;
        this.height = 50;
    };

    update() {

    };

    // drawMinimap(ctx, mmX, mmY) {
    // }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1317, 1237, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width, this.height);
    };
}



class Rock {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/stone.png");
        this.width = 270;
        this.height = 270;
    };

    update() {

    };

    // drawMinimap(ctx, mmX, mmY) {
    // }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width / 8, this.height / 8);
    };
}



class Bush {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bush.png");
        this.width = 173;
        this.height = 173;
    };

    update() {

    };

    // drawMinimap(ctx, mmX, mmY) {
    // }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width / 4, this.height / 4);
    };
}



class Tree {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPGW_Grassland_v1.3/decorative.png");
        this.width = 130;
        this.height = 155;
    };

    update() {

    };

    // drawMinimap(ctx, mmX, mmY) {
    // }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 578, 827, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width / 2, this.height / 2);
    };
}



class Water {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/RPGW_Grassland_v1.3/MainLevBuild.png");
        this.width = 126;
        this.height = 126;
    };

    update() {

    };

    // drawMinimap(ctx, mmX, mmY) {
    // }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1760, 833, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width / 2, this.height / 2);
    };
}


class Wall {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/walls.jpg");
        this.width = 310;
        this.height = 310;
    };

    update() {

    };

    // drawMinimap(ctx, mmX, mmY) {
    // }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x - this.game.camera.x, this.y - this.game.camera.y, this.width / 8, this.height / 8);
    };
}