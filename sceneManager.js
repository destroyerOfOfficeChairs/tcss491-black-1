class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.midpoint = PARAMS.CANVASWIDTH/2;
		this.heroX = 130;
		this.heroY = 130;

        this.hero = new Hero(this.game, this.heroX, this.heroY);
        this.cleric = new Cleric(this.game, this.heroX, this.heroY+30);
        
        this.currentScene = "";
        this.loadTitleScreen(this.game, 0, 0);
        // this.loadLevelOne(this.heroX, this.heroY);
    }

    draw(ctx) {

    }
	
	sleep(milliseconds) {
		const date = Date.now();
		let currentDate = null;
		do {
			currentDate = Date.now();
		} while (currentDate - date < milliseconds);
	};

    update() {
        switch (this.currentScene) {
            case "TitleScreen":
                if (this.game.attack1) this.loadLevelOne(this.heroX, this.heroY);
                break;
            case "LevelOne":
                // center camera on hero during level exploration
                if(this.hero.battle == false){
                    // if (this.x < this.h.x - midpoint) 
                    this.x = this.hero.x - this.midpoint;
                    //if (this.y < this.h.y - midpoint) 
                    this.y = this.hero.y - this.midpoint;
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
        if (that.stillOnTItleScreen) {
            if (that.game.attack1) {
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
		//Cleric = new Cleric(this.game, 70, 130);
		//this.game.addEntity(new Cleric(this.game, 70, 130));
        
        // add enemy characters here
        this.game.addEntity(new Goblin(this.game, 96, 32));
        this.game.addEntity(new Bat(this.game, 64, 32));
        this.game.addEntity(new Skeleton(this.game, 32, 32));

        // add main/boss villain here

        // add main characters here
        //this.game.addEntity(this.hero);
        //this.game.addEntity(new Hero(this.game, 32, 90));

        this.game.addEntity(this.hero);
		this.hero.x = x;
		this.hero.y = y;
		this.hero.battle = false;
        console.log("Level: " + this.hero.x + ", " + this.hero.y);
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
		this.hero.y = 80;
		this.hero.battle = true;
		//console.log("Battle hero: " + this.hero.x + ", " + this.hero.y);
		this.game.addEntity(this.cleric);
		this.cleric.x = this.hero.x;
		this.cleric.y = this.hero.y + 50;
		//console.log("Battle cleric: " + this.cleric.x + ", " + this.cleric.y);
		
		// add enemies
		this.game.addEntity(new Goblin(this.game, 10, 40));
        this.game.addEntity(new Bat(this.game, 20, 110));
        this.game.addEntity(new Skeleton(this.game, 20, 150));
		
		
	}
}