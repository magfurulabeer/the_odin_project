var main = $("#sketch");
var square = "<div class='square'></div>";
var boxWidth = 20;
var padding = 4;
var color = "blue";
var numrows = 16;
var numcols = 16;
var colorCode = 0;
var reverse = false;
var setPiece = false;

function makeGrid(rows, colomns) {
	var width = (boxWidth + padding) * colomns;
	main.css("width", width+"px");
	for(var i = 0; i < rows; i++) {
		$("#sketch").append("<div class='row'></div>")
		for(var j = 0; j < colomns; j++) {
			$("#sketch").children().last().append(square);
		}
		
	}
}

function clearGrid() {
	colorCode = 0;
	$("#sketch").html("");
	$(".square").html("");
	$("#notrail").prop("checked",true);
	$(".pushup").removeClass("pushup");
	makeGrid(numrows,numcols);	
	setScreen();
}

function chessSet() {
	var pawn = "<span class='glyphicon glyphicon-pawn'></span>"
	var king = "<span class='glyphicon glyphicon-king'></span>"
	var queen = "<span class='glyphicon glyphicon-queen'></span>"
	var bishop = "<span class='glyphicon glyphicon-bishop'></span>"
	var knight = "<span class='glyphicon glyphicon-knight'></span>"
	var rook = "<span class='glyphicon glyphicon-tower'></span>"
	var first = $(".square").first();
	first.append(rook);
	var toppieces = [knight, bishop, queen, king, bishop, knight, rook]
	var bottompieces = [knight, bishop, king, queen, bishop, knight, rook]
	for(var i = 0; i < 7; i++) {
		first = first.next();
		first.append(toppieces[i]);
	}
	first = first.parent().next().children().first();
	first.append(pawn);
	for(var i = 0; i < 7; i++) {
		first = first.next();
		first.append(pawn);
	}

	first = first.parent().parent().children().last().children().first();
	first.append(rook);
	for(var i = 0; i < 7; i++) {
		first = first.next();
		first.append(bottompieces[i]);
	}
	first = first.parent().prev().children().first();
	first.append(pawn);
	for(var i = 0; i < 7; i++) {
		first = first.next();
		first.append(pawn);
	}
	$(".glyphicon").parent().addClass("pushup");
}

function imFeelingLucky() {
	if(numcols == 8 && numrows == 8) {
		if(!setPiece) {
			chessSet();
			setPiece = true;
		}
	} else {
		var num = Math.random();
		console.log(num);
		if(num < .04) {
			$("#sketch").css("background-color", "black");
		} else if(num < .08) {
			$("#sketch").css("background-color", "white");
		} else if(num < .12) {
			$("#sketch").css("background-color", "white");
		} else if(num < .16) {
			$("#outer").css("background-color", "blue");
		} else if(num < .2) {
			$("#outer").css("background-color", "green");
		} else if(num < .24) {
			$("#outer").css("background-color", "yellow");
		} else if(num < .28) {
			$("#outer").css("background-color", "orange");
		} else if(num < .32) {
			$("#outer").css("background-color", "blue");
		} else if(num < .36) {
			$("#outer").css("background-color", "red");
		} else if(num < .40) {
			$(".circle").css("background-color", "black");
		} else if(num < .44) {
			$(".circle").css("background-color", "white");
		} else if(num < .46) {
			$(".panel").css("background-color", "red");
		} else if(num < .48) {
			$(".panel").css("background-color", "white");
		} else if(num < .52) {
			$(".circle").css("background-color", "white");
		}  else if(num < .56) {
			$(".circle").css("background-color", "red");
		}  else if(num < .62) {
			$(".circle").css("background-color", "blue");
		}  else if(num < .68) {
			$(".circle").css("background-color", "green");
		}  else if(num < .72) {
			$(".circle").css("background-color", "yellow");
		}  else if(num < .76) {
			$(".circle").css("background-color", "orange");
		}  else if(num < .8) {
			$(".circle").css("background-color", "black");
		} else if(num < .84) {
			$("#lucky").css("background-color", "rgba(91,192,222,.7)");
		}  else if(num < .88) {
			$("#lucky").css("background-color", "black");
		}  else if(num < .92) {
			$("#lucky").css("background-color", "red");
		}  else if(num < .94) {
			$("#lucky").css("background-color", "green");
		}  else if(num < .96) {
			$("#lucky").css("background-color", "blue");
		}  else if(num < .98) {
			$("#lucky").css("background-color", "yellow");
		}  else if(num < 1) {
			$("#lucky").css("background-color", "orange");
		}  
	}
}

function displayError(message) {
	removeErrors();
	var error = "<div class='alert alert-danger' role='alert' onclick='errorFade()'>" + message + "</div>"
	$("#toolbar").append(error);
}

function errorFade() {
	$(".alert-danger").fadeOut(1000);
}

function removeErrors() {
	$(".alert-danger").remove();
}




function changeGrid() {
	if($(this).attr("id") === "row-number") {
		if($(this).val() > 7) {
			if($(this).val() < 51) {
				numrows = $(this).val();
			}
		} else {
			displayError("WARNING: There must be 8-50 rows");
		}
	} else {
		if($(this).val() > 7) {
			if($(this).val() < 51) {
				numcols = $(this).val();
						if(numcols < 15) {
							if(numcols < 10) {
								var size = String(numcols/8) + "em"
								$("h1").css("font-size", size);
								$(".circle").css("height","40px")
								$(".circle").css("width","40px")
							} else {
								var size = String(numcols/7.5) + "em"
								$("h1").css("font-size", size);
								$(".circle").css("height","50px")
								$(".circle").css("width","50px")
							}
						} else {
							$("h1").css("font-size", "2.5em");
							$(".circle").css("height","60px")
							$(".circle").css("width","60px")
						}
			}
		} else {
			displayError("WARNING: There must be 8-50 colomns");
		}
		
	}
	clearGrid();
}

function setColor() {
	if(!$(this).hasClass("active")) {
		$("."+color).removeClass("active");
		color = $(this).attr("class");
		$(this).addClass("active");
	}
}

function changeColor() {
	if(!$(this).hasClass("tag")) {
		if(color === "rainbow") {
			$(this).css("background-color", randomColor());
		} else if (color === "gradient") {
			var gradColor = "rgb(" + colorCode + "," + colorCode + "," + colorCode + ")";
			$(this).css("background-color", gradColor);
			if(reverse) {
				if(colorCode === 0) {
					reverse = false;
				}
			}
			if(colorCode === 255) {
				reverse = true;
			}
			reverse ? colorCode -= 1 : colorCode += 1;
		} else {
			$(this).addClass(color);
		}		
	}
	$(this).addClass("tag");	
}



function initialize() {
	makeGrid(numrows, numcols);
	setPanel();
	setScreen();
}

function setPanel() {
	$(".blue").addClass("active");
	$("li").on("click", setColor);
	$("#lucky").on("click",imFeelingLucky);
	$("#trail").parent().css("right","11px");
	$(".radio").on("click",toggleTrail);

}

function toggleTrail() {
	var radio = $(this).find("input");
	$(".square").off();
	if(radio.attr("id") === "trail") {
		$(".square").hover(function() {
					if(color === "rainbow") {
						$(this).css("background-color",randomColor());
					} else if(color === "gradient") {
						$(this).css("background-color","#000");
					} else {
						$(this).css("background-color",color);
					}
				}, function () {
					$(this).animate({backgroundColor: "#d0d6e3"},700);
			});
	} 
	if(radio.attr("id") === "notrail") {
		$(".square").on("mouseover",changeColor);
	}
}

function resetColor() {
	$(this).css("background-color", "#d0d6e3");
}

function setScreen() {
	$(".square").on("mouseover",changeColor);
	$(".circle").on("click",clearGrid);
	$(".form-control").change(changeGrid);
}

function d255() {
  return Math.floor(Math.random() * (255 - 1 + 1)) + 1;
}
function randomColor() {
	return "rgb(" + d255() + "," + d255() + "," + d255() + ")";
}

initialize();

