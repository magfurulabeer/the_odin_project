var newGame = true;
var speed;
var direction;
var lastDirection;
var x;
var y;
var interval;
var score;
var sprites = {
	"head38": "<img id='headup' class='head' src='images/headup.png'>",
	"head40": "<img id='headdown' class='head' src='images/headdown.png'>",
	"head37": "<img id='headleft' class='head' src='images/headleft.png'>",
	"head39": "<img id='headright' class='head' src='images/headright.png'>",
	"dead": "<img id='dead' src='images/dead.png'>",
	"redbird": "<img id='red' class='food' src='images/redbird.png'>",
	"orangebird": "<img id='orange' class='food' src='images/orangebird.png'>",
	"greenbird": "<img id='green' class='food' src='images/greenbird.png'>",
	"bluebird": "<img id='blue' class='food' src='images/bluebird.png'>",
	"bunny": "<img id='bunny' class='food' src='images/bunny.png'>",
	"tail": "<img id='tail' class='tail' src='images/tail.png'>"
}
var tail;

function createGrid() {
	for(var i = 1; i < 22; i++) {
		for(var j = 1; j < 22; j++) {{
			$("#screen").find(".container").append("<div class='square " +i+"-"+j+ "'></div>");
		}}
	}
}

function displayScore() {
	$("#score").html(score);
}

function addSprite(tile, str) {
	$(tile).append(str);
}

function moveSprite(a,b) {
	if(collisionCheck(a,b)) {
		gameOver();
	} else {
		if(eat(a,b)) {
			$("." + x + "-" + y).find(".head").appendTo($("." + a + "-" + b));
			addTail(x,y);
		} else {
			$("." + x + "-" + y).find(".head").appendTo($("." + a + "-" + b));
			if(tail.length > 0) {
				var last = tail.pop();
				$("."+last).find(".tail").appendTo($("." + x + "-" + y));
				last = x+"-"+y;
				tail.unshift(last);
			}
		}
		lastDirection = direction;
	}	
}

function spawnFood() {
	var blocked = false;
	while(!blocked) {
		var a = randomCoordinate();
		var b = randomCoordinate();
		if(a !== x && b !== y) {
			var coordinate = "." + a + '-' + b;
			addSprite(coordinate, sprites.bunny);
			blocked = true;
		}	 
	}
}

function eat(a,b) {
	var coord = "." + a + "-" + b;
	if($(coord).children().length > 0) {
		$(coord).find(".food").remove();
		score = score + 10;
		displayScore();
		spawnFood();
		changeSpeed(10);
		return true;
	}
	return false;
}

function changeSpeed(num) {
	if(speed > 50) {
		speed = speed - num;
		clearInterval(interval);
		startMovement();
	}
}

function turn(key) {	
	if(tail.length > 0) {
		var diff = Math.abs(lastDirection - key);
		if(diff !== 2) {
			direction = key;
			$("." + x + "-" + y).find(".head").replaceWith(sprites["head"+direction]);
		}
	} else {
		direction = key;
		$("." + x + "-" + y).find(".head").replaceWith(sprites["head"+direction]);
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
	addSprite("."+a+"-"+b, sprites.tail);
	tail.unshift(a+"-"+b);
}

function collisionCheck(a,b) {
	// If out of bound, return true
	if(a < 1 || a > 21 || b < 1 || b > 21) {
		return true;
	}
	// If tail, return true
	if($("."+a+"-"+b).has(".tail").length > 0) {
		return true;
	}
	return false;
}

function gameOver() {
	clearInterval(interval);
	$("." + x + "-" + y).find(".head").replaceWith(sprites["dead"]);
	$(".container").css("opacity",.5)
}


function startMovement() {
	interval = setInterval(move,speed);
}

function setData() {
	speed = 300;
	direction = 39;
	x = 11;
	y = 11;
	score = 0;
	tail = [];
}

function initiate() {
	restart();
	setData();
	displayScore();
	createGrid();
	makeBackground();
	makeCenterPiece();
	//Add player sprite
	addSprite(".11-11", sprites["head39"]);
	$(document).keydown(function(e) {
		if(e.which > 36 && e.which < 41) {
			turn(e.which);
		}
	});
	startMovement();
	spawnFood();
	newGame = false;
}


function start() {
	$(".start").off(); // Just in case, not sure.
	$(".container").children().remove();
	$(".container").removeClass("splash");
	initiate();
}

function restart() {
	if(!newGame) {
		clearInterval(interval);
		$(".square").remove();
	}
}	

$(".start").on("click",start);
$(".restart").on("click",initiate);




