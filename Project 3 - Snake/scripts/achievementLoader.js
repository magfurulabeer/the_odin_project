// achievementLoader.js
// Magfurul Abeer
// Prepares the achievements for the game

var Achievement = {
  "achievements": [],
  "list": {},
  create: function(title, description) {

    Achievement.list[title] = description;
  }
}


// Create each achievement
// TODO: Get achievements from a JSON file
function createAchievements() {
  Achievement.create("Chasing Tail", "Die from eating your own tail.");
  Achievement.create("Treehugger", "Die from crashing into a tree");
  Achievement.create("Snake? Snake?! SNAAAAAKE!!!!", "Die from going out of bounds");
  Achievement.create("Super Sonic", "Max out your speed");
  Achievement.create("Early Bird", "First prey is a bird");
  Achievement.create("My anaconda don't", "Reach length of 20");
  Achievement.create("Got the munchies", "Eat 10 prey");
  Achievement.create("Slice and dice", "Get killed by a Giant Blade Trap");
  Achievement.create("Liposuction", "Cut your tail shorter");
}