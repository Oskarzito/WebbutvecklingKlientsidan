
(function (window) {
    'use strict';

    console.log('FH loggad');
    var Application = window.Application || {};

    function FormHandler(selectedElement) {
        console.log('Ny FormHandler');
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

    FormHandler.prototype.addSubmitListener = function (func) {
        console.log('Lyssnare adderad');

        this.$element.on('submit', function (event) {
            console.log('Submit klickad');
            event.preventDefault();
            var text = $('#listInputId').val();
            func(text);
        });

    };

    Application.FormHandler = FormHandler;
    window.Application = Application;

})(window);
