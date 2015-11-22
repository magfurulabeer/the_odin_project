var game;

var Game = function() {
	var symX = "<h1 class='x'>X</h1>";
	var	symO = "<h1 class='o'>O</h1>";
	var Player = function(name, symbol, computer) {
		var wins = 0;
		var losses = 0;
		var draws = 0;
		this.name = name;
		this.symbol = symbol;
		this.computer = computer;
		this.wins = function() { return wins };
		this.losses = function() { return wins };
		this.draws = function() { return wins };
		this.win = function() { win++ };
		this.lose = function() { lose++ };
		this.draw = function() { draw++ };
	}
	var gameOver = false;
	var players = [];
	var currentPlayer;
	this.initialize = function(pvp, computerFirst) {	
		if(pvp) {
			players.push(new Player("Player 1", true, false));
			players.push(new Player("Player 2", false, false));
		} else {
			if(computerFirst) {
				players.push(new Player("Computer", true, true));
				players.push(new Player("Player", false, false));
			} else {
				players.push(new Player("Player", true, false));
				players.push(new Player("Computer", false, true));
			}
		}
		currentPlayer = players[0];
		$(".box").on("click", move);
		display(players[0]);
	}

	function display(player) {
		$("#display").html(player.name + " Turn");
		if(player.symbol) {
			$("#display").addClass("x").removeClass("o");
		} else {
			$("#display").addClass("o").removeClass("x");
		}
	}

	function move() {
		if($(this).children().length === 0) {
			currentPlayer.symbol ? $(this).append(symX) : $(this).append(symO);
		}
		changeTurn();
	}

	function changeTurn() {
		if(currentPlayer === players[0]) {
			currentPlayer = players[1];
		} else {
			currentPlayer = players[0];
		}
		display(currentPlayer);
	}

}



function renderAlertBox(gameStyle) {
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;
		var overlay = $("#dialogueoverlay");
		var box = $('#dialoguebox');
		overlay.css("display","block");
		overlay.css("height", "100%");
		box.css("left", (windowWidth/2 - 360/2) + "px");
		box.css("top", (windowHeight/2 - 360/2) + "px");
		box.css("display", "block");
		if(gameStyle) {
			$("#gameStyle").css("display","block");
		} else {
			$("#symbol").css("display","block");
		}
}

function submit(gameStyle, bool) {
	$('#dialoguebox').css("display","none");
	$("#dialogueoverlay").css("display","none");
	if(gameStyle) {
		pvp = bool;
		$("#gameStyle").css("display","none");
		if(!pvp) { 
			renderAlertBox(false) 
		} else {
			game.initialize(true, false);
		}
	} else { // TODO
		$("#symbol").css("display","none");
		var computerFirst = bool;
		game.initialize(false, computerFirst);
	}
}


$(document).ready(function() {
	game = new Game();
	renderAlertBox(true);
});