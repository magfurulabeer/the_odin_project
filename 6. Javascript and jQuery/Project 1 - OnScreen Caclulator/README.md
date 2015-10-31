# On Screen Calculator
An iOS Calculator clone I did for The Odin Project and Free Code Camp.
This project is identical to the project found in freecodecamp repository.

## Features:
* Done entirely in HTML, CSS, and Javascript. No jQuery used for this project.
* Can do basic math operations and can chain operations
* Operational percent,decimal, and toggle-negative buttons
* Outputs that are too long for the screen have font sizes automatically
adjusted to fit
* Easter Egg: Pressing the home button will display a random message on the screen
* Easter Egg: Pressing the home button while certain numbers are on the screen will display corresponding message on the screen (e.g. 80085 => "I'm telling your mom!")

## Project: Building An On Screen Calculator Using Javascript
* Build a function add() which takes two numbers and adds them together.
* Build multiply, divide and subtract functions in a similar fashion.
* Build a grid of <div>s in the browser that are labeled with the numbers 0-9.
* Set up a listener so when the user clicks on one of these squares, it displays that number in the console log. This can be done by assigning a function to the onclick() property of the div (use this if you haven't been introduced to jQuery listeners before). It's okay to hard-code them in for now (e.g. onclick(function(){ console.log "1" }))
* Now add "buttons" (more divs) to your calculator which represent "+", "-", "*", "/", "=" and "clear".
* Make your calculator work! This means that you'll need to "save" the first number that is pressed (to a variable or array) and you'll also need to "save" which operation has been chosen (e.g. addition). Once the equals sign is pressed, it should run a function which evaluates the expression by calling the simple functions you created earlier and outputting the result to the command line. It may take some practice to be able to pass the values from your "buttons" to your main calculator function. It's a bit tricky, but you can do it.
* Pressing "=" or "clear" should clear any saved variables or operations so you can start over.
* Push your project to Github and share the solution below.
* Extra credit: If you're comfortable with jQuery, create a "screen" for your calculator -- another <div> which displays the numbers and the results like a normal calculator would.
* Extra credit: Create a "parent filter" which checks if the user has inputted any immature numbers "e.g. 80085" and scolds the user if so.



    
    
    
    
    
    
    
    
    
    
