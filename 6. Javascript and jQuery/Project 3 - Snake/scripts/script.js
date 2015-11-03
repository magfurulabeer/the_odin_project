var theme = new Audio('sounds/theme.mp3'); 
var gameovertheme = new Audio('sounds/gameover.mp3'); 
var eatsound = new Audio('sounds/eat.wav'); 
var button = new Audio('sounds/button.wav'); 
var dead = new Audio('sounds/dead.wav'); 
var movesound = new Audio('sounds/movesound.wav'); 

var newGame = true;
var cause;
var speed;
var direction;
var lastDirection;
var x;
var y;
var interval;
var score;
var firstPrey;
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
var Achievement = {
	"achievements": [],
	"list": {},
	create: function(title, description) {

		Achievement.list[title] = description;
	}
}


function createAchievements() {
	Achievement.create("Chasing Tail", "Die from eating your own tail.");
	Achievement.create("Tree Hugger", "Die from crashing into a tree");
	Achievement.create("Where no man has gone before", "Die from going out of bounds");
	Achievement.create("Super Sonic", "Max out your speed");
	Achievement.create("Early Bird", "First prey is a bird");
	Achievement.create("My anaconda don't", "Reach length of 20");
	Achievement.create("Got the munchies", "Eat 10 prey");
}

function giveAchievement(name) {
	Achievement.achievements.push(name);
	displayAchievement(name);
	console.log(name);
}

function displayAchievement(name) {
	$("#title").html("");
	$("#title").css("display","block")
	$("#title").html(name).delay(3000).fadeOut(2000);
}

function achievementButton() {
	var button = "<button class='list'>&#9662;Show Achievements&#9662;</button>";
	$("#title").html("");
	$("#hud").append(button);
}

function showAchievements() {
	if($(".square").length > 0) {
		gameovertheme.play()
		$(".square").remove();
		$(".container").css("opacity","1");
		$(".container").css("background-color","#fff");
		// Pattern from SubtlePatterns
		$(".container").css("background-image","url(images/old_map.png)");
		$(".container").css("overflow-y","scroll");
		$(".container").css("overflow-x","hidden");
		$(".container").append("<h1 class='achievement'>Achievements</h1>");
		for(var i = 0; i < Achievement.achievements.length; i++) {
			var name = Achievement.achievements[i];
			var desc = Achievement.list[name];
			$(".container").append(formatAchievement(name, desc));
		}
	}
}

function removeAchievements() {
	$(".container").css("opacity","1");
	$(".container").css("overflow-y","hidden");
	$(".container").children().remove();
}

function formatAchievement(k,v) {
	return "<h3 class='achievement'>" + k + "</h3><p class='achievement'>&bull; " + v + "</p>";
}

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
			movesound.play();
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
		//if(a !== x && b !== y) {
		if(isEmpty("."+a+"-"+b)) {
			var coordinate = "." + a + '-' + b;
			addSprite(coordinate, sprites.redbird);
			blocked = true;
		}	 
	}
}

function eat(a,b) {
	var coord = "." + a + "-" + b;
	if($(coord).children().length > 0) {
		if(tail.length === 0) {
			firstPrey = $(coord).find(".food").attr("id");
			switch(firstPrey) {
				case "red":
				case "blue":
				case "green":
				case "orange":
					giveAchievement("Early Bird");
			}
		}
		$(coord).find(".food").remove();
		score = score + 10;
		displayScore();
		spawnFood();
		changeSpeed(10);
		eatsound.play();
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
	if(tail.length === 10) {
		giveAchievement("Got the munchies");
	}
	if(tail.length === 20) {
		giveAchievement("My anaconda don't");
	}
}

function collisionCheck(a,b) {
	// If out of bound, return true
	if(a < 1 || a > 21 || b < 1 || b > 21) {
		cause = "Out of bounds"
		return true;
	}
	// If tail, return true
	if($("."+a+"-"+b).has(".tail").length > 0) {
		cause = "Eat tail";
		return true;
	}
	// If tree, return true
	if($("."+a+"-"+b).has(".tree").length > 0) {
		cause = "Hit a tree";
		return true;
	}
	return false;
}

function gameOver() {
	if(cause == "Out of bounds") {
		giveAchievement("Where no man has gone before");
	}
	if(cause == "Hit a tree") {
		giveAchievement("Treehugger");
	}
	if(cause == "Eat tail") {
		giveAchievement("Chasing Tail");
	}
	clearInterval(interval);
	$(".tail").remove();
	$("." + x + "-" + y).find(".head").replaceWith(sprites["dead"]);
	$(".container").css("opacity",.5);
	var button = "<button class='list'>&#9662;Show Achievements&#9662;</button>";
	$("#hud").append(button);
	$(".list").hide().delay(5000).fadeIn(0);
	$(".list").on("click",showAchievements);
	dead.play();
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
	Achievement.achievements = [];
}

function initiate() {
	restart();
	setData();
	displayScore();
	createGrid();
	makeBackground();
	makeCenterPiece();
	createAchievements();
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
	theme.pause();
	button.play();
	$(".start").off(); // Just in case, not sure.
	$(".container").children().remove();
	$(".container").removeClass("splash");
	initiate();
	$(".restart").on("click",initiate);
}

function restart() {
	if(!newGame) {
		gameovertheme.pause();
		button.play();
		$(".list").off().remove();
		removeAchievements();
		clearInterval(interval);
		$(".square").remove();
		$(".container").css("opacity",1)
	}
}	

theme.play();
$(".start").on("click",start);





