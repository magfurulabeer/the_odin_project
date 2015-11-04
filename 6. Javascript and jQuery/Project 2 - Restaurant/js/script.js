
function setNav() {
	$("#home").on("click",home);
	$("#about").on("click",about);
	$("#menu").on("click",menu);
	$("#reviews").on("click",reviews);
	$("#contact").on("click",contact);
}

function home() {
	$("#content").children().remove();
	var homeContent = "<h1 class='hero'>Welcome to La Ratatouille</h1><h2 class='hero'> - The Finest Cuisine in France - </h2>";
	$(document.body).css("background-image","url(images/home-art.png)");
	$(document.body).css("background-size","auto");
	$("#content").html(homeContent);
}

function about() {
	$("#content").children().remove();
	$(document.body).css("background-image","url(images/about-art.png)");
	$(document.body).css("background-size","cover");
}

function menu() {
	$("#content").children().remove();
}

function reviews() {
	$("#content").children().remove();
	$(document.body).css("background-image","url(images/1.jpg)");
}

function contact(){
	//$("#content").children().remove();
	$(document.body).css("background-image","url(images/contact-art.png)");
	$(document.body).css("background-size","cover");
}


function initiate() {
	contact();
	setNav();
}

initiate();


