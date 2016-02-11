// player.js
// Magfurul Abeer

var Player = function() {
    // Players X and Y coordinates
    this.x;
    this.y
    // Players tail is currently none
    this.tail;
    // Player by default faces right
    this.direction;
    // The previous direction the player faced
    this.lastDirection;
    // Players default speed is 300
    this.speed;
    // Game that player is part of
    this.game;
    // Interval for movement
    this.interval;
    // Interval for spinning
    this.rotation;
    // For slider purposes
    this.death;
}

// Start player at center tile
Player.prototype.initialize = function(gameObject) {
  // Set properties
  this.stopDeathAnimation();
  this.death = false;
  this.x = 11;
  this.y = 11;
  this.tail = [];
  this.direction = 39;
  this.speed = 300;
  this.game = gameObject;  
  this.game.spriteManager.addSprite(".11-11", "head39");

  // My backup plan if this.player.game = this didn't work
  // It would take a function to which I would pass this.spriteManager.addSprite
  /*
  this.initialize = function(spriteAddingFunction) {  
    spriteAddingFunction(".11-11", "head39");
  };
  */    
};

// Add one tail section
Player.prototype.addTail = function(a,b) {
  this.game.spriteManager.addSprite("."+a+"-"+b, "tail");
  this.tail.unshift(a+"-"+b);
  if(this.tail.length === 10) {
    this.game.achievementManager.giveAchievement("Got the munchies");
  }
  if(this.tail.length === 20) {
    this.game.achievementManager.giveAchievement("My anaconda don't");
  }
}

Player.prototype.removeTail = function(num) {
    for(var i = 0; i < num; i++) {
        if(this.tail.length > 0) {
          var coord = this.tail.pop();
          $("." + coord).find(".tail").remove();
        }
    }
}

Player.prototype.startMovement = function() {
  // Self variable to overcome "this" interval issues
  var self = this;

  this.interval = setInterval(function() {
    self.move();
  } ,this.speed);

}

Player.prototype.stopMovement = function() {
  console.log(this.interval);
  clearInterval(this.interval);
}

// function
Player.prototype.changeSpeed = function(num) {
  if(this.speed > 50) {
    this.speed -= num;
    clearInterval(this.interval);
    this.startMovement();
  }
}

// Function decides which way to move the head and then moves it
Player.prototype.move = function() {
  // console.log(this.y);
  switch(this.direction) {
    case 37:
      this.moveSelf(this.x,this.y-1);
      this.y--;
      break;
    case 38:
      this.moveSelf(this.x-1,this.y);
      this.x--;
      break;
    case 39:
      this.moveSelf(this.x,this.y+1);
      this.y++;
      break;
    case 40:
      this.moveSelf(this.x+1,this.y);
      this.x++;
      break;
  }
}

// Function that takes care of the heavy lifting of moving the head and tail
Player.prototype.moveSelf = function(a,b) {
  if (this.game.collisionCheck(a,b)) {
    this.game.gameOver();
    // If eat, do appropriate actions, else do normal movement actions
  } else if (this.eat(a,b)) {
    // Move head from current coordinates to given coordinates
    $("." + this.x + "-" + this.y).find(".head").appendTo($("." + a + "-" + b));
    // Add new tail segment to where head was
    this.addTail(this.x,this.y);
  } else {
    // Move head from current coordinates to given coordinates
    $("." + this.x + "-" + this.y).find(".head").appendTo($("." + a + "-" + b));
    // Play movement sound
    this.game.audioManager.movesound.play();
    // Move end of tail to where the head was
    if(this.tail.length > 0) {
      // Get end tail segment
      var last = this.tail.pop();
      // Move it to where head just was
      $("."+last).find(".tail").appendTo($("." + this.x + "-" + this.y));
      // Rewrite the tail segments coordinates
      last = this.x + "-" + this.y;
      // Put it first in the tail list
      this.tail.unshift(last);
    }
    
    // TODO: Find out why I have this here
    this.lastDirection = this.direction
  }     
}

// Function that turns snake head when direction key is pressed
Player.prototype.turn = function(key) {
  // Image of the correct facing head
  var img = this.game.spriteManager.getSprite("head" + key);

  // If there's a tail, the head cannot move backwards into the tail AKA a difference of 2
  if(this.tail.length > 0) {
    var diff = Math.abs(this.lastDirection - key);
    if(diff !== 2) {
      this.direction = key;
      $("." + this.x + "-" + this.y).find(".head").replaceWith(img);
    }
  } else {
    // If no tail, set the new direction to the key number and then replace the sprite
    this.direction = key;
    $("." + this.x + "-" + this.y).find(".head").replaceWith(img);
  }
}

// Animation of spinning head
Player.prototype.deathAnimation = function() {
  this.death = true;
  var self = this;
  // Remove tail
  this.removeTail(this.tail.length);
  // Play death sound
  self.game.audioManager.dead.play();
  // Set counter to 1
  var i = 1;
  // Have it rotate 7 times before changing into a ! sign
  this.rotation = setInterval(function() {
    if(i == 7) {
      // On 7th interval, clear interval and change head into ! sign
      clearInterval(self.rotation);
      $(".head").replaceWith(self.game.spriteManager.getSprite("dead"));
      /*$(".container").animate({
        opacity: 0.5
      }, 3500 ,function(){});*/
    }
    rotateHead(self);
    i++;
  }, 250);

  function rotateHead(self) {
    var id = $(".head").attr("id");
    if (id === "headup") { $(".head").replaceWith(self.game.spriteManager.getSprite("head39")) }  
    if (id === "headright") { $(".head").replaceWith(self.game.spriteManager.getSprite("head40")) } 
    if (id === "headdown") { $(".head").replaceWith(self.game.spriteManager.getSprite("head37")) }  
    if (id === "headleft") {$(".head").replaceWith(self.game.spriteManager.getSprite("head38")) }
  }
}

// Stop the death animation. Done whenever player is initialized;
Player.prototype.stopDeathAnimation = function() {
  clearInterval(this.rotation);
}

// Function to eat prey at coordinates a,b
// TODO: Refactor code. Heart and Food code can possibly be combined
Player.prototype.eat = function(a,b) {
  // Set up coordinate div of the prey
  var coord = "." + a + "-" + b;
  // If coordinate has food, else if coordinate has heart
  if($(coord).children(".food").length > 0) {
    // If tail doesn't exist and prey is a bird (atm, always is), then award achievement
    if(this.tail.length === 0) {
      firstPrey = $(coord).find(".food").attr("id");
      switch(firstPrey) {
        case "red":
        case "blue":
        case "green":
        case "orange":
          this.game.achievementManager.giveAchievement("Early Bird");
      }
    }
    // Play the eat sound, remove the food at the coordinate, increase speed, increase score, display new score, spawn food again
    $(coord).find(".food").remove();
    this.game.score += 10;
    this.game.displayScore();
    this.game.spawnFood();
    this.changeSpeed(10);
    this.game.audioManager.eatsound.play();
    // Get percentage chance of a heart appearing
    var chance = Math.random();
    // Currently 15% chance of spawning a heart
    if(chance >= .85) {
      // Prepare a self variable for timeout functions
      var self = this;
      // Spawn a heart sprite and save the coordinates returned
      var heartCoordinate = this.game.spriteManager.spawnSprite("heart");
      // Set 5 second timer for heart and make it poof away if not eaten in that time
      setTimeout(function() {
        // If the coordinate still has a heart, replace it with a fading poof and play the poof sound
        if($(heartCoordinate).has(".heart").length > 0) {
          var poof = self.game.spriteManager.getSprite("poof");
          $(heartCoordinate).find(".heart").replaceWith(poof).fadeOut(1000);
          self.game.audioManager.poof.play();
          // Remove the poof in 1 second
          setTimeout(function() {
            $(heartCoordinate).find(".poof").remove();
          },1000)
        } 
      },5000);
    }
    // Return true as in food was eaten
    return true;
    // If the given coordinate has a heart, increase score, display score, remove 5 tail segments, play appropriate sound, and give achievement
  } else if($(coord).children(".heart").length > 0) {
    $(coord).find(".heart").remove();
    this.score += 50;
    this.game.displayScore();
    this.removeTail(5);
    this.game.achievementManager.giveAchievement("Liposuction");
    this.game.audioManager.fanfare.play();
  }
  // No food was eaten
  return false;
}
