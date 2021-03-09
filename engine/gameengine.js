// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = [];
        this.showOutlines = false;
        this.ctx = null;
        this.pause = false;
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;
        this.mousePaddingX = 187;
        this.mousePaddingY = 137;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        this.menu = false;
        this.shop = false;
        this.instructions = false;
        this.credits = false;
        this.story = false;
        this.characterInfo = false;
        this.enemyInfo = false;

		this.battleui = false;
        this.map =false;
        this.changeLevel = false;
        this.gameWon = false;

        this.attack1 = false;
        this.attack2 = false;
        
        this.gameStates = ["titleScreen", "dungeonMap", "battleScene", "worldMap"];
        this.currentState = this.gameStates[0];

        this.gameMaps = [debugMap, startMap, Map2, Map3, Map4];
        this.mapIndex = 2;
        this.currentMap = this.gameMaps[this.mapIndex];

        this.levelSize = 1;
        this.levelToMapRatio = 1;

        if (this.currentMap == this.gameMaps[0]) {
            this.levelSize = 32 * 16;
        } else if (this.currentMap == this.gameMaps[2]) {
            this.levelSize = 32 * 75;
        } else if (this.currentMap == this.gameMaps[3]) {
            this.levelSize = 60 * 26;
        } else if (this.currentMap == this.gameMaps[4]) {
            this.levelSize = 32 * 25;
        }
        this.levelToMapRatio = 100 / this.levelSize;

    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    startInput() {
        var that = this;

		this.ctx.canvas.addEventListener("keypress", function (e) {
			switch (e.code) {
				case "KeyN":
					that.n = true;
					break;
				case "KeyM":
                    if (!that.camera.bossBattle || that.camera.gameOver) {
                        that.m = true;
                    }
					break;
			}
		}, false);   

        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = true;
                    break;
                case "KeyB":
                    if (!that.camera.battle && !that.camera.bossBattle) {
                        that.attack1 = true;
                    }
                    break;
                case "KeyV":
                    if (!that.camera.battle && !that.camera.bossBattle) {
                        that.attack2 = true;
                    }
                    break;
                case "KeyL":
                    if (!that.camera.battle && !that.camera.bossBattle && !that.pause) {
                        that.menu = !that.menu;

                        if (!that.menu) {
                            that.shop = false;
                            that.instructions = false;
                            that.credits = false;
                            that.story = false;
                            that.characterInfo = false;
                            that.enemyInfo = false;
                        }
                    }
                    break;
                case "Semicolon":
                    if (!that.camera.battle && !that.camera.bossBattle && !that.pause) {
                        that.map = !that.map;
                    }
                    break;
                case "KeyC":
                    if (PARAMS.DEBUG && !that.pause) {
                        // that.mapIndex++;
                        // if (that.mapIndex >= that.gameMaps.length) {
                        //     that.mapIndex = 0;
                        // }
                        // // console.log(that.mapIndex);
                        // that.currentMap = that.gameMaps[that.mapIndex];
                        that.changeLevel = true;
                    }
                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = false;
                    break;
                case "KeyB":
                    that.attack1 = false;
                    break;
                case "KeyV":
                    that.attack2 = false;
                    break;
				case "KeyN":
					that.n = false;
					break;
				case "KeyM":
					that.m = false;
					break;
                case "KeyC":
                    that.changeLevel = false;
                    break;
            }
        }, false);

        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x, y: y };
        }

        this.ctx.canvas.addEventListener("mousemove", function (e) {
            //console.log(getXandY(e));
            that.mouse = getXandY(e);
        }, false);

        this.ctx.canvas.addEventListener("click", function (e) {
            //console.log(getXandY(e));
            that.click = getXandY(e);
        }, false);

        // this.ctx.canvas.addEventListener("wheel", function (e) {
        //     //console.log(getXandY(e));
        //     that.wheel = e;
        //     //       console.log(e.wheelDelta);
        //     e.preventDefault();
        // }, false);

        // this.ctx.canvas.addEventListener("contextmenu", function (e) {
        //     //console.log(getXandY(e));
        //     that.rightclick = getXandY(e);
        //     e.preventDefault();
        // }, false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        //this.ctx.save();
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
        this.camera.draw(this.ctx);
    };

    update() {
        if (this.m && (this.gameWon || (this.camera.bossBattle && !this.gameWon))) {
            location.reload();
        }
        
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];
            if (!entity.removeFromWorld && (!this.pause || entity instanceof CrystalChoice)) {
                if (!this.menu || entity instanceof MainMenu || entity instanceof Instructions || 
                    entity instanceof Shop || entity instanceof Story || entity instanceof Credits
                    || entity instanceof CharacterInfo || entity instanceof EnemyInfo) {
                    entity.update();
                }
            }
        }
        this.camera.update();

        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

        if (this.currentMap == this.gameMaps[0]) {
            this.levelSize = 32 * 16;
        } else if (this.currentMap == this.gameMaps[2]) {
            this.levelSize = 32 * 75;
        } else if (this.currentMap == this.gameMaps[3]) {
            this.levelSize = 60 * 26;
        } else if (this.currentMap == this.gameMaps[4]) {
            this.levelSize = 32 * 25;
        }
        this.levelToMapRatio = 100 / this.levelSize;
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};