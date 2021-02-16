// The class that manages battles in the game. Takes the game engine, list of enemies, 
// and list of party characters entering the battle
class BattleManager {
	constructor(game, enemies, party) {
		this.game = game;
		this.enemies = this.loadParty(enemies);
		this.party = this.loadParty(party);
		this.turnOrder = this.loadTurnOrder(this.enemies,this.party);
		this.isOver = false;
		this.win = false;
		this.acceptInput = false;
		this.activeChar = 0;
		
		console.log("battle loaded");
		console.log(this.turnOrder);
		var i;
			var x = 10;
			var y = 15;
			for(i=0; i<this.enemies.length; i++){
				this.enemies[i][0].x = 5;
				this.enemies[i][0].y = 55 + (i * 43);
				this.game.addEntity(this.enemies[i][0]);
			}
			for(i=0; i<this.party.length; i++){
				this.party[i][0].x = 210;
				this.party[i][0].y = 40 + (i * 32);
				this.game.addEntity(this.party[i][0]);
			}
	};
	
	update(){
		if(!this.isOver){ //&& this.acceptInput){
			
		}
	};
	
	//currently goes through rounds before even loading graphics for battle, need to make it so that
	//it will wait for player input during player turns and have enemies attack during theirs
	round() {
		var i = 0;
		
		//battle loop
		while(true) {
			//character takes turn
			if(this.party.indexOf(this.turnOrder[i]) >= 0) { // if player character
				console.log("Player " + this.turnOrder[i][2] + "'s turn!");
				this.attackEnemy(this.party.indexOf(this.turnOrder[i]),Math.floor(Math.random() * 3));
				this.sleep(500);
			}
			else { // if enemy
				console.log("Enemy " + this.turnOrder[i][2] + "'s turn!");
				this.attackPlayer(this.enemies.indexOf(this.turnOrder[i]),Math.floor(Math.random() * 4));
				this.sleep(500);
			}
			
			//check if one side is defeated
			if(this.isDefeated(this.party)) {
				this.lose();
				break;
			}
			if(this.isDefeated(this.enemies)) {
				this.win = true;
				this.win();
				break;
			}
			//loop back to beginning of turn order if all characters acted
			if(i == this.turnOrder.length - 1) { break;//i = 0; 
			} else { i++; }
		}
	}
	
	isDefeated(group) {
		var defeat = false;
		var i;
		for(i = 0; i < group.length; i++) {
			if(group[i][1] > 0) {
				defeat = false;
				break;
			}
			else {
				defeat = true;
			}
		}
		return defeat;
	}
	
	// loads 2d array with [entity,hp] for every entity in the chars array
	loadParty(chars) {
		this.list = [];
		var i;
		for (i = 0; i < chars.length; i++){
			this.list[i] = [chars[i], chars[i].stats[0], chars[i].name, false]; // character object, hp, name, defending
		}
		return this.list;
	};
	
	// takes enemies and party arrays and determines turn order based on spd stats
	loadTurnOrder(e,p) {
		this.list = [];
		var i;
		var spd = 7;
		
		for(i = 0; i < (e.length + p.length); i++){
			for(let en of e) {
				if(en[0].stats[3] == spd) {
					this.list[i] = en;
				}
			}
			for(let pa of p) {
				if(pa[0].stats[3] == spd) {
					this.list[i] = pa;
				}
			}
			spd--;
		}
		
		return this.list;
	}
	
	// prints contents of list to console (for checking enemies and party lists)
	printParty(list) {
		var a;
		for (a = 0; a < list.length; a++){
			console.log("[" + list[a][0].name + ", " + list[a][1] + "]");
		}
	};
	
	// subtracts the difference between the attacker's attack and the defender's defense from the defender's health
	attackEnemy(attacker, defender) {
		this.party[defender][3] = false;
		var damage = this.party[attacker][0].stats[1] - this.enemies[defender][0].stats[2];
		if(Math.ceil(Math.random()*10) == 5){ // critical hit
			damage += Math.floor(damage/2);
			console.log("Critical hit!");
		}
		this.game.addEntity(new Score(this.game, this.enemies[defender][0].x + this.enemies[defender][0].width * PARAMS.SCALE * this.enemies[defender][0].scale / 2, this.enemies[defender][0].y, -1 * damage));
		if (this.enemies[defender][1] - damage > 0) {
			this.enemies[defender][1] -= damage;
		}
		else {
			this.enemies[defender][1] = 0;
		}
		console.log(this.party[attacker][2] + " attacks " + this.enemies[defender][2] + " for " + damage + " damage!");
		console.log(this.enemies[defender][2] + "'s health = " + this.enemies[defender][1]);
	};
	// enemy version
	attackPlayer(attacker, defender) {
		var damage = this.enemies[attacker][0].stats[1] - this.party[defender][0].stats[2];
		if(Math.ceil(Math.random()*10) == 5){ // critical hit
			damage += Math.floor(damage/2);
			console.log("Critical hit!");
		}
		this.game.addEntity(new Score(this.game, this.party[defender][0].x + this.party[defender][0].width * PARAMS.SCALE * this.party[defender][0].scale / 2, this.party[defender][0].y, -1 * damage));
		if(this.party[defender][3]){ // if party member is defending
			damage = Math.floor(damage/2);
			this.party[defender][3] = false;
		}
		if (this.party[defender][1] - damage > 0) {
			this.party[defender][1] -= damage;
		}
		else {
			this.party[defender][1] = 0;
		}
		console.log(this.enemies[attacker][2] + " attacks " + this.party[defender][2] + " for " + damage + " damage!");
		console.log(this.party[defender][2] + "'s health = " + this.party[defender][1]);
	}
	
	defend(entity){
		
	}
	
	win() {
		
	}
	
	lose() {
		
	}
	
	draw(ctx) {
		if(this.isOver) {
			if(this.win) {
				ctx.fillStyle = "Tan";
				ctx.fillRect(50, 40, 150, 100);
				ctx.strokeStyle = "Brown";
				ctx.strokeRect(50, 40, 150, 100);
				ctx.fillStyle = "Black";
				ctx.fillText("V I C T O R Y !", 100, 90);
				this.sleep(1500);
			}
			else {
				ctx.fillStyle = "Tan";
				ctx.fillRect(50, 40, 150, 100);
				ctx.strokeStyle = "Brown";
				ctx.strokeRect(50, 40, 150, 100);
				ctx.fillStyle = "Black";
				ctx.fillText("D E F E A T !", 102, 90);
				this.sleep(1500);
			}
		}
	};
	
	sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    };
};