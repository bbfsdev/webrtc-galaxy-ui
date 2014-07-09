function onLoadCtrl ($scope, $translate) {
}
onLoadCtrl.$inject = ["$scope", "$translate"];

function headerCtrl ($scope) {
}
headerCtrl.$inject = ["$scope"];

function footerCtrl ($scope) {
}
footerCtrl.$inject = ["$scope"];

function bodyCtrl ($scope) {
}
bodyCtrl.$inject = ["$scope"];

function previewCtrl ($scope) {
}
previewCtrl.$inject = ["$scope"];

function presetsCtrl ($scope) {
    $scope.presets = [];
    $scope.addPreset = function() {
        $scope.presets.push([]);
    }
}
presetsCtrl.$inject = ["$scope"];

function groupsCtrl ($scope, getGroups) {
    getGroups.then(function (reqData) {
        $scope.groups = reqData.data.groups;        
    });
}
groupsCtrl.$inject = ["$scope","getGroups"];
