
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
        console.log(this);
        this.reset();
        this.elements[0].focus();
    });
});


function initializeForm($form) {

    $(NAME_HINT_SELECTOR).hide();
    $(EMAIL_HINT_SELECTOR).hide();

    $('input').focusin(function (event) {
        if($(this).data('input') === 'name'){
            $(NAME_HINT_SELECTOR).show();
        } else if ($(this).data('input') === 'email') {
            $(EMAIL_HINT_SELECTOR).show();
        }
    });

    $('input').focusout(function (event) {
        if($(this).data('input') === 'name'){
            $(NAME_HINT_SELECTOR).hide();
        } else if ($(this).data('input') === 'email') {
            $(EMAIL_HINT_SELECTOR).hide();
        }
    });

    //Sätt fokus på första inputfältet
    $form.find(NAME_INPUT_SELECTOR).focus();
}

function isValidEmail(email) {
    return /.+@su.se$/.test(email);
}
