class FireBreath {
    constructor(game, x, y, entity) {
        Object.assign(this, { game, x, y, entity});
        this.width = 570;
        this.height = 146;
        this.scale = 1/8;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/firebreath.png");
        this.animations = new Animator(this.spritesheet, 0, 0, this.width, this.height, 2, 0.2, 10, false, true);
        this.rightBB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);

    }

    update() {

    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (this.game.attack1) {
            if (this.entity.facing == 0) {//facing right
                this.animations.drawFrame(this.game.clockTick, ctx, this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, PARAMS.SCALE * this.scale);
            } else if (this.entity.facing == 1) {//facing left
                ctx.save();
                ctx.scale(-1, 1);
                this.animations.drawFrame(this.game.clockTick, ctx, -(this.x - this.game.camera.x), this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, PARAMS.SCALE * this.scale);
                ctx.restore();
            }
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
        }

    }
}


class ShadowBall {
    constructor(game, x, y, facing, entity) {
        Object.assign(this, { game, x, y , facing, entity });
        this.width = 676;
        this.height = 676;
        this.scale = 1/20;
        this.startingX = x;
        this.removeFromWorld = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/shadowball.png");
        this.BB = null;
        if (this.facing == 0) {
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    update() {
        if (this.facing == 0) {
            this.x += 2;
            if (this.x - this.startingX > 100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.x -= 2;
            if (this.x - this.startingX < -100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (!this.removeFromWorld) {
            if (this.facing == 0) {
                ctx.drawImage(this.spritesheet, 142, 85, this.width, this.height, this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            } else if (this.facing == 1) {
                ctx.drawImage(this.spritesheet, 142, 85, this.width, this.height, this.x - (this.width * PARAMS.SCALE * this.scale) - this.game.camera.x, this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            }
        }

        if (PARAMS.DEBUG && this.BB != null) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    }
}

class Arrow {
    constructor(game, x, y, facing, entity) {
        Object.assign(this, { game, x, y , facing, entity, });
        this.width = 128;
        this.height = 24;
        this.scale = 1/5;
        this.startingX = x;
        this.removeFromWorld = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/arrow.png");
        this.BB = null;
        if (this.facing == 0) {
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y + (5/16 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y + (5/16 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    update() {
        if (this.facing == 0) {
            this.x += 5;
            if (this.x - this.startingX > 100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y + (5/16 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.x -= 5;
            if (this.x - this.startingX < -100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y + (5/16 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (!this.removeFromWorld) {
            if (this.facing == 0) {
                ctx.drawImage(this.spritesheet, 834, 113, this.width, this.height, this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.y + (5/16 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            } else if (this.facing == 1) {
                ctx.drawImage(this.spritesheet, 318, 113, this.width, this.height, this.x - (this.width * PARAMS.SCALE * this.scale) - this.game.camera.x, this.y + (5/16 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            }
        }

        if (PARAMS.DEBUG && this.BB != null) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    }
}

class Lightning {
    constructor(game, x, y, entity) {
        Object.assign(this, { game, x, y , entity });
        this.width = 458;
        this.height = 259;
        this.scale = 1/4;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/lightning.png");
        this.rightBB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y - (1 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y - (1 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);

    }

    update() {

    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (this.game.attack1) {
            if (this.entity.facing == 0) {//facing right
                ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.y - (1 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            } else if (this.entity.facing == 1) {//facing left
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, -(this.x - this.game.camera.x), this.y - (1 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
                ctx.restore();
            }
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
        }

    }
}

class FireBall {
    constructor(game, x, y, facing, entity) {
        Object.assign(this, { game, x, y , facing, entity, });
        this.width = 200;
        this.height = 130;
        this.scale = 1/10;
        this.startingX = x;
        this.removeFromWorld = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/fireball.png");
        this.BB = null;
        if (this.facing == 0) {
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y + (5/16 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y + (5/16 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    update() {
        if (this.facing == 0) {
            this.x += 1;
            if (this.x - this.startingX > 100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y + (5/16 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.x -= 1;
            if (this.x - this.startingX < -100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y + (5/16 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (!this.removeFromWorld) {
            if (this.facing == 0) {
                ctx.drawImage(this.spritesheet, 20, 40, this.width, this.height, this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.y + (5/16 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            } else if (this.facing == 1) {
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(this.spritesheet, 20, 40, this.width, this.height, -(this.x - this.game.camera.x), this.y + (5/16 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
                ctx.restore();
            }
        }

        if (PARAMS.DEBUG && this.BB != null) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    }
}

class Slash {
    constructor(game, x, y, entity) {
        Object.assign(this, { game, x, y , entity });
        this.width = 103;
        this.height = 103;
        this.scale = 1/4;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/slash.png");
        this.rightBB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);

    }

    update() {
        //this.x = this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale);
        //this.y = this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale)

        //if (this.facing == 0) {
            this.rightBB = new BoundingBox(this.entity.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.entity.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        //} else if (this.facing == 1) {
            this.leftBB = new BoundingBox(this.entity.x - (this.width * PARAMS.SCALE * this.scale), this.entity.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        //}
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (this.game.attack1) {
            if (this.entity.facing == 0) {//facing right
                ctx.drawImage(this.spritesheet, 74, 20, this.width, this.height, this.entity.x + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.entity.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            } else if (this.entity.facing == 1) {//facing left
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(this.spritesheet, 74, 20, this.width, this.height, -(this.entity.x - this.game.camera.x), this.entity.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
                ctx.restore();
            }
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
        }

    }
}

class BoneDart {
    constructor(game, x, y, facing, entity) {
        Object.assign(this, { game, x, y , facing, entity, });
        this.width = 512;
        this.height = 147;
        this.scale = 1/20;
        this.startingX = x;
        this.removeFromWorld = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bonedart.png");
        this.BB = null;
        if (this.facing == 0) {
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y + (1/2 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y + (1/2 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    update() {
        if (this.facing == 0) {
            this.x += 3;
            if (this.x - this.startingX > 100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y + (1/2 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.x -= 3;
            if (this.x - this.startingX < -100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y + (1/2 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (!this.removeFromWorld) {
            if (this.facing == 0) {
                ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.y + (1/2 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            } else if (this.facing == 1) {
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, -(this.x - this.game.camera.x), this.y + (1/2 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
                ctx.restore();
            }
        }

        if (PARAMS.DEBUG && this.BB != null) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    }
}

class DeathStare {
    constructor(game, x, y, entity) {
        Object.assign(this, { game, x, y , entity });
        this.width = 28;
        this.height = 28;
        this.scale = 1;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/sparkle.png");
        this.animations = new Animator(this.spritesheet, 0, 66, this.width, this.height, 4, 0.1, 4, false, true); // change x from 0 to 130 for white sparkle
        this.rightBB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);

    }

    update() {

    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (this.game.attack2) {
            if (this.entity.facing == 0) {//facing right
                this.animations.drawFrame(this.game.clockTick, ctx, this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE * this.scale);                
            } else if (this.entity.facing == 1) {//facing left
                this.animations.drawFrame(this.game.clockTick, ctx, this.x - (this.width * PARAMS.SCALE * this.scale) - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE * this.scale);                
            }
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
        }

    }
}

class Scratch {
    constructor(game, x, y, entity) {
        Object.assign(this, { game, x, y , entity });
        this.width = 500;
        this.height = 500;
        this.scale = 1/20;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/scratch.png");
        this.rightBB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);

    }

    update() {

    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (this.game.attack1) {
            if (this.entity.facing == 0) {
                ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            } else if (this.entity.facing == 1) {
                ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x - (this.width * PARAMS.SCALE * this.scale) - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            }
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
        }

    }
}

class SonicWave {
    constructor(game, x, y, facing, entity) {
        Object.assign(this, { game, x, y , facing, entity });
        this.width = 54;
        this.height = 112;
        this.scale = 1/4;
        this.startingX = x;
        this.removeFromWorld = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/sonicwave.png");
        this.BB = null;
        if (this.facing == 0) {
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    update() {
        if (this.facing == 0) {
            this.x += 2;
            if (this.x - this.startingX > 100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.x -= 2;
            if (this.x - this.startingX < -100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (!this.removeFromWorld) {
            if (this.facing == 0) {
                ctx.drawImage(this.spritesheet, 362, 7, this.width, this.height, this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            } else if (this.facing == 1) {
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(this.spritesheet, 362, 7, this.width, this.height, -(this.x - this.game.camera.x), this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
                ctx.restore();
            }
        }

        if (PARAMS.DEBUG && this.BB != null) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    }
}

class Missile {
    constructor(game, x, y, facing, entity) {
        Object.assign(this, { game, x, y , facing, entity });
        this.width = 253;
        this.height = 66;
        this.scale = 1/4;
        this.startingX = x;
        this.removeFromWorld = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/missile.png");
        this.BB = null;
        if (this.facing == 0) {
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    update() {
        if (this.facing == 0) {
            this.x += 2;
            if (this.x - this.startingX > 100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.x -= 2;
            if (this.x - this.startingX < -100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (!this.removeFromWorld) {
            if (this.facing == 0) {
                ctx.drawImage(this.spritesheet, 0, 52, this.width, this.height, this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            } else if (this.facing == 1) {
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(this.spritesheet, 0, 52, this.width, this.height, -(this.x - this.game.camera.x), this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
                ctx.restore();
            }
        }

        if (PARAMS.DEBUG && this.BB != null) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    }
}

class Laser {
    constructor(game, x, y, facing, entity) {
        Object.assign(this, { game, x, y , facing, entity });
        this.width = 1154;
        this.height = 100;
        this.scale = 1/50;
        this.startingX = x;
        this.removeFromWorld = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/laser.png");
        this.BB = null;
        if (this.facing == 0) {
            this.BB = new BoundingBox(this.x + (3/4 * this.entity.width * PARAMS.SCALE * this.entity.scale), this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.BB = new BoundingBox(this.x - (3/4 * this.width * PARAMS.SCALE * this.scale), this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    update() {
        if (this.facing == 0) {
            this.x += 2;
            if (this.x - this.startingX > 100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x + (3/4 * this.entity.width * PARAMS.SCALE * this.entity.scale), this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.x -= 2;
            if (this.x - this.startingX < -100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x - (3/4 * this.width * PARAMS.SCALE * this.scale), this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale), this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (!this.removeFromWorld) {
            if (this.facing == 0) {
                ctx.drawImage(this.spritesheet, 57, 607, this.width, this.height, this.x + (3/4 * this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            } else if (this.facing == 1) {
                ctx.drawImage(this.spritesheet, 57, 607, this.width, this.height, this.x - (3/4 * this.width * PARAMS.SCALE * this.scale) - this.game.camera.x, this.y + (1/4 * this.entity.height * PARAMS.SCALE * this.entity.scale) - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            }
        }

        if (PARAMS.DEBUG && this.BB != null) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    }
}

class SuperSlash {
    constructor(game, x, y, facing, entity) {
        Object.assign(this, { game, x, y , facing, entity });
        this.width = 114;
        this.height = 175;
        this.scale = 1/8;
        this.startingX = x;
        this.removeFromWorld = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/superslash.png");
        this.BB = null;
        if (this.facing == 0) {
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    update() {
        if (this.facing == 0) {
            this.x += 2;
            if (this.x - this.startingX > 100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.x -= 2;
            if (this.x - this.startingX < -100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (!this.removeFromWorld) {
            if (this.facing == 0) {
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(this.spritesheet, 390, 5, this.width, this.height, -(this.x + (this.width * PARAMS.SCALE * this.scale) + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x), this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
                ctx.restore();
            } else if (this.facing == 1) {
                ctx.drawImage(this.spritesheet, 390, 5, this.width, this.height, this.x - (this.width * PARAMS.SCALE * this.scale) - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            }
        }

        if (PARAMS.DEBUG && this.BB != null) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    }
}

class Spell {
    constructor(game, x, y, entity) {
        Object.assign(this, { game, x, y , entity });
        this.width = 894;
        this.height = 894;
        this.scale = 1/20;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/spell.png");
        this.rightBB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        this.leftBB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);

    }

    update() {

    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (this.game.attack1) {
            if (this.entity.facing == 0) {
                ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            } else if (this.entity.facing == 1) {
                ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x - (this.width * PARAMS.SCALE * this.scale) - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            }
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
        }

    }
}

class SpiritBall {
    constructor(game, x, y, facing, entity) {
        Object.assign(this, { game, x, y , facing, entity });
        this.width = 70;
        this.height = 70;
        this.scale = 1/4;
        this.startingX = x;
        this.removeFromWorld = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/spiritball.png");
        this.BB = null;
        if (this.facing == 0) {
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    update() {
        if (this.facing == 0) {
            this.x += 2;
            if (this.x - this.startingX > 100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        } else if (this.facing == 1) {
            this.x -= 2;
            if (this.x - this.startingX < -100) {
                this.removeFromWorld = true;
            }
            this.BB = new BoundingBox(this.x - (this.width * PARAMS.SCALE * this.scale), this.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
        }
    }

    drawMinimap(ctx, mmX, mmY) {
    }

    draw(ctx) {
        if (!this.removeFromWorld) {
            if (this.facing == 0) {
                ctx.drawImage(this.spritesheet, 16, 7, this.width, this.height, this.x + (this.entity.width * PARAMS.SCALE * this.entity.scale) - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            } else if (this.facing == 1) {
                ctx.drawImage(this.spritesheet, 16, 7, this.width, this.height, this.x - (this.width * PARAMS.SCALE * this.scale) - this.game.camera.x, this.y - this.game.camera.y, this.width * PARAMS.SCALE * this.scale, this.height * PARAMS.SCALE * this.scale);
            }
        }

        if (PARAMS.DEBUG && this.BB != null) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    }
}

