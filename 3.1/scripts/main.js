
/*
    Kommentarer kommer vara på engelska. En liten sidenote dock:
    nu använder jag främst querySelector istället för getElementById.
    I framtida uppgifter kanske jag kör getElementById istället för querySelector.
    Huvudsakligen kommer jag vara konsekvent samt hålla mig till en
    i respektive uppgift, och endast mixa om det krävs.
*/

var ADD_BUTTON = '[data-btn-role="addButton"]';
var CALCULATE_BUTTON = '[data-btn-role="calcButton"]';
var RANDOM_BUTTON = '[data-btn-role="randomButton"]';
var OUTPUT_DIV = '[data-div-role="output"]';
var INPUT_NUMBER_TEXTBOX = '[data-input-role="inputNumber"]';
var INPUT_NAME_TEXTBOX = '[data-input-role="inputName"]';
var CONFIRM_NAME_BUTTON = '[data-btn-role="nameButton"]';
var OUTPUT_TABLE = '[data-table-role="outputTable"]';
var SHOW_ERROR = 'wrong-input';
var inputArray = [];

function addButtonListener() {
    'use strict';
    var button = document.querySelector(ADD_BUTTON);
    button.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Add was clicked');
        var input = document.querySelector(INPUT_NUMBER_TEXTBOX).value;

        /* Could have been written without Boolean() function, but written with
        because the assignmen said I should use the JS Boolean object.
        Better safe than sorry :) */
        if(Boolean(isNaN(input) || input === "")){
            document.body.classList.add(SHOW_ERROR);
        } else {
            document.body.classList.remove(SHOW_ERROR);
            var inputAsNumber;

            if(isFloat(input)) {
                inputAsNumber = parseFloat(input);
            } else {
                inputAsNumber = parseInt(input);
            }

            inputArray.push(inputAsNumber);
            writeToScreen(input, 'p');
        }
    });
}

/*
    Checks if a string is an integer.
*/
function isInt(number) {
    'use strict';
    return parseInt(number) == number;
}

/*
    Checks if a string is a float.
*/
function isFloat(number) {
    'use strict';
    /*I don't use === because number will always be a string.
    This way, I parse it to a float and check if it's the same WITH
    type conversion.*/
    return parseFloat(number) == number;
}

function getCurrentSum() {
    'use strict';
    var sum = 0;
    for(var i = 0; i < inputArray.length; i++) {
        sum += inputArray[i];
    }
    return sum;
}

function addCalculateButtonListener() {
    'use strict';
    var button = document.querySelector(CALCULATE_BUTTON);
    button.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Calculate was Clicked!!');
        var sum = getCurrentSum();
        var outputString = "Summan av alla talen som matades in är: " + sum;
        writeToScreen(outputString, 'p');
    });
}

function addRandomButtonListener() {
    'use strict';
    var button = document.querySelector(RANDOM_BUTTON);
    button.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Random clicked!!');
        var sum = getCurrentSum();
        var rndNum = Math.floor(Math.random() * sum);
        inputArray.push(rndNum);
        writeToScreen(rndNum, 'p');
    });
}

/*Writes to the output div tag. whatToWrite = what's written.
element = as what kind of tag the output should be*/
function writeToScreen (whatToWrite, element) {
    'use strict';
    var output = document.querySelector(OUTPUT_DIV);

    var htmlElement = document.createElement(element);
    htmlElement.innerHTML = whatToWrite;
    htmlElement.classList.add('output-value-paragraph');

    //output.appendChild(htmlElement);

    output.insertBefore(htmlElement, output.firstChild);
}

function addNameButtonListener() {
    'use strict';
    var button = document.querySelector(CONFIRM_NAME_BUTTON);
    button.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Confirm name clicked!!');
        var name = document.querySelector(INPUT_NAME_TEXTBOX).value;
        var sum = getCurrentSum();
        appendToTable(name, sum);
    });
}

function appendToTable(name, sum){
    'use strict';
    var table = document.querySelector(OUTPUT_TABLE);
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = name;
    var cell2 = row.insertCell(1);
    cell2.innerHTML = sum;
}

function init() {
    'use strict';
    addButtonListener();
    addCalculateButtonListener();
    addRandomButtonListener();
    addNameButtonListener();
}

init();
