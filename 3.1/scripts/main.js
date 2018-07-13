
/*
    Kommentarer kommer vara på engelska. En liten sidenote dock:
    nu använder jag främst querySelector istället för getElementById.
    I framtida uppgifter kanske jag kör getElementById istället för querySelector.
    Huvudsakligen kommer jag vara konsekvent samt hålla mig till en
    i respektive uppgift, och endast mixa om det krävs.
*/


var ADD_BUTTON = '[data-btn-role="addButton"]';
var CALCULATE_BUTTON = '[data-btn-role="calcButton"]';
var OUTPUT_DIV = '[data-div-role="output"]';
var INPUT_TEXTBOX = '[data-input-role="input"]';
var SHOW_ERROR = 'wrong-input';
var inputArray = [];

function addButtonListener() {
    'use strict';
    var button = document.querySelector(ADD_BUTTON);
    button.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Add was clicked');
        var input = document.querySelector(INPUT_TEXTBOX).value;

        if(isNaN(input) || input === ""){
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

function isInt(number) {
    'use strict';
    return parseInt(number) === number;
}

function isFloat(number) {
    'use strict';
    return parseFloat(number) === number;
}

function addCalculateButtonListener() {
    'use strict';
    var button = document.querySelector(CALCULATE_BUTTON);
    button.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Calculate was Clicked!!');
        var sum = 0;
        for(var i = 0; i < inputArray.length; i++) {
            sum += inputArray[i];
        }
        var outputString = "Summan av alla talen som matades in är: " + sum;
        writeToScreen(outputString, 'p');
    });
}

/*Writes to the output div tag. whatToWrite = what's written.
element = as what kind of tag the output should be*/
function writeToScreen (whatToWrite, element) {
    'use strict';
    var output = document.querySelector(OUTPUT_DIV);

    var htmlElement = document.createElement(element);
    htmlElement.innerHTML = whatToWrite;

    output.appendChild(htmlElement);
}

function init() {
    addButtonListener();
    addCalculateButtonListener();
}

init();
