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