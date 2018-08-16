
/*
    JS-filen implementerar funktionalitet för lite API-anrop.
    Ett Google-API sätter upp en Google Maps-karta. Via en lyssnare
    på kartans markör hämtas latitud och longitud från kartan
    när man droppar markören på en plats. Sedan får man lite
    diverse information om platsen via API-anrop till openweathermaps
    samt Wikipedia.

    Filen hanterar indata och utdata för externalservices.html
*/

$(document).ready(function () {
    //Initierar Google Maps-karten samt sätter ut en markör den
    var map = initMap();
    var marker = initMarker(map);

    const WEATHER_API_PATH = 'https://api.openweathermap.org/data/2.5/weather?units=metric&'
    const WEATHER_API_KEY = '&APPID=f8a48d1a886d5c83eaf7ea5d8c0c6685'

    const WEATHER_FORM_INPUT_SELECTOR = '[data-input="place"]';

    //Lägger till en lyssnare på när markören flyttas
    google.maps.event.addListener(marker, 'dragend', function () {
        //Hämtar markörens position
        var position = marker.getPosition();
        var lat = 'lat=' + position.lat();
        var lng = 'lon=' + position.lng();

        //Bygger URL:en för API-anrop och skickar till getData utan callback
        var url = WEATHER_API_PATH + lat + '&' + lng + WEATHER_API_KEY;
        getData(url, function (data) {
            updateOutput(data);
            //Sätt formulär-input-texten till platsens namn
            $(WEATHER_FORM_INPUT_SELECTOR).val(data.name);

            //Ta bort eventuella tabellrader innan nya skrivs ut
            var $outputTableBody = $('[data-output="table-body-result"]');
            $outputTableBody.empty();

            /*Anropar Wikipedias API via koordinaten markören står på.
             Resultatet blir information om närliggande platser som
             skrivs ut som tabellrader på skärmen*/
            queryWikipediaByGeo(position.lat(), position.lng());
        });
    });

    //Lyssnare som hanterar formulärsubmits
    var $placeForm = $('[data-form="place-form"]');
    $placeForm.on('submit', function (event) {
        event.preventDefault();
        //Ta bort eventuella tabellrader
        var $outputTableBody = $('[data-output="table-body-result"]');
        $outputTableBody.empty();

        //Indata från textfältet
        var input = $(WEATHER_FORM_INPUT_SELECTOR).val();

        //Bygg upp en URL av indatan och anropa getData med callback
        var url = WEATHER_API_PATH + 'q=' + input + WEATHER_API_KEY;
        getData(url, function (data) {
            updateOutput(data, function (data) {
                /*Denna callbackfunktion justerar kartan
                så den hamnar på platsen man skrev in*/
                var lat = data.coord.lat;
                var lng = data.coord.lon;
                var coordinate = new google.maps.LatLng(lat, lng);
                marker.setPosition(coordinate);
                //Flyttar kartan
                map.panTo(coordinate);

                /*Anropar Wikipedias API via koordinaten markören står på.
                 Resultatet blir information om närliggande platser som
                 skrivs ut som tabellrader på skärmen*/
                queryWikipediaByGeo(lat, lng);
            });
        });
    });

});

/**
    Uppdaterar textelement på skärmen gällande plats och temperatur

    @param data     Ett JSON-objekt från openweathermaps innhållande temperatur
                    och plats (med mera)
    @param callback Eventuell callbackfunktion för som tar JSON-dataobjektet
                    som argument
*/
function updateOutput(data, callback) {
    var $placeOutput = $('[data-output="place"]');
    var $tempOutput = $('[data-output="temp"]');
    //Om responskoden är lyckad, uppdatera textelement med relevant JSON-data
    if(data.cod === 200) {
        $placeOutput.text(data.name);
        $tempOutput.text(Math.round(data.main.temp) + ' grader');

        //Om en callback skickats med, anropa med dataobjektet
        if(callback) {
            callback(data);
        }
    } else {
        //Något är fel och meddelas på skärmen
        $placeOutput.text('Obefintlig plats! Testa en annan!');
    }
}

/**
    Initierar en Google Maps-karta

    @return En Google Maps-karta
*/
function initMap() {
    //Källhänvisar denna kodsnutt till Google Maps API-tutorial
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 59.334591,
            lng: 18.063240
        },
        zoom: 8
    });
    return map;
}

/**
    Initierar en Google Maps-markör på en karta

    @param map  Kartan som kommer få en markök på sig
    @return     En Google Maps-markör
*/
function initMarker(map) {
    var marker = new google.maps.Marker({
        position: {
            lat: 59.334591,
            lng: 18.063240
        },
        map: map,
        draggable: true
    });
    return marker;
}

/**
    API-anrop till specificerad URL. Vid lyckat anrop kallas en callbackfunktion.
    Vid misslyckat anrop skrivs det ut en text på skärmen.

    @param apiCallUrl  Sträng som representerar URL:en man vill anropa
    @param callback    Callback-funktion som anropas efter ett API-anrop
*/
function getData(apiCallUrl, callback) {
    //Anrop till openweathermap:s API via JSONP
    $.ajax({
        dataType: 'jsonp',
        url: apiCallUrl,
        success: callback,
        error: function () {
            //Om platsen man vill ha väderdata ifrån inte finns, visa det
            var $placeOutput = $('[data-output="place"]');
            $placeOutput.text('Obefintlig plats! Testa en annan!');
            var $tempOutput = $('[data-output="temp"]');
            $tempOutput.text('');
        }
    });
}

/**
    Skickar ett API-anrop till Wikipedia med en koordinat som argument.
    Responsen för anropen blir ett JSON-objekt innehållandes information
    om närliggande geografiska platser till koordinaten

    @param latitude  Latitud-värdet för Google-Maps-markören
    @param longitude Longitud-värdet för Google-Maps-markören
*/
function queryWikipediaByGeo(latitude, longitude) {
    var searchParam = latitude + '|' + longitude;
    const WIKI_GEO_URL = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=geosearch&gsradius=10000&gscoord=';
    //Skapar en url för API-androp
    var searchUrl = WIKI_GEO_URL + searchParam;

    $.ajax({
        dataType: 'jsonp',
        url: searchUrl,
        success: handleWikipediaGeoResponse,
        error: function () {
            console.log('Something went wrong when fetching data from Wikipedia');
        }
    });
}

/**
    Hanterar JSON-responsen från ett anrop till wikipeda

    @param data JSON-objekt innehållandes data om närliggande platser till en koordinat
*/
function handleWikipediaGeoResponse(data) {
    var resultArray = data.query.geosearch;

    /*För samtliga resultat (geografiska platser) i arrayen, skapa en URL för
    platsen och skriv ut som en tabellrad på skärmen*/
    resultArray.forEach(function (element) {
        var pageId = element.pageid;
        var name = element.title;
        var distance = element.dist;
        createWikipediaUrlFromPageIdAndPrintToScreen(pageId, name, distance);
    });
}

/**
    Tar ett wikipedia-pageID och skapar en url till ID:ts Wikipedia-sida

    @param id   PageID för en wikipedia-sida
    @param name Namnet på närliggande platsen
    @param dist Avståndet i meter till platsen från där markören släpptes på kartan
*/
function createWikipediaUrlFromPageIdAndPrintToScreen(id, name, dist) {
    const WIKI_PAGEID_URL = 'https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&format=json&pageids=';

    //Skapar en url för API-androp
    var searchUrl = WIKI_PAGEID_URL + id;
    $.ajax({
        dataType: 'jsonp',
        url: searchUrl,
        success: function (data) {
            //Data är ett JSON-objekt vars 'nyckel'-sökväg till url-adressen är den som tilldelas createdUrl
            var createdUrl = data.query.pages[id].fullurl;
            //Skapa tabell från output
            createOutoutTableRows(name, createdUrl, dist);
        },
        error: function () {
            console.log('Something went wrong when generating URL from pageID');
        }
    });
}

/**
    Skapar tabellrader som representerar resultaten från närliggande platser
    till där man droppade Google Maps-markören

    @param name Namnet på närliggande platsen
    @param link Länk till platsens wikipedia-sida
    @param dist Avståndet i meter till platsen från där markören släpptes på kartan
*/
function createOutoutTableRows(name, link, dist) {
    var $outputTableBody = $('[data-output="table-body-result"]');

    //Skapar en länk med namn som text och href som wikipeda-url:en
    var $nameAsLink = $('<a></a>');
    $nameAsLink.text(name);
    $nameAsLink.attr('target', '_blank');
    $nameAsLink.prop('href', link);

    //Skapar en tabellrad och adderar den sedan till tabellen
    var $row = $('<tr></tr>');

    var $cell1 = $('<td></td>');
    $cell1.append($nameAsLink);

    var $cell2 = $('<td></td>');
    $cell2.text(dist);

    $row.append($cell1);
    $row.append($cell2);

    $outputTableBody.append($row);
}
