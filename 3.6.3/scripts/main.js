
/*
    Programmet implementerar funktionaliteten till uppgift
    3.6.3 Halv-duplex serverinitierad kommunikation.
    Följande saker är gjorda:
    * EventSource med hjälp av jQuery som lyssnar på serverinitierade event

    Denna uppgift var (likt uppgift 3.6.1) lite knepig att testa. Jag gjorde även här som så att jag laddade
    upp alla filer i projektet till min studentdomän på people.dsv-servern i public_html-katalogen.
    Jag var dock tvungen att ändra http till https i url:en (då tipset i uppgiften
    säger att man kan skicka till http://people.dvs.su.se/~pierre...). Annars klagas det på att
    anslutningen inte är säker osv osv.

    Men summa summarum, allt funkar även här :)

    Notera, de uppgifter jag testat via people.dsv garanteras inte finnas kvar på servern då jag
    kan komma behöva testa framtida uppgifter där också. Än så länge har jag ingen smart
    lösning på hur man kan ladda in flera uppgifter.
*/

$(document).ready(function () {
    //Selektorvariabel
    var OUTPUT_SELECTOR = '[data-output="time"]';

    //Url till serverprogrammet
    var URL = 'https://people.dsv.su.se/~pierre/courses/05_ass/ip3/3/3.6.3/example.php';

    //Anslutning till servern via att skicka in Url:en
    var eventSource = new EventSource(URL);

    //Lyssnare på eventSource-meddelanden som skickas från servern
    $(eventSource).on('message', function (event) {
        /*Eftersom jQuerys event inte är detsamma som 'orginaleventen' kan
        man gå via originalEvent för att få datan som skickades från servern*/
        var data = event.originalEvent.data;
        console.log(data);
        $(OUTPUT_SELECTOR).text(data);
    });
});
