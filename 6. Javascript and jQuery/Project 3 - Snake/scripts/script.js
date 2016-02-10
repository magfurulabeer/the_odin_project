 // script.js
// Magfurul Abeer
// Contains the document ready function


$(document).ready(function() {

  
  var game = new Game();
  game.initialize();
  // Add event listeners for on and mute buttons
  $(".start").on("click",startGame);
  $(".sound").on("click",toggleMute);

  function startGame() {
    game.startGame();
  }

  function toggleMute() {
    game.audioManager.toggleMute();
  }

})


// ERRORS/TODO:
// 1. Occasionally can go through bird and not eat it
// 2. Add mobs and boss