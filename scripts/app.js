// main app starts here
define(function(require) {
    var  SearchBar              = require('searchBar')
        ,ContactList            = require('contactList')
        ,ContactCard            = require('contactCard')
        ,searchBarComponent     = new SearchBar('.search-bar')
        ,contactListComponent   = new ContactList('.contact-list')
        ,contactCardComponent   = new ContactCard('.contact-card')
        ;
    // links searchBar onSearch event and contact-list filter method
    searchBarComponent.onSearch                     = contactListComponent.filter;
    
    // what to do if user clicks on contact-list item / add contact button 
    contactListComponent.onItemClick                = contactCardComponent.show;
    contactListComponent.onAddContactButtonClick    = contactCardComponent.add;
    
    // what to do after contact-list-card events (add, edit, remove)
    contactCardComponent.onAfterEdit                = contactListComponent.refreshItem;
    contactCardComponent.onAfterSave                = contactListComponent.refresh;
    contactCardComponent.onAfterRemove              = contactListComponent.removeItem;

});