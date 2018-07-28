
/*
    Programmet implementerar uppgift 3.4.5 Formulärhantering. Samtliga saker nedan är gjorda:

Ett dynamiskt formulär som innehåller flera enrads textboxar(4st), checkboxar(2st), radio-knappar(3st) och en submitknapp(1st) som reagerar direkt på användarens input:
    *Tydligt markerar och sätter fokus på det första inputfältet som användaren ska fylla i
    *Tydligt markerar det inputfält som användaren för tillfället fyller i
    *Disablar eller gömmer inputfält som användaren inte behöver fylla i (beroende på användarens tidigare val)
    *Enablar eller visar inputfält som användaren behöver fylla i (beroende på användarens tidigare val)
    *Validerar användarens input (att allt obligatoriskt är ifyllt och att det ifyllda stämmer enligt något mönster)

    *När submitknappen trycks ner ska en JavaScript-funktion köras.
*/

/*
    4 textboxar
    2 checkbox
    3 radioknappar
    1 submit
*/

var NAME_INPUT_SELECTOR = '[data-input="name"]';
var EMAIL_INPUT_SELECTOR = '[data-input="email"]';
var NAME_HINT_SELECTOR = '[data-name-hint="nameHint"]';
var EMAIL_HINT_SELECTOR = '[data-email-hint="emailHint"]';
var FORM_SELECTOR = '[data-list-form="form"]';
var DRINK_RADIO_BUTTON_GROUP = '[data-radio-button-group="drink"]';
var OTHER_DRINK_INPUT_FIELD_SELECTOR = '[data-input="other"]';
var OTHER_DRINK_TEXTBOX_SELECTOR = '[data-other-textbox="box"]';
var MISSING_INPUT_FIELD_SELECTOR = '[data-input="missing"]'; //Div:en
var ACCEPT_CHECKBOX_SELECTOR = '[data-checkbox="accept"]';
var MISSING_CHECKBOX_SELECTOR = '[data-checkbox="missingSomething"]';
var MISSING_INPUT_BOX_SELECTOR = '[data-missing-textbox="box"]'; //Inputboxen

$(document).ready(function () {

    //Selektera formuläret
    var $form = $(FORM_SELECTOR);

    //Initiera formuläret, skicka med formuläret som argument
    initializeForm($form);

    //Lyssnare på email-input-fältet som lyssnar vid varje förändring
    $form.on('input', '[name="emailAdress"]', function(event){
        //Hämta inputen från emailfältet
        var email = event.target.value;
        var message = '';
        //Kollar om email är giltig
        if(isValidEmail(email)){
            //Giltig email, inget fel
            event.target.setCustomValidity('');
        } else {
            //Ogiltig email, skriv felmeddelande vid rutan
            message = email + ' är inte en giltig adress. Måste sluta på "@su.se"';
            event.target.setCustomValidity(message);
        }
    });

    //Lyssnare för när en radioknapp i radiogruppen ändras
    $form.on('change', '[name="drink"]', function (event) {
        //Kolla om användaren valt 'Annat'
        if($('[value="other"]').is(':checked')) {
            //Visa div med ny inputruta här
            $otherInput = $(OTHER_DRINK_INPUT_FIELD_SELECTOR);
            $otherInput.slideToggle('normal');

            //Gör fältet required
            $(OTHER_DRINK_TEXTBOX_SELECTOR).prop('required',true);

            //Ge inputen fokuslyssnare för att justera bakgrunden
            $otherInput.focusin(function (event) {
                $(this).addClass('inputFocus');
            });
            $otherInput.focusout(function (event) {
                $(this).removeClass('inputFocus');
            });
        } else {
            //Om användaren byter radioknapp
            $otherInput = $(OTHER_DRINK_INPUT_FIELD_SELECTOR);
            //Stäng av fokuslyssnare
            $otherInput.off('focusin');
            $otherInput.off('focusout');
            //Göm diven
            $otherInput.slideUp();

            //Gör fältet ej required
            $(OTHER_DRINK_TEXTBOX_SELECTOR).prop('required',false);
            //Tömmer eventuellt inmatat värde
            $(OTHER_DRINK_TEXTBOX_SELECTOR).val('');
        }
    });

    //Lyssnare på 'saknas något'-checkboxen
    $(MISSING_CHECKBOX_SELECTOR).on('change', function (event) {
        //Referens till div:en
        var $missingInput = $(MISSING_INPUT_FIELD_SELECTOR);
        //Om boxen är icheckas, visa inputfält, annars, dölj fältet
        if($(this).is(':checked')){
            //Visa div:en
            $missingInput.slideToggle('normal');
            //Gör fältet required
            $(MISSING_INPUT_BOX_SELECTOR).prop('required',true);
        } else {
            //Göm div:en
            $missingInput.slideUp();
            //Gör att det inte är required för input
            $(MISSING_INPUT_BOX_SELECTOR).prop('required',false);
            //Tömmer eventuellt inmatat värde
            $(MISSING_INPUT_BOX_SELECTOR).val('');
        }
    });

    //Lyssnare på submit-händelsen. Kör på 'on()' istället för 'validate()'.
    //När submitlnappen trycks ner ska en JavaScript-funktion köras.
    $form.on('submit', function (event) {
        //Stoppa default
        event.preventDefault();

        //Kolla om checkboxen inte är klickad, visa felmeddelande och returnera om inte iklickad
        if(!($(ACCEPT_CHECKBOX_SELECTOR).is(':checked'))){
            alert('Du måste acceptera att din inmatade data skickas till ny flik först!');
            return;
        }

        /*Vid submit loggas inmatade datan i detta objekt. Observera att allt skickas.
        Detta är bara för att få något att hända vid submit*/
        var data = {};

        /*serializeArray skapar en array av name-value-objekt
        för att sedan spara dessa i data-objektet*/
        $(this).serializeArray().forEach(function (item) {
            data[item.name] = item.value;
        });

        /*När man klickar submit öppnas en ny tab och inmatade
        datan skrivs ut som ett JSON-objekt*/
        window.open('').document.write(JSON.stringify(data));

        //Töm formuläret från all inmatad data
        this.reset();

        //Sätt fokus på första inputrutan
        this.elements[0].focus();
        alert('klart!');
    });
});

/**
    Initerar formuläret genom att gömma relevanta hintmeddelanden och sätta
    fokus-lyssnare på inputfält

    @param $form Formuläret man vill initiera
*/
function initializeForm($form) {

    /*Börja med att gömma alla span-element.
    Eftersom endast hintmeddelandena är spans och inget annat
    funkar detta bra här. När inget input-element har fokus visas heller ingen hint*/
    $('span').hide();

    /*Fokuslyssnarna nedan markerar tydligt det inputfält som användaren för tillfället fyller i
    Reagerar på när en input får fokus*/
    $('input').focusin(function (event) {
        //Kollar data-attributet hos inputen och visar rätt hint vid rätt inputruta
        if($(this).data('input') === 'name'){
            //Visar namn-hint
            $(NAME_HINT_SELECTOR).fadeIn(100);
        } else if ($(this).data('input') === 'email') {
            //Visar mail-hint
            $(EMAIL_HINT_SELECTOR).fadeIn(100);
        }
        //Lägg till en CSS-klass
        $(this).addClass('inputFocus');
    });

    //Reagerar på när en input tappar fokus
    $('input').focusout(function (event) {
        //Kollar data-attributet hos inputen och gömmer rätt hint vid rätt inputruta
        if($(this).data('input') === 'name'){
            //Gömmer namn-hint
            $(NAME_HINT_SELECTOR).fadeOut(750);
        } else if ($(this).data('input') === 'email') {
            //Gömmer mail-hint
            $(EMAIL_HINT_SELECTOR).fadeOut(750);
        }
        //Ta bort en CSS-klass
        $(this).removeClass('inputFocus');
    });

    //Tydlig markering, och fokussättning på det första inputfältet som användaren ska fylla i
    $form.find(NAME_INPUT_SELECTOR).focus();

    /*Börja med att visa inputfält för 'Annan dryck' eftersom den
    radioknappen är checkad från början*/
    $(OTHER_DRINK_INPUT_FIELD_SELECTOR).slideToggle('normal');

    //Gör fältet required
    $(OTHER_DRINK_TEXTBOX_SELECTOR).prop('required',true);
}

/**
    Validerar en email enligt RegEx-mönstret 'Minst ett tecken, sedan avsluta på @su.se'
    (att det ifyllda stämmer enligt något mönster)

    @param email Sträng att matcha mot RegEx-mönstret
*/
function isValidEmail(email) {
    return /.+@su.se$/.test(email);
}
