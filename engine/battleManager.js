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
		this.timeEnemyAttackElapsed = 0;
		
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
		
	};
	
	//checking for end state and activating win or lose state
	isDefeated() {
		var e = this.enemies.length;
		var p = this.party.length;
		var eCount = 0;
		var pCount = 0;
		var i;
		for(i = 0; i < e; i++){ // count living enemies
			if(this.enemies[i][1] > 0){
				eCount++;
			} else {
				this.enemies[i][0].removeFromWorld = true;
			}
		}
		for(i = 0; i < p; i++){// count living party members
			if(this.party[i][1] > 0){
				pCount++;
			}
		}
		if(eCount == 0){// if no living enemies - victory
			this.isOver = true;
			this.win = true;
			return 1;
		}
		if(pCount == 0){// if no living party members - defeat
			this.isOver = true;
			this.win = false;
			this.game.camera.hero.stats[0] = this.game.camera.hero.maxHealth;
			return 0;
		}
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
		// this commented version is based on spd stat (needs work in order to be able to use multiple encounter types)
		/*this.list = [];
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
		
		return this.list;*/
		
		//this version just puts party first and enemies after in the order
		this.list = [];
		var i;
		for(i=0; i<p.length; i++){
			this.list.push(p[i]);
		}
		for(i=0; i<e.length; i++){
			this.list.push(e[i]);
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
		this.party[attacker][0].basicAttack = true;
		this.party[defender][3] = false;
		var damage = this.party[attacker][0].stats[1] - this.enemies[defender][0].stats[2];
		if(Math.ceil(Math.random()*10) == 5){ // critical hit
			damage += Math.floor(damage/2);
			console.log("Critical hit!");
		}
		if (damage < 0) {// damage should not add health if damage is calculated to be negative
			damage = 0;
		}
		if (this.enemies[defender][1] - damage > 0) {
			this.enemies[defender][1] -= damage;
		}
		else { // enemy is killed
			this.enemies[defender][1] = 0;
		}
		this.game.addEntity(new Score(this.game, this.enemies[defender][0].x + this.enemies[defender][0].width * PARAMS.SCALE * this.enemies[defender][0].scale / 2, this.enemies[defender][0].y, -1 * damage));
		console.log(this.party[attacker][2] + " attacks " + this.enemies[defender][2] + " for " + damage + " damage!");
		console.log(this.enemies[defender][2] + "'s health = " + this.enemies[defender][1]);
	};
	// enemy version
	attackPlayer(attacker, defender) {
		this.enemies[attacker][0].basicAttack = true;
		var damage = this.enemies[attacker][0].stats[1] - this.party[defender][0].stats[2];
		if(Math.ceil(Math.random()*10) == 5){ // critical hit
			damage += Math.floor(damage/2);
			console.log("Critical hit!");
		}
		if (damage < 0) { // damage should not add health if damage is calculated to be negative
			damage = 0;
		}
		if(this.party[defender][3]){ // if party member is defending
			console.log("defense is used and is effective");
			damage = Math.floor(damage/2);
			// this.party[defender][3] = false;
		}
		if (this.party[defender][1] - damage > 0) {
			this.party[defender][1] -= damage;
		}
		else { // character is killed
			this.party[defender][1] = 0;
		}

		// if (this.party[defender][2] == "H e r o" && this.party[defender][1] == 0) {
		// 	this.game.hero.stats[0] = this.party[defender][1];
		// }
		this.game.addEntity(new Score(this.game, this.party[defender][0].x + this.party[defender][0].width * PARAMS.SCALE * this.party[defender][0].scale / 2, this.party[defender][0].y, -1 * damage));
		console.log(this.enemies[attacker][2] + " attacks " + this.party[defender][2] + " for " + damage + " damage!");
		console.log(this.party[defender][2] + "'s health = " + this.party[defender][1]);
	}
	
	defend(player){
		this.party[player][3] = true;
	}
	
	draw(ctx) {
		
	};
	
	sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    };

};