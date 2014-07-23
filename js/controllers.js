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
    $scope.previewHtml = '';
    $scope.$on("showPreview", function (e, groupList) {
        $scope.previewList = groupList;
        $scope.$apply();
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
      $rootScope.$broadcast('showPreview', $scope.selectedPreset());
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

function groupsCtrl ($scope, $rootScope) {
  $scope.groupIndex = 0;
  $scope.groups = [];
	
  $scope.groupClicked = function ($index) {
  	$scope.groupIndex = $index;
    var curGroup = selectedGroup();
    if (curGroup == null) return;
    if ($rootScope.ctrlDown)       
      $rootScope.$broadcast('addGroupToPreset', curGroup);
    else
      $rootScope.$broadcast('showPreview', [curGroup]);
	};

  var selectedGroup = function()
  {
      return $scope.groups[$scope.groupIndex];
  }

  /* Adds a new participant toggle button and binds its click event
   */
  var onParticipantConnected = function (participantID) {
  }

  /* Enables participant's toggle button when his video stream is ready
   */
  var onParticipantVideoReady = function (participantID) {
    $scope.groups.push({name: participantID, id: participantID});
    $scope.$apply();
  }

  /* Removes participant's toggle button and video widget on leaving
   */
  var onParticipantLeft = function (participantID) {

  }

  var onConnectionClosed = function() {
    alert('Connection closed because another initator has connected');
  }

  var channelID = prompt("Please enter the channel ID", 'bnei-baruch-group-video');

  var settings = {
      channelID: channelID,
      debug: true,
      onParticipantConnected: onParticipantConnected,
      onParticipantVideoReady: onParticipantVideoReady,
      onParticipantLeft: onParticipantLeft,
      onConnectionClosed: onConnectionClosed
  };

  $rootScope.initiator = new RTCInitiator(settings);

}
groupsCtrl.$inject = ["$scope","$rootScope"];


function groupVideoCtrl ($scope, $rootScope) {
  $scope.videoId = '';
}
groupVideoCtrl.$inject = ["$scope","$rootScope"];

