webrtc.directive("onload", function () {
    return {
        scope: {},
        templateUrl: './views/onload.html',
        controller: onLoadCtrl
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