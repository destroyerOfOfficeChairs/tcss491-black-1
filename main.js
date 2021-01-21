var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/DungeonBackground.png");
ASSET_MANAGER.queueDownload("./sprites/grass4.png");
ASSET_MANAGER.queueDownload("./sprites/grass2.png");
ASSET_MANAGER.queueDownload("./sprites/grass.png");
ASSET_MANAGER.queueDownload("./sprites/goblin.png");
ASSET_MANAGER.queueDownload("./sprites/bat.png");
ASSET_MANAGER.queueDownload("./sprites/skeleton.png");
ASSET_MANAGER.queueDownload("./sprites/RPGW_Grassland_v1.3/MainLevBuild.png");

ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);
	new SceneManager(gameEngine);

	//console.log(gameEngine.entities.length);

	gameEngine.start();
});
