
/**
    IIFE som omsluter ListManager-funktionaliteten.

    @param window Det globala window-objektet
*/
(function (window) {
    'use strict';
    console.log('LM Loaded');

    /*Om window.Application inte har ett värde, tilldela Application ett tomt objekt.
    Annars, tilldela Application värdet av window.Application.
    För förtydligande, se main.js högst upp.
    */
    var Application = window.Application || {};

    /**
        Konstruktor för checklistan

        @param selectedElement Sträng-identifierare för det HTML-element man vill välja ut
    */
    function ListManager(selectedElement) {
        console.log('Ny ListManager');
        if (!selectedElement) {
            throw new Error('Inget valt element!');
        }

        //Välj ut elementet via jQuery och tilldela det till $element
        this.$element = $(selectedElement);
        //Om elementet man valt inte finns, kasta undantag
        if(this.$element === 0) {
            throw new Error('Inget element med det namnet!');
        }
    }

    /**
        Lägger till en lyssnare på samtliga nya checkbox-element när användaren matat in något
        och tryckt på 'Spara!'
    */
    ListManager.prototype.addClickListener = function () {
        /*'input' är en 'filtering selector' som gör att funktionen endast reagerar
        om man klickade på en 'input' som ligger i checklistan */
        this.$element.on('click', 'input', function (event) {
            console.log('Klickat på item');
            event.preventDefault();
            //Tar bort elementet genom att identifiera elementets 'value'
            this.removeItem(event.target.value);
        //Binder funktionen att peka på checklistan istället 'this' som pekar på funktionen
        }.bind(this));
    };

    /**
        Adderar ett element till 'ska göras'-listan

        @param textContent Text användaren matat in i inputrutan
    */
    ListManager.prototype.addItem = function (textContent) {
        console.log('Add item');
        //Skapa list-elementet och lägger till det (append) till div:en 'todo' ("ska göras").
        var item = new ListItem(textContent);
        this.$element.append(item.$element);
    };

    /**
        Tar bort ett element från 'ska göras'-listan och lägger till det i
        'gjorts'-listan

        @param textContentToRemove Textinnehållet i ett list-element som identifierar elementet
    */
    ListManager.prototype.removeItem = function (textContentToRemove) {
        console.log(textContentToRemove);
        this.$element.find('[value="' + textContentToRemove + '"]').closest('[data-list-todo="listItem"]').remove();
        console.log('Remove item');
        $('.done-list').append($('<li></li>', {'class': 'done-list-items'}).text(textContentToRemove));
    };

    /**
        Konstruktor för ett element som ska vara i en lista för element

        @param content Text användaren matat in i inputrutan
    */
    function ListItem(content) {
        //Skapa respektive delelement för ett list-item
        var $div = $('<div></div>', {'data-list-todo': 'listItem', 'class': 'checkbox'});
        var $label = $('<label></label>');
        var $checkbox = $('<input></input>', {type: 'checkbox', value: content});

        console.log(content);

        //Bygg upp ett sub-DOM-träd
        $label.append($checkbox);
        $label.append(content);
        $div.append($label);

        //Assigna div till propertyt $element
        this.$element = $div;
    }

    /*Tilldela ListManager till namespace:et Application och exportera det
    så det blir åtkomligt på andra ställen via window*/
    Application.ListManager = ListManager;
    window.Application = Application;


})(window);
