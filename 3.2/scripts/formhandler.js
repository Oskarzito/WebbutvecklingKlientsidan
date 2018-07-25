
/**
    IIFE som omsluter formulärhanteringsfunktionaliteten.

    @param window Det globala window-objektet
*/
(function (window) {
    'use strict';

    console.log('FH Loaded');
    /*Om window.Application inte har ett värde, tilldela Application ett tomt objekt.
    Annars, tilldela Application värdet av window.Application.
    För förtydligande, se main.js högst upp.
    */
    var Application = window.Application || {};
    /**
        Konstruktor för formulärhanteraren

        @param selectedElement Sträng-identifierare för det HTML-element man vill välja ut
    */
    function FormHandler(selectedElement) {
        console.log('New FormHandler');

        //Om inget värde är medskickat, kasta undantag
        if (!selectedElement) {
            throw new Error('Inget valt element!');
        }

        //Välj ut elementet via jQuery och tilldela det till $element
        this.$element = $(selectedElement);
        //Om elementet man valt inte finns, kasta undantag
        if(this.$element === 0) {
            throw new Error('Inget element med det namnet!');
        }
    }

    /**
        Lägger till lyssnare på 'submit'-händelsen för formuläret

        @param func En funktion som skickas med och anropas varje gång en 'submit' sker
    */
    FormHandler.prototype.addSubmitListener = function (func) {
        console.log('Lyssnare adderad');
        //Lägg lyssnare på 'submit'-händelsen
        this.$element.on('submit', function (event) {
            //Stoppa webbläsaren från att skicka data till en server (stoppa omladdning av sidan)
            event.preventDefault();
            //Ta texten från inputrutan
            var text = $('#listInputId').val();
            //Anropa funktionsparametern och skicka med inmatade texten som argument
            func(text);
            //Återställ formuläret (radera text i rutan)
            this.reset();
            //Sätt fokus på rutan så användaren inte behöver klika på den igen för att skriva
            this.elements[0].focus();
        });

    };
    /*Tilldela FormHandler till namespace:et Application och exportera det
    så det blir åtkomligt på andra ställen via window*/
    Application.FormHandler = FormHandler;
    window.Application = Application;

})(window);
