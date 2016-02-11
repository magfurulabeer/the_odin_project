var Slider = function(color, onTopLeft, clockwise) {
  // Game that this slider is part of
  this.game;
  // X and Y coordinates of top left portion of Slider
  this.x = 1;
  this.y = 1;
  // Movement Interval and Direction
  this.interval;
  this.direction;
  // var tl = "." + sliderX + "-" + sliderY;
  // var bl = "." + (sliderX+1) + "-" + sliderY;
  // var tr = "." + sliderX + "-" + (sliderY+1);
  // var br = "." + (sliderX+1) + "-" + (sliderY+1);

  // Prefix for slider
  var prefix = color == "red" ? "r" : "o";
}

Slider.prototype.initialize = function() {
  // Prepare self variable for interval
  var self = this;
  // Get the coordinates of the 4 portions of the slider
  var tl = "." + this.x + "-" + this.y;
  var bl = "." + (this.x+1) + "-" + this.y;
  var tr = "." + this.x + "-" + (this.y+1);
  var br = "." + (this.x+1) + "-" + (this.y+1);
  // Add the 4 portions of the slider
  // TODO: Make it so it can be red or orange
  self.game.spriteManager.addSprite(tl, "rslidertl");
  self.game.spriteManager.addSprite(tr, "rslidertr");
  self.game.spriteManager.addSprite(bl, "rsliderbl");
  self.game.spriteManager.addSprite(br, "rsliderbr");
  // Start the interval and set the direction
  this.direction = this.x === 1 ? "right" : "left";
  
  this.interval = setInterval(function() {
    self.move();
  }, 100);
  
}

Slider.prototype.move = function() {
  var tl = "." + this.x + "-" + this.y;
  var bl = "." + (this.x+1) + "-" + this.y;
  var tr = "." + this.x + "-" + (this.y+1);
  var br = "." + (this.x+1) + "-" + (this.y+1);
  switch(this.direction) {
    case "right":
      this.moveRight(tl, tr, bl, br);
      break;
    case "left":
      this.moveLeft(tl, tr, bl, br);
      break;
    case "down":
      this.moveDown(tl, tr, bl, br);
      break;
    case "up":
      this.moveUp(tl, tr, bl, br);
      break;
  }

}

// TODO: Make directional move functions into one method or at least keep code DRY
Slider.prototype.moveRight = function(tl, tr, bl, br) {
  this.destroyOnImpact([tl, tr, bl, br]);
  $(tr).find(".slider").prependTo($("." + this.x + "-" + (this.y+2)));
  $(br).find(".slider").prependTo($("." + (this.x+1) + "-" + (this.y+2)));
  $(tl).find(".slider").prependTo($("." + this.x + "-" + (this.y+1)));
  $(bl).find(".slider").prependTo($("." + (this.x+1) + "-" + (this.y+1)));
  this.y++;
  this.newDirection();
}

Slider.prototype.moveLeft = function(tl, tr, bl, br) {
  this.destroyOnImpact([tl, tr, bl, br]);
  $(tl).find(".slider").prependTo($("." + this.x + "-" + (this.y-1)));
  $(bl).find(".slider").prependTo($("." + (this.x+1) + "-" + (this.y-1)));
  $(tr).find(".slider").prependTo($("." + this.x + "-" + (this.y)));
  $(br).find(".slider").prependTo($("." + (this.x+1) + "-" + (this.y)));
  this.y--;
  this.newDirection();
}

Slider.prototype.moveDown = function(tl, tr, bl, br) {
  this.destroyOnImpact([tl, tr, bl, br]);
  $(bl).find(".slider").prependTo($("." + (this.x+2) + "-" + (this.y)));
  $(tl).find(".slider").prependTo($("." + (this.x+1) + "-" + (this.y)));
  $(br).find(".slider").prependTo($("." + (this.x+2) + "-" + (this.y+1)));
  $(tr).find(".slider").prependTo($("." + (this.x+1) + "-" + (this.y+1)));  
  this.x++;
  this.newDirection();
}

Slider.prototype.moveUp = function(tl, tr, bl, br) {
  this.destroyOnImpact([tl, tr, bl, br]);
  $(tl).find(".slider").prependTo($("." + (this.x-1) + "-" + (this.y)));
  $(bl).find(".slider").prependTo($("." + (this.x) + "-" + (this.y)));
  $(tr).find(".slider").prependTo($("." + (this.x-1) + "-" + (this.y+1)));  
  $(br).find(".slider").prependTo($("." + (this.x) + "-" + (this.y+1)));
  this.x--;
  this.newDirection();
}
// Complete this
/*
Slider.prototype.directionalMove = function(tl, tr, bl, br) {
  // Destroy anything it hits (except birds)
  this.destroyOnImpact([tl, tr, bl, br]);

  // Move individual pieces

  // Change coordinate
  if (this.direction == "right" || this.direction == "left") {
    this.direction == "right" ? this.y++ : this.y--;
  } else {
    this.direction == "up" ? this.x-- : this.x++;
  }

  // Set possible new direction
  this.newDirection();
}

Slider.prototype.movePiece(coord, x, y) {

  $(coord).find(".slider").prependTo($("." + (x) + "-" + (y)));
}
*/


Slider.prototype.newDirection = function() {
  if(this.x === 1 && this.y === 20) {
    this.direction = "down";
  }
  if(this.x === 1 && this.y === 1 ) {
    this.direction = "right";
  }
  if(this.x === 20 && this.y === 20) {
    this.direction = "left";
  }
  if(this.x === 20 && this.y === 1 ) {
    this.direction = "up";
  }
}

Slider.prototype.destroyOnImpact = function(coordinates) {
  // Raze any trees in the way
  for (box in coordinates) {
    if($( coordinates[box] ).children(".tree").length > 0) {
      this.game.audioManager.razeTree.play();
      this.game.tileManager.removeTree($( coordinates[box] ));
    }
  }

  // Kill player
  for (box in coordinates) {
    if($( coordinates[box] ).children(".head").length > 0) {
      // Make sure it doesn't cause 2 death animations
      // Or else there's a bug where one animation stops and the other keeps going infinitely
      if (this.game.player.death == false) {
        this.game.causeOfDeath = "Hit a slider";
        this.game.gameOver();
      };
    }
  }

  // Make bird squawk
  for (box in coordinates) {
    if($( coordinates[box] ).children(".bird").length > 0) {
      //$(coordinates).css("overflow-y", "visible");
      var bird = $( coordinates[box] ).find(".bird");
      bird.animate({bottom: '+=2px'}, 80, function() {
        bird.animate({bottom: '-=2px'}, 80);
      });
      this.game.audioManager.chirp.play();
    }
  }
}

// Remove self and clear interval
Slider.prototype.removeSelf = function() {
  clearInterval(this.interval);
  var tl = "." + this.x + "-" + this.y;
  var bl = "." + (this.x+1) + "-" + this.y;
  var tr = "." + this.x + "-" + (this.y+1);
  var br = "." + (this.x+1) + "-" + (this.y+1);
  var coordinates = [tl,tr,bl,br];

  for (piece in coordinates) {
    $(piece).html("");
  }

}



/*

function slider() {
  sliderX = 1;
  sliderY = 1;
  var tl = "." + sliderX + "-" + sliderY;
  var bl = "." + (sliderX+1) + "-" + sliderY;
  var tr = "." + sliderX + "-" + (sliderY+1);
  var br = "." + (sliderX+1) + "-" + (sliderY+1);
  var chance = Math.random();
  if(chance < 0.5) {
    
    //addSprite(tl,"<img id='rslidertl' class='slider top' src='images/rslidertl.png'>");
    //addSprite(tr,"<img id='rslidertr' class='slider top right' src='images/rslidertr.png'>");
    //addSprite(bl,"<img id='rsliderbl' class='slider bottom' src='images/rsliderbl.png'>");
    //addSprite(br,"<img id='rsliderbr' class='slider bottom right' src='images/rsliderbr.png'>");
    slideronmap = true;
    if(slideronmap) { // In if statement for possible future changes
      
    }
  } else {
    slideronmap = false;
  }
}

*/