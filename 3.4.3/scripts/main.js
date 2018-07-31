

$(document).ready(function () {
    var MENU_BUTTON_SELECTOR = '[data-button="dropdown-menu"]';
    var DROPDOWN_MENU = '[data-menu="dropdown-menu"]';

    $(MENU_BUTTON_SELECTOR).hover(function () {
        console.log('in');
        $(DROPDOWN_MENU).slideDown(1000);
    });

    $(DROPDOWN_MENU).mouseleave(function (){
        $(this).slideUp(1000);
    });
});
