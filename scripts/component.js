// Parent component for all web-components
define(function() {

function Component() {
    this.elem = null;
    
    this.init = function(sSelector) {
        this.elem = $(sSelector);
    }
    
    this.find = function(sSelector) {
        return this.elem.find(sSelector);
    }
    
    this.checkField = function(jqField) {
        var sPattern = jqField.attr('pattern')
            ,oRegExp = new RegExp(sPattern,'i')
            ;
        if (!jqField.val().match(oRegExp)) {
            
        }
    }
    
    this.val = function(mSelector) {
        var
             jqField = typeof mSelector == 'string'
                            ? this.elem.find(sSelector)
                            : mSelector
            ,sFieldType = jqField.attr('type')
            ,sFieldTagName = jqField.prop('tagName')
            ;
        if (sFieldType == 'radio') {                                        // 1. Переключатели (type=radio)
            var  jqForm      = jqField.closest(this.elem)
                ,sFieldName  = jqField.attr('name')
                ;
            return jqField.filter(':checked').val()
        }
        else if (sFieldTagName == 'SELECT') {                                   // 2. Выпадающие списки ( тег SELECT)
            return jqField.children('option').filter(':selected').val();
        }
        else if (sFieldType == 'checkbox') {                                   // 3. Флажки (type=checkbox)
            var sCheckboxes = '';
            jqField.filter(':checked').each(function () {
                var jqCheckbox = $(this);
                sCheckboxes += (sCheckboxes ? ', ' : '') + jqCheckbox.val();
            });
            return sCheckboxes;
        }
        else {                                          // 4. текстовые поля
            return jqField.val();
        }
    }
    
    this.setValue = function(jqField,sValue) {
        var  sFieldType = jqField.attr('type')
            ,sFieldTagName = jqField.prop('tagName')
            ;
        if (sFieldType == 'radio') {
            if (jqField.filter('[value=' + sValue + ']').length)
                jqField.filter('[value=' + sValue + ']').prop('checked', 'checked');
            else
                jqField.prop('checked',false);
            return jqField.parent();
        }
        else if (sFieldTagName == 'DIV' || sFieldTagName == 'SPAN') {                                   
            jqField.html(sValue);
        }
        else if (sFieldTagName == 'SELECT') {
            if (sValue) {
                jqField.children('option[value="' + sValue +'"]').prop('selected', 'selected');
            } else {
                jqField.children('option[value="-1"]').prop('selected', 'selected');
            }
            return jqField;
        }
        else if (sFieldType == 'checkbox') {                                   
            if (sValue) {
                jqField.filter('[value="' + sValue + '"]').prop('checked','checked');
            } else {
                jqField.prop('checked',false);
            }
            return jqField.parent();
        }
        else {                                          
            jqField.val(sValue);
        }
        return jqField;
    }
    
    this.checkField = function(jqField) { // проверка поля
        var  sFieldPattern = jqField.attr('pattern')
            ,sMultiply = jqField.prop('required') ? '+' : '*'
            ,sRegExp    = sFieldPattern ? sFieldPattern : '.' + sMultiply
            ,oRegExp    = new RegExp(sRegExp  , 'i')
            ;
        if (!jqField.val().match(oRegExp) || (!jqField[0].checkValidity())) {
            jqField.addClass('form-field-error');
            return false; //  - поле не прошло проверку, возвращаем false
        } else {
            jqField.removeClass('form-field-error');
            return true; // - поле прошло проверку возвращаем true
        }
    }
    
    this.formCheck = function() {
        var  jqFieldsToCheck = this.elem.find('.must-be-checked')
            ,c = this
            ,bFormOk = true;
            ;
        $.each(jqFieldsToCheck, function() {
            var jqField = $(this);
            if (!c.checkField(jqField)) {
                bFormOk = false;
                console.warn('Field ' + jqField.attr('name') + ' error ');
            }
            });
        return bFormOk;
    }
    
    this.setReadOnly = function(jqField,bReadonly) {
        var  sFieldType = jqField.attr('type')
            ,sFieldTagName = jqField.prop('tagName')
            ;
        if (sFieldType == 'radio') {                                        // 1. Переключатели (type=radio)
            jqField.closest('[data-role=controlgroup]')[bReadonly ? 'addClass' : 'removeClass']('readonly');
            return jqField.parent();
        }
        else if (sFieldTagName == 'SELECT') {                                   // 2. Выпадающие списки ( тег SELECT)
            
        }
        else if (sFieldType == 'checkbox') {                                   // 3. Флажки (type=checkbox)

        }
        else {                                          // 4. текстовые поля
            if (bReadonly) {
                jqField.prop('readonly', 'readonly');
            } else {
                jqField.removeAttr('readonly');
            }
        }
        return jqField;
    }
    
    this.setParent = function(oParent) {
        this.parent = oParent;
        this.createBreadCrumbs();
        return this;
    }
    
    this.createBreadCrumbs = function() {
        this.breadCrumbs = this.elem.find('.breadcrumbs');
        this.breadCrumbs
            .empty()
            .prepend('<span></span>')
            .html(this.title)
            ;
        var  parent = this.parent
            ,iCount = 1;
            ;
        while (parent) {
            var jqLinkToParent = $('<a></a>', {'href': '#', 'onclick':'history.go(-' + iCount + ')'}).html(parent.title);
            this.breadCrumbs
                .prepend('<span>&nbsp;<&nbsp;</span>')
                .prepend(jqLinkToParent);
            parent = parent.parent;
            iCount++;
        }
    }
}
    return Component;
});