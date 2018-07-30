
$(document).ready(function () {
    var IMAGE_SELECTOR = '[data-image="image"]';

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

    //Rita raka linjer och kurvlinjer
    var canvas1Id = 'c1';
    var context1 = canvasPlus(canvas1Id);
    //Rak linje
    context1.drawLine(0, 0, 400, 200);
    //Kurvlinje (cirkel)
    context1.drawCircle("stroke", 200, 100, 50);


    /*
        För att visa kunskap även med vanliga canvas (utan bibliotek) gör jag
        det nu istället för CanvasPlus
    */

    //Rita bézier-kurvor och former ifyllda med både färg, mönster och gradienter
    var canvas2 = document.getElementById('c2');

    var ctxColor = canvas2.getContext('2d');
    //Röd bezierkurva
    ctxColor.beginPath();
    ctxColor.moveTo(30,30);
    ctxColor.bezierCurveTo(30, 200, 250, 100, 250, 30);
    ctxColor.closePath();
    ctxColor.lineWidth = 2;
    ctxColor.strokeStyle = 'red';
    ctxColor.stroke();

});
