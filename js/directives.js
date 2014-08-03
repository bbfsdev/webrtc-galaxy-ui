webrtc.directive("onload", function () {
    return {
        scope: {},
        templateUrl: './views/onload.html',
    };
});

webrtc.directive("header", function () {
    return {
        templateUrl: './views/header.html',
        controller: headerCtrl
    };
});

webrtc.directive("footer", function () {
    return {
        templateUrl: 'views/footer.html',
        controller: footerCtrl
    };
});
webrtc.directive("body", function () {
    return {
        templateUrl: 'views/body.html',
        controller: bodyCtrl
    };
});
webrtc.directive("preview", function () {
    return {
        templateUrl: 'views/preview.html',
        controller: previewCtrl
    };
});
webrtc.directive("presets", function () {
    return {
        templateUrl: 'views/presets.html',
        controller: presetsCtrl
    };
});
webrtc.directive("groups", function () {
    return {
        templateUrl: 'views/groups.html',
        controller: groupsCtrl
    };
});

webrtc.directive("groupVideo", function ($rootScope) {
    return {
        restrict: 'E',   
        link: function ($scope, element, attrs) {
          console.log("Initialize video (ElementId:" + attrs.id + ' participantId:' + attrs.videoId);

          $rootScope.participantElementIDs[attrs.videoId] = attrs.id;

          var streams = $rootScope.room.getStreamsByAttribute('participantID', attrs.videoId);
          $rootScope.room.subscribe(streams[0]);

          $scope.$on('$destroy', function() {
            console.log("Destroy video (ElementId:" + attrs.id + ' participantId:' + attrs.videoId);            
            $rootScope.initiator.unbindVideo(attrs.videoId);            
            videoElement.outerHTML = '';
          });
        }

    };
});

webrtc.directive("onloadMonitor", function () {
    return {
        scope: {},
        templateUrl: './views/onloadMonitor.html',
    };
});
