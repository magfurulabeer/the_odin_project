var value = null;
var input = [0];
var operator = null;
var size = 2.5;
var counter = 0;
var newOperation = true;
var prevNum = null;
var buttons = document.getElementsByTagName("button");
var ee = false; // ee = Easter Egg
var fontSize = 40;
var padding = 0;

Array.prototype.includes = function(item) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] === item) {
			return true;
		}
	}
	return false;
};

function numClick() {
	if(!ee) {
		if(newOperation) {
			input = [];	
		}
		input.push(this.innerHTML);
		display();	
		newOperation = false;
	}
};

function clear() {
	value = null;
	input = [0];
	operator = null;
	decimal = false;
	ee = false;
	counter = 0;
	newOperation = true;
	removeActive();
	reset();
	display();

}

function decimalClick() {
	if(!ee) {
		if(!input.includes(".")) {
			input.push(".");
			newOperation = false;
		}
		display();
	}
}

function percentage() {
	if(!ee) {
		var num = Number(input.join(''));
		num = num * .01;
		input = String(num).split('');
		display();
	}
}

function toggleNegative() {
	if(!newOperation) {
		if(input[0] === "-") {
			input.shift()
		} else if (input[0][0] === "-") {
			//TODO: if input[0] is value, do not add new - sign
		} else {
			input.unshift("-")
		}
	}
	display();
}

function setOperation() {
	// If an operator button is active, remove the active class
	if(operator !== null) {
		removeActive();
	} else {
		// Change operator to this if there is no operator
		operator = this.id;
	}

	

	// Add the active class to the operator button clicked
	this.classList.add("active");

	//alert(input);
	//console.log("input = " + input);
	//console.log("newOperation: " + newOperation);

	// If internal value is null, give it the value of the input so far
	if(value === null) { 
		value = Number(input.join(''));
	} else {
		if(!newOperation && input !== []) {
			operate();
			display();
		} 
	}
	
	newOperation = true;
	// Set operator to this after the previous operation has been done
	operator = this.id;
}

function operate() {
	var num = Number(input.join(''));
	switch(operator) {
		case "multiply":
			value = multiply(value,num);
			break;
		case "divide":
			value = divide(value,num);			
			break;
		case "subtract":
			value = subtract(value,num);
			break;
		case "add":
			value = add(value,num);
			break;	
	}
	input = String(value).split('');
	return num;
}


function equals() {
	if(value !== null && !ee) {
		removeActive();
		if(newOperation) {
			input = [prevNum];
		}
		prevNum = operate();
		display();
		newOperation = true;
	}
}

function removeActive() {
	var activeElements = document.getElementsByClassName("active");
	if(activeElements.length > 0) {
		activeElements[0].classList.remove("active");
	}	
}

function multiply(a,b) {
	return a * b;
}

function divide(a,b) {
	return a / b;
}

function subtract(a,b) {
	return a - b;
}

function add(a,b) {
	return a + b;
}

function display() {
	if(fontSize!==40 || padding !== 0) { reset(); }
	var output = input.join('');
	var text = "<p>TEXT</p>";
	if(output.length > 12 && !ee) {
		output = Number(output).toExponential();
	} 	
	document.getElementById("screen").innerHTML = text.replace("TEXT",output)
	autoSmall();
}

function autoSmall() {
	while(isOverflowed(document.getElementById("screen"))) {
		fontSize--;
		setSize(fontSize);
		padding++;
		setPadding(padding);
	}
}

function home() {
	var homeButton = "<button class ='home'></button>"
	document.getElementById("iphone").innerHTML += homeButton;
}

function egg() {
	//document.getElementById("screen").style.fontSize = "20px";
	ee = true;
	var easter;
	var codes = ["1314", "1012", "420", "1031", "1225", "3.14"]
	var inputString = input.join('');
	if(codes.includes(inputString)) {
		 switch(inputString) {
		 	case "1012":
				easter = "Happy Birthday!";
				break;
			case "1314":
				easter = "Forever";
				break;
			case "420":
				// This is a joke.
				easter = "Smoke Weed Everyday!";
				break;
			case "1031":
				easter = "Happy Halloween!";
				break;
			case "1225":
				easter = "Merry Christmas!";
				break;
			case "3.14":
				easter = "Happy PI day!";
				break;
			case "314":
				easter = "I want pie.";
				break;
			case "0.":
				easter = "I see you point.";
				break;
			case "80085":
				easter = "I'm telling your mom!";
				break;
		 }
	} else {
		var random = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
		switch(random) {
			case 1:
				easter = "Mathematical!";
				break;
			case 2:
				easter = "Algebraic!";
				break;
			case 3:
				easter = "DOES NOT COMPUTE!";
				break;
			case 4:
				easter = "1001000 1101001!";
				break;
			case 5:
				easter = "Have some &pi;";
				break;
			case 6:
				easter = "&uarr; &uarr; &darr; &darr; &larr; &rarr; &larr; &rarr; B A";
				break;
			case 7:
				easter = "&Alpha; &Epsilon; &Kappa; &Delta; &Beta;";
				break;
			case 8:
				easter = "I got 99 Problems but a glitch ain't one.";
				break;
			case 9:
				easter = "&Theta; = An O with a bowtie";
				break;
			case 10:
				easter = "&equivDD; &ne; Cake!"
				break;
		}
	}
	input = [easter];
	display();
}

function setSize(num) {
	document.getElementById("screen").style.fontSize = String(num) + "px";
}

function setPadding(num) {
	document.getElementById("screen").getElementsByTagName("p")[0].style.paddingTop = String(num) + "px";
}

function reset() {
	fontSize = 40;
	setSize(fontSize);
	padding = 0;
	setPadding(padding);
}

function isOverflowed(element){
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

home();

for (var i = 0; i < buttons.length; i++) {
	switch(buttons[i].classList[0]) {
		case "number":
			buttons[i].addEventListener("click", numClick);
			break;
		case "clear":
			buttons[i].addEventListener("click", clear);
			break;
		case "decimal":
			buttons[i].addEventListener("click", decimalClick);
			break;
		case "posneg":
			buttons[i].addEventListener("click", toggleNegative);
			break;
		case "operator":
			buttons[i].addEventListener("click", setOperation);
			break;
		case "equals":
			buttons[i].addEventListener("click", equals);
			break;
		case "percent":
			buttons[i].addEventListener("click", percentage);
			break;
		case "home":
			buttons[i].addEventListener("click", egg);
			break;
	}
}

display();