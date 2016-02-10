// spriteManager.js
// Magfurul Abeer
// Contains all sprite handling functions


var SpriteManager = function() {
}

// Returns an image for the appropriate sprite
SpriteManager.prototype.getSprite = function(spriteName) {
  switch(spriteName) {
    case "head38":
      return this.loadImage("headup", "headup", "head");
      break;
    case "head40":
      return this.loadImage("headdown", "headdown", "head");
      break;
    case "head37":
      return this.loadImage("headleft", "headleft", "head");
      break;
    case "head39":
      return this.loadImage("headright", "headright", "head");
      break;
    case "dead":
      return this.loadImage("dead", "dead");
      break;
    case "redbird":
      return this.loadImage("redbird", "red", "food bird");
      break;
    case "orangebird":
      return this.loadImage("orangebird", "orange", "food bird");
      break;  
      case "greenbird":
      return this.loadImage("greenbird", "green", "food bird");
      break;
    case "bluebird":
      return this.loadImage("bluebird", "blue", "food bird");
      break;
    case "bunny":
      return this.loadImage("bunny", "bunny", "food");
      break;
    case "heart":
      return this.loadImage("heart", "heart", "heart");
      break;
    case "poof":
      return this.loadImage("poof", "poof", "poof");
      break;
    case "tail":
      return this.loadImage("tail", "tail", "tail");
      break;
    case "rslidertl":
      return this.loadImage("rslidertl", "rslidertl", "slider top")
      break;
    case "rslidertr":
      return this.loadImage("rslidertr", "rslidertr", "slider top right")
      break;
    case "rsliderbl":
      return this.loadImage("rsliderbl", "rsliderbl", "slider bottom")
      break;
    case "rsliderbr":
      return this.loadImage("rsliderbr", "rsliderbr", "slider bottom right")
      break;
  }
} 

// Add sprite to specific tile
SpriteManager.prototype.addSprite = function(tile, str) {
  //console.log(tile);
  var img = this.getSprite(str);
  $(tile).append(img);
}

// Spawn sprite in random tile. Returns coordinate of where sprite was spawned.
SpriteManager.prototype.spawnSprite = function(sprite) {
  // Assume tile is blocked
  var notBlocked = false;

  while(!notBlocked) {
    // Get random coordinates for a and b
    var a = randomCoordinate();
    var b = randomCoordinate();

    
    if(isEmpty("."+a+"-"+b)) {
      var coordinate = "." + a + '-' + b;
      this.addSprite(coordinate, sprite);
      notBlocked = true;
    }  
  }
  return coordinate;  


  // TODO: Make DRY. Same function in tileManager
  function isEmpty(coord) {
    if($(coord).children().length > 0) {
      return false;
    }
    return true;
  }
}

// Moves Snake head?
// TODO: Remove. Player class has this
SpriteManager.prototype.moveSprite = function(a,b) {
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

SpriteManager.prototype.loadImage = function(filepath, idName, className, filetype, fileFolder) {
    // If filetype is not specified, default to png
    filetype = filetype ? filetype : "png";

    // If fileFolder is not specified, default to images/
    fileFolder = fileFolder ? fileFolder : "images";

    // Load image based on parameters
    var loadedImage = $("<img />").attr("src", "images/" + filepath + "." + filetype);

    // Set ID of image element 
    loadedImage.attr("id", idName);

    // If a class name is specified, set it
    if (className) {  
      loadedImage.attr("class", className) 
    }

    // Return loaded image
    return loadedImage;
  }