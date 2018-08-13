
/*
    JS-filen implementerar funktionalitet för lite API-anrop.
    Ett Google API sätter upp en google maps-karta. Via en lyssnare
    på kartans markör hämtas latitud och longitud från kartan
    när man droppar markören på en plats. Sedan får man lite
    väderinformation om platsen via ett API-anrop till openweathermaps.
*/

$(document).ready(function () {
    var map = initMap();
    var marker = initMarker(map);

    const WEATHER_API_PATH = 'http://api.openweathermap.org/data/2.5/weather?units=metric&'
    //var latlng = 'lat=59.334591&lon=18.063240'
    const WEATHER_API_KEY = '&APPID=f8a48d1a886d5c83eaf7ea5d8c0c6685'

    //Lägger till en lyssnare på när markören flyttas
    google.maps.event.addListener(marker, 'dragend', function () {
        //Hämtar positionen för markören
        var position = marker.getPosition();
        console.log(position.lat() + ' - ' + position.lng());
        var lat = 'lat=' + position.lat();
        var lng = 'lon=' + position.lng();
        //Bygger URL:en för API-anrop och skickar till getData utan callback
        var url = WEATHER_API_PATH + lat + '&' + lng + WEATHER_API_KEY;
        getData(url, function (data) {
            updateOutput(data);
        });
    });

    //Lyssnare som hanterar formulärsubmits
    var $placeForm = $('[data-form="place-form"]');
    $placeForm.on('submit', function (event) {
        event.preventDefault();
        var input = $('[data-input="place"]').val();

        //Bygg upp en URL av indatan och anropa getData
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
            });
        });
    });

    //Lägg lyssnare på lådmenyn
    setUpDrawerMenu();
});

/**
    Uppdaterar textelement på skärmen gällande plats och temperatur

    @param data Ett JSON-objekt från openweathermaps innhållande temperatur
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
    @param map Kartan som kommer få en markök på sig
    @return En Google Maps-markör
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
    Adderar lyssnarfunktionalitet på lådmenyn uppe till vänster.
*/
function setUpDrawerMenu() {
    const ESC_KEY = 27;
    const DRAWER_MENU_BUTTON_SELECTOR = '[data-button="drawer-menu-btn"]';
    const DRAWER_MENU_SELECTOR = '[data-menu="drawer-menu"]';
    const CLOSE_DRAWER_SELECTOR = '[data-button="close-drawer"]';

    //Klicklyssnare på knappen som öppnar menyn
    $(DRAWER_MENU_BUTTON_SELECTOR).on('click', function (event) {
        $(DRAWER_MENU_SELECTOR).css('width', '200px');
    });

    //Klicklyssare på pil-ikonen som stänger menyn
    $(CLOSE_DRAWER_SELECTOR).on('click', function (event) {
        event.preventDefault();
        $(DRAWER_MENU_SELECTOR).css('width', '0');
    });

    //När man klickar på ESC-knappen stängs lådmenyn(om den är öppen såklart. Annars händer inget)
    $(document.body).on('keyup', function (event) {
        event.preventDefault();
        if(event.keyCode === ESC_KEY) {
            $(DRAWER_MENU_SELECTOR).css('width', '0');
        }
    });

}
