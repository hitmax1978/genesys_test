// contact-list-card component
define(['component','request'],function(component,Request) {
    var ContactCard = function(sSelector) {
        var  c          = this
            ,contact    = {}
            ,mode       = null
            ;
        c.init(sSelector);

        // data
        var  firstNameInpt      = c.find('.inpt-first-name')
            ,lastNameInpt       = c.find('.inpt-last-name')
            ,fullNameSpn        = c.find('.spn-full-name')
            ,telMobInpt         = c.find('.inpt-tel-mob')
            ,telWorkInpt        = c.find('.inpt-tel-work')
            ,telHomeInpt        = c.find('.inpt-tel-home')
            ,companyInpt        = c.find('.inpt-company')
            ,noteTArea          = c.find('.inpt-note')
            ,noteTAreaWrapper   = c.find('.note-wrapper')
            ,allFields          = c.find('.contact-field')
            ,form               = c.find('.cc-form')
            ,saveContactBtn     = c.find('.btn-save-contact')
            ,editContactBtn     = c.find('.btn-edit-contact')
            ,removeContactBtn   = c.find('.btn-remove-contact')
            ,hideCardBtn        = c.find('.close')
            ;

        // clears contact
        var clearAllFields  = function() {
            form[0].reset();
            contact = {};
        }

        // renders contact-card-view according to locat "contact" object
        var render = function() {
            var bEditOrAdd = mode == 'edit' || mode == 'add';
            firstNameInpt.val(contact.first_name);
            lastNameInpt.val(contact.last_name);
            fullNameSpn.html(contact.first_name + ' ' + contact.last_name);
            telMobInpt.val(contact.tel_mob);
            telWorkInpt.val(contact.tel_work);
            telHomeInpt.val(contact.tel_home);
            companyInpt.val(contact.company);
            noteTArea.val(contact.note);
            noteTAreaWrapper[bEditOrAdd ? 'show' : 'hide']();
            saveContactBtn[bEditOrAdd ? 'show' : 'hide']();
            editContactBtn.add(removeContactBtn)[mode == 'show' ? 'show' : 'hide']();
            allFields.prop('readonly',bEditOrAdd ? '' : 'true')[bEditOrAdd ? 'removeClass' : 'addClass']('form-control-plaintext');
            firstNameInpt.add(lastNameInpt)[bEditOrAdd ? 'show' : 'hide']();
            fullNameSpn[!bEditOrAdd ? 'show' : 'hide']();
            c.elem.show();
        }

        // starts editing contact
        var edit = function() {
            mode = 'edit';
            render();
        }

        // handle server's response on Save event
        var handleContactSaving = function(oResponse) {
            if (oResponse.success) {
                var  bContactWasInEditMode = mode == 'edit'
                    ,bContactWasInInsertMode = mode == 'add'
                    ;
                if (bContactWasInEditMode)
                    c.onAfterEdit(contact);
                mode = 'show';
                render();
                
                if (bContactWasInInsertMode) {
                    contact.id = oResponse.id;
                    c.onAfterSave(contact);
                }
            } else {
                alert(oResponse.error_text);
            }
        }

        // handle server's response on Remove event
        var handleContactRemoving = function(oResponse) {
            if (oResponse.success) {
                c.elem.hide();
                c.onAfterRemove(oResponse.id);
            }
        }

        // when user press "Done" button
        var done = function() {
            var request = new Request();
            contact.first_name  = firstNameInpt.val();
            contact.last_name   = lastNameInpt.val();
            contact.tel_mob     = telMobInpt.val();
            contact.tel_work    = telWorkInpt.val();
            contact.tel_home    = telHomeInpt.val();
            contact.company     = companyInpt.val();
            contact.note        = noteTArea.val();
            request.post('scripts/php/saveContact.php',contact,handleContactSaving);
        }

        // sends request to remove current contact
        var remove = function() {
            var request = new Request();
            if (window.confirm('Sure?'))
                request.post('scripts/php/removeContact.php',{'id':contact.id},handleContactRemoving);
        }

        // shows contact's card
        c.show = function(oContact) {
            contact = JSON.parse(JSON.stringify(oContact)); // let's clone contact object into local value
            mode = 'show';
            render();
        }

        // adds empty contact 
        c.add = function() {
            clearAllFields();
            mode = 'add';
            render();
        }

        // closes contact card form
        c.close = function() {
            c.elem.hide();
        }

        // for external actions 
        c.onAfterEdit = function() {}
        c.onAfterSave = function() {}
        c.onAfterRemove = function() {}

        // local events
        saveContactBtn.on('click',done);
        hideCardBtn.on('click',c.close);
        editContactBtn.on('click',edit);
        removeContactBtn.on('click',remove);
    }
    ContactCard.prototype = new component();
    return ContactCard;
});