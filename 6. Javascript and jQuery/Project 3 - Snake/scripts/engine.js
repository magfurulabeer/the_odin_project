// engine.js
// Magfurul Abeer
// The object for the game itself


// TODO:
// Achievement can fade too quickly if shown right when another one is fading
// Make Options Page
// Make so slider is random

var Game = function() {
  this.score;
  this.player;
  this.tileManager;
  this.audioManager;
  this.achievementManager;
  this.spriteManager;
  this.causeOfDeath;
  this.achievementButtonTimeout;
}

// Initializes data for a new game
Game.prototype.initialize = function() {
  // Set basic properties
  this.score = 0;
  // Create and init new achievement manager
  this.achievementManager = new AchievementManager(this);
  this.achievementManager.initialize();
  // Create and init new tile manager
  this.tileManager = new TileManager();
  this.tileManager.game = this;
  // Create new sprite manager
  // TODO: No reason to remake this for each game???
  this.spriteManager = new SpriteManager();
  // Create and init new audio manager
  this.audioManager = new AudioManager();
  this.audioManager.initialize();
  // Play the theme music
  this.audioManager.theme.play();
}

Game.prototype.startGame = function() {
  // Prepare self variable for overcoming binding issues
  var self = this;
  // If the theme is playing, pause it. Play button press sound.
  this.audioManager.theme.pause();
  this.audioManager.button.play();
  // Remove start button event listener
  $(".start").off();
  // Clear the container of elements and classes
  $(".container").children().remove();
  $(".container").removeClass("splash");
  // Display the score
  this.displayScore();
  // Create the grid, background tiles, and centerpiece
  this.tileManager.createGrid();
  this.tileManager.makeBackground();
  this.tileManager.makeCenterPiece();
  // Make the player and set it's game property to this game instance
  this.player = new Player();
  this.player.initialize(this);
  // Set event listener for movement
  $(document).keydown(function(e) {
    if(e.which > 36 && e.which < 41) {
      self.player.turn(e.which);
    }
  });
  $(".restart").on("click",function() {
    self.restart();
  });
  this.player.startMovement();
  this.spawnFood();
}


// Restarts the game
Game.prototype.restart = function() { 
  // Hide achievement button and clear the timeout in gameover that reveals the button
  clearInterval(this.achievmentButtonTimeout);
  $(".list").hide();
  // Remove any achievements being displayed
  $("#title").html("");
  // Stop any extra player movement intervals
  this.player.stopMovement();
  // If opacity is under 1, bring it back (CURRENTLY OPACITY LOWERING IS NOT IN THE GAME)
  $(".container").css("opacity",1);
  // Clear any intervals from previous incarnations
  this.tileManager.slider.removeSelf();
  // If death sound was being played, pause it and reset it
  this.audioManager.dead.pause();
  this.audioManager.dead.currentTime = 0;
  // If gameover theme is still playing, pause and reset it
  this.audioManager.gameovertheme.pause();
  this.audioManager.gameovertheme.currentTime = 0;
  // Play button sound
  this.audioManager.button.play();
  // Reset data and start game
  $(".container").html("");
  this.score = 0;
  this.achievementManager.achievements = [];
  // Display the score
  this.displayScore();
  // Create the grid, background tiles, and centerpiece
  this.tileManager.createGrid();
  this.tileManager.makeBackground();
  this.tileManager.makeCenterPiece();
  // Remake the player
  this.player.initialize(this);
  this.player.startMovement();
  this.spawnFood();
  /*
  function restart() {
    if(!newGame) {
      clearInterval(sliderInterval);
      $(".list").off().remove();
      removeAchievements();
      clearInterval(interval);
      $(".square").remove();
      $(".container").css("opacity",1)
    }
  }
  */
}

// Displays current score
Game.prototype.displayScore = function() {
  $("#score").html(this.score);
}

// Check if given coordinates are a collision
Game.prototype.collisionCheck = function(a,b) {
  // If out of bound, return true
  if(a < 1 || a > 21 || b < 1 || b > 21) {
    this.causeOfDeath = "Out of bounds"
    return true;
  }
  // If tail, return true
  if($("."+a+"-"+b).has(".tail").length > 0) {
    this.causeOfDeath = "Eat tail";
    return true;
  }
  // If tree, return true
  if($("."+a+"-"+b).has(".tree").length > 0) {
    this.causeOfDeath = "Hit a tree";
    return true;
  }
  // If slider, return true
  if($("."+a+"-"+b).has(".slider").length > 0) { // Does not work
    this.causeOfDeath = "Hit a slider";
    return true;
  }
  return false;
}

Game.prototype.spawnFood = function() {
  //console.log("Spawn Food");
  var food;
  var type = Math.random();
  if(type < 0.25) {
    food = "orangebird";
  } else if(type < 0.50) {
    food = "bluebird";
  } else if(type < 0.75) {
    food = "greenbird";
  } else if(type < 1) {
    food = "redbird";
  }
  //console.log(food);
  this.spriteManager.spawnSprite(food);
}

// Game over function
Game.prototype.gameOver = function() {
  // Clear movement interval
  clearInterval(this.player.interval);
  // Death animation
  this.player.deathAnimation();
  // Give death achievement
  if(this.causeOfDeath == "Out of bounds") {
    this.achievementManager.giveAchievement("Snake? Snake?! SNAAAAAKE!!!!");
  }
  if(this.causeOfDeath == "Hit a tree") {
    this.achievementManager.giveAchievement("Treehugger");
  }
  if(this.causeOfDeath == "Eat tail") {
    this.achievementManager.giveAchievement("Chasing Tail");
  }
  if(this.causeOfDeath == "Hit a slider") {
    this.achievementManager.giveAchievement("Slice and dice");
  }

  this.showAchievementButton();
}

Game.prototype.showAchievementButton = function() {
  var self = this;
  this.achievmentButtonTimeout = setTimeout(function() {
    $("#title").html("");
    $(".list").show();

    if($(".list").length > 1) { // Firefox occassionally appends 2 buttons
        $(".list").last().remove();
    }
    
  },2000);
}

















function gameOver() {
  if(!over) {
    
    clearInterval(interval);
    $(".tail").remove();
    deathAnimation();
    $(".container").css("opacity",.5);
    var button = "<button class='list'>&#9662;Show Achievements&#9662;</button>";
    $("#hud").append(button);
    
    dead.play();
    over = true;
  }
}






function setData() {
    speed = 300;
    direction = 39;
    score = 0;
    tail = [];
    Achievement.achievements = [];
    slideronmap = false;
    over = false;
  }
  













