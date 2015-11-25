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
	var cpuFirst;
	var changeTactics = false;

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
		cpuFirst = computerFirst;
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
				gameOver(false);
			} else if(draw()) {
				gameOver(true);
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
			if(checkForWin()){ //REFACTOR
				gameOver(false);
			} else if(draw()) {
				gameOver(true);
			} else {
				changeTurn();
			}
			return true;
		} else { return false }
		
	}

	function computerTurn() {
		if(!gameover) {
			if(currentPlayer.symbol || changeTactics) {
				switch(currentPlayer.turns()) {
					case 0:
					case 1:
						if(!tacticalMove(corners)) { tacticalMove(edges) }
						break;
					default: 
						if(interceptionNecessary()) {
							intercept();
						} else if( numCorners(currentPlayer.symbol) < 3 ) {
							tacticalMove(corners);
						}
				}
			} else {
				if(interceptionNecessary()) {
					intercept();
				} else if($("#5").children().length === 0) {
					computerMove("#"+5);
				} else {
					if(!tacticalMove(edges)) { tacticalMove(corners) }
				}
			}
		}
	}

	function tacticalMove(tactics) {
		for(var i in tactics) {
			var tactic = ("#"+tactics[i]);
			var valid = computerMove(tactic);
			if(valid) {
				return true;
			}
		}
		return false;
		
	}

	function intercept() {
		var possible = interceptionNecessary();
		for(var i in possible) {
			if($('#'+possible[i]).children().length === 0) {
				computerMove($("#"+possible[i]));
			}
		}
	}

	// Return number of occupied corners by symbol
	function numCorners(sym) {
		sym = (sym === true) ? "X" : "Y";
		var num = 0;
		for(var i in corners) {
			if( $("#"+corners[i]).find("h1").text() === sym ) {
				num ++;
			}
		}
		return num;
	}

	function numOccupiedBoxes(specific) {
		var num = 0;
		for(var i in specific) {
			if( $("#"+specific[i]).children().length > 0) {
				num ++;
			}
		}
		return num;
	}

	function changeTurn() {
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

	function interceptionNecessary() {
		var cpuInterception = false;
		var plyrInterception = false;
		for(var i in threeinarow) {
			var sym = currentPlayer.symbol;
			sym = (sym === true) ? "X" : "O";
			var cpuCount = 0;
			var plyrCount = 0;
			var empty = 0;
			for(var x in threeinarow[i]) {
				if($("#"+threeinarow[i][x]).children().length > 0) {
					if($("#"+threeinarow[i][x]).find("h1").text() === sym) {
						cpuCount++;
					} else {
						plyrCount++;
					}
				} else {
					empty++;
				}
				if(cpuCount === 2 && empty === 1) {
					cpuInterception = threeinarow[i];
				}
				if(plyrCount === 2 && empty === 1) {
					plyrInterception = threeinarow[i];
				}
			}
		}
		if(!!cpuInterception) { return cpuInterception };
		return plyrInterception;
	}

	function draw() {
		var count = 0;
		for(var i = 1; i < 10; i++) {
			if($("#"+i).children().length > 0) { count ++ };
		}
		if(count === 9) {
			return true;
		}
		return false;
	}

	function gameOver(isDraw) {
		gameover = true;
		if(isDraw) {
			displayText("It's a draw!");
			$("#display").removeClass("x").removeClass("o");
		} else {
			displayText(winner.name + " wins!");
			if(winner.symbol) {
				$("#display").addClass("x").removeClass("o");
			} else {
				$("#display").addClass("o").removeClass("x");
			}
			winner.win();
			refreshScore();
		}
		var restart = setTimeout(newGame, 1500)
	}

	function newGame() {
		var count = 3;
		var countdown = setInterval(function() {
			if(count === 0) {
				clearInterval(countdown);
				$(".box").children().remove();
				gameover = false;
				players[0].resetMoves();
				players[1].resetMoves();
				display(players[0]);
				refreshScore();
				changeTactics = false;
				currentPlayer = players[0];
				if(cpuFirst) {
					computerTurn();
				}
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
};


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
	if(windowHeight > windowWidth) {
		/*
		container.css("width",windowWidth);
		container.css("height",windowWidth);
		*/
		vertical.css("width",windowWidth/3);
		vertical.css("height",windowWidth);
		horizontal.css("width",windowWidth);
		horizontal.css("height",windowWidth/3);
		//container.css("top", (250)/20 + "em");
		vertical.css("top", (250)/20 + "em");
		horizontal.css("top", (395)/20 + "em");	
		container.css("left", (windowWidth/2 - 475/2)/15 + "em");
		vertical.css("left", (windowWidth/2 - 475/4 + 24)/15 + "em");
		horizontal.css("left", ("0"));	
	} else {
		container.css("top", (250)/16 + "em");
		vertical.css("top", (250)/16 + "em");
		horizontal.css("top", (395)/16 + "em");
		container.css("left", (windowWidth/2 - 475/2)/16 + "em");
		vertical.css("left", (windowWidth/2 - 475/4 + 24)/16 + "em");
		horizontal.css("left", (windowWidth/2 - 475/2 + 6)/16 + "em");
		score.css("left", (windowWidth/2 - 290)/16 + "em");
		score.css("top", (165)/16 + "em");
	}
}

$(document).ready(function() {
	positionFix();
	game = new Game();
	renderAlertBox(true);

});