webrtc.service('GetGroups', ['$http', function ($http) {
    return $http.get('./json/groups.json');
}]);

webrtc.service('GetPresets', ['$http', function ($http) {
    return $http.get('./json/presets.json');
}]);
