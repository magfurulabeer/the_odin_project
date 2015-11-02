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
				treeSprite(tl,"treetl");
				treeSprite(tr,"treetr");
				treeSprite(bl,"treebl");
				treeSprite(br,"treebr");
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