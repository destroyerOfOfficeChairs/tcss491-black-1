// The class that manages battles in the game. Takes the game engine, list of enemies, 
// and list of party characters entering the battle
class BattleManager {
	constructor(game, enemies, party) {
		this.enemies = this.loadParty(enemies);
		this.party = this.loadParty(party);
		
		// prints lists containing [entity,hp]
		/*console.log("Enemies:");
		this.printParty(this.enemies);
		console.log("Party:");
		this.printParty(this.party);*/
		
		console.log("battle loaded");
	};
	
	update(){
		
	};
	
	// loads 2d array with [entity,hp] for every entity in the chars array
	loadParty(chars) {
		this.list = [];
		var i;
		for (i = 0; i < chars.length; i++){
			this.list[i] = [chars[i], chars[i].stats[0]];
		}
		return this.list;
	};
	
	// prints contents of list to console (for checking enemies and party lists)
	printParty(list) {
		var a;
		for (a = 0; a < list.length; a++){
				//for (b = 0; b < 2; b++) {
			console.log("[" + list[a][0].name + ", " + list[a][1] + "]");
				//}
		}
	};
	
	// subtracts the difference between the attacker's attack and the defender's defense from the defender's health
	attack(attacker, defender) {
		//return: D's health - (A's attack - D's defense)
		return defender.stats[0] - (attacker.stats[1] - defender.stats[2]); //placeholder code, will need to use enemies[x][1] or party[x][1] to actually alter hp and properly track it
	};
	
	draw(ctx) {
		
	};
};