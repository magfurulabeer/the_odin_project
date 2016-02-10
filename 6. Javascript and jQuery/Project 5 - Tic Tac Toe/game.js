// game.js
// Magfurul Abeer
// The full javascript portion of the Tic Tac Tow game

var game;

// Game class
var Game = function() {

	// Symbols for X and O. True corresponds to X while False corresponds to O.
	var symX = "<h1 class='x'>X</h1>";
	var	symO = "<h1 class='o'>O</h1>";

	// Player class - Only to be used inside Game instance
	var Player = function(name, symbol, computer) {
		// Set wins and moves to 0
		var wins = 0;
		var moves = 0;

		// Set name, symbol, and whether or not it's a computer
		this.name = name;
		this.symbol = symbol;
		this.computer = computer;

		// Getter and setter methods
		this.winCount = function() { return wins };
		this.win = function() { wins++ }; // Add to prototype
		this.turns = function() { return moves };
		this.takeTurn = function() { moves++ };
		this.resetMoves = function() { moves = 0 };
	}

	// Gameover starts false. Make a players array. Declare variable for current player.
	var gameover = false;
	var players = [];
	var currentPlayer;
	// Set winner as first player for now
	var winner = players[0];
	// Array of all possible ways to win
	var threeinarow = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
	// Array of corner divs
	var corners = [1,3,7,9];
	// Array of edge divs
	var edges = [2,4,6,8];
	// Boolean for who goes first in PvC
	var cpuFirst;
	// Boolean for whether or not a computer should change tactics. 
	// Possibly unnecessary
	var changeTactics = false;

	// Init function sets up players and starts the game
	this.initialize = function(pvp, computerFirst) {	
		// If PvP, set Player 1 and 2. T/F is for X/O. The last parameter states if it is a computer
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
		// Set the current player to the first player
		currentPlayer = players[0];
		// Add event listeners for each box
		$(".box").on("click", move);
		// Display that it is first player's turn
		display(players[0]);
		// Show the score
		refreshScore();
		cpuFirst = computerFirst;
		// If computer is first, start game with the computer's turn
		if(computerFirst) {
			computerTurn();
		} 
	}

	// Display which player's turn it is with appropriate font color
	function display(player) {
		$("#display").html(player.name + " Turn");
		if(player.symbol) {
			$("#display").addClass("x").removeClass("o");
		} else {
			$("#display").addClass("o").removeClass("x");
		}
	}

	// Show most recent scores
	function refreshScore() {
		var p1score = players[0].name + ": " + players[0].winCount();
		var p2score = players[1].name + ": " + players[1].winCount();
		$("#score").html("<p>" + p1score + "</p><p>" + p2score + "</p>");
	}

	// Function for making a move
	function generalizedMove(isCPU, box) {
		// First condition is if box is empty.
		var isEmpty = $(box).children().length === 0;
		// Second condition is if current player matches the player type
		var correctPlayer = isCPU === currentPlayer.computer;
		// Last condition is if game is not over
		var gameStillGoing = gameover === false;

		// If box is empty and current player is not a computer and game is not over
		if(isEmpty && correctPlayer && gameStillGoing) {
			// Append the appropriate symbol - (T/F = X/O)
			currentPlayer.symbol ? $(box).append(symX) : $(box).append(symO);
			// Increment current players number of moves
			currentPlayer.takeTurn();
			// Check if there is a win
			if(checkForWin()){ //REFACTOR
				// If so, game over. False means it's not a draw.
				gameOver(false);
			} else if(draw()) {
				// Else if there is a draw, game over. True means it's a draw.
				gameOver(true);
			} else {
				// Else just change turns
				changeTurn();
				// If it is a PvC game and next player is computer, let computer make a move
				if(currentPlayer.computer) {
					computerTurn();
				}
			}
		}
	}

	// Player move function. Pass in clicked on box.
	function move() {
		generalizedMove(false, this);
	}

	// Computer move function. Pass in chosen box.
	function computerMove(box) {
		generalizedMove(true, box);
	}

	// Computer Logic for move decisions.
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

	// TODO: Refactor intercept to work with empty div rather than a combination
	// TODO: Also refactor interceptionNecessary to return a div
	// Make a specific offensive or defensive move to either secure a win or prevent a loss
	function intercept() {
		// Check if there are any situations where the computer would have to intercept
		var possible = interceptionNecessary();
		// Loop through each div and make a move on the empty div
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

	// Check if necessary
	// Return number of boxes currently occupied in a specific combination
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

	// TODO: Refactor code to return the empty div rather than the entire combination
	// TODO: Also change the intercept method to work with a div rather than a combination
	// Check if interception is necessary
	function interceptionNecessary() {
		// cpuInterception is whether or not the CPU needs to intercept to take the win
		// plyrInterception is whether or not the CPU needs to intercept to prevent losing
		var cpuInterception = false;
		var plyrInterception = false;
		for(var i in threeinarow) {
			// sym is equal to computer players symbol boolean which is converted to X/O
			var sym = currentPlayer.symbol;
			sym = (sym === true) ? "X" : "O";
			//Number of Computer and Player symbols (X's and O's) and empty spaces
			var cpuCount = 0;
			var plyrCount = 0;
			var empty = 0;
			// Go through each winning combination
			for(var x in threeinarow[i]) {
				// Convert div number into the div and check if it has children, else increment empty
				if($("#"+threeinarow[i][x]).children().length > 0) {
					// If it does have children, check if the h1 matches sym, if so increment cpuCount else increment plyrCount
					if($("#"+threeinarow[i][x]).find("h1").text() === sym) {
						cpuCount++;
					} else {
						plyrCount++;
					}
				} else {
					empty++;
				}
				// If current combination has two of either count and 1 empty space, return the combination
				if(cpuCount === 2 && empty === 1) {
					cpuInterception = threeinarow[i];
				}
				if(plyrCount === 2 && empty === 1) {
					plyrInterception = threeinarow[i];
				}
			}
		}
		// If CPU Interception is necessary, return it
		if(!!cpuInterception) { return cpuInterception };
		// Otherwise return the player interception which is either a combination or false
		return plyrInterception;
	}

	// Check if draw
	function draw() {
		// Iterate through all divs and check if all are full, if so, game is a draw
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


// Alert Box Functions

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