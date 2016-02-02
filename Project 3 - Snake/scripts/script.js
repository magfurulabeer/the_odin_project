// script.js
// Magfurul Abeer
// Contains the document ready function


$(document).ready(function() {

  // Play the theme music
  theme.play();

  // Add event listeners for on and mute buttons
  $(".start").on("click",start);
  $(".sound").on("click",toggleMute);
})


// ERRORS/TODO:
// 1. Occasionally can go through bird and not eat it
// 2. Add mobs and boss