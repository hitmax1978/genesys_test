// contact-list component
define(['component','request'],function(component,Request) {
    var ContactList = function(sSelector) {
        var  c                      = this
            ,contacts               = {}
            ,filterString           = ""
            ,jqActiveItem           = null
            ;

        c.init(sSelector);
        
        var  contactItemTemplate    = c.find('.contact-list-item.tpl')
            ,contactAddBtn          = c.find('.btn-add-contact')
            ;

        // filters contact list. Gets filter string as input parameter
        c.filter = function(sFilterString) {
            filterString = sFilterString;
            console.log('filter=' + sFilterString);
            $.each(contacts, function(id,oContact) {
                var jqContactItem = c.find('.contact-list-item[data-contact-id="' + oContact.id + '"]');
                if (filterString.length 
                    && !oContact.first_name.match(new RegExp(filterString, 'i')) 
                    && !oContact.last_name.match(new RegExp(filterString, 'i'))) {
                        jqContactItem.hide();
                    } else {
                        jqContactItem.show();
                    }
            });
        }

        // refreshes contact-list from server, and id oContact is defined - marks it as active
        c.refresh = function(oContact) {
            load(oContact);
        }

        // clears current active contact-list item
        var clearActiveItem = function() {
            c.find('.cl-item-active').removeClass('cl-item-active');
            jqActiveItem = null;
        }

        // performs local actions before external "New contact" action
        var add = function() {
            clearActiveItem();
            c.onAddContactButtonClick();
        }

        // performs external actions defined for "New contact" button
        c.onAddContactButtonClick = function() {
            
        }

        // when user clicks on contact-list item
        var itemClick = function() {
            var  jqContactItem  = $(this)
                ,sContactId     = jqContactItem.attr('data-contact-id')
                ;
            if (jqActiveItem) {
                jqActiveItem.removeClass('cl-item-active');
            }  
            jqContactItem.addClass('cl-item-active');
            jqActiveItem = jqContactItem;  
            c.onItemClick(contacts[sContactId]);
        }

        // performs external actions defined for "onItemClick" event
        c.onItemClick = function() {

        }

        // clears internal "contacts" object
        var clearContacts = function() {
            contacts = {};
        }

        // fills all html data at current contact, found by id (sContactId)
        var renderItem = function(sContactId) {
            var jqItem = c.find('.contact-list-item[data-contact-id="' + sContactId + '"]');
            jqItem.find('.cli-first-name').html(contacts[sContactId].first_name);
            jqItem.find('.cli-last-name').html(contacts[sContactId].last_name);
            jqItem.find('.cli-tel-any').html(contacts[sContactId].tel_mob || contacts[sContactId].tel_work || contacts[sContactId].tel_home);
        }

        // refreshes contact's html data, defined in oContact object
        c.refreshItem = function(oContact) {
            var  sContactId         = oContact.id
                ,oTmpContact        = JSON.parse(JSON.stringify(oContact));   
                ;
            contacts[sContactId]    = oTmpContact;
            renderItem(sContactId);
        }

        // removes contact from internal "contacts" object and from html
        c.removeItem = function(sContactId) {
            var jqItem = c.find('.contact-list-item[data-contact-id="' + sContactId + '"]');
            jqItem.fadeOut();
            delete contacts[sContactId];
        }

        // renders contact-list based on "contacts" object, marks an item as active if oActiveItem set
        var render = function(oActiveItem) {
            c.elem.find('.contact-list-item:not(.tpl)').remove();
            $.each(contacts, function(sContactId,oContact) {
                var jqNewContactItem = contactItemTemplate.clone()
                                            .appendTo(c.elem)
                                            .removeClass('tpl')
                                            .attr('data-contact-id',sContactId)
                                            ;
                if (typeof oActiveItem == 'object' && oActiveItem.id == sContactId) {
                    jqNewContactItem.addClass('cl-item-active');
                    jqActiveItem = jqNewContactItem;
                }
                renderItem(sContactId);
            });
        }

        // handles server's response with all contacts and holds activeItem (oContactCard)
        var handleContactsFromServer = function(oResponse,oContactCard) {
            clearContacts();
            for (var i = 0; i < oResponse.contacts.length; i++) {
                var element = oResponse.contacts[i];
                contacts[oResponse.contacts[i].id] = oResponse.contacts[i];
            }
            render(oContactCard);
        }

        // sends request to get all contacts from server
        var load = function(oContact) {
            var r = new Request();
            r.post('scripts/php/getContacts.php',{},function(oResponse) {
                handleContactsFromServer(oResponse,oContact)});
        }

        // executes when contact-list initializes
        var main = function() {
            load();
        }

        main();
        
        //events
        c.elem.on('click','.contact-list-item', itemClick);
        contactAddBtn.on('click',add);
    }
    ContactList.prototype = new component();
    return ContactList;
});