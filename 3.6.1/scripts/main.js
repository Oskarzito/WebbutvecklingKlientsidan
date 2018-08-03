
/*
    Programmet implementerar funktionaliteten till uppgift
    3.6.1 Halv-duplex klientinitierad kommunikation inom domän.

    Följande saker är gjorda:
    * Ajax via jQuery

    Denna uppgift var lite knepig att testa. Jag gjorde som så att jag laddade
    upp alla filer i projektet till min studentdomän på people.dsv-servern i public_html-katalogen
    och gjorde Ajax-requestet till /~pierre/courses/05_ass/ip3/3/3.6.1/example.php som låg inom samma domän.
    Jag var dock tvungen att ändra http till https i url:en (då tipset i uppgiften
    säger att man kan skicka till http://people.dvs.su.se/~pierre...).
    Men summa summarum, allt funkar :)
*/

$(document).ready(function () {
    //Selektorer för HTML
    var NUM1 = '[data-input="num1"]';
    var NUM2 = '[data-input="num2"]';
    var FORM = '[data-form="form"]';
    var RESPONSE_TEXT = '[data-response="server-response"]';

    //Lyssnare på submit-händelsen
    $(FORM).on('submit', function (event) {
        //Stoppa från att skickas till ny sida
        event.preventDefault();

        //Hämta inmatade värden
        var $num1 = $(NUM1).val();
        var $num2 = $(NUM2).val();
        //Bygg endpoint-url:en
        var url = 'https://people.dsv.su.se/~pierre/courses/05_ass/ip3/3/3.6.1/example.php?number1=' + $num1 + '&' + 'number2=' + $num2;

        //Sätt en rubrik som man får kolla på medan Ajax gör en GET (lite MDI bara)
        var $responseText = $(RESPONSE_TEXT);
        $responseText.text('Skickar till servern, vänligen vänta ...');

        console.log('skickade: ' + $num1 + ' och ' + $num2 + 'till: ' + url);

        /*Gör ett GET-request till url:en. Anonyma funktionen är callback:en som görs när svaret kommer
        Använder $.get() istället för $.ajax({method: "GET"}) då det betyder detsamma*/
        $.get(url, function (response) {
            //Logga responsen direkt i konsolen
            console.log(response);

            /*Här skulle man kunna utelämna setTimeout helt och hållet. Detta var helt och hållet
            ENDAST för att jag tyckte det såg häftigare ut om man lät användaren
            vänta 4 sekunder, sen kom resultatet på skärmen. Man skulle som sagt kunna
            ha det som står i timeout:en endast och därmed skriva ut svaret direkt på
            skärmen. Tittar man i konsolen ser man att serverns svar kommer näst inpå
            direkt efter det att man skickat en GET*/
            setTimeout(function () {
                //Skriv ut serverns svar på skärmen
                $responseText.text('Summan av de två talen är: ' + response);
            }, 4000);
        });
    });
});
