class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.midpoint = PARAMS.CANVASWIDTH/2;
        this.padding = 5;

        // uncomment this when starting on startMap
		// this.heroX = 1024;
        // this.heroY = 1900;
        this.startingHeroX = 200;
        this.startingHeroY = 200;
        this.heroX = this.startingHeroX; // 200 // 1230 // 1614
        this.heroY = this.startingHeroY; // 200 // 1030 // 1686

        this.coins = 0;
        this.crystals = 0;
        this.keys = 0;
        this.crystalAttackPower = 25;
        this.crystalDefensePower = 25;
        this.attackUpgradeCost = 5;
        this.defenseUpgradeCost = 8;
        this.healthUpgradeCost = 10;
        this.attackUpgrade = 2;
        this.defenseUpgrade = 1;
        this.healthUpgrade = 10;
        this.battle = false;
        this.bossBattle = false;
		this.encounter = Math.floor(Math.random()*2000)+800; // 4000+ steps is far too high a range, you'll explore well over half the map before you find even your first battle

        this.hero = new Hero(this.game, this.heroX, this.heroY);
        this.cleric = new Cleric(this.game, this.heroX, this.heroY+30);
		this.archer = new Archer(this.game, this.heroX, this.heroY+60);
        this.mage = new Mage(this.game, this.heroX, this.heroY+90);

        //this.minimap = new Minimap(this.game, 1.5 * PARAMS.BLOCKWIDTH, 3.5 * PARAMS.BLOCKWIDTH, 224 * PARAMS.SCALE);
        this.minimap = new Minimap(this.game, 151, 119, 100);

        //saves the entities for each level to preserve state
        this.savedMapEntities = [];
        for (var i = 0; i < this.game.gameMaps.length; i++) {
            this.savedMapEntities.push([]);
        }
		
        // commented this out because the dragon should be added as JSON
        // otherwise he shows up in every map.  I'm pretty sure every entity
        // will behave this way, so it's important to add them via JSON from
        // now on.
        // this.boss = new Dragon(this.game, 350, 200);

        this.bossStats = [1000, 360, 300, 3]; // stats = [hp, att, def, spd] [500, 150, 150, 3];

        buildMapData();
        
        this.loadTitleScreen(this.game, 0, 0);
    }

    draw(ctx) {
        this.minimap.draw(ctx);
    }
    
    update() {
        // if (this.game.m && (this.game.gameWon || (this.bossBattle && !this.game.gameWon))) {
        //     location.reload();
        // }
        
        // if (this.hero.stats[0] <= 0) { // hero dies (it should be changed such that when you lose, you restart)
        //     //location.reload();

        //     // this.hero.reset();
        //     // this.reset();
        //     // this.loadTitleScreen(this.game, 0, 0);
        //     // this.game.currentState = this.game.gameStates[0];
        // }

        PARAMS.DEBUG = document.getElementById("debug").checked;
        switch (this.game.currentState) {
            case this.game.gameStates[0]:
                if (this.game.attack1) 
                    this.loadMap(this.game.currentMap, this.heroX, this.heroY);
                    break;
            case this.game.gameStates[1]:
                if (this.game.changeLevel) {
                    this.game.mapIndex++;
                    if (this.game.mapIndex >= this.game.gameMaps.length) {
                        this.game.mapIndex = 2;

                        //boss battle
                        this.game.camera.bossBattle = true;
                    } else {
                        //this.keys = 0;
                        this.hero.x = this.startingHeroX;
                        this.hero.y = this.startingHeroY;
                    }
                    this.game.currentMap = this.game.gameMaps[this.game.mapIndex];                        
                    this.loadMap(this.game.currentMap, this.startingHeroX, this.startingHeroY);
                    this.game.changeLevel = false;
                }
                // center camera on hero during level exploration
                this.x = this.hero.x - this.midpoint + this.hero.width/2 * PARAMS.SCALE * this.hero.scale;
                this.y = this.hero.y - PARAMS.CANVASHEIGHT/2 + this.hero.height/2 * PARAMS.SCALE * this.hero.scale;

                if (this.bossBattle) {
                    this.heroX = this.hero.x;
                    this.heroY = this.hero.y;
                    this.hero.velocity.x = 0;
                    this.hero.velocity.y = 0;
                    this.sleep(200);
                    this.loadBossBattle();
                }
                
                // press N to switch to a battle scene
                if((this.game.n && PARAMS.DEBUG)|| this.hero.dist >= this.encounter){
					this.encounter = Math.floor(Math.random()*2000)+800; // 4000+ steps is far too high a range, you'll explore well over half the map before you find even your first battle
                    this.heroX = this.hero.x;
                    this.heroY = this.hero.y;
                    this.hero.velocity.x = 0;
                    this.hero.velocity.y = 0;
                    //this.game.currentState = this.game.gameStates[2];
                    this.sleep(200);
                    this.battle = true;
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
                    this.battle = false;
                    this.bossBattle = false;
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

        if (this.savedMapEntities[this.game.mapIndex].length == 0) { //if adding entites for the first time

            if (map.CastleFloor1) {
                for (var i = 0; i < map.CastleFloor1.length; i++) {
                    let ent = map.CastleFloor1[i];
                    this.game.addEntity(new CastleFloor1(this.game, ent.x, ent.y));
                }
            }
            if (map.CastleWall1Mid) {
                for (var i = 0; i < map.CastleWall1Mid.length; i++) {
                    let ent = map.CastleWall1Mid[i];
                    this.game.addEntity(new CastleWall1Mid(this.game, ent.x, ent.y));
                }
            }
            if (map.CastleWall1LeftCorner) {
                for (var i = 0; i < map.CastleWall1LeftCorner.length; i++) {
                    let ent = map.CastleWall1LeftCorner[i];
                    this.game.addEntity(new CastleWall1LeftCorner(this.game, ent.x, ent.y));
                }
            }
            if (map.CastleWall1RightCorner) {
                for (var i = 0; i < map.CastleWall1RightCorner.length; i++) {
                    let ent = map.CastleWall1RightCorner[i];
                    this.game.addEntity(new CastleWall1RightCorner(this.game, ent.x, ent.y));
                }
            }
            if (map.CastleWall1RightEdge) {
                for (var i = 0; i < map.CastleWall1RightEdge.length; i++) {
                    let ent = map.CastleWall1RightEdge[i];
                    this.game.addEntity(new CastleWall1RightEdge(this.game, ent.x, ent.y));
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
                    this.game.addEntity(new Box(this.game, ent.x, ent.y, ent.item));
                }
            }
            if (map.Tree) {
                for (var i = 0; i < map.Tree.length; i++) {
                    let ent = map.Tree[i];
                    this.game.addEntity(new Tree(this.game, ent.x, ent.y));
                }
            }
            if (map.Water) {
                for (var i = 0; i < map.Water.length; i++) {
                    let ent = map.Water[i];
                    this.game.addEntity(new Water(this.game, ent.x, ent.y));
                }
            }
            if (map.Wall) {
                for (var i = 0; i < map.Wall.length; i++) {
                    let ent = map.Wall[i];
                    this.game.addEntity(new Wall(this.game, ent.x, ent.y));
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
            if (map.Portal) {
                for (var i = 0; i < map.Portal.length; i++) {
                    let ent = map.Portal[i];
                    this.game.addEntity(new Portal(this.game, ent.x, ent.y));
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
                    let bat = new Bat(this.game, ent.x, ent.y)
                    this.game.addEntity(bat);
                    this.game.addEntity(new Scratch(this.game, ent.x, ent.y, bat));
                }
            }
            if (map.Skeleton) {
                for (var i = 0; i < map.Skeleton.length; i++) {
                    let ent = map.Skeleton[i];
                    let skeleton = new Skeleton(this.game, ent.x, ent.y)
                    this.game.addEntity(skeleton);
                    this.game.addEntity(new DeathStare(this.game, ent.x, ent.y, skeleton));
                }
            }
            if (map.Dragon) {
                for (var i = 0; i < map.Dragon.length; i++) {
                    let ent = map.Dragon[i];
                    let theDragon = new Dragon(this.game, ent.x, ent.y);
                    this.game.addEntity(theDragon);
                    this.game.addEntity(new FireBreath(this.game, ent.x, ent.y, theDragon));
                }
            }
            // this.game.addEntity(this.boss);
            // this.game.addEntity(new FireBreath(this.game, this.boss.x, this.boss.y));
            //this.game.addEntity(new ShadowBall(this.game, this.boss.x, this.boss.y, this.boss.facing));
    
            if (map.Archer) {
                for (var i = 0; i < map.Archer.length; i++) {
                    let ent = map.Archer[i];
                    this.game.addEntity(new Archer(this.game, ent.x, ent.y));
                }
            }
            if (map.Mage) {
                for (var i = 0; i < map.Mage.length; i++) {
                    let ent = map.Mage[i];
                    let mage = new Mage(this.game, ent.x, ent.y);
                    this.game.addEntity(mage);
                    this.game.addEntity(new Lightning(this.game, ent.x, ent.y, mage));
                }
            }
            if (map.Cleric) {
                for (var i = 0; i < map.Cleric.length; i++) {
                    let ent = map.Cleric[i];
                    let cleric = new Cleric(this.game, ent.x, ent.y);
                    this.game.addEntity(cleric);
                    this.game.addEntity(new Spell(this.game, ent.x, ent.y, cleric));
                }
            }
    
            //this.game.addEntity(this.cleric);
            //this.game.addEntity(new Spell(this.game, this.cleric.x, this.cleric.y, this.cleric));
    
            //this.hero.x = x;
            //this.hero.y = y;
            this.hero.battle = false;
            this.game.addEntity(this.hero);
            this.game.addEntity(new Slash(this.game, this.hero.x, this.hero.y, this.hero));
            
            this.game.addEntity(new HeadsUpDisplay(this.game));
            this.game.addEntity(new MainMenu(this.game));
            this.game.addEntity(new Shop(this.game));
            this.game.addEntity(new Instructions(this.game));
            this.game.addEntity(new Credits(this.game));
    
            this.savedMapEntities[this.game.mapIndex] = this.game.entities;
        } else {                                            //reload entities to preserve state of the game
            this.game.entities = this.savedMapEntities[this.game.mapIndex];
            this.hero.x = x;
            this.hero.y = y;
            this.hero.battle = false;
        }

    }
    
    loadBattle() {
        this.game.currentState = this.game.gameStates[2];
        this.x = 0;
        this.game.entities = [];
        this.game.map = false;
        this.game.menu = false;
		
        // add decorations, etc. here
        var k, l;
        for (k = 0; k < 15; k++) {
            for (l = 0; l < 15; l++) {
				switch (this.game.mapIndex){
					case 2:
						this.game.addEntity(new StonePath(this.game, k * 32, l * 32));
						this.game.addEntity(new Grass1(this.game, (k * 32) + 10, (l * 32) + 8));
						break;
					case 3:
						this.game.addEntity(new StonePath(this.game, k * 32, l * 32));
						break;
					case 4:
						this.game.addEntity(new StonePath(this.game, k * 32, l * 32));
						break;
				}
            }
        }
		
		// add player characters
        this.hero.battle = true;
        this.game.addEntity(new Slash(this.game, this.hero.x, this.hero.y, this.hero));
        this.cleric.battle = true;
		this.archer.battle = true;
		this.mage.battle = true;
		
		// add enemies
		this.goblin = new Goblin(this.game, 5, 55);
		this.bat = new Bat(this.game, 5, 143);
        this.game.addEntity(new Scratch(this.game, this.bat.x, this.bat.y, this.bat));
        
		this.skeleton = new Skeleton(this.game, 5, 98);
        this.game.addEntity(new DeathStare(this.game, this.skeleton.x, this.skeleton.y, this.skeleton));
        
        this.game.addEntity(new HeadsUpDisplay(this.game));
        this.game.addEntity(new MainMenu(this.game));
        this.game.addEntity(new Shop(this.game));
        this.game.addEntity(new Instructions(this.game));
        this.game.addEntity(new Credits(this.game));
		
		//types of random encounters
		this.enemyGroups = [];
		this.enemyGroups.push([this.goblin, this.skeleton, this.bat]);
		this.enemyGroups.push([this.goblin, new Goblin(this.game, 5, 55), new Goblin(this.game, 5, 55)]);
		this.enemyGroups.push([this.goblin, new Goblin(this.game, 5, 55), this.bat]);
		this.enemyGroups.push([this.goblin, new Goblin(this.game, 5, 55), this.skeleton]);
		this.enemyGroups.push([this.skeleton, new Skeleton(this.game, 5, 98), new Skeleton(this.game, 5, 98)]);
		this.enemyGroups.push([this.skeleton, new Skeleton(this.game, 5, 98), this.goblin]);
		this.enemyGroups.push([this.skeleton, new Skeleton(this.game, 5, 98), this.bat]);
		this.enemyGroups.push([this.bat, new Bat(this.game, 5, 143), new Bat(this.game, 5, 143)]);
		this.enemyGroups.push([this.bat, new Bat(this.game, 5, 143), this.goblin]);
		this.enemyGroups.push([this.bat, new Bat(this.game, 5, 143), this.skeleton]);
		//choose an encounter
		this.chosenGroup = this.enemyGroups[Math.floor(Math.random()*10)];
		
		// load battle manager
		this.battleManager = new BattleManager(this.game, this.chosenGroup,//[this.goblin,this.skeleton,this.bat],
			[this.hero, this.cleric, this.archer, this.mage]);
		this.ui = new BattleUI(this.game, this.battleManager, this.chosenGroup,//[this.goblin,this.skeleton,this.bat],
			[this.hero, this.cleric, this.archer, this.mage])
		this.game.addEntity(this.ui);

        this.game.addEntity(new Spell(this.game, this.cleric.x, this.cleric.y, this.cleric));
        this.game.addEntity(new Lightning(this.game, this.mage.x, this.mage.y, this.mage));


    }

    loadBossBattle() {
        this.game.currentState = this.game.gameStates[2];
        this.x = 0;
        this.game.entities = [];
        this.game.map = false;
        this.game.menu = false;
		
        // add decorations, etc. here
        var k, l;
        for (k = 0; k < 15; k++) {
            for (l = 0; l < 15; l++) {
                this.game.addEntity(new Grass1(this.game, k * 32, l * 32));
            }
        }
		
		// add player characters
        this.hero.battle = true;
        this.game.addEntity(new Slash(this.game, this.hero.x, this.hero.y, this.hero));
        this.cleric.battle = true;
		this.archer.battle = true;
		this.mage.battle = true;
		
		// add enemies
		this.dragon = new Dragon(this.game, 5, 50);
        this.game.addEntity(new FireBreath(this.game, this.dragon.x, this.dragon.y, this.dragon));
        
        this.game.addEntity(new HeadsUpDisplay(this.game));
        this.game.addEntity(new MainMenu(this.game));
        this.game.addEntity(new Shop(this.game));
        this.game.addEntity(new Instructions(this.game));
        this.game.addEntity(new Credits(this.game));
		
		// load battle manager
		this.battleManager = new BattleManager(this.game, [this.dragon],
			[this.hero, this.cleric, this.archer, this.mage]);
		this.ui = new BattleUI(this.game, this.battleManager, [this.dragon],
			[this.hero, this.cleric, this.archer, this.mage])
		this.game.addEntity(this.ui);

        this.game.addEntity(new Spell(this.game, this.cleric.x, this.cleric.y, this.cleric));
        this.game.addEntity(new Lightning(this.game, this.mage.x, this.mage.y, this.mage));


    }
    
    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    };
    
    reset() {
        this.game.gameWon = false;
        this.battle = false;
        this.bossBattle = false;
        this.coins = 0;
        this.crystals = 0;
        this.keys = 0;

        this.hero.x = this.startingHeroX;
        this.hero.y = this.startingHeroY;
        // console.log(this.hero.x);
        // console.log(this.hero.y);

        this.game.currentState = this.game.gameStates[0];
        this.game.mapIndex = 2;
        this.game.currentMap = this.game.gameMaps[this.game.mapIndex];
        this.game.entities = [];
        this.savedMapEntities = [];
        for (var i = 0; i < this.game.gameMaps.length; i++) { // 4 directions (right, left, down, up)
            this.savedMapEntities.push([]);
        }
    }
	
}

class Minimap {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });
    };

    update() {

    };

    draw(ctx) {
        if (this.game.map) {
            ctx.strokeStyle = "Brown";
            ctx.strokeRect(this.x, this.y, this.w, 100);
            ctx.fillStyle = "Tan";
            ctx.fillRect(this.x, this.y, this.w, 100);
            for (var i = 0; i < this.game.entities.length; i++) {
                this.game.entities[i].drawMinimap(ctx, this.x, this.y);
            }
        }
    };
}