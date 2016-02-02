// engine.js
// Magfurul Abeer
// Contains the logic behind the game


var rotation;
var over;
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
var sounds = [theme, gameovertheme,eatsound,button,dead,movesound,chirp,razeTree,fanfare,poof];



function giveAchievement(name) {
  var include = false;
  for(var i in Achievement.achievements) {
    if(Achievement.achievements[i] === name) {
      include = true
    }
  }
  if(!include) {
    Achievement.achievements.push(name);
    displayAchievement(name);
  }
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
  var food;
  var type = Math.random();
  if(type < 0.25) {
    food = sprites.orangebird;
  } else if(type < 0.50) {
    food = sprites.bluebird;
  } else if(type < 0.75) {
    food = sprites.greenbird;
  } else if(type < 1) {
    food = sprites.redbird;
  }
  spawnSprite(food);
}

function spawnSprite(sprite) {
  var blocked = false;
  while(!blocked) {
    var a = randomCoordinate();
    var b = randomCoordinate();
    if(isEmpty("."+a+"-"+b)) {
      var coordinate = "." + a + '-' + b;
      addSprite(coordinate, sprite);
      blocked = true;
    }  
  }
  return coordinate;
}

function eat(a,b) {
  var coord = "." + a + "-" + b;
  if($(coord).children(".food").length > 0) {
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
    var chance = Math.random();
    if(chance >= .85) {
      var c = spawnSprite(sprites.heart);
      setTimeout(function() {
        if($(c).has(".heart").length > 0) {
          $(c).find(".heart").replaceWith(sprites.poof).fadeOut(1000);
          poof.play();
          setTimeout(function() {
            $(c).find(".poof").remove();
          },1000)
        }
      },5000);
    }
    return true;
  } else if($(coord).children(".heart").length > 0) {
    $(coord).find(".heart").remove();
    score = score + 50;
    displayScore();
    removeTail(5);
    giveAchievement("Liposuction");
    fanfare.play();
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

function removeTail(num) {
  for(var i = 0; i < num; i++) {
    if(tail.length > 0) {
      var coord = tail.pop();
      $("." + coord).find(".tail").remove();
    }
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
  // If slider, return true
  if($("."+a+"-"+b).has(".slider").length > 0) { // Does not work
    cause = "Hit a slider";
    return true;
  }
  return false;
}

function gameOver() {
  if(!over) {
    if(cause == "Out of bounds") {
      giveAchievement("Snake? Snake?! SNAAAAAKE!!!!");
    }
    if(cause == "Hit a tree") {
      giveAchievement("Treehugger");
    }
    if(cause == "Eat tail") {
      giveAchievement("Chasing Tail");
    }
    if(cause == "Hit a slider") {
      giveAchievement("Slice and dice");
    }
    clearInterval(interval);
    $(".tail").remove();
    deathAnimation();
    $(".container").css("opacity",.5);
    var button = "<button class='list'>&#9662;Show Achievements&#9662;</button>";
    $("#hud").append(button);
    if($(".list").length > 1) { // Firefox occassionally appends 2 buttons
      $(".list").last().remove();
    }
    $(".list").hide().delay(5000).fadeIn(0);
    $(".list").on("click",showAchievements);
    dead.play();
    over = true;
  }
}

function deathAnimation() { 
  var i = 1;
  rotation = setInterval(function() {
    if(i === 7) {
      clearInterval(rotation);
      $(".head").replaceWith(sprites["dead"]);
    }
    rotateHead();
    i++;
  }, 250);
}

function rotateHead() {
  var id = $(".head").attr("id");
  if (id === "headup") { $(".head").replaceWith(sprites["head39"]) }  
  if (id === "headright") { $(".head").replaceWith(sprites["head40"]) } 
  if (id === "headdown") { $(".head").replaceWith(sprites["head37"]) }  
  if (id === "headleft") {$(".head").replaceWith(sprites["head38"]) }
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
  slideronmap = false;
  over = false;
}

function initiate() {
  dead.pause();
  clearInterval(rotation);
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
  /*$(".direction").click(function() {
    turn($(this).data("num"));
  })*/
  startMovement();
  spawnFood();
  newGame = false;
}

function toggleMute() {
  for(var i in sounds) {
    if(sounds[i].muted === true) {
      $(this).css("opacity",1);
      sounds[i].muted = false;
    } else {
      $(this).css("opacity",.5);
      sounds[i].muted = true;
    }
  }
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
    clearInterval(sliderInterval);
    gameovertheme.pause();
    gameovertheme.currentTime = 0;
    button.play();
    $(".list").off().remove();
    removeAchievements();
    clearInterval(interval);
    $(".square").remove();
    $(".container").css("opacity",1)
  }
} 







