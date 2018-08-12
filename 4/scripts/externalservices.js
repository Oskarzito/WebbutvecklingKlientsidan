
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
        var position = marker.getPosition();
        console.log(position.lat() + ' - ' + position.lng());
        var lat = 'lat=' + position.lat();
        var lng = 'lon=' + position.lng();

        var url = WEATHER_API_PATH + lat + '&' + lng + WEATHER_API_KEY;
        getData(url, function (data) {
            var place = data.name;
            var temperature = Math.round(data.main.temp);
            console.log(place + ' ' + temperature);
            updateOutput(data);
        });
    });

    var $placeForm = $('[data-form="place-form"]');
    $placeForm.on('submit', function (event) {
        event.preventDefault();
        console.log('subbbbbmit');
        var input = $('[data-input="place"]').val();
        var url = WEATHER_API_PATH + 'q=' + input + WEATHER_API_KEY;
        getData(url, function (data) {
            updateOutput(data, function (data) {
                /*Denna callbackfunktion justerar kartan
                så den hamnar på platsen man skrev in*/
                var lat = data.coord.lat;
                var lng = data.coord.lon;
                var coordinate = new google.maps.LatLng(lat, lng);
                marker.setPosition(coordinate);
                map.panTo(coordinate);
            });
        });
    });

});

function updateOutput(data, callback) {
    var $placeOutput = $('[data-output="place"]');
    var $tempOutput = $('[data-output="temp"]');
    if(data.cod === 200) {
        $placeOutput.text(data.name);
        $tempOutput.text(Math.round(data.main.temp) + ' grader');

        if(callback) {
            callback(data);
        }
    } else {
        $placeOutput.text('Obefintlig plats! Testa en annan!');
    }
}

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
    API-anrop till specificerad URL
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
