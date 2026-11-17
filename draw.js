import {Board} from './Game/Board.js';
import {Coin_Arr} from './Game/Coin_Arr.js';

class Draw {
	constructor() {
		this.canvas1 = document.getElementById('canvas1');
		this.can_width = this.canvas1.width;
		this.can_height = this.canvas1.height;
		this.can_bgcolor = "#98AFC7";	
		// var can1 = canvas1.getContext("2d");
		this.draw_scale = 4;
		this.screen_scale = 1;
		this.scale = (1/this.draw_scale) * this.screen_scale;
		
		this.board_x = 0;
		this.board_y = 0;
		this.board_dw = 0;
		this.board_dy = 0;
		this.new_coin_x = 0;
		this.coin_move = 0;
		this.win_color = "red"; //"#39FF14";

		this.coin_array = [];
		this.board = null;

		// Set up Game
		this.Resize();
		this.Calc_Positions();
	}

	// ------------------------------------------------------------------
	Resize() {
		var win_h = window.innerHeight;
		var win_w = window.innerWidth;
	
		// Make Canvas full width
		this.canvas1.width = win_w;
		this.canvas1.height = win_h;

		// Calculate Scale
		this.screen_scale = win_h/700;
		this.scale = (1/this.draw_scale) * this.screen_scale;
	}

	// ------------------------------------------------------------
	Draw_Game () {
		this.Resize();
		this.Calc_Positions();
		
		var can1 = this.canvas1.getContext("2d");
		can1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);	
		this.canvas1.style.background = this.can_bgcolor; 
		this.coin_array.Draw_Coins(this.board_x, this.board_y, this.canvas1, this.scale);			
		this.board.Draw_Board(this.board_x, this.board_y, this.canvas1, this.scale);
		// this.Draw_Win();
	}

	// ---------------------------------------------------------
	Calc_Positions() {
		// calculate width/ height of coin
		var coin_img = new Image();
		coin_img.src = "Images/Coin_Red2.png";
		var coin_dw = coin_img.width * this.scale;
		var coin_dh = coin_img.height * this.scale;



		// Calculate width of board
		var blue_board = new Image();
		blue_board.src = "Images/blue_board.png";
		this.board_dw = blue_board.width * this.scale;
		this.board_dh = blue_board.height * this.scale;
		var board_width = this.board_dw * 7;
		var board_height = this.board_dh * 6;

		// Calculate board position
		this.board_x = (this.canvas1.width - board_width)/2;
		this.board_y = coin_dh;
	}

	// ----------------------------------------------------------
	Draw_Win(){
		//console.log("Draw Win");

		var win_array = this.coin_array.win_array;
		// Set color
		var msg = "Red Wins";
		if (this.coin_array.win_color == "Yellow"){
			this.win_color = "yellow";
			msg = "Yellow Wins";
		}
		var can1 = this.canvas1.getContext("2d");
		

		// Draw boxes around winning coins
		for (var c in win_array) {
			// console.log(`${win_array[c][0]}, ${win_array[c][1]}`);
			// draw rectangle
			
			var dw = this.board_dw;
			var dh = this.board_dh;
			var x = this.board_x + ((win_array[c][1] - 1) * dw);
			var y = this.board_y + ((6 - win_array[c][0]) * dh);
			can1.strokeStyle = this.win_color;
			can1.lineWidth = "5";
			can1.strokeRect(x, y, dw, dh);
		}

		// Show Winner Name
	/*
		can1.font = "50px Arial";
		var x2 = this.board_x + this.board_dw * 3.5;
		var y2 = this.board_y + this.board_dh *3;
		can1.textAlign = "center";
		can1.fillStyle = "black";
		can1.fillText(msg,x2+2,y2+2);
		can1.fillStyle = this.win_color;
		can1.fillText(msg,x2,y2);
	*/		
	}


	// ----------------------------------------------------------
	Load_Images(){
		
	}

	

}
export {Draw};