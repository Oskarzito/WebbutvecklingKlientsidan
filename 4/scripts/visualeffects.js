
/*
    JS-filen implementerar visuella effekter för index.html.
    Jag har separerat funktionerna med '//____________'-kommentarer
    för läsbarhet om vad som är vad. Därav är variabeldeklarationer
    gjorda precis innan de används istället för högst upp (vilket brukar
    vara snyggare kodstil).
*/



$(document).ready(function () {
    //____________ TypeWriter-animation när man laddar in sidan ____________
    var $welcomeElement = $('[data-text="welcome"]');
    var welcomeText = 'Välkommen till gesällprovet!';
    var charAtIndex = 0;

    //Skriver ut en bokstav per intervall. När texten skrivits ut clear:as intervallet
    var interval = setInterval(function () {
        if (charAtIndex < welcomeText.length) {
            $welcomeElement.text($welcomeElement.text() + welcomeText.charAt(charAtIndex));
            charAtIndex++;
        } else {
            clearInterval(interval);
        }
        console.log('varv');
    }, 70);
    //______________________________________________________________________

    //____________ Scroll-indikator-animation när man scrollar på sidan ____

    var PROGRESSBAR_SELECTOR = $('[data-progressbar="main"]');

    //Lyssnare på när webbsidan scrollas. Detta målar om scroll-progress-indikatorn
    $(window).on('scroll', function (event) {
        /*Har tagit hjälp från diverse YouTube-videor samt W3Schools för att
        lyckas räkna ut de rätta värdena som krävs för denna effekt*/
        var top = $(window).scrollTop();
        var documentHeight = $(document).height();
        var windowHeight = $(window).height();
        var scrollDistance = (top / (documentHeight - windowHeight)) * 100;

        //Ändra färg till så mycket man scrollat i procent
        $(PROGRESSBAR_SELECTOR).css('width', scrollDistance + '%');

    });


});