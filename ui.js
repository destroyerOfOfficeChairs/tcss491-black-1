class TitleScreen {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.image = ASSET_MANAGER.getAsset("./sprites/title_screen.png");
    }

    update() {
        // if (this.game.attack1) // I have no idea
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, 256, 224);
    }
}