class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.hero = new Hero(this.game, 130, 130);

        this.loadLevelOne();
    }

    draw(ctx) {
        //if (PARAMS.DEBUG) {
            // let xV = "xV=" + Math.floor(this.hero.velocity.x);
            // let yV = "yV=" + Math.floor(this.hero.velocity.y);
            // ctx.fillText(xV, 1.5 * PARAMS.BLOCKWIDTH, 2.5 * PARAMS.BLOCKWIDTH);
            // ctx.fillText(yV, 1.5 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);

            // ctx.translate(0, -10); // hack to move elements up by 10 pixels instead of adding -10 to all y coordinates below
            // ctx.strokeStyle = "White";
            // ctx.lineWidth = 2;
            // ctx.strokeStyle = this.game.left ? "White" : "Grey";
            // ctx.fillStyle = ctx.strokeStyle;
            // ctx.strokeRect(6 * PARAMS.BLOCKWIDTH - 2, 2.5 * PARAMS.BLOCKWIDTH - 2, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            // ctx.fillText("L", 6 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);
            // ctx.strokeStyle = this.game.down ? "White" : "Grey";
            // ctx.fillStyle = ctx.strokeStyle;
            // ctx.strokeRect(6.5 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            // ctx.fillText("D", 6.5 * PARAMS.BLOCKWIDTH + 2, 3.5 * PARAMS.BLOCKWIDTH + 2);
            // ctx.strokeStyle = this.game.up ? "White" : "Grey";
            // ctx.fillStyle = ctx.strokeStyle;
            // ctx.strokeRect(6.5 * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH - 4, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            // ctx.fillText("U", 6.5 * PARAMS.BLOCKWIDTH + 2, 2.5 * PARAMS.BLOCKWIDTH - 2);
            // ctx.strokeStyle = this.game.right ? "White" : "Grey";
            // ctx.fillStyle = ctx.strokeStyle;
            // ctx.strokeRect(7 * PARAMS.BLOCKWIDTH + 2, 2.5 * PARAMS.BLOCKWIDTH - 2, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            // ctx.fillText("R", 7 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);

            // ctx.strokeStyle = this.game.A ? "White" : "Grey";
            // ctx.fillStyle = ctx.strokeStyle;
            // ctx.beginPath();
            // ctx.arc(8.25 * PARAMS.BLOCKWIDTH + 2, 2.75 * PARAMS.BLOCKWIDTH, 0.25 * PARAMS.BLOCKWIDTH + 4, 0, 2 * Math.PI);
            // ctx.stroke();
            // ctx.fillText("A", 8 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);
            // ctx.strokeStyle = this.game.B ? "White" : "Grey";
            // ctx.fillStyle = ctx.strokeStyle;
            // ctx.beginPath();
            // ctx.arc(9 * PARAMS.BLOCKWIDTH + 2, 2.75 * PARAMS.BLOCKWIDTH, 0.25 * PARAMS.BLOCKWIDTH + 4, 0, 2 * Math.PI);
            // ctx.stroke();
            // ctx.fillText("B", 8.75 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);

            // ctx.translate(0, 10);
            // ctx.strokeStyle = "White";
            // ctx.fillStyle = ctx.strokeStyle;

            //this.minimap.draw(ctx);
        //}
    }

    update() {
        //PARAMS.DEBUG = document.getElementById("debug").checked;

        let midpoint = PARAMS.CANVASWIDTH/2; // - PARAMS.BLOCKWIDTH / 2;

        // if (this.x >= 0) {
        //     this.x = this.hero.x - midpoint;
        // }
        // if (this.y >= 0) {
        //     this.y = this.hero.y - midpoint;
        // }

        // if (this.x < this.h.x - midpoint) 
        this.x = this.hero.x - midpoint;
        //if (this.y < this.h.y - midpoint) 
        this.y = this.hero.y - midpoint;

    
        // if (this.mario.dead && this.mario.y > PARAMS.BLOCKWIDTH * 16) {
        //     this.mario.dead = false;
        //     this.loadLevelOne(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
        // };
    };

    loadLevelOne() {
        this.x = 0;
        // add decorations, etc. here
        var i, j;
        for (i = 0; i < 15; i++) {
            for (j = 0; j < 15; j++) {
                this.game.addEntity(new Grass(this.game, i * 32, j * 32));
            }
        }

        for (i = 0; i < 3; i++) {
            this.game.addEntity(new StonePath(this.game, 150 + 60 * i, 150));
            this.game.addEntity(new DirtPath(this.game, 150 + 50 * i, 75));
        }

        this.game.addEntity(new Bush(this.game, 250, 250));
        this.game.addEntity(new Rock(this.game, 20, 20));
        this.game.addEntity(new Rock(this.game, 300, 300));
        this.game.addEntity(new Box(this.game, 100, 150));
        this.game.addEntity(new Tree(this.game, 170, 230));

        for (i = 0; i < 2; i++) {
            this.game.addEntity(new Wall(this.game, 20, 200 + 38 * i));
        }

        for (i = 0; i < 2; i++) {
            for (j = 0; j < 2; j++) {
                this.game.addEntity(new Water(this.game, 300 + 63 * i, 300 + 63 * j));
            }
        }

        //add coins, gems, other resources here
        this.game.addEntity(new Lock(this.game, 200, 0));
        this.game.addEntity(new Coin(this.game, 40, 140))
        this.game.addEntity(new Crystal(this.game, 60, 160));
        this.game.addEntity(new Key(this.game, 200, 200));
        
        // add secondary characters here
		this.game.addEntity(new Cleric(this.game, 70, 90));
        
        // add enemy characters here
        this.game.addEntity(new Goblin(this.game, 96, 32));
        this.game.addEntity(new Bat(this.game, 64, 32));
        this.game.addEntity(new Skeleton(this.game, 32, 32));

        // add main/boss villain here

        // add main characters here
        //this.game.addEntity(this.hero);
        //this.game.addEntity(new Hero(this.game, 32, 90));

        this.game.addEntity(this.hero);
    }

}