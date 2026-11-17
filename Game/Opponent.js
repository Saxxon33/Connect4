class Opponent {
	constructor(){
		this.coin_arr;
		this.column_cnt;
		this.column;
	}

	Control(Coins){	
		var player_turn = Coins.player_turn;
		if (player_turn == false) {
			this.coin_arr = Coins.coin_arr;
			this.column_cnt = Coins.column_cnt;
			this.Pick_Column_Rand(Coins);

		}	
	}

	// ----------------------------------------------------------------------
	Pick_Column_Rand (Coins) {
		// Determine available columns
		var choose_num = false;
		while (choose_num == false) {
			this.column = Math.floor(Math.random() * 6) + 1;
			var num_chk = this.column_cnt;	
			if (num_chk[this.column] != 6) {
				choose_num = true;
			}
		}
		// console.log(`opponent: ${this.column}`);
		this.Move_Coin(Coins);
	}

	// -------------------------------------------------
	Move_Coin(Coins) {
		// console.log("Move Coin");
		if (this.column == 4){
			Coins.Start_Drop();
		} else if (this.column < 4) {
			var move = 4 - this.column;
			for (var i=0; i<move; i++) {				
				//Coins.Move_Coin_Left();
				Coins.Move_Coin_Left();
				const timeout = setTimeout(()=>{}, 60000);
			}
			Coins.Start_Drop();
		} else if (this.column > 4){
			var move = this.column - 4;
			for (var i=0; i<move; i++) {
				Coins.Move_Coin_Right();
				const timeout = setTimeout(function (){}, 60000);
			}
			Coins.Start_Drop();
		}

	}

	// --------------------------------------------------
	Block_Player() {
		// Detect connect 4
		// Detect if move will set player up for connect 4
		// Detect 2 in a row that can become unblockable
	}	
}

export {Opponent};