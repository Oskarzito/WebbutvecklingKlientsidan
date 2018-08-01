
/*
    Programmet implementerar funktionalitet till uppgift 3.5.1 Webblagring

    Samtliga saker nedan är gjorda:
    Gör ett JavaScript-program som med hjälp av jQuery implementerar att användaren
    via ett formulär kan skriva in data som sedan sparas med hjälp av objekten:

    localStorage och
    sessionStorage

    Användaren ska även med ett knapptryck kunna ta bort alla data ur båda objekten.

    Testa även att, med hjälp av JSON (funktionerna JSON.stringify och JSON.parse),
    spara ett eller flera objekt.

    Andra filerna implementerar resterande krav
*/

$(document).ready(function () {
    //Öppna nytt fönster samt popup
    window.open('local.html');
    window.open('session.html', 'sessionStorage', 'height=250,width=250');

    //Selektorer
    var FORM_SELECTOR = '[data-form="form"]';
    var FORM_INPUT_LOCAL = '[data-input="local"]';
    var FORM_INPUT_SESSION = '[data-input="session"]';
    var DELETE_STORAGE_SELECTOR = '[data-button="delete"]';
    var PREVIOUS_OUTPUT_SELECTOR = '[data-prev-saved="saved-data"]';
    var previousData = 'prevSavedData';

    //Kolla om något finns sparat.
    var currentLocallySavedData = localStorage.getItem(previousData);
    if(currentLocallySavedData == null) {
        //Inget fanns
        $(PREVIOUS_OUTPUT_SELECTOR).text('Inget sparat');
    } else {
        /*Om något fanns, parsa JSON-texten, skriv ut objektet samt sätt inputbox-värdena
        till tidigare sparad data*/
        var oldData = JSON.parse(currentLocallySavedData);
        $(PREVIOUS_OUTPUT_SELECTOR).text(currentLocallySavedData);
        $(FORM_INPUT_LOCAL).val(oldData['localdata']);
        $(FORM_INPUT_SESSION).val(oldData['sessiondata']);
    }


    //Submitlyssnare på formuläret
    $(FORM_SELECTOR).on('submit', function (event) {
        //Stoppa från att skicka till ny sida
        event.preventDefault();
        //Hämta input och spara i localStorage
        var inputLocal = $(FORM_INPUT_LOCAL).val();
        localStorage.setItem('key', inputLocal);

        //Hämta input och spara i sessionStorage
        var inputSession = $(FORM_INPUT_SESSION).val();
        sessionStorage.setItem('key', inputSession);

        //Gör ett objekt av inputen
        var saveData = {'localdata': inputLocal,'sessiondata': inputSession};

        //Gör en sträng av objektet och spara det i localStorage
        localStorage.setItem(previousData, JSON.stringify(saveData));
        //(Skriv även ut det som nyss sparades)
        $(PREVIOUS_OUTPUT_SELECTOR).text(JSON.stringify(saveData));
    });

    //Användaren ska även med ett knapptryck kunna ta bort alla data ur båda objekten.
    //Lyssnare på deleteknappen
    $(DELETE_STORAGE_SELECTOR).on('click', function (event) {
        //Stoppa från att skicka till ny sida
        event.preventDefault();
        //Radera all sparad data i session och local
        localStorage.clear();
        sessionStorage.clear();
    });
});
