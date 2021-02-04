class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.midpoint = PARAMS.CANVASWIDTH/2;
		this.heroX = 130;
        this.heroY = 130;
        this.coins = 0;
        this.crystals = 0;
        this.padding = 5;

        this.hero = new Hero(this.game, this.heroX, this.heroY);
        this.cleric = new Cleric(this.game, this.heroX, this.heroY+30);
		this.archer = new Archer(this.game, this.heroX, this.heroY+60);
		this.mage = new Mage(this.game, this.heroX, this.heroY+90);
        
        this.currentScene = "";
        this.loadTitleScreen(this.game, 0, 0);
        // this.loadLevelOne(this.heroX, this.heroY);
    }

    draw(ctx) {

        // should be separate from scenes
        // if (this.game.menu) {
        //     ctx.fillStyle = "Tan";
        //     ctx.fillRect(this.padding * 3, this.padding * 3, PARAMS.CANVASWIDTH - 6 * this.padding, PARAMS.CANVASHEIGHT - 6 * this.padding);
        //     ctx.strokeStyle = "Brown";
        //     ctx.strokeRect(this.padding * 3, this.padding * 3, PARAMS.CANVASWIDTH - 6 * this.padding, PARAMS.CANVASHEIGHT - 6 * this.padding);
            
        //     ctx.fillStyle = "Black";
        //     ctx.fillText("MENU ", PARAMS.CANVASWIDTH / 2 - 10, 6 * this.padding);
        // }

    }
	
	sleep(milliseconds) {
		const date = Date.now();
		let currentDate = null;
		do {
			currentDate = Date.now();
		} while (currentDate - date < milliseconds);
    };
    
    reset() {
        this.coins = 0;
        this.crystals = 0;
    }

    update() {
        if (this.hero.stats[0] <= 0) { // hero dies
            this.hero.reset();
            this.reset();
            this.currentScene = "TitleScreen";
            //this.loadTitleScreen(this.game, 0, 0);
            //this.loadLevelOne(this.heroX, this.heroY);
        }
        PARAMS.DEBUG = document.getElementById("debug").checked;
        switch (this.currentScene) {
            case "TitleScreen":
                if (this.game.attack1) this.loadLevelOne(this.heroX, this.heroY);
                break;
            case "LevelOne":
                // center camera on hero during level exploration
                if(this.hero.battle == false){
                    //if (this.x < this.hero.x - this.midpoint) {
                        this.x = this.hero.x - this.midpoint + this.hero.width/2 * PARAMS.SCALE * this.hero.scale;
                    //}
                    //if (this.y < this.hero.y - this.midpoint) {
                        this.y = this.hero.y - PARAMS.CANVASHEIGHT/2 + this.hero.height/2 * PARAMS.SCALE * this.hero.scale;
                    //}
                }
                // center camera in middle of battle
                else {
                    this.x = 0;
                    this.y = 0;
                }

                if(this.game.n){
                    this.heroX = this.hero.x;
                    this.heroY = this.hero.y;
                    //console.log("saved position: " + this.hero.x + ", " + this.hero.y);
                    this.sleep(200);
                    this.loadBattle();
                }
                if(this.game.m){
                    this.sleep(200);
                    this.loadLevelOne(this.heroX, this.heroY);
                }
        }
    };
    
    loadTitleScreen(game, x, y) {
        this.currentScene = "TitleScreen";
        this.game.entities = [];
        this.game.addEntity(new TitleScreen(game, x, y));
        var that = this;
        if (that.stillOnTitleScreen) {
            if (that.game.attack1 && this.game.up) {
                that.stillOnTitleScreen = false;
                that.loadLevelOne(that.heroX, that.heroY);
            }
        }
    }

    loadLevelOne(x,y) {
        this.currentScene = "LevelOne";
        //this.x = 0;
		this.game.entities = [];
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
        this.game.addEntity(new Box(this.game, 100, 180));
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
        this.game.addEntity(new Coin(this.game, 240, 140));
        this.game.addEntity(new Coin(this.game, 180, 140));
        this.game.addEntity(new Coin(this.game, 320, 140));
        this.game.addEntity(new Coin(this.game, 240, 190));
        this.game.addEntity(new Coin(this.game, 180, 360));
        this.game.addEntity(new Coin(this.game, 240, 240));
        this.game.addEntity(new Coin(this.game, 280, 340));
        this.game.addEntity(new Coin(this.game, 220, 240));
        this.game.addEntity(new Coin(this.game, 140, 290));
        this.game.addEntity(new Coin(this.game, 140, 360));
        this.game.addEntity(new Crystal(this.game, 60, 160));
        this.game.addEntity(new Crystal(this.game, 160, 160));
        this.game.addEntity(new Key(this.game, 200, 200));
        
        // add secondary characters here
		//Cleric = new Cleric(this.game, 70, 130);
		//this.game.addEntity(new Cleric(this.game, 70, 130));
        
        // add enemy characters here
        this.game.addEntity(new Goblin(this.game, 96, 32));
        this.game.addEntity(new Bat(this.game, 64 * 4, 32 * 4));
        this.game.addEntity(new Skeleton(this.game, 32 * 5, 32));

        // add main/boss villain here
        this.game.addEntity(new Dragon(this.game, 350, 200));

        // add main characters here
        //this.game.addEntity(this.hero);
        //this.game.addEntity(new Hero(this.game, 32, 90));
        this.game.addEntity(new Archer(this.game, 30, 80));
        this.game.addEntity(new Mage(this.game, 100, 100));

        this.game.addEntity(this.hero);
		this.hero.x = x;
		this.hero.y = y;
		this.hero.battle = false;
        console.log("Level: " + this.hero.x + ", " + this.hero.y);

        this.game.addEntity(new HeadsUpDisplay(this.game));
        this.game.addEntity(new MainMenu(this.game));
    }
	
	loadBattle() {
		this.x = 0;
		this.game.entities = [];
		
        // add decorations, etc. here
        var k, l;
        for (k = 0; k < 15; k++) {
            for (l = 0; l < 15; l++) {
                this.game.addEntity(new Grass(this.game, k * 32, l * 32));
            }
        }
		
		// add player characters
		this.game.addEntity(this.hero);
		this.hero.x = 200;
		this.hero.y = 50;
		this.hero.battle = true;
		//console.log("Battle hero: " + this.hero.x + ", " + this.hero.y);
		this.game.addEntity(this.cleric);
		this.cleric.x = this.hero.x;
		this.cleric.y = this.hero.y + 35;
		//console.log("Battle cleric: " + this.cleric.x + ", " + this.cleric.y);
		this.game.addEntity(this.archer);
		this.archer.x = this.hero.x;
		this.archer.y = this.cleric.y + 30;
		this.archer.battle = true;
		this.game.addEntity(this.mage);
		this.mage.x = this.hero.x;
		this.mage.y = this.archer.y + 40;
		this.mage.battle = true;
		
		// add enemies
		this.goblin = new Goblin(this.game, 10, 40)
		this.game.addEntity(this.goblin);
		this.bat = new Bat(this.game, 20, 100)
        this.game.addEntity(this.bat);
		this.skeleton = new Skeleton(this.game, 20, 150)
        this.game.addEntity(this.skeleton);
        
        this.game.addEntity(new HeadsUpDisplay(this.game));
        this.game.addEntity(new MainMenu(this.game));
		
		// load battle manager
		this.battleManager = new BattleManager(this.game,[this.goblin,this.bat,this.skeleton],
			[this.hero, this.cleric, this.archer, this.mage]);
		
	}
}