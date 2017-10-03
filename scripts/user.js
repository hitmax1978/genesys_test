// user component. only stores the token
define(function() {
    return {
        'setToken' : function(sToken) {
            sessionStorage.setItem('token',sToken);
            console.log('token set to ' + sToken);
        }
        ,'getToken': function() {
            return sessionStorage.getItem('token');
        }
    };
});