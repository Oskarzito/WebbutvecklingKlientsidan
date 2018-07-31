
/*
    Programmet implementerar uppgift 3.4.2 Bildhantering
    Samtliga saker nedan är gjorda:

    Gör ett JavaScript-program som med hjälp av jQuery implementerar:
        * Bildbyte (attr)
        * Bildbyte med rollover-effekt

    * Använd förladdade bilder för att inte få några fördröjningar.

    Gör även ett JavaScript-program som implementerar:
        * Dynamisk grafik med HTML5-elementet canvas:
            * Rita raka linjer och kurvlinjer
            * Rita bézier-kurvor och former ifyllda med både färg, mönster och gradienter
            * Rita text (exempelvis dagens datum/tid)
            * Använda transparens och skuggor
            * Lägga till en eller flera bitmappad bilder
            * Använda en teknik för att spara bilden
*/

$(document).ready(function () {
    //Taggen för rollover-bild-elementet
    var IMAGE_SELECTOR = '[data-image="image"]';

    //Bilder från iconarchive
    //Förladdade (preloaded) bilder
    var img1 = new Image();
    var img2 = new Image();
    img1.src = 'images/amazon.png';
    img2.src = 'images/dropbox.png';

    //Lägger till en rollover-effekt till bilden genom att addera en hover-lyssnare
    $(IMAGE_SELECTOR).hover(function () {
        //Vid mouse over
        //Fada ut nuvarande bild
        $(this).fadeOut(800, function () {
            //Byt bild
            $(this).attr('src', img2.src);
            //Fada in nya bilden
            $(this).fadeIn(800);
        });
    }, function () {
        //Vid mouse out
        //Fada ut nuvarande bild
        $(this).fadeOut(800, function () {
            //Byt bild
            $(this).attr('src', img1.src);
            //Fada in nya bilden
            $(this).fadeIn(800);
        });
    });

    /*
        _________ Dynamisk grafik nedan med hjälp av ritbiblioteket CanvasPlus _________

        ("Om man vill så kan man använda ett ritbibliotek som CanvasPlus»
        och/eller Artisan JS» till hjälp.")

        Dokumentation:
        https://code.google.com/archive/p/canvasplus/wikis/API_Docs.wiki
    */

    //__________________________________________________________________________

    //Rita raka linjer och kurvlinjer
    var canvas1Id = 'c1';
    var context1 = canvasPlus(canvas1Id);
    //Rak linje
    context1.drawLine(0, 0, 400, 200);
    //Cirkel
    context1.drawCircle('stroke', 200, 100, 50);


    /*
        För att visa kunskap även med vanliga canvas (utan bibliotek) gör jag
        vanliga canvas-bilder nu istället för med CanvasPlus
    */

    //En gul kurvlinje med skugga
    canvas1 = document.getElementById(canvas1Id);
    context1 = canvas1.getContext('2d');
    context1.beginPath();
    context1.moveTo(30, 30);
    context1.quadraticCurveTo(30, 150, 350, 30);
    context1.strokeStyle = 'yellow';
    context1.lineWidth = 10;
    //Skugga
    context1.shadowColor = 'red';
    context1.shadowBlur = 25;
    context1.stroke();

    //__________________________________________________________________________

    //Rita bézier-kurvor och former ifyllda med både färg, mönster och gradienter

    //En bezierkurva med ett mönster
    var canvas2 = document.getElementById('c2');
    var ctxColor = canvas2.getContext('2d');

    ctxColor.beginPath();
    ctxColor.moveTo(30, 30);
    ctxColor.bezierCurveTo(30, 200, 250, 150, 250, 30);
    ctxColor.lineWidth = 20;
    //Mönster
    ctxColor.strokeStyle = ctxColor.createPattern(img1, 'repeat');
    ctxColor.stroke();

    //En blå bezierkurva med transparens och röd kant
    ctxColor.beginPath();
    ctxColor.moveTo(100, 40);
    ctxColor.bezierCurveTo(370, 180, 150, -75, 220, 50);
    //Röd kant
    ctxColor.strokeStyle = 'red';
    ctxColor.lineWidth = 5;
    ctxColor.closePath();
    //Transparens med alfavärde på 0.5
    ctxColor.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctxColor.fill();
    ctxColor.stroke();

    //__________________________________________________________________________

    //En form (triangel) med gradient (radial)
    var canvas3 = document.getElementById('c3');
    var ctxShapeTriangle = canvas3.getContext('2d');

    //Rita triangel
    ctxShapeTriangle.beginPath();
    ctxShapeTriangle.moveTo(70, 70);
    ctxShapeTriangle.lineTo(150, 190);
    ctxShapeTriangle.lineTo(300, 90),
    ctxShapeTriangle.closePath();

    //Skapa radial gradient
    var gradient = ctxColor.createRadialGradient(150, 100, 0, 150, 100, 150);
    gradient.addColorStop(0.000, 'rgb(255, 0, 0)');
    gradient.addColorStop(0.150, 'rgb(255, 0, 255)');
    gradient.addColorStop(0.300, 'rgb(0, 0, 255)');
    gradient.addColorStop(0.450, 'rgb(0, 255, 255)');
    gradient.addColorStop(0.600, 'rgb(0, 255, 0)');
    gradient.addColorStop(0.750, 'rgb(255, 255, 0)');
    gradient.addColorStop(1.000, 'rgb(255, 0, 0)');

    //Sätt gradienten på triangeln och måla den
    ctxShapeTriangle.fillStyle = gradient;
    ctxShapeTriangle.fill();

    //Även en fin stroke utanför triangeln
    ctxShapeTriangle.stroke();

    //En form gjord av bezierkurvor
    ctxShapeTriangle.beginPath();
    ctxShapeTriangle.moveTo(120, 20);
    ctxShapeTriangle.bezierCurveTo(380, 240, 8, 100, 230, 40);
    ctxShapeTriangle.strokeStyle = 'yellow';
    ctxShapeTriangle.lineWidth = 3;
    ctxShapeTriangle.closePath();
    //Sätt samma gradient på formen och måla den
    ctxShapeTriangle.fillStyle = gradient;
    ctxShapeTriangle.fill();
    ctxShapeTriangle.stroke();

    //__________________________________________________________________________

    // Rita text (exempelvis dagens datum/tid)
    var canvas4 = document.getElementById('c4');
    var ctxText = canvas4.getContext('2d');
    var date = new Date();
    //Rita ut datumet med storlek 13px samt i fonten Arial
    ctxText.font = "13px Arial";
    ctxText.fillText(date, 2, 100);

    //__________________________________________________________________________

    //Lägga till en eller flera bitmappad bilder
    var canvas5 = document.getElementById('c5');
    var ctxImage = canvas5.getContext('2d');
    //Rita ut amazon-bilden på koordinat x:100 y:100
    ctxImage.drawImage(img1, 100, 100);

    //__________________________________________________________________________

    //Använda en teknik för att spara bilden

    /*Boken säger här att en teknik är att spara bilden i en img-tagg och sedan
    kan klienten högerklicka för att spara bilden. Jag har gjort detta samt även
    en länk man kan klicka på för nedladdning av bilden*/

    //Hämta canvasens data-url
    var url = canvas1.toDataURL();

    //Referens till en nedladdningslänk-tagg
    var download = document.getElementById('download-link');

    //Sätt länkens attribut som filnamn vid nedladdnig och länkens href
    download.setAttribute('download', 'canvas1.png');
    download.setAttribute('href', url);
    //Nu vid klick på länk laddas bilden ned

    /*Hämta referens till ett img-element och sätt bildens src att visa canvas1
    som bild i HTML*/
    var savedImg = document.getElementById('savedImg');
    savedImg.src = url;
    //Vid högerklick på bilden kan man där sedan välja att spara den
});
