
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

    const WEATHER_API_PATH = 'http://api.openweathermap.org/data/2.5/weather?'
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
            console.log(data.name);
        });
    });
});

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
        success: callback
    });
}
