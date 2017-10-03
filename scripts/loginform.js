define(['component','user','md5'],function(Component,user,md5) {
    var LoginForm = function(sSelector) {
        var  l = this
            ,isFormShown = true
            ;
        l.init(sSelector);
        l.form = l.find('form');

        loginBtn        = l.find('.btn-login');
        userName        = l.find('.inpt-user-name'); 
        userPassword    = l.find('.inpt-user-password'); 

        var handleUserAuthentication = function(oResponse) {
            if (oResponse.success) {
                user.setToken(oResponse.token);
                l.hide();
                location.reload();
            } else {
                alert('Incorrect login or password');
            }
        }

        l.login = function(event) {
            event.preventDefault();
            var oData = {};
            oData.userName = userName.val();
            oData.userPassword = md5(userPassword.val());
            $.ajax({
                 'url'          : 'scripts/php/login.php'
                ,'type'         : 'post'
                ,'dataType'	    : 'json'
                ,'data'         : oData
                ,'success'      : handleUserAuthentication
                ,'error'        : function(oError) {alert('Error')}
            });
        }

        l.show = function() {
            isFormShown = true;
            l.elem.show();
            l.form.show();
        }

        l.hide = function() {
            if (!isFormShown)
                return;
            l.elem.hide();
            isFormShown = false;
        }

        loginBtn.on('click',l.login);
    }
    LoginForm.prototype = new Component();
    var loginForm = new LoginForm('.login-form');
    return {
        'show' : loginForm.show
        ,'hide': loginForm.hide
    };
});