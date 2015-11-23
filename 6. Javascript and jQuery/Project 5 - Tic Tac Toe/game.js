var game;

var Game = function() {
	var symX = "<h1 class='x'>X</h1>";
	var	symO = "<h1 class='o'>O</h1>";
	var Player = function(name, symbol, computer) {
		var wins = 0;
		var moves = 0;
		this.name = name;
		this.symbol = symbol;
		this.computer = computer;
		this.winCount = function() { return wins };
		this.win = function() { wins++ }; // Add to prototype
		this.turns = function() { return moves };
		this.takeTurn = function() { moves++ };
		this.resetMoves = function() { moves = 0 };
	}
	var gameover = false;
	var players = [];
	var currentPlayer;
	var winner = players[0];
	var threeinarow = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
	var corners = [1,3,7,9];
	var edges = [2,4,6,8];

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
		refreshScore();
		if(computerFirst) {
			computerTurn();
		}
	}

	function display(player) {
		$("#display").html(player.name + " Turn");
		if(player.symbol) {
			$("#display").addClass("x").removeClass("o");
		} else {
			$("#display").addClass("o").removeClass("x");
		}
	}

	function refreshScore() {
		var p1score = players[0].name + ": " + players[0].winCount();
		var p2score = players[1].name + ": " + players[1].winCount();
		$("#score").html("<p>" + p1score + "</p><p>" + p2score + "</p>");
	}

	function move() {
		if($(this).children().length === 0 && !currentPlayer.computer && gameover === false) {
			currentPlayer.symbol ? $(this).append(symX) : $(this).append(symO);
			currentPlayer.takeTurn();
			if(checkForWin()){ //REFACTOR
				gameOver();
			} else {
				changeTurn();
				if(pvp === false) {
					computerTurn();
				}
			}
		}
	}

	
	function computerMove(box) {
		if($(box).children().length === 0 && currentPlayer.computer && gameover === false) {
			currentPlayer.symbol ? $(box).append(symX) : $(box).append(symO);
			currentPlayer.takeTurn();
			console.log(currentPlayer.name + ": " + currentPlayer.turns());
			if(checkForWin()){ //REFACTOR
				gameOver();
			} else {
				changeTurn();
			}
			return true;
		}
		return false;
	}

	function computerTurn() {
		if(currentPlayer.symbol) {
			switch(currentPlayer.turns()) {
				case 0:
					var firstCorner = $("#"+corners[randomNumber(0,3)]);
					computerMove(firstCorner);
					break;
				case 1:
					var invalid = true;
					while(invalid) {
						var secondCorner = $("#"+corners[randomNumber(0,3)]);
						if(computerMove(secondCorner)) { invalid = false };
					}
					console.log("second move done");
					break;
			}
		} else {

		}
	}

	function changeTurn() {
		console.log("change turn");
		if(currentPlayer === players[0]) {
			currentPlayer = players[1];
		} else {
			currentPlayer = players[0];
		}
		display(currentPlayer);
	}

	function checkForWin() {
		for(var i in threeinarow) {
			var sym;
			var first = $("#" + threeinarow[i][0]).find("h1").text() || "first";
			var second = $("#" + threeinarow[i][1]).find("h1").text() || "second";
			var third = $("#" + threeinarow[i][2]).find("h1").text() || "third";
			if(first === second && second === third) {
				sym = (first === 'X') ?  true : false;
				winner = (players[0].symbol === sym) ? players[0] : players[1];
				return true;
			}
		}
		return false;
	}

	function gameOver() {
		gameover = true;
		$("#display").html(winner.name + " wins!");
		if(winner.symbol) {
			$("#display").addClass("x").removeClass("o");
		} else {
			$("#display").addClass("o").removeClass("x");
		}
		winner.win();
		console.log(winner.winCount());
		refreshScore();
		var restart = setTimeout(newGame, 2000)
	}

	function newGame() {
		var count = 3;
		var countdown = setInterval(function() {
			if(count === 0) {
				$(".box").children().remove();
				gameover = false;
				players[0].resetMoves();
				players[1].resetMoves();
				display(players[0]);
				refreshScore();
				clearInterval(countdown);
			} else {
				displayText("Restarting in " + count);
				count --;
			}
		}, 1000);		
	}

	function displayText(str) {
		$("#display").html(str);
	}
	
	function randomNumber(max, min) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
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

function positionFix() {
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var container = $("#container");
	var vertical = $(".vertical");
	var horizontal = $(".horizontal");
	var score = $("#score");
	container.css("left", (windowWidth/2 - 475/2) + "px");
	container.css("top", (250) + "px");
	vertical.css("left", (windowWidth/2 - 475/4 + 24) + "px");
	vertical.css("top", (250) + "px");
	horizontal.css("left", (windowWidth/2 - 475/2 + 6) + "px");
	horizontal.css("top", (395) + "px");
	score.css("left", (windowWidth/2 - 290) + "px");
	score.css("top", (165) + "px");
}

$(document).ready(function() {
	positionFix();
	game = new Game();
	renderAlertBox(true);

});