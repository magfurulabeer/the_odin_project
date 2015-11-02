var direction = 39;
var x = 11;
var y = 11;
var interval;
var sprites = {
	// Fix ID's
	"head38": "<img id='headup' class='head' src='images/headup.png'>",
	"head40": "<img id='headdown' class='head' src='images/headdown.png'>",
	"head37": "<img id='headleft' class='head' src='images/headleft.png'>",
	"head39": "<img id='headright' class='head' src='images/headright.png'>",
	"dead": "<img id='dead' src='images/dead.png'>",
	"redbird": "<img id='red' class='food' src='images/redbird.png'>",
	"orangebird": "<img id='orange' class='food' src='images/orangebird.png'>",
	"greenbird": "<img id='green' class='food' src='images/greenbird.png'>",
	"bluebird": "<img id='blue' class='food' src='images/bluebird.png'>",
	"tailbig": "<img id='tailbig' class='tail' src='images/tailbig.png'>",
	"tailsmall": "<img id='tailsmall' class='tail' src='images/tailsmall.png'>"
}

var tail = [];

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
		if(eat(a,b)) {
			$("." + x + "-" + y).find("img").appendTo($("." + a + "-" + b));
			addTail(x,y);
		} else {
			$("." + x + "-" + y).find("img").appendTo($("." + a + "-" + b));
		}
		
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
		$(coord).find(".food").remove();
		spawnFood();
		return true;
	}
	else false;

}

function turn(key) {
	if(36 < key < 41) {
		direction = key;
		$("." + x + "-" + y).find("img").replaceWith(sprites["head"+direction]);
	}
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

function addTail(a,b) {
	addSprite("."+a+"-"+b, sprites.tailbig);
	tail.push(a+"-"+b);
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

/*
var Snake = {
	"x": "11",
	"y": "11",
	"addTail": function() {},
	"position": function() {
		return (this.x + "-" + this.y) // this might refer to function and not object
		},
}*/