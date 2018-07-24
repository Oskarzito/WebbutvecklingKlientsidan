

$(document).ready(function () {
    'use strict';
    console.log('Document ready');

    var FORM_SELECTOR = '[data-list-form="form"]';
    var LIST_SELECTOR = '[data-list-todo="todo"]';

    var FormHandler = window.Application.FormHandler;
    var formHandler = new FormHandler(FORM_SELECTOR);




    var ListManager = window.Application.ListManager;
    var listManager = new ListManager(LIST_SELECTOR);

    formHandler.addSubmitListener(function(text){
        console.log('fuck');
        listManager.addItem(text);
    });

    listManager.addClickListener();

    window.listManager = listManager;
    window.formHandler = formHandler;

});
