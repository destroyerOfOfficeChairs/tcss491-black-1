class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.loadLevelOne();
    }

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

        let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS.BLOCKWIDTH / 2;

        //if (this.x < this.mario.x - midpoint) this.x = this.mario.x - midpoint;
    
        // if (this.mario.dead && this.mario.y > PARAMS.BLOCKWIDTH * 16) {
        //     this.mario.dead = false;
        //     this.loadLevelOne(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
        // };
    };

    loadLevelOne() {
        // add decorations, etc. go here
        this.game.addEntity(new Grass(this.game, 0, 0));
        this.game.addEntity(new Grass(this.game, 0, 0));
	    this.game.addEntity(new Grass(this.game, 200, 0));
	    this.game.addEntity(new Grass(this.game, 400, 0));
	    this.game.addEntity(new Grass(this.game, 600, 0));
	    this.game.addEntity(new Grass(this.game, 800, 0));

	    this.game.addEntity(new Grass(this.game, 0, 200));
	    this.game.addEntity(new Grass(this.game, 200, 200));
	    this.game.addEntity(new Grass(this.game, 400, 200));
	    this.game.addEntity(new Grass(this.game, 600, 200));
	    this.game.addEntity(new Grass(this.game, 800, 200));

	    this.game.addEntity(new Grass(this.game, 0, 400));
	    this.game.addEntity(new Grass(this.game, 200, 400));
	    this.game.addEntity(new Grass(this.game, 400, 400));
	    this.game.addEntity(new Grass(this.game, 600, 400));
	    this.game.addEntity(new Grass(this.game, 800, 400));

	    this.game.addEntity(new Grass(this.game, 0, 600));
	    this.game.addEntity(new Grass(this.game, 200, 600));
	    this.game.addEntity(new Grass(this.game, 400, 600));
	    this.game.addEntity(new Grass(this.game, 600, 600));
	    this.game.addEntity(new Grass(this.game, 800, 600));
        
        // add secondary characters here
        
        // add enemy characters here
        this.game.addEntity(new Goblin(this.game, 300, 300));
        this.game.addEntity(new Goblin(this.game, 300, 500));

        this.game.addEntity(new Bat(this.game, 200, 200));
        this.game.addEntity(new Bat(this.game, 200, 600));

        this.game.addEntity(new Skeleton(this.game, 100, 100));
        this.game.addEntity(new Skeleton(this.game, 100, 400));

        // add main characters here
    }

}