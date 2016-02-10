// audioManager.js
// Magfurul Abeer
// Loads and sets up the audio files.

var AudioManager = function() {
  this.theme;
  this.gameovertheme;
  this.eatsound;
  this.button;
  this.dead;
  this.movesound;
  this.chirp;
  this.razeTree; 
  this.fanfare;
  this.poof;
  this.sounds;
}

AudioManager.prototype.initialize = function() {
  this.theme = new Audio('sounds/theme.mp3'); 
  this.gameovertheme = new Audio('sounds/gameover.mp3'); 
  this.eatsound = new Audio('sounds/eat.wav'); 
  this.button = new Audio('sounds/button.wav'); 
  this.dead = new Audio('sounds/dead.wav'); 
  this.movesound = new Audio('sounds/movesound.wav');
  this.chirp = new Audio('sounds/bird.wav'); 
  this.razeTree = new Audio('sounds/shatter.wav'); 
  this.fanfare = new Audio('sounds/fanfare.wav'); 
  this.poof = new Audio('sounds/poof.wav'); 

  this.sounds = [this.theme, this.gameovertheme, this.eatsound,
                 this.button, this.dead, this.movesound, this.chirp,
                 this.razeTree, this.fanfare, this.poof];

  // Turn on looping for menu theme and the game over theme
  this.theme.loop = true;
  this.gameovertheme.loop = true;
}

// Toggle whether or not the audio is muted
AudioManager.prototype.toggleMute = function() {
  // For every sound, if audio is unmuted, mute it and set opacity to 50% and vice versa
  for(var i in this.sounds) {
    if(this.sounds[i].muted === true) {
      $(".sound").css("opacity",1);
      this.sounds[i].muted = false;
    } else {
      $(".sound").css("opacity",.5);
      this.sounds[i].muted = true;
    }
  }
}