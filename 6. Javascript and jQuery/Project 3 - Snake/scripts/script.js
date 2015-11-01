var direction = 39;
var x = 11;
var y = 11;
var interval;
var sprites = {
	"head38": "<img id='head' src='images/headup.png'>",
	"head40": "<img id='head' src='images/headdown.png'>",
	"head37": "<img id='head' src='images/headleft.png'>",
	"head39": "<img id='head' src='images/headright.png'>",
	"dead": "<img id='head' src='images/dead.png'>",
	"redbird": "<img id='head' src='images/redbird.png'>",
	"orangebird": "<img id='head' src='images/orangebird.png'>",
	"greenbird": "<img id='head' src='images/greenbird.png'>",
	"bluebird": "<img id='head' src='images/bluebird.png'>"
}

var snake = ["11-11"]

function createGrid() {
	for(var i = 1; i < 22; i++) {
		for(var j = 1; j < 22; j++) {{
			$("#screen").find(".container").append("<div class='square " +i+"-"+j+ "'></div>");
		}}
	}
}

function addSprite(tile, str) {
	$(tile).append(str);
	$(tile).css("bottom","2px");
}

function moveSprite(a,b) {
	if(collisionCheck(a,b)) {
		gameOver();
	} else {
		eat(a,b);
		$("." + x + "-" + y).find("img").appendTo($("." + a + "-" + b));
		$("." + x + "-" + y).css("bottom","0px");
		$("." + a + "-" + b).css("bottom","2px");
	}
	
}

function spawnFood() {
	var blocked = false;
	while(!blocked) {
		var a = randomCoordinate();
		var b = randomCoordinate();
		if(a !== x && b !== y) {
			var coordinate = "." + a + '-' + b;
			addSprite(coordinate, sprites.redbird);
			blocked = true;
		}	 
	}
}

function eat(a,b) {
	var coord = "." + a + "-" + b;
	if($(coord).children().length > 0) {
		$(coord).find("img").remove();
		spawnFood();
	}

}

function turn(key) {
	direction = key;
	$("." + x + "-" + y).find("img").replaceWith(sprites["head"+direction]);

}

function move() {
	switch(direction) {
		case 37:
			moveSprite(x,y-1);
			y--;
			break;
		case 38:
			moveSprite(x-1,y);
			x--;
			break;
		case 39:
			moveSprite(x,y+1);
			y++;
			break;
		case 40:
			moveSprite(x+1,y);
			x++;
			break;
	}
}

function collisionCheck(a,b) {
	if(a < 1 || a > 21 || b < 1 || b > 21) {
		return true;
	}
	return false;
}

function gameOver() {
	clearInterval(interval);
	$("." + x + "-" + y).find("img").replaceWith(sprites["dead"]);
	$(".container").css("opacity",.5)
}

function startMovement() {
	interval = setInterval(move,100);
}

function initiate() {
	createGrid();
	makeBackground();
	makeCenterPiece();
	//Add player sprite
	addSprite(".11-11", sprites["head39"]);
	$(document).keydown(function(e) {
		turn(e.which);
	});
	startMovement();
	spawnFood();
}

/*
function start() {
	$("button").off();
	$(".container").children().remove();
	$(".container").removeClass("splash");
	//$(".container").css("background-image","url(../images/green.png)")
	initiate();
}
$("button").on("click",start);
*/

initiate();