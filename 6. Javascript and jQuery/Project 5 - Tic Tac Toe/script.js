var p1Turn = true;
var symX = "<h1 class='x'>X</h1>";
var symO = "<h1 class='o'>O</h1>";

$(".box").on("click",move);

function move() {
	if($(this).children().length === 0) {
		if(p1Turn) {
			$(this).append(symX);

		} else {
			$(this).append(symO);
		}
		changeTurn();
	}
}

function changeTurn() {
	if(p1Turn) {
		p1Turn = false;
	} else {
		p1Turn = true;
	}
}