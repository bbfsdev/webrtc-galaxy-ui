webrtc.service('GetGroups', ['$http', function ($http) {
    // return $http.get('https://galaxy.toh.info/groups.json');
    return $http.get('./json/groups.json');
}]);

webrtc.service('GetPresets', ['$http', function ($http) {	
//    return $http.get('https://galaxy.toh.info/ui_presets.json');
    return $http.get('./json/presets.json');
}]);
