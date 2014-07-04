webrtc.directive("webrtcOnload", function () {
    return {
        scope: {},
        templateUrl: './views/onload.html',
        controller: webrtcOnLoadCtrl
    };
});

webrtc.directive("webrtcHeader", function () {
    return {
        templateUrl: './views/header.html',
        controller: webrtcHeaderCtrl
    };
});

webrtc.directive("webrtcFooter", function () {
    return {
        templateUrl: 'views/footer.html',
        controller: webrtcFooterCtrl
    };
});
webrtc.directive("webrtcBody", function () {
    return {
        templateUrl: 'views/body.html',
        controller: webrtcBodyCtrl
    };
});