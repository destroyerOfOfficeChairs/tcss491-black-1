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
        this.heroX = this.startingHeroX;
        this.heroY = this.startingHeroY;

        this.coins = 0;
        this.crystals = 0;
        this.keys = 0;
        this.potions = 0;
        this.crystalAttackPower = 3;
        this.crystalDefensePower = 1;
        this.attackUpgradeCost = 25;
        this.defenseUpgradeCost = 20;
        this.healthUpgradeCost = 30;
        this.attackUpgrade = 2;
        this.defenseUpgrade = 1;
        this.healthUpgrade = 10;
        this.battle = false;
        this.bossBattle = false;
		this.encounter = Math.floor(Math.random()*2000)+1000;
        this.gameOver = false;

        this.hero = new Hero(this.game, this.heroX, this.heroY);
        this.cleric = new Cleric(this.game, this.heroX, this.heroY+30);
		this.archer = new Archer(this.game, this.heroX, this.heroY+60);
        this.mage = new Mage(this.game, this.heroX, this.heroY+90);

        this.minimap = new Minimap(this.game, 151, 119, 100);

        //saves the entities for each level to preserve state
        this.savedMapEntities = [];
        for (var i = 0; i < this.game.gameMaps.length; i++) {
            this.savedMapEntities.push([]);
        }

        this.bossStats = [1000, 90, 20, 3]; // stats = [hp, att, def, spd]

        buildMapData();
        
        this.loadTitleScreen(this.game, 0, 0);
    }

    draw(ctx) {
        this.minimap.draw(ctx);
    }
    
    update() {
        //PARAMS.DEBUG = document.getElementById("debug").checked;
        this.updateAudio();
        switch (this.game.currentState) {
            case this.game.gameStates[0]:
                if (this.game.attack1) 
                    this.loadMap(this.game.currentMap, this.heroX, this.heroY);
                    break;
            case this.game.gameStates[1]:
                if (this.game.changeLevel) {
                    this.game.mapIndex++;
                    if (this.game.mapIndex >= this.game.gameMaps.length) { // boss battle
                        this.game.mapIndex = 2;
                        this.game.camera.bossBattle = true;
                    } else {
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
					this.encounter = Math.floor(Math.random()*2000)+1000;
                    this.heroX = this.hero.x;
                    this.heroY = this.hero.y;
                    this.hero.velocity.x = 0;
                    this.hero.velocity.y = 0;
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
                    this.hero.hide = false;
                    this.cleric.hide = false;
                    this.archer.hide = false;
                    this.mage.hide = false;
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
        ASSET_MANAGER.pauseBackgroundMusic();
        if (this.game.mapIndex == 2) {
            ASSET_MANAGER.playAsset("./music/Lyric__Fantasy_Theme_1.mp3");
            ASSET_MANAGER.autoRepeat("./music/Lyric__Fantasy_Theme_1.mp3");
        } else if (this.game.mapIndex == 3) {
            ASSET_MANAGER.playAsset("./music/Short_Casual_Loop_2.mp3");
            ASSET_MANAGER.autoRepeat("./music/Short_Casual_Loop_2.mp3");
        } else if (this.game.mapIndex == 4) {
            ASSET_MANAGER.playAsset("./music/Lyric__Fantasy_Theme_2.mp3");
            ASSET_MANAGER.autoRepeat("./music/Lyric__Fantasy_Theme_2.mp3");
        }

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
    
            this.hero.battle = false;
            this.game.addEntity(this.hero);
            this.game.addEntity(new Slash(this.game, this.hero.x, this.hero.y, this.hero));
            
            this.game.addEntity(new HeadsUpDisplay(this.game));
            this.game.addEntity(new MainMenu(this.game));
            this.game.addEntity(new Shop(this.game));
            this.game.addEntity(new Instructions(this.game));
            this.game.addEntity(new Story(this.game));
            this.game.addEntity(new Credits(this.game));
            this.game.addEntity(new CharacterInfo(this.game));
            this.game.addEntity(new EnemyInfo(this.game));

            this.savedMapEntities[this.game.mapIndex] = this.game.entities;
        } else {                                            //reload entities to preserve state of the game
            this.game.entities = this.savedMapEntities[this.game.mapIndex];
            this.hero.x = x;
            this.hero.y = y;
            this.hero.battle = false;
        }

    }
    
    loadBattle() {
        ASSET_MANAGER.pauseBackgroundMusic();
        let musicChoice = Math.floor(Math.random()*2);
        if (this.game.mapIndex == 2) { // level 1
            if (musicChoice == 0) {
                ASSET_MANAGER.playAsset("./music/Short_Combat_Loop_1.mp3");
                ASSET_MANAGER.autoRepeat("./music/Short_Combat_Loop_1.mp3");
            } else if (musicChoice == 1) {
                ASSET_MANAGER.playAsset("./music/Luffy_vs_ratchet_1.mp3");
                ASSET_MANAGER.autoRepeat("./music/Luffy_vs_ratchet_1.mp3");
            } 
        } else if (this.game.mapIndex == 3) { // level 2
            if (musicChoice == 0) {
                ASSET_MANAGER.playAsset("./music/Octopath_Traveler_Battle_2.mp3");
                ASSET_MANAGER.autoRepeat("./music/Octopath_Traveler_Battle_2.mp3");
            } else if (musicChoice == 1) {
                ASSET_MANAGER.playAsset("./music/Hangeki_no_noroshi.mp3");
                ASSET_MANAGER.autoRepeat("./music/Hangeki_no_noroshi.mp3");
            } 
        } else if (this.game.mapIndex == 4) { // level before boss
            if (musicChoice == 0) {
                ASSET_MANAGER.playAsset("./music/Octopath_Traveler_Battle_2.mp3");
                ASSET_MANAGER.autoRepeat("./music/Octopath_Traveler_Battle_2.mp3");
            } else if (musicChoice == 1) {
                ASSET_MANAGER.playAsset("./music/Hangeki_no_noroshi.mp3");
                ASSET_MANAGER.autoRepeat("./music/Hangeki_no_noroshi.mp3");
            } 
        }

        this.game.currentState = this.game.gameStates[2];
        this.x = 0;
        this.game.entities = [];
        this.game.map = false;
        this.game.menu = false;
		
        // add decorations, etc. here
		if(this.game.mapIndex == 4){
			this.game.addEntity(new Battle2(this.game,0,0))
		} else {
			var k, l;
			for (k = 0; k < 15; k++) {
				for (l = 0; l < 15; l++) {
					switch (this.game.mapIndex){
						case 2:
                            this.game.addEntity(new Grass1(this.game, k * 32, l * 32));
							break;
						case 3:
							this.game.addEntity(new StonePath(this.game, k * 32, l * 32));
							break;
					}
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
        this.chosenGroup = [];
        let enemyNumbers = 3 + Math.floor(Math.random()*2);
        var i;
        for (i = 0; i < enemyNumbers; i++) {
            let enemyType = Math.floor(Math.random()*3);
            if (enemyType == 0) {
                this.chosenGroup.push(new Goblin(this.game, 0, 0));
            } else if (enemyType == 1) {
                this.chosenGroup.push(new Bat(this.game, 0, 0));
            } else if (enemyType == 2) {
                this.chosenGroup.push(new Skeleton(this.game, 0, 0));
            }
        }
		
		// load battle manager
		this.battleManager = new BattleManager(this.game, this.chosenGroup,
			[this.hero, this.cleric, this.archer, this.mage]);
		this.ui = new BattleUI(this.game, this.battleManager, this.chosenGroup,
			[this.hero, this.cleric, this.archer, this.mage])
		this.game.addEntity(this.ui);
        this.game.addEntity(new Spell(this.game, this.cleric.x, this.cleric.y, this.cleric));
        this.game.addEntity(new Lightning(this.game, this.mage.x, this.mage.y, this.mage));
    }

    loadBossBattle() {
        ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playAsset("./music/Saigo_no_tatakai.mp3");
        ASSET_MANAGER.autoRepeat("./music/Saigo_no_tatakai.mp3");

        this.game.currentState = this.game.gameStates[2];
        this.x = 0;
        this.game.entities = [];
        this.game.map = false;
        this.game.menu = false;
		
        // add decorations, etc. here
		this.game.addEntity(new Castle(this.game,0,0));
		
		// add player characters
        this.hero.battle = true;
        this.game.addEntity(new Slash(this.game, this.hero.x, this.hero.y, this.hero));
        this.cleric.battle = true;
		this.archer.battle = true;
		this.mage.battle = true;
		
		// add enemies
		this.dragon = new Dragon(this.game, 5, 50);
        this.game.addEntity(new FireBreath(this.game, this.dragon.x, this.dragon.y, this.dragon));
		
		// load battle manager
		this.battleManager = new BattleManager(this.game, [this.dragon],
			[this.hero, this.cleric, this.archer, this.mage]);
		this.ui = new BattleUI(this.game, this.battleManager, [this.dragon],
			[this.hero, this.cleric, this.archer, this.mage])
		this.game.addEntity(this.ui);

        this.game.addEntity(new Spell(this.game, this.cleric.x, this.cleric.y, this.cleric));
        this.game.addEntity(new Lightning(this.game, this.mage.x, this.mage.y, this.mage));
    }

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
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