var ASSET_MANAGER = new AssetManager();

//music
//level theme
ASSET_MANAGER.queueDownload("./music/Short_Casual_Loop_2");
//background track 1
ASSET_MANAGER.queueDownload("./music/Lyric__Fantasy_Theme_2");
//background track 2
ASSET_MANAGER.queueDownload("./music/Lyric__Fantasy_Theme_1");
//battle theme
ASSET_MANAGER.queueDownload("./music/Short_Combat_Loop_1");

ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	ASSET_MANAGER.autoRepeat("./music/Short_Casual_Loop_2");
	ASSET_MANAGER.autoRepeat("./music/Lyric__Fantasy_Theme_2");
	ASSET_MANAGER.autoRepeat("./music/Lyric__Fantasy_Theme_1");
	ASSET_MANAGER.autoRepeat("./music/Short_Combat_Loop_1");

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);
		
	new SceneManager(gameEngine);

	gameEngine.start();
});