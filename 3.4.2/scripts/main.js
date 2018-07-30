
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
    var canvas1 = 'c1';
    var context1 = canvasPlus(canvas1);
    context1.drawLine(0, 0, 400, 200);
    context1.drawCircle("stroke", 200, 100, 50);

    /*var canvas2 = 'c2';
    var context2 = canvasPlus(canvas2);
    context2.draw
    */
});
