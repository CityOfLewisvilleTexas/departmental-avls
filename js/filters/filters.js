var avlFilters = angular.module('avlFilters', []);

avlFilters.filter('replaceKeyName', function () {
    return function (key) {
        return key.replace("_-_", "_/_").replace(/_/g, " ").replace(" Date", "<span class='date'> Date</span>");
    };
});

avlFilters.filter('checkNull', function () {
    return function (activity) {
        if (activity) {
            return ' - ' + activity;
        }
        else
            return null;
    };
});

avlFilters.filter('spanHideSmall', function () {
    return function (panelTitle) {
        if(panelTitle.indexOf("<<") > -1){
            return panelTitle.replace("<<", '<span class="hideSmall">').replace(">>", "</span>");
        }
        else {
            return panelTitle;
        }
    };
});

avlFilters.filter('spanTitleSize', function () {
    return function (panelTitle) {
        if (panelTitle.length > 25){
            if(panelTitle.length > 50){
                return panelTitle.substring(0,25) + '<span class="smallTitleHide">' + panelTitle.substring(25,50) + '</span>...';
            }
            else{
                return panelTitle.substring(0,25) + '<span class="smallTitleShow">...</span><span class="smallTitleHide">' + panelTitle.substring(25,50) + '</span>';
            }
        }
        else {
            return panelTitle;
        }
    };
});