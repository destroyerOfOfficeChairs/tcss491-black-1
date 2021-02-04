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
        this.padding = 5;

        this.instructionsWidth = 60;
        this.instructionsHeight = 20;
        this.instructionsX = PARAMS.CANVASWIDTH / 2 - 40;
        this.instructionsY = 15 * this.padding;
        this.instructionsBB = new BoundingBox(this.instructionsX, this.instructionsY - this.instructionsHeight/2, this.instructionsWidth, this.instructionsHeight);
        this.hoverInstructions = false;

        this.shopWidth = 30;
        this.shopHeight = 20;
        this.shopX = PARAMS.CANVASWIDTH / 2 - 40;
        this.shopY = 24 * this.padding;
        this.shopBB = new BoundingBox(this.shopX, this.shopY - this.shopHeight/2, this.shopWidth, this.shopHeight);
        this.hoverShop = false;

    }

    update() {
        if (this.game.menu && !this.game.instructions && !this.game.shop) {
            if (this.hoverInstructions && this.game.click) {
                this.game.instructions = true;
                this.game.click = null;
            } else if (this.hoverShop && this.game.click) {
                this.game.shop = true;
                this.game.click = null;
                //console.log("clicked");
                // ctx.fillStyle = "Black";
                // ctx.fillText("Instructions Clicked", PARAMS.CANVASWIDTH / 2 - 20, 6 * this.padding);
            } else if (!this.hoverInstructions && !this.hoverShop) {
                this.game.click = null;
            }
        }
    }

    draw(ctx) {
        if (this.game.menu) {
            ctx.font = "12px Georgia";

            // menu title
            ctx.fillStyle = "Tan";
            ctx.fillRect(this.padding * 3, this.padding * 3, PARAMS.CANVASWIDTH - 6 * this.padding, PARAMS.CANVASHEIGHT - 6 * this.padding);
            ctx.strokeStyle = "Brown";
            ctx.strokeRect(this.padding * 3, this.padding * 3, PARAMS.CANVASWIDTH - 6 * this.padding, PARAMS.CANVASHEIGHT - 6 * this.padding);

            ctx.fillStyle = "Black";
            ctx.fillText("MENU", PARAMS.CANVASWIDTH / 2 - 20, 6 * this.padding);

            ctx.font = "10px Georgia";

            // how to play button
            ctx.fillStyle = "Black";
            if (this.game.mouse && this.game.mouse.x >= 3 * this.instructionsBB.left && this.game.mouse.x <= 3 * this.instructionsBB.right && 
                this.game.mouse.y >= 3 * this.instructionsBB.top && this.game.mouse.y <= 3 * this.instructionsBB.bottom) {
                ctx.fillStyle = "Purple";
                this.hoverInstructions = true;
            } else {
                this.hoverInstructions = false;
            }
            ctx.fillText("How to play", this.instructionsX, this.instructionsY);

            // shop button
            ctx.fillStyle = "Black";
            if (this.game.mouse && this.game.mouse.x >= 3 * this.shopBB.left && this.game.mouse.x <= 3 * this.shopBB.right && 
                this.game.mouse.y >= 3 * this.shopBB.top && this.game.mouse.y <= 3 * this.shopBB.bottom) {
                ctx.fillStyle = "Purple";
                this.hoverShop = true;
            } else {
                this.hoverShop = false;
            }
            ctx.fillText("Shop", this.shopX, this.shopY);

            // bounding boxes
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.instructionsBB.x, this.instructionsBB.y, this.instructionsBB.width, this.instructionsBB.height);
                ctx.strokeRect(this.shopBB.x, this.shopBB.y, this.shopBB.width, this.shopBB.height);
            }
        }
    }
}

class HeadsUpDisplay {
    constructor(game) {
        Object.assign(this, {game});
        this.padding = 5;
        this.textboxWidth = 90;
        this.textboxHeight = 25;
    }

    update() {
    }

    draw(ctx) {
        ctx.font = "8px Georgia";

        if (this.game.currentState != this.game.gameStates[0]) {

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

class Shop {
    constructor(game) {
        Object.assign(this, {game});
        this.padding = 5;
        this.displayError = false;
        this.timeElapsed = 0;

        this.backWidth = 50;
        this.backHeight = 20;
        this.backX = 5 * this.padding;
        this.backY = 8 * this.padding;
        this.backBB = new BoundingBox(this.backX, this.backY - this.backHeight/2, this.backWidth, this.backHeight);
        this.hoverBack = false;

        this.upgradeAttackWidth = 40;
        this.upgradeAttackHeight = 20;
        this.upgradeAttackX = 35 * this.padding;
        this.upgradeAttackY = 20 * this.padding;
        this.upgradeAttackBB = new BoundingBox(this.upgradeAttackX, this.upgradeAttackY - this.upgradeAttackHeight/2, this.upgradeAttackWidth, this.upgradeAttackHeight);
        this.hoverUpgradeAttack = false;

        this.upgradeDefenseWidth = 40;
        this.upgradeDefenseHeight = 20;
        this.upgradeDefenseX = 35 * this.padding;
        this.upgradeDefenseY = 25 * this.padding;
        this.upgradeDefenseBB = new BoundingBox(this.upgradeDefenseX, this.upgradeDefenseY - this.upgradeDefenseHeight/2, this.upgradeDefenseWidth, this.upgradeDefenseHeight);
        this.hoverUpgradeDefense = false;

        this.upgradeHealthWidth = 40;
        this.upgradeHealthHeight = 20;
        this.upgradeHealthX = 35 * this.padding;
        this.upgradeHealthY = 30 * this.padding;
        this.upgradeHealthBB = new BoundingBox(this.upgradeHealthX, this.upgradeHealthY - this.upgradeHealthHeight/2, this.upgradeHealthWidth, this.upgradeHealthHeight);
        this.hoverHealth = false;

    }

    update() {
        if (this.game.menu && this.game.shop) {
            if (this.hoverBack && this.game.click) {
                this.game.shop = false;
                this.game.click = null;
            } else if (this.hoverUpgradeAttack && this.game.click) {
                if (this.game.camera.coins >= this.game.camera.attackUpgradeCost) {
                    this.game.camera.coins -= this.game.camera.attackUpgradeCost;
                    this.game.hero.stats[1] += this.game.camera.attackUpgrade;
                } else {
                    this.displayError = true;
                }
                this.game.click = null;
            } else if (this.hoverUpgradeDefense && this.game.click) {
                if (this.game.camera.coins >= this.game.camera.defenseUpgradeCost) {
                    this.game.camera.coins -= this.game.camera.defenseUpgradeCost;
                    this.game.hero.stats[2] += this.game.camera.defenseUpgrade;
                } else {
                    this.displayError = true;
                }
                this.game.click = null;
            } else if (this.hoverHealth && this.game.click) {
                if (this.game.camera.coins >= this.game.camera.healthUpgradeCost) {
                    this.game.camera.coins -= this.game.camera.healthUpgradeCost;
                    if (this.game.hero.stats[0] == this.game.hero.maxHealth) { // if we're already at max, health, upgrade
                        this.game.hero.stats[0] += this.game.camera.healthUpgrade;
                    }
                    this.game.hero.maxHealth += this.game.camera.healthUpgrade;
                } else {
                    this.displayError = true;
                }
                this.game.click = null;
            } else if (!this.hoverBack && !this.hoverUpgradeAttack && !this.hoverUpgradeDefense && !this.hoverUpgradeHealth) {
                this.game.click = null;
            }
    
            if (this.displayError) {
                this.timeElapsed += this.game.clockTick;
                if (this.timeElapsed > 5) {
                    this.displayError = false;
                    this.timeElapsed = 0;
                }
            }
        }
    }

    draw(ctx) {
        if (this.game.menu && this.game.shop) {
            ctx.font = "12px Georgia";

            // shop title
            ctx.fillStyle = "Tan";
            ctx.fillRect(this.padding * 3, this.padding * 3, PARAMS.CANVASWIDTH - 6 * this.padding, PARAMS.CANVASHEIGHT - 6 * this.padding);
            ctx.strokeStyle = "Brown";
            ctx.strokeRect(this.padding * 3, this.padding * 3, PARAMS.CANVASWIDTH - 6 * this.padding, PARAMS.CANVASHEIGHT - 6 * this.padding);

            ctx.fillStyle = "Black";
            ctx.fillText("SHOP", PARAMS.CANVASWIDTH / 2 - 20, 6 * this.padding);

            ctx.font = "10px Georgia";

            //back button
            ctx.fillStyle = "Black";
            if (this.game.mouse && this.game.mouse.x >= 3 * this.backBB.left && this.game.mouse.x <= 3 * this.backBB.right && 
                this.game.mouse.y >= 3 * this.backBB.top && this.game.mouse.y <= 3 * this.backBB.bottom) {
                ctx.fillStyle = "Purple";
                this.hoverBack = true;
            }else {
                this.hoverBack = false;
            }
            ctx.fillText("Back", this.backX, this.backY);

            // upgrade attack button
            ctx.fillStyle = "Black";
            ctx.fillText("Upgrade Attack (+" + this.game.camera.attackUpgrade + ")", this.upgradeAttackX - 150, this.upgradeAttackY);

            if (this.game.mouse && this.game.mouse.x >= 3 * this.upgradeAttackBB.left && this.game.mouse.x <= 3 * this.upgradeAttackBB.right && 
                this.game.mouse.y >= 3 * this.upgradeAttackBB.top && this.game.mouse.y <= 3 * this.upgradeAttackBB.bottom) {
                ctx.fillStyle = "Purple";
                this.hoverUpgradeAttack = true;
            }else {
                this.hoverUpgradeAttack = false;
            }
            ctx.fillText("" + this.game.camera.attackUpgradeCost + " coins", this.upgradeAttackX, this.upgradeAttackY);

            // upgrade defense button
            ctx.fillStyle = "Black";
            ctx.fillText("Upgrade Defense (+" + this.game.camera.defenseUpgrade + ")", this.upgradeDefenseX - 150, this.upgradeDefenseY);

            if (this.game.mouse && this.game.mouse.x >= 3 * this.upgradeDefenseBB.left && this.game.mouse.x <= 3 * this.upgradeDefenseBB.right && 
                this.game.mouse.y >= 3 * this.upgradeDefenseBB.top && this.game.mouse.y <= 3 * this.upgradeDefenseBB.bottom) {
                ctx.fillStyle = "Purple";
                this.hoverUpgradeDefense = true;
            } else {
                this.hoverUpgradeDefense = false;
            }
            ctx.fillText("" + this.game.camera.defenseUpgradeCost + " coins", this.upgradeDefenseX, this.upgradeDefenseY);

            // upgrade Health button
            ctx.fillStyle = "Black";
            ctx.fillText("Upgrade Max Health (+" + this.game.camera.healthUpgrade + ")", this.upgradeHealthX - 150, this.upgradeHealthY);

            if (this.game.mouse && this.game.mouse.x >= 3 * this.upgradeHealthBB.left && this.game.mouse.x <= 3 * this.upgradeHealthBB.right && 
                this.game.mouse.y >= 3 * this.upgradeHealthBB.top && this.game.mouse.y <= 3 * this.upgradeHealthBB.bottom) {
                ctx.fillStyle = "Purple";
                this.hoverHealth = true;
            } else {
                this.hoverHealth = false;
            }
            ctx.fillText("" + this.game.camera.healthUpgradeCost + " coins", this.upgradeHealthX, this.upgradeHealthY);

            // coin stats
            ctx.fillStyle = "Yellow";
            ctx.fillText("C O I N S : " + this.game.camera.coins, this.backX + 115, this.backY);

            // attack, defense and health stats
            ctx.fillStyle = "Blue";
            ctx.fillText("A T T A C K : " + this.game.camera.hero.stats[1], this.backX + 115, this.backY + 2 * this.padding);
            ctx.fillStyle = "Green";
            ctx.fillText("D E F E N S E : " + this.game.camera.hero.stats[2] , this.backX + 115, this.backY + 4 * this.padding);
            ctx.fillStyle = "Red";
            ctx.fillText("MAX HEALTH : " + this.game.camera.hero.maxHealth , this.backX + 115, this.backY + 6 * this.padding);

    

            // "not enough coins"
            if (this.displayError) {
                ctx.fillStyle = "Red";
                ctx.fillText("Not enough coins to purchase!", 5 * this.padding, PARAMS.CANVASHEIGHT - 5 * this.padding);
            }

            // bounding boxes
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.upgradeAttackBB.x, this.upgradeAttackBB.y, this.upgradeAttackBB.width, this.upgradeAttackBB.height);
                ctx.strokeRect(this.upgradeDefenseBB.x, this.upgradeDefenseBB.y, this.upgradeDefenseBB.width, this.upgradeDefenseBB.height);
                ctx.strokeRect(this.upgradeHealthBB.x, this.upgradeHealthBB.y, this.upgradeHealthBB.width, this.upgradeHealthBB.height);
                ctx.strokeRect(this.backBB.x, this.backBB.y, this.backBB.width, this.backBB.height);
            }
        }
    }
}

class Instructions {
    constructor(game) {
        Object.assign(this, {game});
        this.padding = 5;

        this.backWidth = 50;
        this.backHeight = 20;
        this.backX = 5 * this.padding;
        this.backY = 8 * this.padding;
        this.backBB = new BoundingBox(this.backX, this.backY - this.backHeight/2, this.backWidth, this.backHeight);
        this.hoverBack = false;

    }

    update() {
        if (this.game.menu && this.game.instructions) {
            if (this.hoverBack && this.game.click) {
                this.game.instructions = false;
                this.game.click = null;
            } else if (!this.hoverBack) {
                this.game.click = null;
            }
        }
    }

    draw(ctx) {
        if (this.game.menu && this.game.instructions) {
            ctx.font = "12px Georgia";

            // Instructions title
            ctx.fillStyle = "Tan";
            ctx.fillRect(this.padding * 3, this.padding * 3, PARAMS.CANVASWIDTH - 6 * this.padding, PARAMS.CANVASHEIGHT - 6 * this.padding);
            ctx.strokeStyle = "Brown";
            ctx.strokeRect(this.padding * 3, this.padding * 3, PARAMS.CANVASWIDTH - 6 * this.padding, PARAMS.CANVASHEIGHT - 6 * this.padding);

            ctx.fillStyle = "Black";
            ctx.fillText("INSTRUCTIONS", PARAMS.CANVASWIDTH / 2 - 45, 6 * this.padding);

            ctx.font = "10px Georgia";

            //back button
            ctx.fillStyle = "Black";
            if (this.game.mouse && this.game.mouse.x >= 3 * this.backBB.left && this.game.mouse.x <= 3 * this.backBB.right && 
                this.game.mouse.y >= 3 * this.backBB.top && this.game.mouse.y <= 3 * this.backBB.bottom) {
                ctx.fillStyle = "Purple";
                this.hoverBack = true;
            } else {
                this.hoverBack = false;
            }
            ctx.fillText("Back", this.backX, this.backY);

            // bounding boxes
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.backBB.x, this.backBB.y, this.backBB.width, this.backBB.height);
            }
        }
    }
}