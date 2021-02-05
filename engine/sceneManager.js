class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.midpoint = PARAMS.CANVASWIDTH/2;
        this.padding = 5;

		this.heroX = 130;
        this.heroY = 130;

        this.coins = 0;
        this.crystals = 0;
        this.crystalAttackPower = 50;
        this.crystalDefensePower = 50;
        this.attackUpgradeCost = 1;
        this.defenseUpgradeCost = 2;
        this.healthUpgradeCost = 3;
        this.attackUpgrade = 2;
        this.defenseUpgrade = 1;
        this.healthUpgrade = 10;

        this.hero = new Hero(this.game, this.heroX, this.heroY);
        this.cleric = new Cleric(this.game, this.heroX, this.heroY+30);
		this.archer = new Archer(this.game, this.heroX, this.heroY+60);
        this.mage = new Mage(this.game, this.heroX, this.heroY+90);
        
        this.boss = new Dragon(this.game, 350, 200);

        buildMapData();
        
        this.loadTitleScreen(this.game, 0, 0);
    }

    draw(ctx) {
        // Do nothing
    }
    
    update() {
        if (this.hero.stats[0] <= 0) { // hero dies
            this.hero.reset();
            this.reset();
            this.loadTitleScreen(this.game, 0, 0);
        }
        PARAMS.DEBUG = document.getElementById("debug").checked;
        switch (this.game.currentState) {
            case this.game.gameStates[0]:
                if (this.game.attack1) this.loadMap(this.game.currentMap, 130, 130);
                break;
            case this.game.gameStates[1]:
                // center camera on hero during level exploration
                this.x = this.hero.x - this.midpoint + this.hero.width/2 * PARAMS.SCALE * this.hero.scale;
                this.y = this.hero.y - PARAMS.CANVASHEIGHT/2 + this.hero.height/2 * PARAMS.SCALE * this.hero.scale;
                
                // press N to switch to a battle scene
                if(this.game.n){
                    this.heroX = this.hero.x;
                    this.heroY = this.hero.y;
                    this.game.currentState = this.game.gameStates[2];
                    this.sleep(200);
                    this.loadBattle();
                }
                break;
            case this.game.gameStates[2]:
                // center camera in middle of battle
                this.x = 0;
                this.y = 0;
                
                // press M to go back to the current dungeon map
                if(this.game.m){
                    this.sleep(200);
                    this.loadMap(this.game.currentMap, this.heroX, this.heroY);
                }
                break;
        }
    };
                
    loadTitleScreen(game, x, y) {
        this.game.currentState = this.game.gameStates[0];
        this.game.entities = [];
        this.game.addEntity(new TitleScreen(game, x, y));
    }
    
    loadMap(map, x, y) {
        this.game.currentState = this.game.gameStates[1];
        this.game.entities = [];
        this.x = 0;
        this.y = 0;
        if (map.CastleFloor1) {
            for (var i = 0; i < map.CastleFloor1.length; i++) {
                let ent = map.CastleFloor1[i];
                this.game.addEntity(new CastleFloor1(this.game, ent.x, ent.y))
            }
        }
        if (map.Grass1) {
            for (var i = 0; i < map.Grass1.length; i++) {
                let ent = map.Grass1[i];
                this.game.addEntity(new Grass1(this.game, ent.x, ent.y))
            }
        }
        if (map.StonePath) {
            for (var i = 0; i < map.StonePath.length; i++) {
                let ent = map.StonePath[i];
                this.game.addEntity(new StonePath(this.game, ent.x, ent.y))
            }
        }
        if (map.DirthPath) {
            for (var i = 0; i < map.DirtPath.length; i++) {
                let ent = map.DirtPath[i];
                this.game.addEntity(new DirtPath(this.game, ent.x, ent.y));
            }
        }
        if (map.Bush) {
            for (var i = 0; i < map.Bush.length; i++) {
                let ent = map.Bush[i];
                this.game.addEntity(new Bush(this.game, ent.x, ent.y));
            }
        }
        if (map.Rock) {
            for (var i = 0; i < map.Rock.length; i++) {
                let ent = map.Rock[i];
                this.game.addEntity(new Rock(this.game, ent.x, ent.y));
            }
        }
        if (map.Box) {
            for (var i = 0; i < map.Box.length; i++) {
                let ent = map.Box[i];
                this.game.addEntity(new Box(this.game, ent.x, ent.y));
            }
        }
        if (map.Tree) {
            for (var i = 0; i < map.Tree.length; i++) {
                let ent = map.Tree[i];
                this.game.addEntity(new Tree(this.game, ent.x, ent.y));
            }
        }
        if (map.Wall) {
            for (var i = 0; i < map.Wall.length; i++) {
                let ent = map.Wall[i];
                this.game.addEntity(new Wall(this.game, ent.x, ent.y));
            }
        }
        if (map.Water) {
            for (var i = 0; i < map.Water.length; i++) {
                let ent = map.Water[i];
                this.game.addEntity(new Water(this.game, ent.x, ent.y));
            }
        }
        if (map.Lock) {
            for (var i = 0; i < map.Lock.length; i++) {
                let ent = map.Lock[i];
                this.game.addEntity(new Lock(this.game, ent.x, ent.y));
            }
        }
        if (map.Coin) {
            for (var i = 0; i < map.Coin.length; i++) {
                let ent = map.Coin[i];
                this.game.addEntity(new Coin(this.game, ent.x, ent.y));
            }
        }
        if (map.Crystal) {
            for (var i = 0; i < map.Crystal.length; i++) {
                let ent = map.Crystal[i];
                this.game.addEntity(new Crystal(this.game, ent.x, ent.y));
            }
        }
        if (map.Key) {
            for (var i = 0; i < map.Key.length; i++) {
                let ent = map.Key[i];
                this.game.addEntity(new Key(this.game, ent.x, ent.y));
            }
        }
        if (map.Goblin) {
            for (var i = 0; i < map.Goblin.length; i++) {
                let ent = map.Goblin[i];
                this.game.addEntity(new Goblin(this.game, ent.x, ent.y));
            }
        }
        if (map.Bat) {
            for (var i = 0; i < map.Bat.length; i++) {
                let ent = map.Bat[i];
                this.game.addEntity(new Bat(this.game, ent.x, ent.y));
            }
        }
        if (map.Skeleton) {
            for (var i = 0; i < map.Skeleton.length; i++) {
                let ent = map.Skeleton[i];
                this.game.addEntity(new Skeleton(this.game, ent.x, ent.y));
            }
        }
        // if (map.Dragon) {
        //     for (var i = 0; i < map.Dragon.length; i++) {
        //         let ent = map.Dragon[i];
        //         this.game.addEntity(new Dragon(this.game, ent.x, ent.y));
        //     }
        // }
        this.game.addEntity(this.boss);

        if (map.Archer) {
            for (var i = 0; i < map.Archer.length; i++) {
                let ent = map.Archer[i];
                this.game.addEntity(new Archer(this.game, ent.x, ent.y));
            }
        }
        if (map.Mage) {
            for (var i = 0; i < map.Mage.length; i++) {
                let ent = map.Mage[i];
                this.game.addEntity(new Mage(this.game, ent.x, ent.y));
            }
        }

        this.hero.x = x;
        this.hero.y = y;
        this.hero.battle = false;
        this.game.addEntity(this.hero);
        
        this.game.addEntity(new HeadsUpDisplay(this.game));
        this.game.addEntity(new MainMenu(this.game));
        this.game.addEntity(new Shop(this.game));
        this.game.addEntity(new Instructions(this.game));
    }
    
    loadBattle() {
        this.game.currentState = this.game.gameStates[2];
        this.x = 0;
        this.game.entities = [];
		
        // add decorations, etc. here
        var k, l;
        for (k = 0; k < 15; k++) {
            for (l = 0; l < 15; l++) {
                this.game.addEntity(new Grass1(this.game, k * 32, l * 32));
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
        this.game.addEntity(new Shop(this.game));
        this.game.addEntity(new Instructions(this.game));
		
		// load battle manager
		this.battleManager = new BattleManager(this.game,[this.goblin,this.bat,this.skeleton],
			[this.hero, this.cleric, this.archer, this.mage]);
		
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
        this.game.currentState = this.game.gameStates[0];
        this.game.currentMap = this.game.gameMaps[0];
    }
	
}