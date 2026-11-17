class Check_Win {

	constructor () {
		this.red_cnt = 0;
		this.yellow_cnt = 0;
		this.red_array = [];
		this.yellow_array = [];
		this.coin_track = null;
		this.game_won = false;
		this.winner = null;
		this.win_array = [];

	}

	// ---------------------------------------------------------
	Check_Win(coin_track){
		this.coin_track = coin_track;
		this.Check_Horiz();
		this.Check_Vert();
		this.Check_Diag_LR();
		this.Check_Diag_RL();
	}	

	// --------------------------------------------------------------
	Check_Horiz() {
		// Check Horizontal 
		for (var i=0; i<6 ; i++){
			this.Clear_Trackers(); 
			for (var j=0; j<7 ; j++){			
				this.Check_Coins(i,j);
				this.Connect4();		
			}
		}
	}

	// --------------------------------------------------------
	Check_Vert() {
		// Check Vertical
		for (var i=0; i<6 ; i++){
			this.Clear_Trackers(); 
			for (var j=0; j<7 ; j++){			
				this.Check_Coins(j,i);
				this.Connect4();
			}
		}
	}

	// -----------------------------------------------------------
	Check_Diag_LR() {
		// Check Diagonal (left to right)
		var starts = [
			[4,1,4],
			[5,1,5],
			[6,1,6],
			[6,2,6],
			[6,3,5],
			[6,4,4]
		];

		this.Clear_Trackers(); 
		for (var i=0 ; i<starts.length; i++){
			this.Clear_Trackers();

			var j = 0;

			var h = starts[i][0] - 1;
			var k = starts[i][1] -1;
			var m = starts[i][2];
			for (var j=0; j< m; j++) {
				this.Check_Coins(h,k);
				this.Connect4();
				--h;
				++k;
			}
		}
	}

	// -----------------------------------------------------------	
	Check_Diag_RL() {
		// check diagonals (right to left)
		var starts = [
			[6,4,4],
			[6,5,5],
			[6,6,6],
			[6,7,6],
			[5,7,5],
			[4,7,4]
		];
		
		this.Clear_Trackers(); 
		for (var i=0 ; i<starts.length; i++){
			this.Clear_Trackers();
			
			var j = 0;

			var h = starts[i][0] - 1;
			var k = starts[i][1] -1;
			var m = starts[i][2];
			for (var j=0; j< m; j++) {
				this.Check_Coins(h,k);
				this.Connect4();
				--h;
				--k;
			}
		}
	}

	// ----------------------------------------------------
	Check_Coins (i,j){
		if (this.coin_track[i][j] == "R" && this.red_cnt < 4){
			++this.red_cnt;
			var x = i + 1;
			var y = j +1;
			var square = [x,y];
			this.red_array.push(square);
			// console.log(`${i} Red: ${this.red_cnt}`);
		} else {
			this.red_cnt = 0;
			this.red_array = [];
		}

		if (this.coin_track[i][j] == "Y" && this.yellow_cnt < 4){
			++this.yellow_cnt;
			// console.log(`${i} Yellow: ${this.yellow_cnt}`);
			var x = i + 1;
			var y = j +1;
			var square = [x,y];
			this.yellow_array.push(square);
		} else {
			this.yellow_cnt = 0;
			this.yellow_array = [];
		}
	}

	// --------------------------------------------------------
	Clear_Trackers() {
		this.red_cnt = 0;
		this.yellow_cnt = 0;
		this.red_array = [];
		this.yellow_array = [];
	}

	// -----------------------------------------------------
	Connect4 () {
		if (this.red_cnt == 4){
			console.log("Red Wins");
			// console.log(`Red array: ${this.red_array}`);
			this.game_won = true;
			this.winner = "Red";
			this.win_array = this.red_array;
		} else if (this.yellow_cnt == 4) {
			console.log("Yellow wins");
			this.game_won = true;
			this.winner = "Yellow";
			this.win_array = this.yellow_array;
		}  

	}
}

export {Check_Win};