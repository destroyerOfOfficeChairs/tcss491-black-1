var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/DungeonBackground.png");

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

ASSET_MANAGER.queueDownload("./sprites/Hero.png");
ASSET_MANAGER.queueDownload("./sprites/goblin.png");
ASSET_MANAGER.queueDownload("./sprites/bat.png");
ASSET_MANAGER.queueDownload("./sprites/skeleton.png");
ASSET_MANAGER.queueDownload("./sprites/RPGW_Grassland_v1.3/MainLevBuild.png");
ASSET_MANAGER.queueDownload("./sprites/RPGW_Grassland_v1.3/decorative.png");

ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	
	//keeps scaled sprites from blurring, courtesy of Espen Storfjell
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);
	new SceneManager(gameEngine);

	//console.log(gameEngine.entities.length);

	gameEngine.start();
});
