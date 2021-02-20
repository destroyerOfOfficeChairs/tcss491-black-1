class TitleScreen {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.image = ASSET_MANAGER.getAsset("./sprites/title_screen.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/pressB.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 32, 32, 5, 0.1, 0, false, true, true);
    }

    update() {
        // if (this.game.attack1) // I have no idea
        if (this.game.attack1) {
            this.removeFromWorld = true;
        }
    }

    drawMinimap(ctx, mmX, mmY) {
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
		
		this.backWidth = 50;
        this.backHeight = 20;
        this.backX = 5 * this.padding;
        this.backY = 8 * this.padding;
        this.backBB = new BoundingBox(this.backX, this.backY - this.backHeight/2, this.backWidth, this.backHeight);
        this.hoverBack = false;

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

        this.creditsWidth = 40;
        this.creditsHeight = 20;
        this.creditsX = PARAMS.CANVASWIDTH / 2 - 40;
        this.creditsY = 33 * this.padding;
        this.creditsBB = new BoundingBox(this.creditsX, this.creditsY - this.creditsHeight/2, this.creditsWidth, this.creditsHeight);
        this.hoverCredits = false;

    }

    update() {
        if (this.game.menu && !this.game.instructions && !this.game.shop && !this.game.credits) {
			if (this.hoverBack && this.game.click) {
                this.game.menu = false;
                this.game.click = null;
            } else if (this.hoverInstructions && this.game.click) {
                this.game.instructions = true;
                this.game.click = null;
            } else if (this.hoverShop && this.game.click) {
                this.game.shop = true;
                this.game.click = null;
            } else if (this.hoverCredits && this.game.click) {
                this.game.credits = true;
                this.game.click = null;
            } else if (!this.hoverInstructions && !this.hoverShop && !this.hoverCredits) {
                this.game.click = null;
            }
        }
    }

    drawMinimap(ctx, mmX, mmY) {
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

            // credits button
            ctx.fillStyle = "Black";
            if (this.game.mouse && this.game.mouse.x >= 3 * this.creditsBB.left && this.game.mouse.x <= 3 * this.creditsBB.right && 
                this.game.mouse.y >= 3 * this.creditsBB.top && this.game.mouse.y <= 3 * this.creditsBB.bottom) {
                ctx.fillStyle = "Purple";
                this.hoverCredits = true;
            } else {
                this.hoverCredits = false;
            }
            ctx.fillText("Credits", this.creditsX, this.creditsY);

            // bounding boxes
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.instructionsBB.x, this.instructionsBB.y, this.instructionsBB.width, this.instructionsBB.height);
                ctx.strokeRect(this.shopBB.x, this.shopBB.y, this.shopBB.width, this.shopBB.height);
                ctx.strokeRect(this.creditsBB.x, this.creditsBB.y, this.creditsBB.width, this.creditsBB.height);
				ctx.strokeRect(this.backBB.x, this.backBB.y, this.backBB.width, this.backBB.height);
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
        this.showIntroduction = false;
        if (this.game.mapIndex == 2 && !this.game.camera.battle && !this.game.camera.bossBattle) {
            this.showIntroduction = true;
        }
        this.timeElapsed = 0;
    }

    update() {
        if (this.showIntroduction) {
            this.timeElapsed += this.game.clockTick;
        }

        if (this.timeElapsed > 10) {
            this.showIntroduction = false;
        }
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        ctx.font = "8px Georgia";

        if (this.game.currentState != this.game.gameStates[0]) {

            if (!this.game.camera.hero.battle) {
                ctx.fillStyle = "Tan";
                ctx.fillRect(this.padding, 10, this.textboxWidth, 1.5 * this.textboxHeight);
                ctx.strokeStyle = "Brown";
                ctx.strokeRect(this.padding, 10, this.textboxWidth, 1.5 * this.textboxHeight);

                ctx.fillStyle = "Yellow";
                ctx.fillText("C O I N S : " + this.game.camera.coins, 10, 20);
                ctx.fillStyle = "Purple";
                ctx.fillText("C R Y S T A L S : " + this.game.camera.crystals , 10, 30);
                ctx.fillStyle = "Brown";
                ctx.fillText("K E Y S : " + this.game.camera.keys , 10, 40);

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
			}
			
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

            if (this.showIntroduction) {
                ctx.font = "10px Georgia";
                ctx.fillStyle = "Tan";
                ctx.fillRect(PARAMS.CANVASWIDTH/2 - 1.25 * this.textboxWidth, PARAMS.CANVASHEIGHT/2 + this.textboxHeight, 2.5 * this.textboxWidth, this.textboxHeight);
                ctx.strokeStyle = "Brown";
                ctx.strokeRect(PARAMS.CANVASWIDTH/2 - 1.25 * this.textboxWidth, PARAMS.CANVASHEIGHT/2 + this.textboxHeight, 2.5 * this.textboxWidth, this.textboxHeight);
                ctx.fillStyle = "Blue";
				ctx.fillText("Press \"L\" and \"How to Play\" for instructions", PARAMS.CANVASWIDTH/2 - 1.25 * this.textboxWidth + 2 * this.padding, PARAMS.CANVASHEIGHT/2 + this.textboxHeight + 3 * this.padding);
            }

        } 
    }
}

class Shop {
    constructor(game) {
        Object.assign(this, {game});
        this.padding = 5;
        this.displayError = false;
        this.displayCrystalError = false;
        this.displaySuccess = 0; // 0=none, 1=attack, 2=defense, 3=health, 4=destroy crystal
        this.timeElapsedError = 0;
        this.timeElapsedSuccess = 0;

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

        this.destroyCrystalWidth = 40;
        this.destroyCrystalHeight = 20;
        this.destroyCrystalX = 35 * this.padding;
        this.destroyCrystalY = 35 * this.padding;
        this.destroyCrystalBB = new BoundingBox(this.destroyCrystalX, this.destroyCrystalY - this.destroyCrystalHeight/2, this.destroyCrystalWidth, this.destroyCrystalHeight);
        this.hoverDestroyCrystal = false;

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
                    this.displayError = false;
                    this.displayCrystalError = false;
                    this.displaySuccess = 1;
                    this.timeElapsedSuccess = 0;
                } else {
                    this.displayError = true;
                    this.timeElapsedError = 0;
                }
                this.game.click = null;
            } else if (this.hoverUpgradeDefense && this.game.click) {
                if (this.game.camera.coins >= this.game.camera.defenseUpgradeCost) {
                    this.game.camera.coins -= this.game.camera.defenseUpgradeCost;
                    this.game.hero.stats[2] += this.game.camera.defenseUpgrade;
                    this.displayError = false;
                    this.displayCrystalError = false;
                    this.displaySuccess = 2;
                    this.timeElapsedSuccess = 0;
                } else {
                    this.displayError = true;
                    this.timeElapsedError = 0;
                }
                this.game.click = null;
            } else if (this.hoverHealth && this.game.click) {
                if (this.game.camera.coins >= this.game.camera.healthUpgradeCost) {
                    this.game.camera.coins -= this.game.camera.healthUpgradeCost;
                    if (this.game.hero.stats[0] == this.game.hero.maxHealth) { // if we're already at max, health, upgrade
                        this.game.hero.stats[0] += this.game.camera.healthUpgrade;
                        this.displayError = false;
                        this.displayCrystalError = false;
                        this.displaySuccess = 3;
                        this.timeElapsedSuccess = 0;
                    }
                    this.game.hero.maxHealth += this.game.camera.healthUpgrade;
                } else {
                    this.displayError = true;
                    this.timeElapsedError = 0;
                }
                this.game.click = null;
            } else if (this.hoverDestroyCrystal && this.game.click) {
                this.displayError = false;
                if (this.game.camera.crystals > 0) {
                    this.game.camera.crystals--;
                    // reduce hero stats
                    this.game.camera.hero.stats[1] -= this.game.camera.crystalAttackPower;
                    this.game.camera.hero.stats[2] -= this.game.camera.crystalDefensePower;
                    // reduce boss stats
                    this.game.camera.bossStats[1] -= this.game.camera.crystalAttackPower;
                    this.game.camera.bossStats[0] -= this.game.camera.crystalDefensePower;

                    this.displaySuccess = 4;
                    this.displayCrystalError = false;
                } else {
                    this.displayCrystalError = true;
                    this.timeElapsedError = 0;
                }
                this.game.click = null;
            } else if (!this.hoverBack && !this.hoverUpgradeAttack && !this.hoverUpgradeDefense && !this.hoverUpgradeHealth && !this.hoverDestroyCrystal) {
                this.game.click = null;
            }
    
            if (this.displayError || this.displayCrystalError) {
                this.displaySuccess = 0;
                this.timeElapsedError += this.game.clockTick;
                if (this.timeElapsedError > 3) {
                    this.displayError = false;
                    this.displayCrystalError = false;
                    this.timeElapsedError = 0;
                }
            } else {
                this.timeElapsedError = 0;
            }
            if (this.displaySuccess != 0) {
                this.timeElapsedSuccess += this.game.clockTick;
                if (this.timeElapsedSuccess > 3) {
                    this.displaySuccess = 0;
                    this.timeElapsedSuccess = 0;
                }
            } else {
                this.timeElapsedSuccess = 0;
            }
        } else {
            this.displayError = false;
            this.displayCrystalError = false;
            this.displaySuccess = false;
        }
    }

    drawMinimap(ctx, mmX, mmY) {
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

            if (this.game.mouse && this.game.mouse.x >= 3.1 * this.upgradeAttackBB.left && this.game.mouse.x <= 3 * this.upgradeAttackBB.right && 
                this.game.mouse.y >= 3.1 * this.upgradeAttackBB.top && this.game.mouse.y <= 3 * this.upgradeAttackBB.bottom) {
                ctx.fillStyle = "Purple";
                this.hoverUpgradeAttack = true;
            }else {
                this.hoverUpgradeAttack = false;
            }
            ctx.fillText("" + this.game.camera.attackUpgradeCost + " coins", this.upgradeAttackX, this.upgradeAttackY);

            // upgrade defense button
            ctx.fillStyle = "Black";
            ctx.fillText("Upgrade Defense (+" + this.game.camera.defenseUpgrade + ")", this.upgradeDefenseX - 150, this.upgradeDefenseY);

            if (this.game.mouse && this.game.mouse.x >= 3.1 * this.upgradeDefenseBB.left && this.game.mouse.x <= 3 * this.upgradeDefenseBB.right && 
                this.game.mouse.y >= 3.1 * this.upgradeDefenseBB.top && this.game.mouse.y <= 3 * this.upgradeDefenseBB.bottom) {
                ctx.fillStyle = "Purple";
                this.hoverUpgradeDefense = true;
            } else {
                this.hoverUpgradeDefense = false;
            }
            ctx.fillText("" + this.game.camera.defenseUpgradeCost + " coins", this.upgradeDefenseX, this.upgradeDefenseY);

            // upgrade Health button
            ctx.fillStyle = "Black";
            ctx.fillText("Upgrade Max Health (+" + this.game.camera.healthUpgrade + ")", this.upgradeHealthX - 150, this.upgradeHealthY);

            if (this.game.mouse && this.game.mouse.x >= 3.1 * this.upgradeHealthBB.left && this.game.mouse.x <= 3 * this.upgradeHealthBB.right && 
                this.game.mouse.y >= 3.1 * this.upgradeHealthBB.top && this.game.mouse.y <= 3 * this.upgradeHealthBB.bottom) {
                ctx.fillStyle = "Purple";
                this.hoverHealth = true;
            } else {
                this.hoverHealth = false;
            }
            ctx.fillText("" + this.game.camera.healthUpgradeCost + " coins", this.upgradeHealthX, this.upgradeHealthY);

            // destroy crystal button
            ctx.fillStyle = "Red";
            ctx.fillText("Destroy Crystal", this.destroyCrystalX - 150, this.destroyCrystalY);

            if (this.game.mouse && this.game.mouse.x >= 3.1 * this.destroyCrystalBB.left && this.game.mouse.x <= 3 * this.destroyCrystalBB.right && 
                this.game.mouse.y >= 3.1 * this.destroyCrystalBB.top && this.game.mouse.y <= 3 * this.destroyCrystalBB.bottom) {
                ctx.fillStyle = "Purple";
                this.hoverDestroyCrystal = true;
            } else {
                this.hoverDestroyCrystal = false;
            }
            ctx.fillText("Destroy", this.destroyCrystalX, this.destroyCrystalY);

            ctx.font = "8px Georgia";
            // coin stats
            ctx.fillStyle = "Yellow";
            ctx.fillText("C O I N S : " + this.game.camera.coins, this.backX + 115, this.backY);
            // crystal stats
            ctx.fillStyle = "Purple";
            ctx.fillText("C R Y S T A L S : " + this.game.camera.crystals, this.backX + 115, this.backY + 2 * this.padding);

            // attack, defense and health stats
            ctx.fillStyle = "Blue";
            ctx.fillText("A T T A C K : " + this.game.camera.hero.stats[1], this.backX + 115, this.backY + 4 * this.padding);
            ctx.fillStyle = "Green";
            ctx.fillText("D E F E N S E : " + this.game.camera.hero.stats[2] , this.backX + 115, this.backY + 6 * this.padding);
            ctx.fillStyle = "Red";
            ctx.fillText("MAX HEALTH : " + this.game.camera.hero.maxHealth , this.backX + 115, this.backY + 8 * this.padding);

            // "not enough coins"
            if (this.displayError) {
                ctx.fillStyle = "Red";
                ctx.fillText("Not enough coins to purchase!", 5 * this.padding, PARAMS.CANVASHEIGHT - 5 * this.padding);
            } else if (this.displayCrystalError) { // "not enough crystals"
                ctx.fillStyle = "Red";
                ctx.fillText("No crystals to destroy!", 5 * this.padding, PARAMS.CANVASHEIGHT - 5 * this.padding);
            }

            // successfully purchased
            if (this.displaySuccess != 0) {
                let str = "";
                switch (this.displaySuccess) {
                    case 1:
                        str += "Successfully upgraded Attack!";
                        break;
                    case 2:
                        str += "Successfully upgraded Defense!";
                        break;
                    case 3:
                        str += "Successfully upgraded Health!";
                        break;
                    case 4:
                        str += "Successfully destroyed a crystal!";
                        break;
                }
                ctx.fillStyle = "Green";
                ctx.fillText(str, 5 * this.padding, PARAMS.CANVASHEIGHT - 5 * this.padding);
            }

            // bounding boxes
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.upgradeAttackBB.x, this.upgradeAttackBB.y, this.upgradeAttackBB.width, this.upgradeAttackBB.height);
                ctx.strokeRect(this.upgradeDefenseBB.x, this.upgradeDefenseBB.y, this.upgradeDefenseBB.width, this.upgradeDefenseBB.height);
                ctx.strokeRect(this.upgradeHealthBB.x, this.upgradeHealthBB.y, this.upgradeHealthBB.width, this.upgradeHealthBB.height);
                ctx.strokeRect(this.destroyCrystalBB.x, this.destroyCrystalBB.y, this.destroyCrystalBB.width, this.destroyCrystalBB.height);
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

    drawMinimap(ctx, mmX, mmY) {
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

            ctx.font = "8px Georgia";
            ctx.fillStyle = "Black";
            ctx.fillText("- WASD or Arrow keys to move", this.backX, this.backY + 4 * this.padding);
            ctx.fillText("- L to toggle menu", this.backX, this.backY + 6 * this.padding);
            ctx.fillText("- Semicolon key to toggle map", this.backX, this.backY + 8 * this.padding);
            ctx.fillText("- Collect keys to open doors", this.backX, this.backY + 10 * this.padding);
            ctx.fillText("- Collect coins to upgrade attack, defense, and health", this.backX, this.backY + 12 * this.padding);
            ctx.fillText("- Collect crystals: keep them to increase your own power,", this.backX, this.backY + 14 * this.padding);
            ctx.fillText("       destroy them to weaken the final boss (-50 att, -50 def)", this.backX, this.backY + 16 * this.padding);
            ctx.fillText("- Break open boxes by pressing B and running into them", this.backX, this.backY + 18 * this.padding);
            ctx.fillText("- Touch portals to advance to next level", this.backX, this.backY + 20 * this.padding);
            ctx.fillText("B A T T L E S :", this.backX, this.backY + 22 * this.padding);
            ctx.fillText("     - You will randomly encounter battles", this.backX, this.backY + 24 * this.padding);
            ctx.fillText("     - your attacking character's name is highlighted", this.backX, this.backY + 26 * this.padding);
            ctx.fillText("     - click an enemy's name to select it", this.backX, this.backY + 28 * this.padding);
            ctx.fillText("     - click attack to attack it", this.backX, this.backY + 30 * this.padding);
            ctx.fillText("     - click defense to reduce damage done to character", this.backX, this.backY + 32 * this.padding);

            //ctx.fillText("- B to attack", this.backX, this.backY + 10 * this.padding);
            //ctx.fillText("- V to special attack", this.backX, this.backY + 12 * this.padding);
            //ctx.fillText("- N for battle mode, M for explore mode", this.backX, this.backY + 26 * this.padding);
            
            // bounding boxes
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.backBB.x, this.backBB.y, this.backBB.width, this.backBB.height);
            }
        }
    }
}

class Credits {
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
        if (this.game.menu && this.game.credits) {
            if (this.hoverBack && this.game.click) {
                this.game.credits = false;
                this.game.click = null;
            } else if (!this.hoverBack) {
                this.game.click = null;
            }
        }
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (this.game.menu && this.game.credits) {
            ctx.font = "12px Georgia";

            // Credits title
            ctx.fillStyle = "Tan";
            ctx.fillRect(this.padding * 3, this.padding * 3, PARAMS.CANVASWIDTH - 6 * this.padding, PARAMS.CANVASHEIGHT - 6 * this.padding);
            ctx.strokeStyle = "Brown";
            ctx.strokeRect(this.padding * 3, this.padding * 3, PARAMS.CANVASWIDTH - 6 * this.padding, PARAMS.CANVASHEIGHT - 6 * this.padding);

            ctx.fillStyle = "Black";
            ctx.fillText("CREDITS", PARAMS.CANVASWIDTH / 2 - 25, 6 * this.padding);

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

            ctx.font = "10px Georgia";
            ctx.fillStyle = "Black";
            ctx.fillText("T C S S   4 9 1   T E A M   B L A C K   1 :", this.backX, this.backY + 5 * this.padding);
            ctx.fillText("     A l b e r t   L i n", this.backX, this.backY + 9 * this.padding);
            ctx.fillText("     P a t r i c k   S c h m e i c h e l", this.backX, this.backY + 13 * this.padding);
            ctx.fillText("     V a n e s s a   H u n g", this.backX, this.backY + 17 * this.padding);
            ctx.fillText("     W i l l i a m   B r y a n", this.backX, this.backY + 21 * this.padding);

            // bounding boxes
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.backBB.x, this.backBB.y, this.backBB.width, this.backBB.height);
            }
        }
    }
}

// UI for battle mode
class BattleUI {
	constructor(game, bm, e, p) {
		Object.assign(this, {game});
		//loading in enemies and party
		this.enemies = [];
		var i;
		for (i = 0; i < e.length; i++){
			this.enemies[i] = [e[i], e[i].stats[0], e[i].name];
		}
		this.party = [];
		for (i = 0; i < p.length; i++){
			this.party[i] = [p[i], p[i].stats[0], p[i].name];
		}
		
		//setting up dimensions and buttons
        this.x = 5;
		this.y = 170;
		this.textboxWidth = 245;
        this.textboxHeight = 70;
		
		this.attX = 95 + this.x;
        this.attY = 11 + this.y;
        this.attWidth = 50;
        this.attHeight = 10;
        this.attBB = new BoundingBox(this.attX, this.attY, this.attWidth, this.attHeight);
        this.hoverAtt = false;
		
		this.specBB = new BoundingBox(this.attX, this.attY + 12, this.attWidth, this.attHeight);
        this.hoverSpec = false;
		
		this.itemBB = new BoundingBox(this.attX, this.attY + 24, this.attWidth, this.attHeight);
        this.hoverItem = false;
		
		this.defBB = new BoundingBox(this.attX, this.attY + 36, this.attWidth, this.attHeight);
        this.hoverDef = false;
		
		var x;
		this.enemyBB = []; // array with entries containing: [enemy's name BB, if hovering over enemy name]
		for(x=0; x<this.enemies.length; x++){
			this.enemyBB.push([new BoundingBox(this.x+5,this.y+15+(15*x),this.attWidth,this.attHeight),false]);
		}

        this.shieldList = [];
        this.ourTurn = true;
		
		this.battleManager = bm;
		this.attack = 0;
		this.acceptInput = true;
		this.end = -1;
	}
	
	// Allows user to interact with battle menu when it's a character's turn, 
	// and only cycles to next character in turn order when an action is done.
	// Automatically does an enemy's attack against a random player character
	// when it's an enemy's turn.
	update() {
		//check end state
		if(this.battleManager.isDefeated() == 1 && this.acceptInput){// victory
			this.end = 1;
			this.acceptInput = false;
			this.game.camera.coins += 10;
		} else if(this.battleManager.isDefeated() == 0 && this.acceptInput) {// defeat
			this.end = 0;
			this.acceptInput = false;
		}
		//skip dead character
		if (this.battleManager.turnOrder[this.battleManager.activeChar][1] == 0){
			if(this.battleManager.activeChar < this.battleManager.turnOrder.length - 1){
				this.battleManager.activeChar++;
			} else {
				this.battleManager.activeChar = 0;
			}
		} else if(this.battleManager.party.indexOf(this.battleManager.turnOrder[this.battleManager.activeChar]) >= 0 && this.battleManager.timeEnemyAttackElapsed == 0){ // if player character
			this.battleManager.isDefeated();
            this.ourTurn = true;
			var i;
			for(i=0; i<this.enemyBB.length; i++){ // allows user to pick target, has to be done before attack
				if(this.enemyBB[i][1] && this.game.click){
					this.attack = i;
				}
			}
			if (this.hoverAtt && this.game.click && this.acceptInput) { // if attack button is clicked
				console.log("Attack!");
					if(this.battleManager.enemies[this.attack][1] == 0){ // if enemy defeated, the default enemy to attack is the first one
                        this.attack = 0;
						// if(this.attack > this.battleManager.enemies.length-1){
						// 	this.attack = 0;
						// } else {
						// 	this.attack++;
						// }
					}
					this.battleManager.attackEnemy(this.battleManager.party.indexOf(this.battleManager.turnOrder[this.battleManager.activeChar]),this.attack);
				
				//advance turn order or reset
				if(this.battleManager.activeChar < this.battleManager.turnOrder.length - 1){
					this.battleManager.activeChar++;
				} else {
					this.battleManager.activeChar = 0;
				}
			} else if (this.hoverSpec && this.game.click && this.acceptInput) {
				console.log("Special!");
				
				//advance turn order or reset
				if(this.battleManager.activeChar < this.battleManager.turnOrder.length - 1){
					this.battleManager.activeChar++;
				} else {
					this.battleManager.activeChar = 0;
				}
			} else if (this.hoverItem && this.game.click && this.acceptInput) {
				console.log("Item!");
				
				//advance turn order or reset
				if(this.battleManager.activeChar < this.battleManager.turnOrder.length - 1){
					this.battleManager.activeChar++;
				} else {
					this.battleManager.activeChar = 0;
				}
			} else if (this.hoverDef && this.game.click && this.acceptInput) {
                //let shield = new Shield(this.game, this.party[this.battleManager.activeChar][0].x - 10, this.party[this.battleManager.activeChar][0].y);
                let shield = new Shield(this.game, this.battleManager.turnOrder[this.battleManager.activeChar][0].x - 10, this.battleManager.turnOrder[this.battleManager.activeChar][0].y);
                this.game.addEntity(shield);
                this.shieldList.push(shield);

				console.log("Defend!");
				this.battleManager.defend(this.battleManager.party.indexOf(this.battleManager.turnOrder[this.battleManager.activeChar]));
				//advance turn order or reset
				if(this.battleManager.activeChar < this.battleManager.turnOrder.length - 1){
					this.battleManager.activeChar++;
				} else {
					this.battleManager.activeChar = 0;
				}
			}
			this.game.click = null;
		} else if (this.acceptInput) { // if enemy character
			//this.battleManager.sleep(150);
            this.ourTurn = false;

            if (this.battleManager.timeEnemyAttackElapsed > 3) {
                this.battleManager.timeEnemyAttackElapsed = 0;

                this.battleManager.attackPlayer(this.battleManager.enemies.indexOf(this.battleManager.turnOrder[this.battleManager.activeChar]),Math.floor(Math.random() * 4));
			
			    //advance turn order or reset
			    if(this.battleManager.activeChar < this.battleManager.turnOrder.length - 1){
				    this.battleManager.activeChar++;
			    } else {
				    this.battleManager.activeChar = 0;

                    //remove shields after all enemies attacked
                    for (var i = 0; i < this.shieldList.length; i++) {
                        this.shieldList[i].removeFromWorld = true;
                    }
                    this.shieldList = [];

                    for (var i = 0; i < this.battleManager.party.length; i++) {
                        this.battleManager.party[i][3] = false;
                    }
			    }
            } else {
                this.battleManager.timeEnemyAttackElapsed += this.game.clockTick;
            }
			this.game.click = null;
		}
	}

    drawMinimap(ctx, mmX, mmY) {
    }
	
	draw(ctx) {
		ctx.font = "8px Georgia";
		
		// main battle ui
		ctx.fillStyle = "Tan";
		ctx.fillRect(this.x, this.y, this.textboxWidth, this.textboxHeight-17);
		ctx.strokeStyle = "Brown";
		ctx.strokeRect(this.x, this.y, this.textboxWidth, this.textboxHeight-17);

        //show who's turn it is
        ctx.fillStyle = "Tan";
		ctx.fillRect(this.x + 85, 10, this.textboxWidth / 3, this.textboxHeight / 4);
		ctx.strokeStyle = "Brown";
		ctx.strokeRect(this.x + 85, 10, this.textboxWidth / 3, this.textboxHeight / 4);
        if (this.ourTurn) {
            ctx.fillStyle = "Blue";
            ctx.fillText("O U R   T U R N", this.x + 90, 20);
        } else {
            ctx.fillStyle = "Red";
            ctx.fillText("E N E M Y   T U R N", this.x + 90, 20);
        }
		
		//enemies list
		ctx.fillStyle = "Tan";
		ctx.fillRect(this.x + 2, this.y + 2, 90, this.textboxHeight - 19);
		ctx.strokeStyle = "Brown";
		ctx.strokeRect(this.x + 2, this.y + 2, 90, this.textboxHeight - 19);
		var i;
		for (i = 0; i < this.enemies.length; i++) {
			if(this.battleManager.timeEnemyAttackElapsed == 0 && this.game.mouse && this.game.mouse.x >= 3 * this.enemyBB[i][0].left && this.game.mouse.x <= 3 * this.enemyBB[i][0].right && 
			this.game.mouse.y >= 3 * this.enemyBB[i][0].top && this.game.mouse.y <= 3 * this.enemyBB[i][0].bottom){
				ctx.fillStyle = "Purple";
				this.enemyBB[i][1] = true;
			} else if (this.battleManager.turnOrder[this.battleManager.activeChar][2] == this.enemies[i][2]) {
				ctx.fillStyle = "Green";
				this.enemyBB[i][1] = false;
			}else {
				ctx.fillStyle = "Black";
				this.enemyBB[i][1] = false;
			}
			if(this.battleManager.enemies[i][1] > 0){
				ctx.fillText(this.enemies[i][2], this.x + 5, this.y + 15 + (15 * i));
                ctx.fillText(this.battleManager.enemies[i][1] + " / " + this.enemies[i][0].stats[0], this.x + 60, this.y + 15 + (15 * i));
			}
		}
		
		//party list
		ctx.fillStyle = "Tan";
		ctx.fillRect(this.x + 145, this.y + 2, 98, this.textboxHeight - 19);
		ctx.strokeStyle = "Brown";
		ctx.strokeRect(this.x + 145, this.y + 2, 98, this.textboxHeight - 19);
		ctx.fillStyle = "Black";
		for (i = 0; i < this.party.length; i++) {
			if(this.battleManager.turnOrder[this.battleManager.activeChar][2] == this.party[i][2]){
				ctx.fillStyle = "Green";
			} else {
				ctx.fillStyle = "Black";
			}
			ctx.fillText(this.party[i][2], this.x + 150, this.y + 12 + (11 * i));
			ctx.fillStyle = "Black";
			ctx.fillText(this.battleManager.party[i][1] + " / " + this.party[i][0].stats[0], this.x + 200, this.y + 12 + (11 * i));
		}
		
		//attack button
		ctx.fillStyle = "Black";
		if (this.battleManager.timeEnemyAttackElapsed == 0 && this.game.mouse && this.game.mouse.x >= 3 * this.attBB.left && this.game.mouse.x <= 3 * this.attBB.right && 
			this.game.mouse.y >= 3 * this.attBB.top && this.game.mouse.y <= 3 * this.attBB.bottom) {
			ctx.fillStyle = "Purple";
			this.hoverAtt = true;
		}else {
			this.hoverAtt = false;
		}
		ctx.fillText("A T T A C K", this.attX, this.attY);
		
		//special attack button
		ctx.fillStyle = "Black";
		if (this.battleManager.timeEnemyAttackElapsed == 0 && this.game.mouse && this.game.mouse.x >= 3 * this.specBB.left && this.game.mouse.x <= 3 * this.specBB.right && 
			this.game.mouse.y >= 3 * this.specBB.top && this.game.mouse.y <= 3 * this.specBB.bottom) {
			ctx.fillStyle = "Purple";
			this.hoverSpec = true;
		}else {
			this.hoverSpec = false;
		}
		ctx.fillText("S P E C I A L", this.attX, this.attY + 12);
		
		//items button
		ctx.fillStyle = "Black";
		if (this.battleManager.timeEnemyAttackElapsed == 0 && this.game.mouse && this.game.mouse.x >= 3 * this.itemBB.left && this.game.mouse.x <= 3 * this.itemBB.right && 
			this.game.mouse.y >= 3 * this.itemBB.top && this.game.mouse.y <= 3 * this.itemBB.bottom) {
			ctx.fillStyle = "Purple";
			this.hoverItem = true;
		}else {
			this.hoverItem = false;
		}
		ctx.fillText("I T E M", this.attX, this.attY + 24);
		
		//defend button
		ctx.fillStyle = "Black";
		if (this.battleManager.timeEnemyAttackElapsed == 0 && this.game.mouse && this.game.mouse.x >= 3 * this.defBB.left && this.game.mouse.x <= 3 * this.defBB.right && 
			this.game.mouse.y >= 3 * this.defBB.top && this.game.mouse.y <= 3 * this.defBB.bottom) {
			ctx.fillStyle = "Purple";
			this.hoverDef = true;
		}else {
			this.hoverDef = false;
		}
		ctx.fillText("D E F E N D", this.attX, this.attY + 36);
		
		// bounding boxes
		if (PARAMS.DEBUG) {
			ctx.strokeStyle = 'Red';
			ctx.strokeRect(this.attBB.x, this.attBB.y-8, this.attBB.width, this.attBB.height);
			ctx.strokeRect(this.attBB.x, this.attBB.y + 4, this.attBB.width, this.attBB.height);
			ctx.strokeRect(this.attBB.x, this.attBB.y + 16, this.attBB.width, this.attBB.height);
			ctx.strokeRect(this.attBB.x, this.attBB.y + 28, this.attBB.width, this.attBB.height);
			var i;
			for(i=0;i<this.enemyBB.length;i++){
				if(this.battleManager.enemies[i][1] > 0){
					ctx.strokeRect(this.enemyBB[i][0].x, this.enemyBB[i][0].y-7, this.enemyBB[i][0].width, this.enemyBB[i][0].height);
				}
			}
		}
		
		// end states
		// win state
		if(this.end == 1 && !this.game.camera.bossBattle){
			ctx.fillStyle = "Tan";
			ctx.fillRect(50, 50, 150, 100);
			ctx.strokeStyle = "Brown";
			ctx.strokeRect(50, 50, 150, 100);
			ctx.fillStyle = "Black";
			ctx.fillText("V I C T O R Y !", 100, 85);
			ctx.fillText("Y O U  G A I N E D  10  C O I N S", 67, 105);
			ctx.fillText('P R E S S  " M "  T O  R E T U R N', 65, 125);
		}
        if(this.end == 1 && this.game.camera.bossBattle){
			ctx.fillStyle = "Tan";
			ctx.fillRect(50, 50, 150, 100);
			ctx.strokeStyle = "Brown";
			ctx.strokeRect(50, 50, 150, 100);
			ctx.fillStyle = "Black";
			ctx.fillText("Y O U   W I N !", 100, 85);
			ctx.fillText("T H A N K S   F O R   P L A Y I N G !", 67, 105);
			ctx.fillText('P R E S S  " M "  T O  R E T U R N', 65, 125);
            this.game.gameWon = true;
		}
		// loss state
		if(this.end == 0){
			ctx.fillStyle = "Tan";
			ctx.fillRect(50, 50, 150, 100);
			ctx.strokeStyle = "Brown";
			ctx.strokeRect(50, 50, 150, 100);
			ctx.fillStyle = "Black";
			ctx.fillText("D E F E A T !", 100, 90);
			ctx.fillText('P R E S S  " M "  T O  R E T U R N', 65, 115);
		}
	}
}