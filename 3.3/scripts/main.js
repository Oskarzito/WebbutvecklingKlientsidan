
/*
    Klassen implementerar JavaScript-funktionaliteten till uppgift 3.3 Webbläsar-objekt.

    Samtliga saker nedan är implementerade:

    * alert, confirm, prompt
    * open, close
    * setInterval
    * clearInterval
    * setTimeout
    * clearTimeout

*/

//Variabler för tiduppdatering
var timeUpdate;
var countTime = true;

$(document).ready(function () {
    'use strict';
    //Selektor-variabler
    var OPEN_BUTTON_SELECTOR = '[data-button="open"]';
    var CLOSE_BUTTON_SELECTOR = '[data-button="close"]';
    var START_BUTTON_SELECTOR = '[data-button="start-interval"]';
    var STOP_BUTTON_SELECTOR = '[data-button="stop-interval"]';
    var OUTPUT_SELECTOR = '[data-output="reason-for-open"]';
    var TIME_BUTTON_SELECTOR = '[data-button="toggle-time"]';

    //Variabler som ska anta alert-intervallsfunktionen
    var tenSecAlert;

    //Referens till stoppknapp och sätt knappen till disabled
    var $stop = $(STOP_BUTTON_SELECTOR);
    $stop.prop('disabled', true);

    //Referens till startknapp som sedan får en lyssnare
    var $start = $(START_BUTTON_SELECTOR);
    $start.on('click', function(event) {
        //Sätt intervall för en alert var 4e sekund
        tenSecAlert = setInterval(function () {
            alert('4 sekunder');
        }, 4000);
        //Disabla startknappen och enabla stoppknappen när intervallet startar
        $start.prop('disabled', true);
        $stop.prop('disabled', false);
    });

    //Lyssnare tillagd på stoppknappen
    $stop.on('click', function (event) {
        //Stoppa alert-intervallet. enabla startknappen och disabla stoppknappen
        clearInterval(tenSecAlert);
        $start.prop('disabled', false);
        $stop.prop('disabled', true);
    });

    //Sätt lyssnare på 'öppna-knappen'
    $(OPEN_BUTTON_SELECTOR).on('click', function (event){
        //Prompta användaren för input
        var input = prompt('Varför vill du öppna ny sida?');
        //Vid ok, ändra text till inputen och öppna nytt fönster med newwindow som hemsida
        if(input != null){
            $(OUTPUT_SELECTOR).text(input);
            window.open("newwindow.html", "_blank", "width=340, height=300");
        }
    });
    //Sätt lyssnare på 'stäng-knappen'
    $(CLOSE_BUTTON_SELECTOR).on('click', function (event) {
        //Låt användaren bekräfta valet. Om ok, stäng fönstret. Annars, gör inget
        var ok = confirm('Vill du verkligen stänga?');
        if(ok){
            window.close();
        }
    });

    //Sätt lyssnare på 'starta/pausa tid'-knappen
    $(TIME_BUTTON_SELECTOR).on('click', function (event) {
        //Toggla om det ska räknas eller ej
        countTime = !countTime;

        //Räkna tid eller stoppa tidräknaren
        if(countTime){
            setTime();
        } else {
            clearTimeout(timeUpdate);
        }
    });

    //Initiera tidräknaren
    setTime();
});

/**
    Fuktion som hämtar tid och uppdaterar texten på skärmen med tiden
*/
function setTime() {
    'use strict';
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    //Formatera ihop en sträng och ändra tid på skärmen
    var time = [hour, ':', min, ':', sec].join(' ');
    $('[data-time="now"]').text(time);

    //Sätt en timer så att tiden uppdateras igen efter en sekund
    timeUpdate = setTimeout(setTime, 1000);
}
