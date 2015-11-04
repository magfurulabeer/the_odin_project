var menuItem = {
	item: [],
	create: function(name, eng, price) {
	    var obj = {
	    	"name": name,
	    	"eng": eng,
	    	"price": price
	    }
		menuItem.item.push(obj);
		console.log(name + eng + price);
	}
}

function createMenu() {
	menuItem.create("Le Potage Saint Germain", "\"Saint Germain\" Split Pea Soup","16.00");
	menuItem.create("Oeuf Pistou aux Asperges et Fenoiul Croquant", "Pesto Egg with asparagus, Fennel and Baby Greens","17.00");
	menuItem.create("Carpaccio d' Artichauts, Roquette, Paresan et Huile de Truffles", "Artichoke Heart Carpaccio with Arugula, Parmesan, Truffle Oil","17.00");
	menuItem.create("Ravioles de Petits Pois au Basilic", "Sweet Pea Raviolinis, Candied Tomatoes<br>White Bean Emulsion Sauce","17.00");
	menuItem.create("Terrine de Poivrons Tricolore au Fromage de Ch&egrave;vre Balsamique R&eacute; a la Figue", "Chilled Layered Terrine of Goat Cheese and Roasted Peppers<br>Balsamic, Fig Dressing","18.00");
	menuItem.create("Salade Fraicheur aux Crevettes, Pamplemousse Rose et Coriandre", "Shrimp, Cucumber, Pink Grapefruit Salad<br>with Grapeseed Oil, Citrus Juice Dressing","19.00");
	menuItem.create("Galette de Ma&iuml;s, Foies de Volailles D&eacute;glac&eacute;s au X&eacute;r&egrave;s","Corn Pancake with Saut&eacute;ed Chicken Livers and X&eacute;r&egrave;s Vinegar Saurce","20.00");
	menuItem.create("Salade de Homard Ti&egrave;de, Vermicelle de L&eacute;gumes Croquants","Warm Lobster Salad with Candied Lemon Dressin, Vegetable Vermicelli","21.00");
	menuItem.create("Le Choix des Hors d'Oeuvre","Assortment of House Salads","21.00");
	menuItem.create("Little Necks Corsini","Baked Little Necks Claims \"Corsini\" with White Wine, Garlic and Butter", "21.00");
	menuItem.create("La Salade \"Remy\"","Seasonal Greens with Avocado, Green Beans, Smoked Salmon and Shrimp", "22.00");
	menuItem.create("Souffl&eacute; aux &Eacute;pinards, Fromage ou Tomates","Spinach, Cheese or Tomato Souffle","19.00");
	menuItem.create("Club Sandwhich \"Linguini\"","Club Sandwhich with Grilled Chicken Breast and Celery Remoulade","21.00");
	menuItem.create("Brochette de Gambas, Saint Jacques au Romarin Sauce Aioli et Haricots Blanc","Grilled Rosemary Kebab of Jumbo Shrimps and Scallops<br>Aioli Sauce, Fricass&eacutee of White Beans","24.00");
	menuItem.create("Tartare de Boeuf aux Pommes Allumettes","Steak Tartare with Matchstick Potatoes","29.00");
	menuItem.create("Fioe de Veau &agrave; l'Anglaise","Pan Seared Calf's Liver with Bacon","32.00");
	menuItem.create("Le Poulet R&ocirc;ti \"Grand-M&egrave;re\"","Roasted Chicken with Baby Artichokes and Pearl Onions","33.00");
	menuItem.create("Les Quenelles de Brochet au Champagne","Pached Pike Dumplings with Champagne Sauce and White Rice","35.00");
	menuItem.create("Filet de Saumon &eacute; la Nage aux deux C&egrave;leris","Salmon Filet with Green Olive, Celery Root Emulsion, Julienne of Celery","35.00");
	menuItem.create("Piccata de Filet de Boeuf, Mille-Feuilles de Pommes de Terre Jus Au Mad&egrave;re","Thinly Sliced Beef with Layered Potato Cake, Madera Wine Sauce","36.00");
	menuItem.create("Les Cuisses de Grenouilles Saut&eacute;es Proven&ccedil;ales","Frogs Legs Saut&eacute;ed in Garlic and Butter","48.00");
	menuItem.create("La Sole Grill&eacute;e, Sauce Moutarde","Grilled Dover Sole, Mustard Hollandaise Sauce","51.00");
}

// forward &eacute;
// back &egrave;
// capfor &Eacute;
// dotdot &iuml;
// &agrave;
// &ocirc;
//&ccedil;