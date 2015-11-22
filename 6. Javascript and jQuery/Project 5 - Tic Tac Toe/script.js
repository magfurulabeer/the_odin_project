var p1Turn, symX, symO;

var Player = function(symbol, computer) {
		this.symbol = symbol;
		this.computer = computer;		
}

Player.prototype.move = function() {
	move();
}

function move() {
	if($(this).children().length === 0) {
		if(p1Turn) {
			$(this).append(symX);

		} else {
			$(this).append(symO);
		}
		
	}
}

function changeTurn(player1turn) {	
	displayTurn(!player1turn);
	player1turn = !player1turn;
}

function checkForWin() {
	
}


function displayTurn(player1turn) {
	if(player1turn) {
		$("#display").html("Player 1 Turn").addClass("x").removeClass("o");
	} else {
		$("#display").html("Player 2 Turn").addClass("o").removeClass("x");
	}
}

function initialize() {
	
	symX = "<h1 class='x'>X</h1>";
	symO = "<h1 class='o'>O</h1>";

	$(".box").on("click",move);
	var p1 = new Player("x", false);
	var p2 = new Player("o", false);	
	changeTurn(p1Turn);
}

function newGame() {
	
	
}

initialize();