class TitleScreen {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.image = ASSET_MANAGER.getAsset("./sprites/title_screen.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/pressB.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 32, 32, 5, 0.1, 0, false, true, true);
    }

    update() {
        // if (this.game.attack1) // I have no idea
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, 256, 224);
        this.animation.drawFrame(this.game.clockTick, ctx, 32, 48, 1);
    }
}