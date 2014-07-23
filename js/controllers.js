function onLoadCtrl ($scope, $rootScope, $translate) {
	 $scope.keyDown = function(event){
      if(event.which === 17){ //ctrl
         $rootScope.ctrlDown = true;   
      }
      if(event.which === 18){ //alt
         $rootScope.altDown = true;   
      }
      
      if(event.which === 49) //1
      {
        alert('1');
      } 
      if(event.which === 50) //2
      {
        alert('2');
      } 
       
    }
    $scope.keyUp = function(event){
       if(event.which === 17){ //ctrl
           $rootScope.ctrlDown = false;
       }
       if(event.which === 18){ //alt
           $rootScope.altDown = false;   
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
    $scope.presetIndex = 0;

    $scope.addPreset = function() {
        $scope.presets.push([]);
        $scope.presetIndex = $scope.presets.length-1;
    }
    
  	$scope.presetClicked = function (index) {
      if ($rootScope.ctrlDown)
      {
        if ($scope.presets[index].length == 0)
          $scope.presets.splice(index, 1);
        return;
      }
    	$scope.presetIndex = index;
      $rootScope.$broadcast('showPreview', $scope.selectedPreset());
  	}

    $scope.removeGroup = function (preset, group) {
      if (!$rootScope.ctrlDown)
        return;   
      if (preset != null) {
        var curGroupIndex = preset.indexOf(group);
        if (curGroupIndex != -1)
          preset.splice(curGroupIndex, 1);
      }
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
            /*else
                curPreset.splice(curGroupIndex, 1);*/
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

