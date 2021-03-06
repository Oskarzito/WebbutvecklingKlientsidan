
/*
    Programmet implementerar funktionalitet för uppgift 3.5.2 Filläsning.
    Denna fil hanterar inläsning av filer enligt uppgiften:

    Gör ett JavaScript-program som med hjälp av jQuery och File API implementerar
    att användaren, via en länk, kan läsa in och visa:
    * Flera textfiler

    Notera, gjorde ett antagande att 'via en länk' menar att man gömmer input-elementet
    och istället gör en annan fin knapp (av en länk) för att simulera att man tryckt
    för filinmatning
*/

$(document).ready(function () {
    //Selektorvariabler
    var FILE_LINK_BUTTON = '[data-input="files-real-btn"]';
    var FILE_INPUT = '[data-input="files-hidden-btn"]';
    var FILE_OUTPUT = '[data-output="files"]';

    //Lägg en klicklyssnare på länkknappen
    $(FILE_LINK_BUTTON).on('click', function (event) {
        /*När man klickar på länken, kalla på fil-input-elementets klick-funktion
        vilket öppnar ett filväljarfönster*/
        $(FILE_INPUT).click();
    });

    //Lägg en lyssnare på fil-input-elementet när man laddat in en eller fler filer
    $(FILE_INPUT).on('change', function (event) {
        console.log($(this).val());

        //$files är en array av alla inlästa filer
        var $files = $(this).prop('files');

        //Gå igenom alla filer
        for(var i = 0; i < $files.length; i++){
            console.log($files[i].name);

            //file än nuvarande fil
            var $file = $files[i];

            var reader = new FileReader();

            //Eftersom FileReader är asynchronous lägger vi en load-lyssnare på reader
            $(reader).on('load', function (event) {
                //Skriv ut innehållet i nuvarande fil til $output
                var $output = $(FILE_OUTPUT);
                /*Istället för att skriva ny text varje gång appendar vi innehållet
                så att alla filer skrivs ut*/
                $output.text($output.text() + ' ' + event.target.result);
                //Ett streck som urskiljer varje fil från varandra i utskriften
                $output.text($output.text() + ' ________________________________________________________________________________');
            });

            //Läs in innehållet i filen
            reader.readAsText($file);
        }
    });
});
