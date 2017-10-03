// searchBar component
define(['component'],function(component) {
    var SearchBar = function(sSelector) {
        var  s = this
            ,timer = null
            ;
        s.init(sSelector);
        searchInpt          = s.find('input');
        lastSearchString    = "";

        // prepares for external onSearch event
        search = function() {
            clearTimer();
            var sSearchString   = searchInpt.val();
            if (lastSearchString != sSearchString) {
                s.onSearch(sSearchString);
                lastSearchString = sSearchString;
            }
        }

        // performs external function call
        s.onSearch = function () {

        }

        // clears local typing timer
        clearTimer = function() {
            window.clearTimeout(timer);
            timer = null;
        }

        // starts local typing timer, so onSearch event will fire after 500 msec after last keypress
        startTimer = function() {
            var iSearchStringLength = searchInpt.val().length;
            if (iSearchStringLength == 0 || timer) {
                clearTimer();
            }
            timer = window.setTimeout(search,500);
        }

        // events
        searchInpt.on('keyup focus paste cut click',startTimer);
    }
    
    SearchBar.prototype = new component();
    return SearchBar;
});


