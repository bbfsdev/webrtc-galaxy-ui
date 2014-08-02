function onLoadCtrl ($scope, $rootScope, $translate) {
	 $scope.keyDown = function(eve){
       if(eve.which === 17){ //ctrl
           $rootScope.ctrlDown = true;   
       }
    }
    $scope.keyUp = function(eve){
       if(eve.which === 17){ //ctrl
           $rootScope.ctrlDown = false;
       }
    }
}
onLoadCtrl.$inject = ["$scope", "$rootScope", "$translate"];

function headerCtrl ($scope, $rootScope) {
}
headerCtrl.$inject = ["$scope","$rootScope"];

function footerCtrl ($scope, $rootScope) {
}
footerCtrl.$inject = ["$scope","$rootScope"];

function bodyCtrl ($scope, $rootScope) {
}
bodyCtrl.$inject = ["$scope","$rootScope"];

function previewCtrl ($scope, $rootScope) {
}
previewCtrl.$inject = ["$scope","$rootScope"];

function presetsCtrl ($scope,$rootScope) {
    $scope.presets = [];
    $scope.addPreset = function() {
        $scope.presets.push([]);
    }
    $scope.presetIndex = 0;
  	$scope.presetClicked = function ($index) {
    	$scope.presetIndex = $index;
  	};
}
presetsCtrl.$inject = ["$scope","$rootScope"];

function groupsCtrl ($scope, $rootScope, getGroups) {
    getGroups.then(function (reqData) {
        $scope.groups = reqData.data.groups; 
    });
    $scope.groupIndex = 0;
  	$scope.groupClicked = function ($index) {
    	$scope.groupIndex = $index;
      //if ($rootScope.ctrlDown)
        
  	};
}
groupsCtrl.$inject = ["$scope","$rootScope","getGroups"];
