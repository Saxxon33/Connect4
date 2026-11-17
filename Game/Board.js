class Board {
	constructor() {
		this.img = new Image();
		this.img.src = "Images/blue_board.png";
	}

	Draw_Board(x, y, canvas, scale){
		// var blue_board = new Image();
		// blue_board.src = this.img;
		var dw = this.img.width * scale;
		var dh = this.img.height * scale;
		for (var j=0; j< 6; j++) {
			var new_y = y + dh * j;
			for (var i=0; i<7; i++)
			{
				var new_x = x + dw * i;
				var can1 = canvas.getContext("2d");
				can1.drawImage(this.img, new_x, new_y, dw, dh);
			}
		}

		// Check Diagonal left to right
		
	}

	
}

export {Board};