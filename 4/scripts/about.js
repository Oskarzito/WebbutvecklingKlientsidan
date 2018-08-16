
/*
    JS-filen implementerar funktionalitet till sidan about.html.
    Det som hanteras här är formulärvalidering för "åsiktsformuläret"
    en besökare på hemsidan kan fylla i
*/

$(document).ready(function () {
    //Selektorvariabler
    const RANGE_SLIDER_SELECTOR = '[data-input="range-slider"]';
    const FORM_SELECTOR = '[data-form="opinion"]';
    const NAME_INPUT_SELECTOR = '[data-input="name"]';
    const COMMENT_SELECTOR = '[data-input="comment"]';

    //Skriver ut nuvarande värdet på range slidern vid ändring
    $(RANGE_SLIDER_SELECTOR).on('input', function (event) {
        $('[data-output="slider"]').text($(this).val());
    });

    //Återställer text för range-värdet när formuläret återställs
    $(FORM_SELECTOR).on('reset', function (event) {
        $('[data-output="slider"]').text('5');
    });

    //Lyssnare på när namnet skrivs in
    $(FORM_SELECTOR).on('input', '[name="nameInput"]', function (event) {
        var name = event.target.value;
        //Validerar om ett namn är giltigt
        if(isValidName(name)) {
            event.target.setCustomValidity('');
        } else {
            //Visar felmeddelande vid input-rutan
            var message = name + ' är inte ett giltigt namn. Får bara vara bokstäver (minst en)!';
            event.target.setCustomValidity(message);
        }
    });

    //Submit-hantering av formuläret
    $(FORM_SELECTOR).on('submit', function (event) {
        event.preventDefault();

        const MODAL_BOX_SELECTOR = '[data-target="#confirmCancelModal"]';
        //Inmatade värden
        var name = $(NAME_INPUT_SELECTOR).val();
        var grade = $(RANGE_SLIDER_SELECTOR).val();
        var comment = $(COMMENT_SELECTOR).val();

        if(comment.length == 0) {
            comment = 'Ingen kommentar? :\'(';
        }

        //Skapa mail-bodyn (innehållet i mailet som inte är rubrik)
        var message = 'Namn: ' + name + '%0D%0A%0D%0ABetyg: ' + grade +'%0D%0A%0D%0AKommentar: ' + comment;

        //Skapar mailto-länken och sätter länken att href:a till mailto-länken
        var href = 'mailto:osem6498@student.su.se?subject=Åsikt_På_Ditt_Gesällprov&body=' + message;
        var $mailToLink = $('[data-link="open-mail-client"]');
        $mailToLink.prop('href', href);

        //När man klickar ja för att skicka, stäng modalboxen och återställ formuläret
        $mailToLink.on('click', function () {
            $('[data-dismiss="modal"]').click(); //Stänger boxen
            this.reset();
        }.bind(this));

        //Öppnar modalboxen vid submit
        $(MODAL_BOX_SELECTOR).click();
    });
});

/**
    Validerar en sträng mot mönstret: 'minst en bokstav'
    @param email Sträng att matcha mot RegEx-mönstret
    @return      Boolean om parametern matchade mönstret eller ej
*/
function isValidName(name) {
    var regx = /^[a-zA-Z]+$/;
    return regx.test(name);
}
