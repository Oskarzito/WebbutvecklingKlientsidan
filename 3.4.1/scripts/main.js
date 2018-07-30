
/*
    Programmet är implementerar kraven för uppgift 3.4.1 Effekter och animationer

    Vanligtvis använder jag data-attribut som selektorer,
    men uppgiften var liten så körde på CSS-klass-attributen
    när man via jQuery hämtar ut det som ska modifieras.
    Knapparna använder dock data-attribut för läsbarhet.

    Programmet implementerar följande:

    * Visar och gömmer ett HTML-element (show, hide och toggle)
    * Fadar in ouch ut ett HTML-element (fadeIn, fadeOut, fadeToggle och fadeTo)

    * Förändrar ett HTML-elements stilsättning (animate)

    * Easing (linear eller swing) till animationen och testa med olika hastigheter
    * Att en händelse sker efter animationen är klar (callback funktion)

*/

$(document).ready(function () {
    'use strict';
    //Knappvariabler
    var HIDE_BUTTON = '[data-button="hide"]';
    var SHOW_BUTTON = '[data-button="show"]';
    var TOGGLE_BUTTON = '[data-button="toggle"]';
    var FADE_TO_BUTTON = '[data-button="fade-to"]';
    var ANIMATE_BUTTON = '[data-button="animate"]';

    //Lyssnare på 'göm'. Gömmer och fadar ut 2 element (Hide och fadeOut)
    $(HIDE_BUTTON).on('click', function (event) {
        $('.showhide-element').hide();
        $('.fading-element').fadeOut(3500);
    });

    //Lyssnare på 'visa'. Visar och fadar in 2 element (Show och fadeIn)
    $(SHOW_BUTTON).on('click', function (event) {
        $('.showhide-element').show();
        $('.fading-element').fadeIn(3500);
    });

    //Lyssnare på 'toggla'. Togglar och fade-togglar 2 element (Toggle och fadeToggle)
    $(TOGGLE_BUTTON).on('click', function (event) {
        $('.toggle-element').toggle();
        $('.fade-toggle-element').fadeToggle(1500);
    });

    //Lyssnare på 'fade to'. Fadar ett fyrkantselement till att gå från opacity 1 till 0.1 (fadeTo)
    $(FADE_TO_BUTTON).on('click', function (event) {
        $('.fade-to').fadeTo(3000, 0.1);
    });

    //Variabel som kontrollerar om 'animera'-knappen tryckts ner
    var animated = false;

    /*
        * Förändrar ett HTML-elements stilsättning (animate)

        * Easing (linear eller swing) till animationen och testa med olika hastigheter
        * Att en händelse sker efter animationen är klar (callback funktion)
    */
    //Lyssnare på 'animera'
    $(ANIMATE_BUTTON).on('click', function (event) {
        if(!animated){
            //Animerar ett element i 3 sekunder enligt swing-animationen
            $('.animating').animate({left: '800px', bottom: '400px', opacity: '0.1'}, 3000, "swing", function () {
                //Callback-funktion
                console.log('Callback: animerad');
            });
        } else {
            //Animerar tillbaka samma element som ovan i 3 sekunder enligt linear-animationen
            $('.animating').animate({left: '0', bottom: '5px', opacity: '1.0'}, 3000, "linear", function () {
                //Callback-funktion
                console.log('Callback: animerad tillbaka');
            });
        }
        animated = !animated;
    });

});
