class TitleScreen {
    constructor(game, x, y, hero, level, heroX, heroY) {
        Object.assign(this, {game, x, y, hero, level, heroX, heroY});
        this.image = ASSET_MANAGER.getAsset("./sprites/title_screen.png");
    }

    update() {
        if (this.game.attack1) this.level(this.heroX, this.heroY);
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, 256, 224);
    }
}