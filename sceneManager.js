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
        
        // add secondary characters here
        
        // add enemy characters here
        this.game.addEntity(new Goblin(this.game, 96, 32));

        this.game.addEntity(new Bat(this.game, 64, 32));

        this.game.addEntity(new Skeleton(this.game, 32, 32));

        // add main characters here
    }

}