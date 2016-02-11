// achievementManager.js
// Magfurul Abeer
// Contains all achievement related functions 
// Prepares the achievements for the game and also includes achievement related functions

var AchievementManager = function(gameObject) {
  // List of achievements the player has achieved
  this.achievements = [];
  // List of achievements and 
  this.list = {};
  this.game = gameObject;
}

// Create all the achievements
// TODO: Get achievements from a JSON file
AchievementManager.prototype.initialize = function() {
  this.create("Chasing Tail", "Die from eating your own tail.");
  this.create("Treehugger", "Die from crashing into a tree");
  this.create("Snake? Snake?! SNAAAAAKE!!!!", "Die from going out of bounds");
  this.create("Super Sonic", "Max out your speed");
  this.create("Early Bird", "First prey is a bird");
  this.create("My anaconda don't", "Reach length of 20");
  this.create("Got the munchies", "Eat 10 prey");
  this.create("Slice and dice", "Get killed by a Giant Blade Trap");
  this.create("Liposuction", "Cut your tail shorter");
}

// Create achievement by adding title & descriptions to list dictionary
AchievementManager.prototype.create = function(title, description) {
    this.list[title] = description;
}

// Give achievement to player
AchievementManager.prototype.giveAchievement = function(name) {
  // Start given at false
  var alreadyGiven = false;

  // If achievement is in achievements list, set alreadyGiven to true
  for(var i in this.achievements) {
    if(this.achievements[i] === name) {
      alreadyGiven = true
    }
  }

  // If achievement was not already given, give it and display it
  if(!alreadyGiven) {
    this.achievements.push(name);
    this.displayAchievement(name);
  }
}

// Display achievement for about 5 seconds
AchievementManager.prototype.displayAchievement = function(name) {
  // Set any current achievement to an empty string
  $("#title").html("");
  // Change it to block
  $("#title").css("display","block")
  // Display the achievement with a delayed fade
  $("#title").html(name).delay(3000).fadeOut(2000);
}

AchievementManager.prototype.showAchievements = function() {
  // If tile board is stilll being shown
  if($(".square").length > 0) {
    // Play the game over theme and remove the tile board
    this.game.audioManager.gameovertheme.play()
    $(".square").remove();
    // Set opacity back to 1, background color to white, and add a pattern background image
    $(".container").css("opacity","1");
    $(".container").css("background-color","#fff");
    // Pattern from SubtlePatterns
    $(".container").css("background-image","url(images/old_map.png)");
    // Set overflow for vertical scroll
    $(".container").css("overflow-y","scroll");
    $(".container").css("overflow-x","hidden");
    // Add title
    $(".container").append("<h1 class='achievement'>Achievements</h1>");

    // For every achievement, append the formatted title/description
    for(var i = 0; i < this.achievements.length; i++) {
      var name = this.achievements[i];
      var desc = this.list[name];
      $(".container").append(formatAchievement(name, desc));
    }
  }  

  // Helper function to format achievement title and description
  function formatAchievement(k,v) {
    return "<h3 class='achievement'>" + k + "</h3><p class='achievement'>&bull; " + v + "</p>";
  }
}

AchievementManager.prototype.removeAchievements = function() {
  $(".container").css("opacity","1");
  $(".container").css("overflow-y","hidden");
  $(".container").children().remove();
}





