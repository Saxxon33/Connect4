import {Coin} from './Coin.js';
import {Check_Win} from './check_win.js';

class Coin_Arr {
	constructor () {
		this.coin_arr = [];
		this.index = 0;
		this.current_color = "red";
		this.column_cnt = [0, 0, 0, 0, 0, 0, 0];
		this.coin_track = new Array(7);
		this.game_won = false;
		this.win_array = [];
		this.win_color = null;
		this.player_turn = true;

		// Create First coin
		this.New_Coin();

		// Create Coin Track Array
		this.Setup_Tracking();

		// Win Check functions
		this.WC = new Check_Win();
	}

	// --------------------------------------------------------------------
	New_Coin () {
		var new_coin = new Coin();
		new_coin.Set_Color(this.current_color);
		this.coin_arr.push(new_coin);
		this.Coin_Color_Change();
		++this.index;
	}

	// ---------------------------------------------------------------
	Draw_Coins (x, y, canvas, scale){
		// alert(this.coin_arr.length);
		// alert(this.coin_arr[0].color);		
		if (this.game_won == false) {
			this.Drop_Coin();
		}
		for (let c in this.coin_arr) {
			// alert(x.color);
			this.coin_arr[c].Draw_Coin(x, y, canvas, scale);
		}
	}

	// ------------------------------------------------------------
	Coin_Color_Change ()
	{
		if (this.current_color == "red") {
			this.current_color = "yellow";
			this.img = this.yellow_img;
		} else if (this.current_color == "yellow"){
			this.current_color = "red";
			this.img = this.red_img;	
		}
	}

	// ---------------------------------------------------
	Move_Coin(event) {
		// for player movin coin
		if (this.player_turn  == true) {
			var cur_coin = this.coin_arr.length - 1;
			this.coin_arr[cur_coin].Move_Coin(event);
		}
	}

	// -------------------------------------------------------
	Move_Coin_Left(){
		// for Opponent moving coin
		var cur_coin = this.coin_arr.length - 1;
		this.coin_arr[cur_coin].Move_Left();
	}

	// -------------------------------------------------
	Move_Coin_Right(){
		// for Opponent moving coin
		var cur_coin = this.coin_arr.length - 1;
		this.coin_arr[cur_coin].Move_Right();
	}

	// --------------------------------------------------
	Start_Drop() {
		// for opponent
		var cur_coin = this.coin_arr.length - 1;
		this.coin_arr[cur_coin].Start_Drop();
	}

	// -----------------------------------------------------
	Drop_Coin(){
		// console.log(`Drop Coin`);
		var cur_coin = this.coin_arr.length - 1;
		var column_num = this.coin_arr[cur_coin].column;
		var coins_in_col = this.column_cnt[column_num - 1];
		if (coins_in_col < 6) {
			this.coin_arr[cur_coin].Drop_Coin(coins_in_col);
			// ++this.column_cnt[column_num];
		} else {
			this.coin_arr[cur_coin].top = true;
			this.coin_arr[cur_coin].drop = false;
		}

		if (this.coin_arr[cur_coin].set == true) {
			++this.column_cnt[column_num - 1];
			this.Set_Coin_Track(column_num);
			this.WC.Check_Win(this.coin_track);
			this.New_Coin();
			if (this.player_turn == true) {
				this.player_turn = false;
			} else if (this.player_turn == false){
				this.player_turn = true;
			}
		}
		this.game_won = this.WC.game_won;
		this.win_array = this.WC.win_array;
		this.win_color = this.WC.winner;
		//console.log(`game won: ${this.game_won}`);
	}

	// ---------------------------------------------------
	Set_Coin_Track(column_num) {
		var cur_coin = this.coin_arr.length - 1;		
		var column = column_num - 1;
		var row = this.column_cnt[column] - 1;
		// console.log(`${row}, ${column}`);
		var color = this.coin_arr[cur_coin].color;
		// alert(color);
		if (color == "red") {
			var color2 = "R";
		} else if (color == "yellow"){
			var color2 = "Y";
		}
		this.coin_track[row][column] = color2;
		// this.Print_Board();
	}

	// -----------------------------------------------------
	Setup_Tracking() {
		// Make Array 2D
		var columns = 6;
		for (let i = 0; i < this.coin_track.length; i++) {
        	this.coin_track[i] = new Array(columns); 		
		}

		// Populate Array
		for (var j=0; j<7; j++){
			for (var i=0; i<6; i++){
				this.coin_track[i][j] = "_"; 
			}
		}

		// this.Print_Board();
	}

	// -----------------------------------------------------
	Print_Board(){
		for (var j=5; j>=0; j--) {
			var row1 = "[ "
			for (var i=0; i<7 ;i++){
				var value = this.coin_track[j][i] ;
				row1 += " " + value + " ";
			}
			row1 += " ]";
			console.log(row1);			
		}
		console.log("\n");
	}
}

export {Coin_Arr};