class Grass {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // you can comment/uncomment to test other grass tiles
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass4.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass2.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass.png");

        this.width = 1134;
        this.height = 1134;
    };

    update() {

    };

    // drawMinimap(ctx, mmX, mmY) {
    // }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width / 5, this.height / 5/*, this.x - this.game.camera.x, this.y, PARAMS.BITWIDTH * 5, PARAMS.BITKWIDTH * 2.5*/);
    };
}