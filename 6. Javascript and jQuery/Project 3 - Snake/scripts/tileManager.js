var TileManager = function() {
  this.game;
  this.slider;
  this.slider2;  
}

// Create grid of divs
TileManager.prototype.createGrid = function() {
  // Create a 21x21 grid, each with a class of "x-y"
  for(var i = 1; i < 22; i++) {
    for(var j = 1; j < 22; j++) {
      $("#screen").find(".container").append("<div class='square " +i+"-"+j+ "'></div>");
    }
  }
}

// Create the background tiles and trees.
// TODO: Possibly make sliders too
TileManager.prototype.makeBackground = function() {
  var square = $(".square").first();
  square.addClass(giveBackground);
  for(var i = 0; i < $(".square").length; i++) {
    square = square.next();   
    var newClass = giveBackground();
    square.addClass(newClass);
  }
  // Create the trees. Pass in the functions for creating tree portions and setting tiles.
  this.addTrees(this.createTreePortion, this.setTile);
  this.slider = new Slider("red", true, true);
  this.slider.game = this.game;
  this.slider.initialize();
  // Helper function that gives a random background class
  function giveBackground() {
    var num = randomBackground();
    if(num < 28) {
      newClass = "grass";
    } else if (num < 48) {
      newClass = "green";
    } else if (num < 50) {
      newClass = "yellowflower1";
    } else if (num < 52) {
      newClass = "yellowflower2";
    } else if (num < 54) {
      newClass = "pinkflower1";
    } else if (num < 56) {
      newClass = "pinkflower2";
    } else if (num < 57) {
      newClass = "grassy";
    }
    return newClass;

    // Return a random number for the give background class
    function randomBackground() {
      return Math.random() * (57 - 0) + 0;
    }
  }
}

// Adds the trees
TileManager.prototype.addTrees = function(creationFunction, tileSetterFunction) {
  // Set random number of trees
  var num = Math.floor(Math.random() * (6 - 1)) + 1;
  // Add a random tree until the random number is reached
  for(var i = 0; i < num; i++) {
    // Pass in the function used to create each tree
    addTree(creationFunction);
  }

  function addTree() {
    // Assume chosen box is invalid
    var valid = false;
    while(!valid) {
      // Get random X and Y coordinates for top left portion
      var treeX = Math.floor(Math.random() * (21 - 1)) + 1;
      var treeY = Math.floor(Math.random() * (21 - 1)) + 1;
      // Calculate all the coordinates
      var tl = "." + treeX + "-" + treeY;
      var bl = "." + (treeX+1) + "-" + treeY;
      var tr = "." + treeX + "-" + (treeY+1);
      var br = "." + (treeX+1) + "-" + (treeY+1);
      // If the coordinates are not out of bounds
      if((treeX < 8 || treeX > 14) && (treeY < 8 || treeY > 14)) {
        // and if the 3 tiles are empty
        if(isEmpty(tl) && isEmpty(tr) && isEmpty(bl) && isEmpty(br)) {
          // Randomly choose while type of tree to place
          var type = Math.random();
          if(type < 0.35) {
            creationFunction(tl,"treetl", tileSetterFunction);
            creationFunction(tr,"treetr", tileSetterFunction);
            creationFunction(bl,"treebl", tileSetterFunction);
            creationFunction(br,"treebr", tileSetterFunction);
          } else if (type < 0.70) {
            creationFunction(tl,"embertl", tileSetterFunction);
            creationFunction(tr,"embertr", tileSetterFunction);
            creationFunction(bl,"emberbl", tileSetterFunction);
            creationFunction(br,"emberbr", tileSetterFunction);
          } else if (type < 0.85) {
            creationFunction(tl,"deadtl", tileSetterFunction);
            creationFunction(tr,"deadtr", tileSetterFunction);
            creationFunction(bl,"deadbl", tileSetterFunction);
            creationFunction(br,"deadbr", tileSetterFunction);
          } else if (type < 0.95) {
            creationFunction(tl,"eviltl", tileSetterFunction);
            creationFunction(tr,"eviltr", tileSetterFunction);
            creationFunction(bl,"evilbl", tileSetterFunction);
            creationFunction(br,"evilbr", tileSetterFunction);
          } else if (type < 1) {
            creationFunction(tl,"mushtl", tileSetterFunction);
            creationFunction(tr,"mushtr", tileSetterFunction);
            creationFunction(bl,"mushbl", tileSetterFunction);
            creationFunction(br,"mushbr", tileSetterFunction);
          } 
          // Set valid to true
          valid = true;
        }   
      }
    }
  }

  function isEmpty(coord) {
    if($(coord).children().length > 0) {
      return false;
    }
    return true;
  }
}

// Creates a tree portion at a given position by changing the tile and adding a tree div
TileManager.prototype.createTreePortion = function(position, picture, tileSetterFunction) {
  tileSetterFunction(position, picture);
  $(position).append("<div class='tree'></div>")
}

TileManager.prototype.setTile = function(name, newClass) {
  // Iterate through all tile possibilities and remove all possible tile classes
  var tiles = ["grass", "green", "yellowflower1", "yellowflower2", "pinkflower1", "pinkflower2", "grassy"];
  for(var i in tiles) {
    $(name).removeClass(tiles[i]);
  }
  // Then add new tile class to blank tile
  $(name).addClass(newClass);
}

TileManager.prototype.makeCenterPiece = function() {
  this.setTile(".9-10","dirttop");
  this.setTile(".9-11","dirttop");
  this.setTile(".9-12","dirttop");
  this.setTile(".13-10","dirtbottom");
  this.setTile(".13-11","dirtbottom");
  this.setTile(".13-12","dirtbottom");
  this.setTile(".10-13","dirtright");
  this.setTile(".11-13","dirtright");
  this.setTile(".12-13","dirtright");
  this.setTile(".10-9","dirtleft");
  this.setTile(".11-9","dirtleft");
  this.setTile(".12-9","dirtleft");
  this.setTile(".9-9","leaf");
  this.setTile(".9-13","leaf");
  this.setTile(".13-9","leaf");
  this.setTile(".13-13","leaf");
  this.setTile(".11-11","center");
  this.setTile(".10-10","topleft");
  this.setTile(".10-11","centertop");
  this.setTile(".10-12","topright");
  this.setTile(".12-10","bottomleft");
  this.setTile(".12-11","centerbottom");
  this.setTile(".12-12","bottomright");
  this.setTile(".11-10","centerleft");
  this.setTile(".11-12","centerright");
}  


TileManager.prototype.removeTree = function(coord) {
  // Array of all possible tile classes that are trees
  var possibleClasses = [ "treetl", "treetr", "treebl", "treebr", 
                          "embertl", "embertr", "emberbl", "emberbr",
                          "deadtl", "deadtr", "deadbl", "deadbr",
                          "eviltl", "eviltr", "evilbl", "evilbr",
                          "mushtl", "mushtr", "mushbl", "mushbr" ];
  // First remove the tree div so it's considered gone
  coord.find(".tree").remove();
  // Iterate through each possible class and remove it
  for(var i in possibleClasses) {
    coord.removeClass(possibleClasses[i]);
  }

  // Add the green tile class
  coord.addClass("green");
};

