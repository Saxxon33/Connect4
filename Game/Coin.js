class Coin {
	constructor() {
		this.color = "red";
		this.column = 4;
		this.row = 7;
		this.top = true;
		this.drop = false;
		this.set = false;

		// Load Images
		this.red_img = new Image();
		this.red_img.src = "Images/Coin_Red2.png";
		
		this.yellow_img = new Image();
		this.yellow_img.src = "Images/Coin_yellow2.png";
		
		this.img = this.red_img;
	}

	// ----------------------------------------------------------
	Draw_Coin(board_x, board_y, canvas, scale) {
		var dw = this.img.width * scale;
		var dh = this.img.height * scale;
		
		var can1 = canvas.getContext("2d");
		var x = board_x + (this.column - 1) * dw;
		if (this.row == 7 ) {
			var y = 0;
		} else {
			var y = board_y + dh * (6 - this.row); // 6 rows total bottom row is row #1
		}
		can1.drawImage(this.img, x, y, dw, dh);
	}

	Set_Color(color)
	{
		if (color == "yellow") {
			this.color = "yellow";
			this.img = this.yellow_img;
		} else if (color == "red"){
			this.color = "red";
			this.img = this.red_img;	
		}
	}
	// --------------------------------------------------------
	Move_Coin (event)
	{
		// alert(`Move Coin`);
		// setTimeout(function (){}, 300);

		var key = event.which || event.keyCode;

		switch(key)
		{
			case 65: // a key
			case 37: //left arrow
				this.Move_Left();
				break;
			case 68: // d key
			case 39: //right arrow
				this.Move_Right();
				break;
			case 32: // space bar
				this.Start_Drop();
				break;
		}
	}

	
	// -----------------------------------------------------------
	Move_Right(){
		// alert("right");
		if (this.column < 7 && this.top == true) {
			// this.x += coin_move;
			++this.column;
			// console.log(this.column);
		}

	}
	// -----------------------------------------------------------
	Move_Left(){
		// alert("left");
		if (this.column > 1 && this.top == true) {
			// this.x -= coin_move;
			--this.column;
			// console.log(this.column);
		}
	}

	// -----------------------------------------------------------
	Start_Drop () {
		// alert("drop coin");
		this.top = false;
		this.drop = true;
	}

	// -----------------------------------------------------------
	Drop_Coin (coins_in_col) {
		if (this.drop == true) {
			// coins_in_col * dh;
			this.row -= 0.5;
			setTimeout(function (){}, 3000);
			if (this.row == coins_in_col + 1){
				this.drop = false;
				this.set = true;
			}

			
		}
		
		
	}

}

export {Coin};