class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        // this.x = 0;
        // this.y = 0;
        this.hero = new Hero(this.game, 32, 90);
        this.game.camera.x = this.hero.x;
        this.game.camera.y = this.hero.y;
        this.xMidpoint = PARAMS.CANVASWIDTH/2 - PARAMS.BLOCKWIDTH / 2;
        this.yMidpoint = PARAMS.CANVASHEIGHT/2 - PARAMS.BLOCKWIDTH / 2;

        // this.loadDebugRoom();
        this.loadLevelOne();
        // this.loadTitleScreen();
    }

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;


        // if (this.x < this.hero.x - midpoint) this.x = this.hero.x - midpoint;
        this.x = this.hero.x - this.xMidpoint;
        this.y = this.hero.y - this.yMidpoint;
    
        // if (this.mario.dead && this.mario.y > PARAMS.BLOCKWIDTH * 16) {
        //     this.mario.dead = false;
        //     this.loadLevelOne(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
        // };
    };

    //* THIS IS WHERE NEW STUFF SHOULD BE TRIED */
    loadDebugRoom() {
        // add decorations, etc. here
        var i, j;
        for (i = 0; i < 100; i++) {
            for (j = 0; j < 100; j++) {
                this.game.addEntity(new Grass(this.game, i * 32, j * 32));
            }
        }
        this.game.addEntity(new Box(this.game, 100, 150));

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
		this.game.addEntity(new Hero(this.game, 32, 90));
    }

    loadTitleScreen() {
        this.game.addEntity(new TitleScreen(this.game, 0, 0));
        console.log("ding");
    }

    loadLevelOne() {
        var i, j;
        for (i = 0; i < 100; i++) {
            for (j = 0; j < 100; j++) {
                this.game.addEntity(new Grass(this.game, i * 32, j * 32));
            }
        }
        this.game.addEntity(this.hero);
    }

}