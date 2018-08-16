

/**
    JS-filen adderar lyssnarfunktionalitet på lådmenyn uppe till vänster.

    Alla HTML-filer som länkar in drawermenu.css samt drawermenu.js
    får en fungerande lådmeny uppe till vänser (dvs om HTML-koden också
    skapar ett menyelement)
*/
$(document).ready(function () {
    const ESC_KEY = 27;
    const DRAWER_MENU_BUTTON_SELECTOR = '[data-button="drawer-menu-btn"]';
    const DRAWER_MENU_SELECTOR = '[data-menu="drawer-menu"]';
    const CLOSE_DRAWER_SELECTOR = '[data-button="close-drawer"]';

    //Klicklyssnare på knappen som öppnar menyn
    $(DRAWER_MENU_BUTTON_SELECTOR).on('click', function (event) {
        $(DRAWER_MENU_SELECTOR).css('width', '200px');
    });

    //Klicklyssare på pil-ikonen som stänger menyn
    $(CLOSE_DRAWER_SELECTOR).on('click', function (event) {
        event.preventDefault();
        $(DRAWER_MENU_SELECTOR).css('width', '0');
    });

    //När man klickar på ESC-knappen stängs lådmenyn (om den är öppen såklart. Annars händer inget)
    $(document.body).on('keyup', function (event) {
        event.preventDefault();
        if(event.keyCode === ESC_KEY) {
            $(DRAWER_MENU_SELECTOR).css('width', '0');
        }
    });
});
