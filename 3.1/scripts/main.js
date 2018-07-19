
/*
    Kommentarer kommer vara på engelska eller svenska. Kommentarerna i en uppgift
    kommer dock vara på samma språk. Men språket kan variera mellan uppgifterna
    (beroende på storlek, komplexitet osv).

    Ytterligare en liten sidenote dock:
    nu använder jag främst querySelector istället för getElementById.
    I framtida uppgifter kanske jag kör getElementById istället för querySelector (dvs om
    inte jQuery används). Huvudsakligen kommer jag vara konsekvent samt hålla mig till en
    i respektive uppgift, och endast mixa om det krävs.
    Detta JavaScript-program använder följande inbyggda JavaScript-objekt:

    This JS class gives behaviour to assignment '3.1 Grunderna i JavaScript'.
    It makes use of the following JS entities:
    - Array     <
    - Boolean   <
    - Date      <
    - Math      <
    - Number    <
    - String    <
    - RegExp    <
    - Global    <
*/

//Variables that has references to the HTML
var ADD_BUTTON = '[data-btn-role="addButton"]';
var CALCULATE_BUTTON = '[data-btn-role="calcButton"]';
var RANDOM_BUTTON = '[data-btn-role="randomButton"]';
var OUTPUT_DIV = '[data-div-role="output"]';
var INPUT_NUMBER_TEXTBOX = '[data-input-role="inputNumber"]';
var INPUT_NAME_TEXTBOX = '[data-input-role="inputName"]';
var CONFIRM_NAME_BUTTON = '[data-btn-role="nameButton"]';
var OUTPUT_TABLE = '[data-table-role="outputTable"]';
var NUMBER_ERROR_PARAGRAPH = '[data-error-role="numberError"]';
var NAME_ERROR_PARAGRAPH = '[data-error-role="nameError"]';
var SHOW_ERROR = 'show-error-message';

//An Array object
var inputArray = [];

/*
    Gives behaviour to the button 'Addera!'. It takes the value in the
    textbox and checks if it is a valid number
*/
function addButtonListener() {
    'use strict';
    //Reference to the button
    var button = document.querySelector(ADD_BUTTON);

    //Add click listener
    button.addEventListener('click', function(event) {
        //Prevents default anchor tag behaviour
        event.preventDefault();
        console.log('Add was clicked');

        /*References the input textbox's value. By using the 'Number' object, the input
        also accepts binary and hexadecimal input when converting from a string to
        a number*/
        var input = new Number(document.querySelector(INPUT_NUMBER_TEXTBOX).value);

        /*Could have been written without Boolean() function, but written with
        because the assignment said I should use the JS Boolean object.
        Better safe than sorry :)
        isNaN is a Global function*/
        if(Boolean(isNaN(input) || input === "")){
            /*Adds a class to the error message paragraph so a CSS selector
            matches and shows an error*/
            document.querySelector(NUMBER_ERROR_PARAGRAPH).classList.add(SHOW_ERROR);
        } else {
            //Removes the error message (unmatches a CSS selector)
            document.querySelector(NUMBER_ERROR_PARAGRAPH).classList.remove(SHOW_ERROR);

            var inputAsNumber;

            //Checks if input is a Float or an Integer
            if(isFloat(input)) {
                inputAsNumber = parseFloat(input);
            } else {
                inputAsNumber = parseInt(input);
            }

            //Adds number to array
            inputArray.push(inputAsNumber);

            /*Calls a function to print input to screen.
            Arguments passed are the input and what type of HTML element
            it should be displayed as*/
            writeToScreen(inputAsNumber, 'p');
        }
    });
}

/*
    Checks if a string is an Integer
*/
function isInt(number) {
    'use strict';
    //Makes use of the global object
    return parseInt(number) == number;
}

/*
    Checks if a string is a Float
*/
function isFloat(number) {
    'use strict';
    /*I don't use === because input number will always be a string.
    This way, I parse it to a float and check if it's the same WITH
    type conversion. Also, this makes use of the global object*/
    return parseFloat(number) == number;
}

/*
    Calculates and returns the sum of all numbers currently entered
*/
function getCurrentSum() {
    'use strict';
    var sum = 0;
    for(var i = 0; i < inputArray.length; i++) {
        sum += inputArray[i];
    }
    return sum;
}

/*
    Adds listener to the 'Beräkna allt' button. Just prints the current sum
    of all previously entered values
*/
function addCalculateButtonListener() {
    'use strict';
    //Button reference
    var button = document.querySelector(CALCULATE_BUTTON);

    //Add click listener
    button.addEventListener('click', function(event) {
        //Prevents default anchor tag behaviour
        event.preventDefault();
        console.log('Calculate was Clicked!!');

        //Makes a string of a text and the current total sum of all values entered
        var outputString = "Summan av alla talen som matades in är: " + getCurrentSum();

        //Writes the string to the screen as a paragraph tag
        writeToScreen(outputString, 'p');
    });
}

/*
    Gives functionality to the 'Slumpmässigt tal!' button. Pressing the button
    generates a random number and adds it to the total sum (or rather, adds it to the
    array of all input numbers)
*/
function addRandomButtonListener() {
    'use strict';
    //Reference to the button
    var button = document.querySelector(RANDOM_BUTTON);

    //Add click listener
    button.addEventListener('click', function(event) {
        //Prevents default anchor tag behaviour
        event.preventDefault();
        console.log('Random clicked!!');

        //Calculates current total sum
        var sum = getCurrentSum();

        /*Generates a random number between 0 and the current total sum.
        With 'Math.floor' we avoid long decimal numbers (only generates Integers)*/
        var rndNum = Math.floor(Math.random() * sum);

        //Add to input array (contains all entered values)
        inputArray.push(rndNum);

        //Write the number to the screen as a paragraph
        writeToScreen(rndNum, 'p');
    });
}

/*Writes to the output div tag.
whatToWrite = what's going to be written.
element = as what kind of tag the output should be (for this program it's
always paragraphs)*/
function writeToScreen (whatToWrite, element) {
    'use strict';
    //Reference to the output div tag
    var output = document.querySelector(OUTPUT_DIV);

    //Creates new element
    var htmlElement = document.createElement(element);

    //Writes to the new elemet
    htmlElement.innerHTML = whatToWrite;

    //Gives a class to the element
    htmlElement.classList.add('output-value-paragraph');

    /*Displays the new element above the others making it look nice and
    readable in the output div box*/
    output.insertBefore(htmlElement, output.firstChild);
}

/*
    Adds a listener to the 'Bekräfta namn' button. It validates the name, and
    if OK, writes out name and total sum to the table. If name isn't OK, it
    displays an error message
*/
function addNameButtonListener() {
    'use strict';
    //Reference to the button
    var button = document.querySelector(CONFIRM_NAME_BUTTON);

    //Add click listener
    button.addEventListener('click', function(event) {
        //Prevents default anchor tag behaviour
        event.preventDefault();
        console.log('Confirm name clicked!!');

        //Gets the entered value in the textbox
        var name = document.querySelector(INPUT_NAME_TEXTBOX).value;

        //Checks name validity
        if(isValidName(name)){
            //Removes the error message (unmatches a CSS selector)
            document.querySelector(NAME_ERROR_PARAGRAPH).classList.remove(SHOW_ERROR);

            //Prints name and sum to the table
            appendToTable(name, getCurrentSum());

            //Clears the array
            inputArray = [];
        } else {
            console.log('Invalid name: ' + name);
            /*Gets a reference to the error messsage paragraph and givs it a class.
            The CSS class styles the message red and makes it visible*/
            document.querySelector(NAME_ERROR_PARAGRAPH).classList.add(SHOW_ERROR);
        }
    });
}

/*
    Validates a string to see if it matches a certain RegEx pattern (see below)
*/
function isValidName(name) {
    'use strict';
    //Remove whitespace before and after the string
    name = name.trim();

    /*Regex matching capital first letter followed by any
    number of capital letters, lower case letters and/or numbers interchangably,
    within a range of 2-12*/
    var regex = /^[A-Z]+[A-z0-9]{2,12}$/;

    //Returns a boolean of whether the string matches the RegEx pattern or not
    return regex.test(name);
}

/*
    Adds a new row to the table a the bottom. The new row
    consist of 3 cells, the first will contain the name, the
    second the sum, and the third todays date
*/
function appendToTable(name, sum){
    'use strict';
    //Reference to the table elemet
    var table = document.querySelector(OUTPUT_TABLE);

    //New row
    var row = table.insertRow(table.rows.length);

    //Inserts a new cell and a value in it
    var cell1 = row.insertCell(0);
    cell1.innerHTML = name;

    //Inserts a second new cell and adds value in it
    var cell2 = row.insertCell(1);
    cell2.innerHTML = sum;

    //Inserts a third new cell and creates a new date, then adds the date in the cell
    var cell3 = row.insertCell(2);
    var date = new Date();
    cell3.innerHTML = date.getDate() + '/' + date.getMonth() + ' - ' + date.getFullYear();;

}

/*
    An Immediatley-Invoked Function Expression starting the JavaScript
*/
(function () {
    'use strict';
    addButtonListener();
    addCalculateButtonListener();
    addRandomButtonListener();
    addNameButtonListener();
})();

/*
    The IIFE above could also have been written like this:
*/
/*
function init() {
    'use strict';
    addButtonListener();
    addCalculateButtonListener();
    addRandomButtonListener();
    addNameButtonListener();
}

//To start everything
init();
*/
