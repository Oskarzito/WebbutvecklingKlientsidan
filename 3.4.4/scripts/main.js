
/*
    Programmet implementerar kraven för uppgift 3.4.4 Utvidgbara gränssnitt

    Samtliga saker nedan är gjorda:
    * Tabbade paneler
    * Tooltips

    Som hjälp användes jQuery UI
*/

//Färdigladdat dokument
$(document).ready(function () {
    //Gör tabbade paneler alla div:s med klassen 'tabs'
    $(function () {
        $('.tabs').tabs();
    });

    /*Dessa rader kod är bara för att man ska kunna testa tooltips lite extra.
    Koden lägger till ett (och samma) 'title'-attribut till alla paragrafer.
    Detta fyller ingen funktion, utan är bara för att testa uppgiftens krav*/
    var title = 'JAG ÄR EN TITEL OCH DETTA ÄR ETT TOOLTIP';
    $('p').each(function () {
        $(this).attr('title', title);
    });

    /*Fixar tooltip så att titeln visas hos alla element med ett 'title'-attribut
    när man håller musen ovan*/
    $('[title]').tooltip();
});
