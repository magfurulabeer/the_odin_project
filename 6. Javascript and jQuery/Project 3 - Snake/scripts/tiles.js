var slideronmap = false;
var sliderInterval;
var sliderX;
var sliderY;
var sliderDirection = "right";










function randomCoordinate() {
  return Math.floor(Math.random() * (21 - 1 + 1)) + 1;
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
    addSprite(tl, "rslidertl");
    addSprite(tr, "rslidertr");
    addSprite(bl, "rsliderbl");
    addSprite(br, "rsliderbr");
    //addSprite(tl,"<img id='rslidertl' class='slider top' src='images/rslidertl.png'>");
    //addSprite(tr,"<img id='rslidertr' class='slider top right' src='images/rslidertr.png'>");
    //addSprite(bl,"<img id='rsliderbl' class='slider bottom' src='images/rsliderbl.png'>");
    //addSprite(br,"<img id='rsliderbr' class='slider bottom right' src='images/rsliderbr.png'>");
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


// WTF is this for
function obstacle() {
  return false;
}

*/
