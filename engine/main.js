var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/DungeonBackground.png");
ASSET_MANAGER.queueDownload("./sprites/title_screen.png");
ASSET_MANAGER.queueDownload("./sprites/pressB.png");

ASSET_MANAGER.queueDownload("./sprites/grass4.png");
ASSET_MANAGER.queueDownload("./sprites/grass2.png");
ASSET_MANAGER.queueDownload("./sprites/grass.png");
ASSET_MANAGER.queueDownload("./sprites/bush.png");
ASSET_MANAGER.queueDownload("./sprites/stone.png");
ASSET_MANAGER.queueDownload("./sprites/boxes.png");
ASSET_MANAGER.queueDownload("./sprites/walls.jpg");

ASSET_MANAGER.queueDownload("./sprites/coin.png");
ASSET_MANAGER.queueDownload("./sprites/crystal.png");
ASSET_MANAGER.queueDownload("./sprites/gem.png");
ASSET_MANAGER.queueDownload("./sprites/lockeddoors.png");
ASSET_MANAGER.queueDownload("./sprites/lock.png");
ASSET_MANAGER.queueDownload("./sprites/key.png");
ASSET_MANAGER.queueDownload("./sprites/portal.png");
ASSET_MANAGER.queueDownload("./sprites/potion.png");

ASSET_MANAGER.queueDownload("./sprites/firebreath.png");
ASSET_MANAGER.queueDownload("./sprites/shadowball.png");
ASSET_MANAGER.queueDownload("./sprites/arrow.png");
ASSET_MANAGER.queueDownload("./sprites/lightning.png");
ASSET_MANAGER.queueDownload("./sprites/fireball.png");
ASSET_MANAGER.queueDownload("./sprites/slash.png");
ASSET_MANAGER.queueDownload("./sprites/bonedart.png");
ASSET_MANAGER.queueDownload("./sprites/scratch.png");
ASSET_MANAGER.queueDownload("./sprites/sonicwave.png");
ASSET_MANAGER.queueDownload("./sprites/sparkle.png");
ASSET_MANAGER.queueDownload("./sprites/missile.png");
ASSET_MANAGER.queueDownload("./sprites/laser.png");
ASSET_MANAGER.queueDownload("./sprites/superslash.png");
ASSET_MANAGER.queueDownload("./sprites/spiritball.png");
ASSET_MANAGER.queueDownload("./sprites/spell.png");
ASSET_MANAGER.queueDownload("./sprites/shield.png");

ASSET_MANAGER.queueDownload("./sprites/archer.png");
ASSET_MANAGER.queueDownload("./sprites/mage.png");
ASSET_MANAGER.queueDownload("./sprites/Hero.png");
ASSET_MANAGER.queueDownload("./sprites/knightFullSpriteSheet.png");
ASSET_MANAGER.queueDownload("./sprites/dragon.png");
ASSET_MANAGER.queueDownload("./sprites/goblin.png");
ASSET_MANAGER.queueDownload("./sprites/bat.png");
ASSET_MANAGER.queueDownload("./sprites/skeleton.png");
ASSET_MANAGER.queueDownload("./sprites/RPGW_Grassland_v1.3/MainLevBuild.png");
ASSET_MANAGER.queueDownload("./sprites/RPGW_Grassland_v1.3/decorative.png");
ASSET_MANAGER.queueDownload("./sprites/RPG_Buildings_CASTLE_v1.0/castle_interriors.png");
ASSET_MANAGER.queueDownload("./sprites/Battle_Background_4.png");
ASSET_MANAGER.queueDownload("./sprites/Battle_Background_1.png");

//music
//level theme
ASSET_MANAGER.queueDownload("./music/Short_Casual_Loop_2.mp3");
//background track 1
ASSET_MANAGER.queueDownload("./music/Lyric__Fantasy_Theme_2.mp3");
//background track 2
ASSET_MANAGER.queueDownload("./music/Lyric__Fantasy_Theme_1.mp3");

//battle theme
ASSET_MANAGER.queueDownload("./music/Short_Combat_Loop_1.mp3");
//battle theme 2
ASSET_MANAGER.queueDownload("./music/Luffy_vs_ratchet_1.mp3");
//battle theme 3
ASSET_MANAGER.queueDownload("./music/Octopath_Traveler_Battle_2.mp3");
//battle theme 4
ASSET_MANAGER.queueDownload("./music/Hangeki_no_noroshi.mp3");

//boss battle theme 1
ASSET_MANAGER.queueDownload("./music/Saigo_no_tatakai.mp3");

ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	//ASSET_MANAGER.autoRepeat("./music/Short_Casual_Loop_2.mp3");
	//ASSET_MANAGER.autoRepeat("./music/Lyric__Fantasy_Theme_2.mp3");
	//ASSET_MANAGER.autoRepeat("./music/Lyric__Fantasy_Theme_1.mp3");
	//ASSET_MANAGER.autoRepeat("./music/Short_Combat_Loop_1.mp3");

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	
	//keeps scaled sprites from blurring, courtesy of Espen Storfjell
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);
	new SceneManager(gameEngine);

	//console.log(gameEngine.entities.length);

	gameEngine.start();
});