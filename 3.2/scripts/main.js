
/*
* Välja ut ett HTML-element                                             <
- Göra något med ett HTML-element:
    * Ändra en egenskap för ett HTML-elementet
    * Lägga till nytt innehåll till ett HTML-elementet
    * Ta bort ett HTML-element
    * Utvinna information från ett HTML-element
    * Lägga till och ta bort ett klass-attribut från ett HTML-element

    * Formulärhändelser – Submit, reset och focus – (någon av submit, reset, change, focus eller blur)

    * Gör även ett program som använder den kombinerade jQuery
    händelsen hover (= mouseover + mouseout).

    * Tangentbordshändelser – keypress – (någon av keypress, keydown eller keyup)

    * Använder händelse-objektet event och dess egenskaper pageX och pageY                          <

    * Stoppar en händelses normala beteende med event.preventDefault
    * Tar bort en händelse (off)

*/


$(document).ready(function () {
    'use strict';
    console.log('Document ready');
    //Identifierare för HTML-element
    var FORM_SELECTOR = '[data-list-form="form"]';
    var LIST_SELECTOR = '[data-list-todo="todo"]';
    var PANEL_BODY_SELECTOR = '[data-panel-body="panel-body"]';
    var POINTLESS_BUTTON_SELECTOR = '[data-pointless-button="pointless-button"]';
    var REMOVE_EVENT_BUTTON_SELECTOR = '[data-remove-event="background-off"]';
    var WINDOW_X_SIZE = '[data-win-x="xcord"]';
    var WINDOW_Y_SIZE = '[data-win-y="ycord"]';
    var MOUSE_X = '[data-mouse-x="xcord"]';
    var MOUSE_Y = '[data-mouse-y="ycord"]';
    var KEYS_PRESSED_COUNTER = '[data-keys-pressed="keyspressed"]';

    //Räknar knapptryck i window
    var keypressCounter = 0;

    //Instantiera en formulärhanterare från Application-namespace:et
    var FormHandler = window.Application.FormHandler;
    var formHandler = new FormHandler(FORM_SELECTOR);

    //Instantiera en listhanterare från Application-namespace:et
    var ListManager = window.Application.ListManager;
    var listManager = new ListManager(LIST_SELECTOR);

    //Addera en lyssnare på 'submit'-händelsen. Skica med en funktion som argument
    formHandler.addSubmitListener(function(text){
        //Addera ett nytt element till 'ska göras'-listan
        listManager.addItem(text);
    });

    //Ge alla list-element i 'ska göras'-listan en lyssnare
    listManager.addClickListener();

    /*
        Använder den kombinerade jQuery händelsen hover
    */
    $(PANEL_BODY_SELECTOR).hover(function (){
        console.log('in');
        $(this).addClass('blue-background');
    },function(){
        console.log('out');
        $(this).removeClass('blue-background');
    });

    /*
        Ta bort ett HTML-element (knapp) när man klickar på den
    */
    $(POINTLESS_BUTTON_SELECTOR).on('click', function (event) {
        $(this).remove();
    });

    /*
        Tar bort en händelse från ett annat HTML-element
    */
    $(REMOVE_EVENT_BUTTON_SELECTOR).on('click', function (event) {
        /*
            Tar bort händelsen så inget händer när man klickar på knappen som
            egentligen försvinner när man klickar på den
        */
        $(POINTLESS_BUTTON_SELECTOR).off('click');
    });

    $(window).resize(function () {
        $(WINDOW_X_SIZE).text($(window).width());
        $(WINDOW_Y_SIZE).text($(window).height());
    });

    $(window).on('click', function (event) {
        $(MOUSE_X).text(event.pageX);
        $(MOUSE_Y).text(event.pageY);
    });

    $(window).keypress(function () {

        $(KEYS_PRESSED_COUNTER).text(keypressCounter += 1);
    });

});
