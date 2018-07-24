
(function (window) {
    'use strict';
    console.log('ListManager loggad');

    var Application = window.Application || {};

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

    ListManager.prototype.addClickListener = function () {
        //'input' är en 'filtering selector' som gör att funktionen endast reagerar
        //om man klickade på en 'input' som ligger i checklistan
        this.$element.on('click', 'input', function (event) {
            console.log('Klickat på item');
            event.preventDefault();
            this.removeItem(event.target.value);
        }.bind(this));
    };

    ListManager.prototype.addItem = function (textContent) {
        console.log('Add item');
        var item = new ListItem(textContent);
        this.$element.append(item.$element);
    };

    ListManager.prototype.removeItem = function (textContentToRemove) {
        console.log(textContentToRemove);
        this.$element.find('[value="' + textContentToRemove + '"]').closest('[data-list-todo="listItem"]').remove();
        console.log('Remove item');
        $('.done-list').append($('<li></li>', {'class': 'done-list-items'}).text(textContentToRemove));
    };

    /*
        content = sträng
    */
    function ListItem(content) {
        var $div = $('<div></div>', {'data-list-todo': 'listItem', 'class': 'checkbox'});

        var $label = $('<label></label>');

        var $checkbox = $('<input></input>', {type: 'checkbox', value: content});

        console.log(content);


        $label.append($checkbox);
        $label.append(content);
        $div.append($label);

        //Assigna div till propertyt $element
        this.$element = $div;
    }

    Application.ListManager = ListManager;
    window.Application = Application;


})(window);
