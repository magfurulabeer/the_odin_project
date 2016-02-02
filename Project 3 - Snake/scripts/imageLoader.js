// imagePreloader.js
// Magfurul Abeer
// Preloads the images so they don't blink during gameplay

function loadImage(filepath, idName, className, filetype, fileFolder) {
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

// Object/Dictionary of images used in gameplay
var sprites = {
  "head38": loadImage("headup", "headup", "head"),
  "head40": loadImage("headdown", "headdown", "head"),
  "head37": loadImage("headleft", "headleft", "head"),
  "head39": loadImage("headright", "headright", "head"),
  "dead": loadImage("dead", "dead"),
  "redbird": loadImage("redbird", "red", "food bird"),
  "orangebird": loadImage("orangebird", "orange", "food bird"),
  "greenbird": loadImage("greenbird", "green", "food bird"),
  "bluebird": loadImage("bluebird", "blue", "food bird"),
  "bunny": loadImage("bunny", "bunny", "food"),
  // TODO: Check is tail/tail should have id Value as it is used multiple times at once
  "tail": loadImage("tail", "tail", "tail"),
  "heart": loadImage("heart", "heart", "heart"),
  "poof": loadImage("poof", "poof", "poof")
}
