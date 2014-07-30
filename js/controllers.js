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

function onLoadMonitorCtrl ($scope, $rootScope, $translate) {
}
onLoadMonitorCtrl.$inject = ["$scope", "$rootScope", "$translate"];

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
    $scope.showTitle = false;
    $scope.$on("showGroupPreview", function (e, group) {
        $scope.previewList = [group];
        $scope.$apply();
    });
    $scope.$on("showPresetPreview", function (e, preset) {
        $scope.previewList = preset.groups;
        $scope.$apply();
    });
    $scope.isGroupConected = function(group) {
      for (var i=0; i < $scope.conectedGroups.length; i++)
       if ($scope.conectedGroups[i].id == group.id)
          return true;
      return false;
    }
}
previewCtrl.$inject = ["$scope","$rootScope"];

function presetsCtrl ($scope,$rootScope,GetPresets) {
    $scope.presets = [];
    $scope.presetIndex = 0;

    $scope.addPreset = function() {
        $scope.presets.push({groups:[], size:1});
        $scope.presetIndex = $scope.presets.length-1;
    }
    
  	$scope.presetClicked = function (index) {
      if ($rootScope.ctrlDown)
      {
        var selectedPreset = $scope.selectedPreset();
        if (selectedPreset.groups.length == 0)
          $scope.presets.splice(index, 1);
        return;
      }
    	$scope.presetIndex = index;
      $rootScope.$broadcast('showPresetPreview', $scope.selectedPreset());
  	}

    $scope.removeGroup = function (preset, group) {
      if (!$rootScope.ctrlDown)
        return;   
      if (preset != null) {
        var curGroupIndex = preset.groups.indexOf(group);
        if (curGroupIndex != -1)
          preset.groups.splice(curGroupIndex, 1);
      }
    }
    
    $scope.$on("addGroupToPreset", function (e, group) {
        if ($scope.presets.length == 0)
            $scope.addPreset();
        var curPreset = $scope.selectedPreset();
        if (curPreset != null)
        {
            var curGroupIndex = curPreset.groups.indexOf(group);
            if (curGroupIndex == -1)
                curPreset.groups.push(group);
            /*else
                curPreset.splice(curGroupIndex, 1);*/
        }
    });
    $scope.selectedPreset = function()
    {
        return $scope.presets[$scope.presetIndex];
    }

    $scope.getGroupName = function(id) {
      if (id in $rootScope.groupHash)
        return $rootScope.groupHash[id].name;
      else
        return id;
    }

    GetPresets.then(function (data) {
        $scope.presets = data.data.presets;
    }); 
}
presetsCtrl.$inject = ["$scope","$rootScope", "GetPresets"];

function groupsCtrl ($scope, $rootScope, GetGroups) {
  $scope.selectedGroup = null;
  $scope.conectedGroups = [];
  $scope.groupList = [];
  $rootScope.groupHash = {};
	
  $scope.groupClicked = function (group) {
  	$scope.selectedGroup = group;
    if (group == null) return;
    if ($rootScope.ctrlDown)       
      $rootScope.$broadcast('addGroupToPreset', group);
    else
      $rootScope.$broadcast('showGroupPreview', group);
	};

  /* Adds a new participant toggle button and binds its click event
   */
  var onParticipantConnected = function (participantID) {
  }

  /* Enables participant's toggle button when his video stream is ready
   */
  var onParticipantVideoReady = function (participantID) {
    $scope.conectedGroups.push({name: getGroupName(participantID), id: participantID});
    $scope.$apply();
  }

  /* Removes participant's toggle button and video widget on leaving
   */
  var onParticipantLeft = function (participantID) {

  }

  var onConnectionClosed = function() {
    alert('Connection closed because another initator has connected');
  }

  var getGroupName = function(id) {
    if (id in $rootScope.groupHash)
      return $rootScope.groupHash[id].name;
    else
      return id;
  }

  $scope.isGroupConected = function(group) {
    for (var i=0; i < $scope.conectedGroups.length; i++)
      if ($scope.conectedGroups[i].id == group.id)
        return true;
    return false;
  }

  $scope.isGroupDisconected = function(group) {
    return !($scope.isGroupConected(group));
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

  GetGroups.then(function (data) {
    $scope.groupList = data.data.groups;
    for (var i=0; i < $scope.groupList.length; i++)
    {
      var group = $scope.groupList[i];
      $rootScope.groupHash[group.id] = group;
    }
    $rootScope.initiator = new RTCInitiator(settings);
  }); 


}
groupsCtrl.$inject = ["$scope","$rootScope","GetGroups"];


function groupVideoCtrl ($scope, $rootScope) {
  $scope.videoId = '';
}
groupVideoCtrl.$inject = ["$scope","$rootScope"];

