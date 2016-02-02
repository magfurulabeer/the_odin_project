var slideronmap = false;
var sliderInterval;
var sliderX;
var sliderY;
var sliderDirection = "right";


function setTile(name, newClass) {
  var tiles = ["grass", "green", "yellowflower1", "yellowflower2", "pinkflower1", "pinkflower2", "grassy"];
  for(var i in tiles) {
    $(name).removeClass(tiles[i]);
  }
  $(name).addClass(newClass);
}

function makeBackground() {
  var square = $(".square").first();
  square.addClass(giveBackground);
  for(var i = 0; i < $(".square").length; i++) {
    square = square.next();   
    var newClass = giveBackground();
    square.addClass(newClass);
  }
  slider();
  addTrees();
}

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
}

function randomBackground() {
  return Math.random() * (57 - 0) + 0;
}

function randomCoordinate() {
  return Math.floor(Math.random() * (21 - 1 + 1)) + 1;
}

function addTree() {
  var valid = false;
  while(!valid) {
    var treeX = Math.floor(Math.random() * (21 - 1)) + 1;
    var treeY = Math.floor(Math.random() * (21 - 1)) + 1;
    var tl = "." + treeX + "-" + treeY;
    var bl = "." + (treeX+1) + "-" + treeY;
    var tr = "." + treeX + "-" + (treeY+1);
    var br = "." + (treeX+1) + "-" + (treeY+1);
    if((treeX < 8 || treeX > 14) && (treeY < 8 || treeY > 14)) {
      if(isEmpty(tl) && isEmpty(tr) && isEmpty(bl) && isEmpty(br)) {
        var type = Math.random();
        if(type < 0.35) {
          treeSprite(tl,"treetl");
          treeSprite(tr,"treetr");
          treeSprite(bl,"treebl");
          treeSprite(br,"treebr");
        } else if (type < 0.70) {
          treeSprite(tl,"embertl");
          treeSprite(tr,"embertr");
          treeSprite(bl,"emberbl");
          treeSprite(br,"emberbr");
        } else if (type < 0.85) {
          treeSprite(tl,"deadtl");
          treeSprite(tr,"deadtr");
          treeSprite(bl,"deadbl");
          treeSprite(br,"deadbr");
        } else if (type < 0.95) {
          treeSprite(tl,"eviltl");
          treeSprite(tr,"eviltr");
          treeSprite(bl,"evilbl");
          treeSprite(br,"evilbr");
        } else if (type < 1) {
          treeSprite(tl,"mushtl");
          treeSprite(tr,"mushtr");
          treeSprite(bl,"mushbl");
          treeSprite(br,"mushbr");
        } 
        valid = true;
      }   
    }
  }
}

function slider() {
  sliderX = 1;
  sliderY = 1;
  var tl = "." + sliderX + "-" + sliderY;
  var bl = "." + (sliderX+1) + "-" + sliderY;
  var tr = "." + sliderX + "-" + (sliderY+1);
  var br = "." + (sliderX+1) + "-" + (sliderY+1);
  var chance = Math.random();
  if(chance < 0.5) {
    addSprite(tl,"<img id='rslidertl' class='slider top' src='images/rslidertl.png'>");
    addSprite(tr,"<img id='rslidertr' class='slider top right' src='images/rslidertr.png'>");
    addSprite(bl,"<img id='rsliderbl' class='slider bottom' src='images/rsliderbl.png'>");
    addSprite(br,"<img id='rsliderbr' class='slider bottom right' src='images/rsliderbr.png'>");
    slideronmap = true;
    if(slideronmap) { // In if statement for possible future changes
      sliderInterval = setInterval(sliderMovement,100);
      sliderDirection = "right";
    }
  } else {
    slideronmap = false;
  }
}


function sliderMovement() {
    var tl = "." + sliderX + "-" + sliderY;
    var bl = "." + (sliderX+1) + "-" + sliderY;
    var tr = "." + sliderX + "-" + (sliderY+1);
    var br = "." + (sliderX+1) + "-" + (sliderY+1);
    
    switch(sliderDirection) {
      case "right":
        moveRight();
        break;
      case "left":
        moveLeft();
        break;
      case "down":
        moveDown();
        break;
      case "up":
        moveUp();
        break;
    }

    function moveRight() {
      destroyOnImpact();
      $(tr).find(".slider").prependTo($("." + sliderX + "-" + (sliderY+2)));
      $(br).find(".slider").prependTo($("." + (sliderX+1) + "-" + (sliderY+2)));
      $(tl).find(".slider").prependTo($("." + sliderX + "-" + (sliderY+1)));
      $(bl).find(".slider").prependTo($("." + (sliderX+1) + "-" + (sliderY+1)));
      sliderY++;
      newDirection();
    }

    function moveLeft() {
      destroyOnImpact();
      $(tl).find(".slider").prependTo($("." + sliderX + "-" + (sliderY-1)));
      $(bl).find(".slider").prependTo($("." + (sliderX+1) + "-" + (sliderY-1)));
      $(tr).find(".slider").prependTo($("." + sliderX + "-" + (sliderY)));
      $(br).find(".slider").prependTo($("." + (sliderX+1) + "-" + (sliderY)));
      sliderY--;
      newDirection();
    }

    function moveDown() {
      destroyOnImpact();
      $(bl).find(".slider").prependTo($("." + (sliderX+2) + "-" + (sliderY)));
      $(tl).find(".slider").prependTo($("." + (sliderX+1) + "-" + (sliderY)));
      $(br).find(".slider").prependTo($("." + (sliderX+2) + "-" + (sliderY+1)));
      $(tr).find(".slider").prependTo($("." + (sliderX+1) + "-" + (sliderY+1)));  
      sliderX++;
      newDirection();
    }

    function moveUp() {
      destroyOnImpact();
      $(tl).find(".slider").prependTo($("." + (sliderX-1) + "-" + (sliderY)));
      $(bl).find(".slider").prependTo($("." + (sliderX) + "-" + (sliderY)));
      $(tr).find(".slider").prependTo($("." + (sliderX-1) + "-" + (sliderY+1)));  
      $(br).find(".slider").prependTo($("." + (sliderX) + "-" + (sliderY+1)));
      sliderX--;
      newDirection();
    }

    function newDirection() {
      if(sliderX === 1 && sliderY === 20) {
        sliderDirection = "down";
      }
      if(sliderX === 1 && sliderY === 1 ) {
        sliderDirection = "right";
      }
      if(sliderX === 20 && sliderY === 20) {
        sliderDirection = "left";
      }
      if(sliderX === 20 && sliderY === 1 ) {
        sliderDirection = "up";
      }
    }

    function destroyOnImpact() {
      if($(tl).children(".tree").length > 0) {
        razeTree.play();
        removeTree($(tl));
      }
      if($(tr).children(".tree").length > 0) {
        razeTree.play();
        removeTree($(tr));
      }
      if($(bl).children(".tree").length > 0) {
        razeTree.play();
        removeTree($("." + (sliderX+1) + "-" + sliderY)); // Keeps throwing a Reference error saying bl isn't defined
      }
      if($(br).children(".tree").length > 0) {
        razeTree.play();
        removeTree($(br));
      }
      if($(tl).children(".head").length > 0) {
        if(!over) {
          cause = "Hit a slider";
          gameOver();
        }
      }
      if($(tr).children(".head").length > 0) {
        if(!over) {
          cause = "Hit a slider";
          gameOver();
        }
      }
      if($(bl).children(".head").length > 0) {
        if(!over) {
          cause = "Hit a slider";
          gameOver();
        }
      }
      if($(br).children(".head").length > 0) {
        if(!over) {
          cause = "Hit a slider";
          gameOver();
        }
      }
      if($(tl).children(".bird").length > 0) {
        chirp.play();
      }
      if($(tr).children(".bird").length > 0) {
        chirp.play();
      }
      if($(bl).children(".bird").length > 0) {
        chirp.play();
      }
      if($(br).children(".bird").length > 0) {
        chirp.play();
      }
    }
}

function removeFood(coord) {
  coord.find(".food").remove();
  var blocked = false;
  while(!blocked) {
    var a = Math.floor(Math.random() * (21 - 1 + 1)) + 1; // randomCoordinate kept giving
    var b = Math.floor(Math.random() * (21 - 1 + 1)) + 1; // the same coordinates
    if(isEmpty("."+a+"-"+b)) {
      var coordinate = "." + a + '-' + b;
      addSprite(coordinate, sprites.redbird);
      blocked = true;
    }  
  }
}

function removeTree(coord) {
  coord.find(".tree").remove();
  coord.removeClass("treetl");
  coord.removeClass("treetr");
  coord.removeClass("treebl");
  coord.removeClass("treebr");

  coord.removeClass("embertl");
  coord.removeClass("embertr");
  coord.removeClass("emberbl");
  coord.removeClass("emberbr");

  coord.removeClass("deadtl");
  coord.removeClass("deadtr");
  coord.removeClass("deadbl");
  coord.removeClass("deadbr");

  coord.removeClass("eviltl");
  coord.removeClass("eviltr");
  coord.removeClass("evilbl");
  coord.removeClass("evilbr");

  coord.removeClass("mushtl");
  coord.removeClass("mushtr");
  coord.removeClass("mushbl");
  coord.removeClass("mushbr");

  coord.addClass("green");
}

function isEmpty(coord) {
  if($(coord).children().length > 0) {
    return false;
  }
  return true;
}

function addTrees() {
  var num = Math.floor(Math.random() * (6 - 1)) + 1;
  for(var i = 0; i < num; i++) {
    addTree();
  }
}

function treeSprite(pos, pic) {
  setTile(pos,pic);
  $(pos).append("<div class='tree'></div>")
}

function makeCenterPiece() {
  setTile(".9-10","dirttop");
  setTile(".9-11","dirttop");
  setTile(".9-12","dirttop");
  setTile(".13-10","dirtbottom");
  setTile(".13-11","dirtbottom");
  setTile(".13-12","dirtbottom");
  setTile(".10-13","dirtright");
  setTile(".11-13","dirtright");
  setTile(".12-13","dirtright");
  setTile(".10-9","dirtleft");
  setTile(".11-9","dirtleft");
  setTile(".12-9","dirtleft");
  setTile(".9-9","leaf");
  setTile(".9-13","leaf");
  setTile(".13-9","leaf");
  setTile(".13-13","leaf");
  setTile(".11-11","center");
  setTile(".10-10","topleft");
  setTile(".10-11","centertop");
  setTile(".10-12","topright");
  setTile(".12-10","bottomleft");
  setTile(".12-11","centerbottom");
  setTile(".12-12","bottomright");
  setTile(".11-10","centerleft");
  setTile(".11-12","centerright");
}

function obstacle() {
  return false;
}