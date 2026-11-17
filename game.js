import {Draw} from './draw.js';
import {Coin_Arr} from './Game/Coin_Arr.js';
import {Board} from './Game/Board.js';
import {Opponent} from './Game/Opponent.js';

var draw1 = new Draw();
var coins = new Coin_Arr();
var board1 = new Board();
var opp1 = new Opponent();
var game_won = coins.game_won;

// Game Functions
addEventListener('keydown', function (event){
	coins.Move_Coin(event, opp1.move);
});

draw1.board = board1;
draw1.coin_array = coins;
/*
var game_loop = setInterval(function (){
	draw1.Draw_Game();
}, 300);
*/

function game_loop(timestamp){
	game_won = coins.game_won;
	if (game_won == false) {
		opp1.Control(coins);
		draw1.Draw_Game();	
		// console.log(game_won);
	} else {
		draw1.Draw_Win();
	}
	requestAnimationFrame(game_loop);
}

requestAnimationFrame(game_loop);