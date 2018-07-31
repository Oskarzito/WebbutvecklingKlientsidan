
/*
    Programmet implementerar funktionaliteten till uppgift 3.4.3 Navigering

    Samtliga saker nedan är gjorda:
    * Att alla externa länkar på en webbsida öppnas i ett nytt fönster med hjälp
      av automatiskt införande av attributet target="_blank" för dessa länkar

    * En animerad navigationslist med drop-down menyer eller liknande
*/

$(document).ready(function () {
    //Selektorvariabler
    var MENU_BUTTON_SELECTOR = '[data-button="dropdown-menu"]';
    var DROPDOWN_MENU = '[data-menu="dropdown-menu"]';
    var NAV_SELECTOR = '[data-nav="navigation-menu"]';

    //Lyssnare på när man hovrar över menyelementet (knappen)
    $(NAV_SELECTOR).hover(function () {
        /*Om en animation håller på, gör inget. Detta är för att
        förhindra att man snabbt drar in och ut muspekarer massvis
        av gången och får animationer i efterhand.

        Om en animation INTE håller på, animera ned menyn via slideDown() i en sekund*/
        if(!($(DROPDOWN_MENU).is(':animated'))){
            $(DROPDOWN_MENU).slideDown(1000);
        }
    }, function () {
        //När musen lämnar menyn, animera upp menyn via slideUp() i en sekund
        $(DROPDOWN_MENU).slideUp(1000);
    });

    /*Selektera alla länktaggar via jQuery. För alla länk-element (via 'each()'), sätt
    deras target-attribut till '_blank' så öppnas dessa i nya fönster*/
    $('a').each(function () {
        $(this).attr('target', '_blank');
    })
});
