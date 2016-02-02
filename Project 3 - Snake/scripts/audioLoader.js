// audioLoader.js
// Magfurul Abeer
// Loads the audio files and sets them up

var theme = new Audio('sounds/theme.mp3'); 
var gameovertheme = new Audio('sounds/gameover.mp3'); 
var eatsound = new Audio('sounds/eat.wav'); 
var button = new Audio('sounds/button.wav'); 
var dead = new Audio('sounds/dead.wav'); 
var movesound = new Audio('sounds/movesound.wav');
var chirp = new Audio('sounds/bird.wav'); 
var razeTree = new Audio('sounds/shatter.wav'); 
var fanfare = new Audio('sounds/fanfare.wav'); 
var poof = new Audio('sounds/poof.wav'); 

// Turn on looping for menu theme and the game over theme
theme.loop = true;
gameovertheme.loop = true;
