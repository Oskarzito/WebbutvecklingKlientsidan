
/*
    Programmet implementerar funktionalitet till uppgift 3.6.2 Halv-duplex klientinitierad kommunikation utom domän

    Detta uppfylls via anrop till ett API hos 'openweathermap.org' för att få väderinformation för en given stad.

    För att testa ett API-anrop för vädret i Stockholm (om det finns intresse
    att se hur ett JSON-objekt från API:et ser ut), klistra in denna länk i en
    webbläsare:
    http://api.openweathermap.org/data/2.5/weather?units=metric&q=Stockholm&APPID=f8a48d1a886d5c83eaf7ea5d8c0c6685
*/

$(document).ready(function () {

    //Referenser till HTML-output-element
    var $weatherOutput = $('[data-output="content"]');
    var $temperatureOutput = $('[data-output="temp"]');
    var $descriptionOutput = $('[data-output="description"]');
    var $cityOutput = $('[data-output="city"]');

    //URL till openweathermap
    var apiPath = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=';

    //Indexräknare till arrayen
    var indexCounter = 0;
    var cities = ['Stockholm', 'Goeteborg', 'Lulea', 'Umea', 'Gavle', 'Malmo', 'Sundsvall'];

    //Min nyckel för tillgång till API:et
    var apiKey = '&APPID=f8a48d1a886d5c83eaf7ea5d8c0c6685';

    //Uppdatera vädret var 10e sekund via ett API-anrop
    setInterval(function () {
        //Aktuell stad
        var city = cities[indexCounter];
        //Bygg URL:en (variabeln city gör att anropet sker till olika städer när den ändras)
        var url = apiPath + city + apiKey;

        indexCounter++;

        //Modulo för att få stadarrayen att loopa inom sina index hela tiden (dvs undvika indexOutOfBounds)
        indexCounter %= cities.length;

        //Hämta data, skicka med anonym callback-funktion som specificerar vad som ska göras med datat
        getData(url, function(data) {
            //Hämta temperaturen från responsen
            var temperature = data.main.temp;

            //Hämta väderbeskrivningen från responsen
            var description = data.weather[0].description;

            //Objekt som skapas ENDAST för att det ska kunna kontrolleras i konsolen
            var currentWeather = {
                'temperature': temperature,
                'description': description,
                'city': city
            };

            /*Dessa konsolutskrifter kan kontrolleras i webbläsaren för att se till att
            API-anropet hämtade rätt information*/
            console.log(temperature + " " + description + " " + city);
            //console.table(currentWeather);

            //Uppdatera värdena med en fin animation som fadar ut och in
            $weatherOutput.fadeOut(100, function () {
                //Ändrar output-taggarna på skärmen till nya värden
                $temperatureOutput.text(temperature);
                $descriptionOutput.text(description);
                $cityOutput.text(city);
                $(this).fadeIn(100);
            });
        });

    }, 10000);
});

/**
    API-anrop till specificerad URL

    @param apiCallUrl  Sträng som representerar URL:en man vill anropa
    @param callback    Callback-funktion som anropas efter ett API-anrop
*/
function getData(apiCallUrl, callback) {
    //Anrop till openweathermap:s API via JSONP
    $.ajax({
        dataType: 'jsonp',
        url: apiCallUrl,
        success: callback
    });
}
/*
***** Alternativt anrop till API:et *****

$.getJSON(url, function (data) {
    //Hämta temperaturen
    temperature = data.main.temp;

    //Hämta väderbeskrivningen
    description = data.weather[0].description;
});
*/
