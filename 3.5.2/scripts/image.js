
/*
    Programmet implementerar funktionalitet för uppgift 3.5.2 Filläsning.
    Denna fil hanterar inläsning av bilder enligt uppgiften:

    Gör även ett JavaScript-program som med hjälp av jQuery och File API
    implementerar att användaren, via drag-and-drop, kan läsa in och visa:
    * En bildfil
*/

$(document).ready(function () {
    //Selektorvariabel
    var INPUT_AREA = '[data-input="image"]';

    //Dropzonen (div:element)
    var $dropArea = $(INPUT_AREA);

    //Lyssnare för dragenter
    $dropArea.on('dragenter', function (event) {
        //Stoppa defaulthändelser
        preventEvent(event);
        //Fin effekt för borderfärgen
        $(this).css('border-color', 'blue');
    });

    //Lyssnare för dragover
    $dropArea.on('dragover', function (event) {
        //Stoppa defaulthändelser
        preventEvent(event);
    });

    //Lyssnare för (om användaren eventuell skulle göra en) dragleave
    $dropArea.on('dragleave', function (event) {
        //Stoppa defaulthändelser
        preventEvent(event);
        //Fin effekt för borderfärgen
        $(this).css('border-color', 'black');
    });

    //Lyssnare för drop när användaren släpper bilden i dropzonen
    $dropArea.on('drop', function (event) {
        //Stoppa defaulthändelser
        preventEvent(event);
        //Fin effekt för borderfärgen
        $(this).css('border-color', 'black');

        /*Eftersom event.dataTransfer inte är detsamma som för det event jQuery
        skickar vill man komma åt det "riktiga" originaleventet för att sedan
        få åtkomst till datafilerna användaren droppat. Detta gör att
        man måste gå via originalEvent först*/
        var data = event.originalEvent.dataTransfer;

        //Inlästa (droppade) filerna
        var files = data.files;

        //Bilden är på plats 0 i inlästa-filer-arrayen (då det bara är 1 fil)
        var image = files[0];

        var reader = new FileReader();

        //Eftersom FileReader är asynchronous lägger vi en load-lyssnare på reader
        $(reader).on('load', function (event) {
            //Ta bildens dataURL och ändra i dropzonens CSS-bakgrund till bilden
            $dropArea.css('background-image', 'url("' + event.target.result + '")');
        });

        //Läs innehållet i filen som url
        reader.readAsDataURL(image);
    });
});

/**
    Stoppar defaulthändelser hos event

    @param event Ett event-objekt från händelsen som anropade funktionen
*/
function preventEvent(event) {
    //Stoppa propagering så inga andra element får eventet
    event.stopPropagation();
    //Hindra några default-händelser
    event.preventDefault();
}
