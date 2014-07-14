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
    $scope.previewList = [];
    $scope.$on("showPreview", function (e, groupList) {
        previewList = groupList;
    });
}
previewCtrl.$inject = ["$scope","$rootScope"];

function presetsCtrl ($scope,$rootScope) {
    $scope.presets = [];
    $scope.addPreset = function() {
        $scope.presets.push([]);
        $scope.presetIndex = $scope.presets.length-1;
    }
    $scope.presetIndex = 0;
  	$scope.presetClicked = function ($index) {
    	$scope.presetIndex = $index;
  	}
    $scope.$on("addGroupToPreset", function (e, group) {
        if ($scope.presets.length == 0)
            $scope.addPreset();
        var curPreset = $scope.selectedPreset();
        if (curPreset != null)
        {
            var curGroupIndex = curPreset.indexOf(group);
            if (curGroupIndex == -1)
                curPreset.push(group);
            else
                curPreset.splice(curGroupIndex, 1);
        }
    });
    $scope.selectedPreset = function()
    {
        return $scope.presets[$scope.presetIndex];
    }
}
presetsCtrl.$inject = ["$scope","$rootScope"];

function groupsCtrl ($scope, $rootScope, getGroups) {
    getGroups.then(function (reqData) {
        $scope.groups = reqData.data.groups; 
    });
    $scope.groupIndex = 0;
  	$scope.groupClicked = function ($index) {
    	$scope.groupIndex = $index;
      var curGroup = $scope.selectedGroup();
      if ($rootScope.ctrlDown && curGroup != null)
        $rootScope.$broadcast('addGroupToPreset', curGroup);
  	};
    $scope.selectedGroup = function()
    {
        return $scope.groups[$scope.groupIndex];
    }
}
groupsCtrl.$inject = ["$scope","$rootScope","getGroups"];
