var grid = new Array;
var sprites = {
	"hello": "world"
}
for(var i = 0; i < 160; i++) {
	grid[i] = "";
}

function render() {
	for(var i = 1; i < 21; i++) {
		for(var j = 1; j < 21; j++) {{
			$("#screen").find(".container").append("<div class='square' id=" + i + "-" + j + "'></div>");
		}}
	}
}

render()