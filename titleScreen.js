class TitleScreen {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // you can comment/uncomment to test other grass tiles
        // this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass4.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass2.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/grass.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/title_screen.png");
        // this.animation = new Animator(this.spritesheet, 0, 0, 32, 32, 1, 0.3, 0, false, true, false);
        this.pressB = new PressB(this.game, 64, 64);

        // this.width = 1134;
        // this.height = 1134;
    };

    update() {

    };

    // drawMinimap(ctx, mmX, mmY) {
    // }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 256, 224);
    };
}

class PressB {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/pressB.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 32, 32, 2, 0.3, 0, false, true, false);
    };

    update() {

    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    }
}