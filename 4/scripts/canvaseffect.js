
/*
    JS-filen implementerar och hanterar canvasen på index.html. Denna fil ritar
    ut allt relevant innehåll i canvasen. Det som ritas ut är:
        - En streckgubbe
        - En pratbubbla så det ser ut som streckgubben säger något
        - Text i pratbubblan
        - Text som säger att man ska klicka på rutan
*/

$(document).ready(function () {

    var $canvas = $('#canvas-stickman');
    var context = $canvas[0].getContext('2d');

    //Huvud
    context.save();
    context.translate(86, 135.5);
    context.scale(1, 0.92);
    context.beginPath();
    context.arc(0, 0, 49, 0, 6.3, false);
    context.stroke();
    context.closePath();
    context.restore();

    //Kropp
    context.beginPath();
    context.moveTo(85, 181);
    context.lineTo(85, 262);
    context.stroke();
    context.closePath();

    //Höger ben
    context.beginPath();
    context.moveTo(85, 262);
    context.lineTo(123, 330);
    context.stroke();
    context.closePath();

    //Vänster ben
    context.beginPath();
    context.moveTo(86, 262);
    context.lineTo(52, 325);
    context.stroke();
    context.closePath();

    //Armarna (ett streck för båda armar)
    context.beginPath();
    context.moveTo(38, 250);
    context.lineTo(152, 169);
    context.stroke();
    context.closePath();

    //Pratbubblan
    context.save();
    context.translate(272.5, 55.5);
    context.scale(1, 0.21);
    context.beginPath();
    context.arc(0, 0, 160, 0, 6.3, false);
    context.stroke();
    context.closePath();
    context.restore();

    //Text gubben säger
    context.font = '14px Times New Roman';
    var talkMessage = 'Du har väl inte missat de geografiska tjänsterna?';
    context.fillText(talkMessage, 150, 60);

    //Text som säger att man ska klicka för att komma till nästa sida
    var bottomLeftText = 'Klicka någonstans på rutan i så fall!'
    context.fillText(bottomLeftText, 650, 150);

    //Ena strecket från bubbla till mun
    context.beginPath();
    context.moveTo(159, 80);
    context.lineTo(145, 121);
    context.stroke();
    context.closePath();

    //Andra strecket från bubbla till mun
    context.beginPath();
    context.moveTo(145, 121);
    context.lineTo(193, 86);
    context.stroke();
    context.closePath();
});
