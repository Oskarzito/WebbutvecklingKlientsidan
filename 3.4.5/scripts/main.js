
var NAME_INPUT_SELECTOR = '[data-input="name"]';
var EMAIL_INPUT_SELECTOR = '[data-input="email"]';
var NAME_HINT_SELECTOR = '[data-name-hint="nameHint"]';
var EMAIL_HINT_SELECTOR = '[data-email-hint="emailHint"]';
var FORM_SELECTOR = '[data-list-form="form"]';

$(document).ready(function () {

    var $form = $(FORM_SELECTOR);

    initializeForm($form);
/*
    $(NAME_INPUT_SELECTOR).focusin(function (event) {
        console.log('fucus in på namn');
        $(NAME_HINT_SELECTOR).show();
    });

    $(NAME_INPUT_SELECTOR).focusout(function (event) {
        console.log('fucus ut på namn');
        $(NAME_HINT_SELECTOR).hide();
    });
    */

    $form.on('input', '[name="emailAdress"]', function(event){
        var email = event.target.value;
        var message = '';
        if(isValidEmail(email)){
            event.target.setCustomValidity('');
        } else {
            message = email + ' är inte en giltig adress. Måste sluta på "@su.se"';
            event.target.setCustomValidity(message);
        }
    });

    $form.on('submit', function (event) {
        event.preventDefault();
        console.log('submit klickat');

        //Vid submit loggas inmatade datan i detta objekt
        var data = {};

        //serializeArray skapar en array av name-value-objekt för att sedan spara i ett data-objekt
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
    });
});


function initializeForm($form) {

    /*Börja med att gömma alla span-element.
    Eftersom endast hintmeddelandena är spans och inget annat
    funkar detta bra här. När inget input har fokus visas ingen hint*/
    $('span').hide();

    //Reagerar på när en input får fokus
    $('input').focusin(function (event) {
        //Kollar data-attributet hos inputen och visar rätt hint vid rätt inputruta
        if($(this).data('input') === 'name'){
            $(NAME_HINT_SELECTOR).fadeIn(100);
        } else if ($(this).data('input') === 'email') {
            $(EMAIL_HINT_SELECTOR).fadeIn(100);
        }
    });

    $('input').focusout(function (event) {
        if($(this).data('input') === 'name'){
            $(NAME_HINT_SELECTOR).fadeOut(750);
        } else if ($(this).data('input') === 'email') {
            $(EMAIL_HINT_SELECTOR).fadeOut(750);
        }
    });

    //Sätt fokus på första inputfältet
    $form.find(NAME_INPUT_SELECTOR).focus();
}

function isValidEmail(email) {
    return /.+@su.se$/.test(email);
}
