
/*
    Programmet implementerar funktionalitet till uppgift 3.5.1 Webblagring

    Filen hanterar localStorage-fönstret

    Alla data i localStorage-objektet ska visas för användaren i ett annat webbläsarfönster
    (med hjälp av händelselyssnaren storage), både vid start och under körning.
*/

$(document).ready(function () {
    /*Hämta output-paragrafen och sätt den till det som finns sparat på
    localStorage med nyckeln 'key'*/
    var OUTPUT_SELECTOR = '[data-stored-output="local"]';
    $(OUTPUT_SELECTOR).text(localStorage.getItem('key'));

    //Skriver bara ut allt som finns i localStorage
    var ALL_SELECTOR = '[data-all="all-data"]';
    var string;
    for (var i = 0; i < localStorage.length; i++){
        string = string + ', ' + localStorage.getItem(localStorage.key(i));
    }
    $(ALL_SELECTOR).text(string);

    //Sätt en storage-lyssnare på fönstret
    $(window).bind('storage', function () {
        //Sätt text till det nya värdet till nyckeln 'key' i localStorage
        $(OUTPUT_SELECTOR).text(localStorage.getItem('key'));
    });
});
