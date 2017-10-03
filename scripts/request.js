// all requests are made through this component 
define(['loginform','user'],function(loginForm,user) {
    var Request = function() {
        var r = this;

        // if request was successful
        var onSuccess = function(oResponse, fCallback) {
            // if user not logged in - asks him to login
            if (!oResponse.success && oResponse.error_text == 'need_to_login') {
                loginForm.show();
                return;
            }
            // if user logged in - continues handling
            loginForm.hide();
            // executes callback function
            if (fCallback && typeof fCallback === 'function')
                fCallback(oResponse);
        }

        // alerts messages
        setStatus = function(sStatus, sMessageText, mDebugInfo) {
            if (sMessageText) {
                console[
                    sStatus == 'ok'
                        ? 'info'
                        : 'error'
                    ](sMessageText, mDebugInfo || '');
                alert(decodeURI(sMessageText));
            }
        }
    
        // on ajax complete event
        var onComplete = function(oAjax) {
            if (oAjax.status == 200) {              // http server response OK
                if (typeof oAjax.responseJSON === 'undefined') {
                    setStatus('error', 'Could not parse server response as valid JSON', oAjax.responseText);
                }
            }
            else if (oAjax.status == 404) {
                setStatus('error', 'Ajax backend script wasn\'t found', location.href.replace(/[^/]*$/, '') + this.url);
            }
            else if (oAjax.status == 403) {
                setStatus('error', 'Access to Ajax backend script is forbidden');
            }
            else if (oAjax.status == 401) {
                setStatus('error', 'Authorization required to access Ajax backend script');
            } 
            else if (oAjax.status == 500) {
                setStatus('error', 'Internal server error');
            } else {
                setStatus('error', 'Unpredicted error', oAjax);
            }
        }

        // making ajax request to server
        var doRequest = function(sRequestType, sUrl, oData, fCallback) {
            oData = oData || {};
            var oSendData = JSON.parse(JSON.stringify(oData));
            for (sKey in oSendData) {
                if (oSendData.hasOwnProperty(sKey) && typeof oSendData[sKey] == 'string')
                oSendData[sKey] = encodeURIComponent(oSendData[sKey]); 
            }
            // take user's token from "user" component
            oSendData.token = user.getToken();
            $.ajax({     'url'      : sUrl + '?t=' + new Date().getTime()
                        ,'type'     : sRequestType
                        ,'data'     : oSendData
                        ,'dataType'	: 'json'
                        ,'success'  : function(oResponse) { onSuccess.call(this,oResponse,fCallback) }
                        ,'complete' : onComplete
            });
        } 

        // executes POST request to server
        r.post = function(sUrl, oData, fCallback) {
            doRequest('post', sUrl, oData, fCallback);
        }
    }
    return Request;
});