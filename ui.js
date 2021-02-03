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

class MainMenu {
    constructor(game) {
        Object.assign(this, {game});
        this.visible = false;
        this.padding = 5;
    }

    update() {
    }

    draw(ctx) {
        if (this.game.menu) {
            ctx.font = "8px Georgia";

            ctx.fillStyle = "Tan";
            ctx.fillRect(this.padding * 3, this.padding * 3, PARAMS.CANVASWIDTH - 6 * this.padding, PARAMS.CANVASHEIGHT - 6 * this.padding);
            ctx.strokeStyle = "Brown";
            ctx.strokeRect(this.padding * 3, this.padding * 3, PARAMS.CANVASWIDTH - 6 * this.padding, PARAMS.CANVASHEIGHT - 6 * this.padding);
            
            ctx.fillStyle = "Black";
            ctx.fillText("MENU ", PARAMS.CANVASWIDTH / 2 - 10, 6 * this.padding);
        }
    }
}

class HeadsUpDisplay {
    constructor(game) {
        Object.assign(this, {game});
        this.visible = false;
        this.padding = 5;
        this.textboxWidth = 90;
        this.textboxHeight = 25;
    }

    update() {
    }

    draw(ctx) {
        ctx.font = "8px Georgia";

        if (this.game.camera.currentScene == "LevelOne") {

            if (!this.game.camera.hero.battle) {
                ctx.fillStyle = "Tan";
                ctx.fillRect(this.padding, 10, this.textboxWidth, this.textboxHeight);
                ctx.strokeStyle = "Brown";
                ctx.strokeRect(this.padding, 10, this.textboxWidth, this.textboxHeight);

                ctx.fillStyle = "Yellow";
                ctx.fillText("C O I N S : " + this.game.camera.coins, 10, 20);
                ctx.fillStyle = "Purple";
                ctx.fillText("C R Y S T A L S : " + this.game.camera.crystals , 10, 30);

            }

            ctx.fillStyle = "Tan";
            ctx.fillRect(PARAMS.CANVASWIDTH - this.padding - this.textboxWidth, 10, this.textboxWidth, 1.5 * this.textboxHeight);
            ctx.strokeStyle = "Brown";
            ctx.strokeRect(PARAMS.CANVASWIDTH - this.padding - this.textboxWidth, 10, this.textboxWidth, 1.5 * this.textboxHeight);

            ctx.fillStyle = "Blue";
            ctx.fillText("A T T A C K : " + this.game.camera.hero.stats[1], PARAMS.CANVASWIDTH - this.textboxWidth, 20);
            ctx.fillStyle = "Green";
            ctx.fillText("D E F E N S E : " + this.game.camera.hero.stats[2] , PARAMS.CANVASWIDTH - this.textboxWidth, 30);
            ctx.fillStyle = "Red";
            ctx.fillText("H E A L T H : " + this.game.camera.hero.stats[0] , PARAMS.CANVASWIDTH - this.textboxWidth, 40);

            if (PARAMS.DEBUG) {
                ctx.fillStyle = "Tan";
                ctx.fillRect(PARAMS.CANVASWIDTH/2 - this.textboxWidth/2, PARAMS.CANVASHEIGHT - (1.5 * this.textboxHeight) - this.padding, this.textboxWidth, 1.5 * this.textboxHeight);
                ctx.strokeStyle = "Brown";
                ctx.strokeRect(PARAMS.CANVASWIDTH/2 - this.textboxWidth/2, PARAMS.CANVASHEIGHT - (1.5 * this.textboxHeight) - this.padding, this.textboxWidth, 1.5 * this.textboxHeight);    
                
                ctx.fillStyle = "Black";
                ctx.fillText("x position : " + this.game.camera.hero.x, PARAMS.CANVASWIDTH/2 - this.textboxWidth/2 + this.padding, PARAMS.CANVASHEIGHT - (1.5 * this.textboxHeight) + this.padding);
                ctx.fillText("y position : " + this.game.camera.hero.y, PARAMS.CANVASWIDTH/2 - this.textboxWidth/2 + this.padding, PARAMS.CANVASHEIGHT - (1.5 * this.textboxHeight) + 2.5 * this.padding);
                ctx.fillText("x velocity : " + this.game.camera.hero.velocity.x, PARAMS.CANVASWIDTH/2 - this.textboxWidth/2 + this.padding, PARAMS.CANVASHEIGHT - (1.5 * this.textboxHeight) + 4 * this.padding);
                ctx.fillText("y velocity : " + this.game.camera.hero.velocity.y, PARAMS.CANVASWIDTH/2 - this.textboxWidth/2 + this.padding, PARAMS.CANVASHEIGHT - (1.5 * this.textboxHeight) + 5.5 * this.padding);
            }

        } 
    }
}