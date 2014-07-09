webrtc.service('getGroups', ['$http', function ($http) {
    return $http.get('./json/groups.json');
}]);
