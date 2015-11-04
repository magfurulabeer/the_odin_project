var fromPage;
function setNav() {
	$("#home").on("click",home);
	$("#about").on("click",about);
	$("#menu").on("click",menu);
	$("#reviews").on("click",reviews);
	$("#contact").on("click",contact);
}

function home() {
	var homeContent = "<h1 class='hero'>Welcome to La Ratatouille</h1><h2 class='hero'> - The Finest Cuisine in France - </h2>";
	$("#content").children().remove();
	$(document.body).css("background-image","url(images/home-art.png)");
	$(document.body).css("background-size","auto");
	$("#content").html(homeContent);
	$("h1.hero").hide().fadeIn(2000);//.animate({left:0},1000);
	$("h2.hero").hide().delay(2000).fadeIn(1500);

	fromPage = "home";
}

function about() {
	var page = "<div class='page'><h1 class='title'>Who We Are</h1>"
	var pageContent = "</div>";
	$("#content").children().remove();
	$(document.body).css("background-image","url(images/about-art.png)");
	$(document.body).css("background-size","cover");

	$("#content").append(page).hide().fadeIn(1000);

	fromPage = "about";
}

function menu() {
	var menuBeginning = "<div class='menu'><h2 class='title'>Menu</h2><h3 class='center'>D&eacute;jeuner</h3><ul>"			
	var menuEnding = "</ul></div>"
	$("#content").children().remove();
	
	$("#content").html(menuBeginning);
	for(var i = 0 ; i < menuItem.item.length; i++) {
		$(".menu").find("ul").append("<li><h4>" + menuItem.item[i].name + "</h4>");
		$(".menu").find("ul").children("li").last().append("<h4><small><i>" + menuItem.item[i].eng + "</i></small></h4>");
		$(".menu").find("ul").children("li").last().append("<h5 class='price'>" + menuItem.item[i].price + "</h5></li>");
	}
	$("#content").append(menuEnding);
	if(fromPage !== "home") {
		$(document.body).css("background-image","url(images/home-art.png)");
		$(document.body).css("background-size","cover");
	} 
	$("#content").hide().fadeIn(1000);
	

	fromPage = "menu";
}

function reviews() {
	$("#content").children().remove();
	$(document.body).css("background-image","url(images/1.jpg)");

	fromPage = "reviews";
}

function contact(){
	$("#content").children().remove();
	$(document.body).css("background-image","url(images/contact-art.png)");
	$(document.body).css("background-size","cover");

	fromPage = "contact";
}


function initiate() {
	setNav();
	createMenu();
	home();
}

initiate();





