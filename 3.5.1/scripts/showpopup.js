
/*
    Programmet implementerar funktionalitet till uppgift 3.5.1 Webblagring

    Filen hanterar sessionStorage-popupen

    Alla data i sessionStorage-objektet ska visas för användaren i ett popup fönster.
*/


$(document).ready(function () {
    //Variabel för output-identifieraren
    var OUTPUT_SELECTOR = '[data-stored-output="session"]';

    //Åtkomst till sessionStorage i fönstret som har inputfälten (öppnarfönstret)
    var sessionStorageFromOriginal = window.opener.sessionStorage;

    //Hämta värdet för nyckeln 'key'
    var input = sessionStorageFromOriginal.getItem('key');

    //Om värdet inte finns, sätt text till att det inte finns. Annars, sätt text till värdet
    if(input == null || input === 'undefined' || input === '') {
        $(OUTPUT_SELECTOR).text('Finns ej sessionsdata sparad under nyckeln "key"');
    } else {
        $(OUTPUT_SELECTOR).text(input);
    }

    //Storage-lyssnare på fönstret
    $(window).bind('storage', function () {
        /*Hämta värdet för nyckeln 'key' från sessionStorage i huvudfönstret
        (savedata-filen). Sätt output-paragrafen till sparade värdet i sessionStorage*/
        $(OUTPUT_SELECTOR).text(sessionStorageFromOriginal.getItem('key'));

    });
});
