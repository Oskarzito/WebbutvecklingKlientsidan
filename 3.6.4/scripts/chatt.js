
/*
    Programmet implementerar funktionalitet till uppgift: 3.6.4 Full-duplex kommunikation
    via ett chattprogram. Följande är gjort:
    * Web Sockets för att sända och hämta information med hjälp av jQuery

    Notera, per default om man bara kör programmet ansluter programmet till
    en websocket som bara ekar det man skriver (se ECHO_URL-adressen).
    I nuläget gör iaf programmet det som ska göras, dvs sända och ta emot
    information från en server via en socket.

    Jag lyckades få ihop en egen server (server.js). Denna funkar faktiskt (om man
    nu lyckas få igång den ... hehe ...). Kort sagt så gör min egna server som så
    att den tar emot meddelanden och sedan skickar dessa till alla anslutna klienter
    (inklusive den som skickade meddelandet).

    Då detta är en klientside-kurs tänkte jag att det kanske inte är viktigt att testa med
    en perfekt egengjord server. Eftersom jag inte fick till anslutning till people.dsv
    (som tipsades) fick det bli en ekande server som körs från början.
*/


//Selektorvariabel till chatthistoriklistan
var MSG_HISTORY = '[data-chat="history"]';

$(document).ready(function () {
    //Variabler som selekterar HTML-elementen skicka-knapp och textinmatningen
    var SEND_BUTTON = '[data-button="send"]';
    var TEXT_MESSAGE_INPUT = '[data-input="text"]';

    //Fick aldrig denna server att fungera :(
    //var DSV_URL = 'ws://people.dsv.su.se:8787';

    /*En server som bara skickar tillbaka allt man skriver till den.
    Denna används om inget ändras nedan*/
    var ECHO_URL = 'ws://echo.websocket.org';

    /************
    Om tålamod finns :) Testa gärna med denna server. Det är
    en node-server jag satte ihop. Tror dock att det kan bli för omständigt
    att testa med den. Skrev lite halvdana instruktioner i server.js
    **************/
    var OWN_SERVER = 'ws://localhost:3001';

    //Socket från secificerad url man skickar med
    var socket = new WebSocket(ECHO_URL);

    //Lyssnare på när en anslutning öppnas
    $(socket).on('open', function () {
        socket.send('Ny anslutning till chatten');
    });

    //När ett meddelande tas emot
    $(socket).on('message', function (event) {
        //Meddelandetext
        var text = event.originalEvent.data;
        console.log('Tog emot: ' + text);
        //Gör en designad utskrift i chattfönstret
        msgReceived(text);
    });

    //Lyssnare på skicka-knappen
    $(SEND_BUTTON).on('click', function (event) {
        event.preventDefault();
        //Hämta meddelandetext
        var textMessage = $(TEXT_MESSAGE_INPUT).val();

        //Skicka texten
        socket.send(textMessage);

        //Gör en designad utskrift i chattfönstret
        msgSent(textMessage);
        //Återställ textinmatningen till tom text
        $(TEXT_MESSAGE_INPUT).val('');
        console.log('Skickade: ' + textMessage);
    })
});

/**
    Skriver ut en sträng som ett blått meddelande på skärmen

    @param messageText Sträng som ska skrivas ut som ett meddelande på skärmen
*/
function msgSent(messageText) {
    //Listan av meddelanden
    var $outList = $(MSG_HISTORY);
    //Skapa nytt listelement och ge det klassen 'sent'
    var messageItem = $('<li></li>', {
        'class': 'sent'
    });
    //Sätt elementets text
    messageItem.text(messageText);
    //Lägg till i listan så det visas på skärmen
    $outList.append(messageItem);
}

/**
    Skriver ut en sträng som ett vitt meddelande på skärmen

    @param messageText Sträng som ska skrivas ut som ett meddelande på skärmen
*/
function msgReceived(messageText) {
    //Listan av meddelanden
    var $outList = $(MSG_HISTORY);
    //Skapa nytt listelement och ge det klassen 'received'
    var messageItem = $('<li></li>', {
        'class': 'received'
    });
    //Sätt elementets text
    messageItem.text(messageText);
    //Lägg till i listan så det visas på skärmen
    $outList.append(messageItem);
}
