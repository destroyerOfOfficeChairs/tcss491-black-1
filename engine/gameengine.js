// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = [];
        this.showOutlines = false;
        this.ctx = null;
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
		this.battleui = false;

        this.attack1 = false;
        this.attack2 = false;
        
        this.gameStates = ["titleScreen", "dungeonMap", "battleScene", "worldMap"];
        this.currentState = this.gameStates[0];

        this.gameMaps = [debugMap, startMap];
        this.currentMap = this.gameMaps[0];
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
					that.m = true;
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
                    that.attack1 = true;
                    break;
                case "KeyV":
                    that.attack2 = true;
                    break;
                case "KeyL":
                    that.menu = !that.menu;
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
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (!entity.removeFromWorld) {
                if (!this.menu || entity instanceof MainMenu || entity instanceof Instructions || entity instanceof Shop) {
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
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};