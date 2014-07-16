/*jshint indent:4, strict:true*/


/* Main class to use on the initiator's side 
 *
 * Example:
 *
 * ...
 * var settings = {
 *     channelID: 'bb-channel',
 *     participantID: 'bb-scandinavia',
 *     debug: true,
 *     onInitiatorConnected: function () {...},
 *     onInitiatorDisconnected: function () {...},
 * };
 * 
 * var participant = new RTCParticipant(settings);
 * 
 * participant.startBroadcasting(domVideoElement);
 * ...
 */
RTCParticipant = function (settings) {
    "use strict";

    this._sessions = {};

    // Update the object with settings
    for (var item in (settings ? settings: {})) {
        this[item] = settings[item];
    }

    // Show WebRTC logs in debug mode
    if (!this.debug)
        window.skipRTCMultiConnectionLogs = true;

    this._initConnection();
};


RTCParticipant.prototype = {
    /* Channel ID, 'bnei-baruch-group-video' by default
     */
    channelID: 'bnei-baruch-group-video',

    /* Participant ID, 'virtual-group' by default
     */
    participantID: 'virtual-group',

    /* Video width
     */
    width: 640,

    /* Video height
     */
    height: 480,

    /* Video bandwidth
     */
    bandwidth: 450,

    /* Video aspect ratio, 1.33 for 4:3
     */
    aspectRatio: 1.33,

    /* Raised if the connection with the initiator has been (re)established
     */
    onInitiatorConnected: function () {
        "use strict";
        this._debug("Initiator connected");
    },

    /* Raised if the connection with the initiator has been lost
     */
    onInitiatorDisconnected: function () {
        "use strict";
        this._debug("Initiator disconnected");
    },

    /* Start broadcasting local stream and display it in the video element
     *
     * @param domVideoElement: DOM video element to display the stream
     */
    startBroadcasting: function (domVideoElement) {
        "use strict";
        this._domVideoElement = domVideoElement;
        this.connection.connect();
    },

    /* Video element to display local stream
     */
    _domVideoElement: null,

    /* Unique session ID
     */
    _sessionID: 'Ighiex7atoo2ih1Ta7quesh5fiesahsh',

    /* Initialize an RTCMultiConnection, for internale use only
     */
    _initConnection: function () {
        "use strict";

        this.connection = new RTCMultiConnection(this.channelID);

        this.connection.userid = this.participantID;
        this.connection.sessionid = this._sessionID;
        this.connection.isInitiator = false;
        this.connection.preventSSLAutoAllowed = false;
        this.connection.autoReDialOnFailure = true;
        this.connection.bandwidth.video = this.bandwidth;
        this.connection.direction = 'one-way';

        this.connection.mediaConstraints.mandatory = {
            maxWidth: this.width,
            maxHeight: this.height,
            minAspectRatio: this.aspectRatio
        };

        this._bindConnectionEvents();
    },

    _setMediaConstraints: function () {
    },

    /* Binds RTCMultiConnection events
     * @param connection: RTCMultiConnection instance
     */
    _bindConnectionEvents: function () {
        "use strict";

        var self = this;

        this.connection.onNewSession = function(session) {
            self._debug("New session with initiator: ", session);
            if (self._sessions[session.sessionid] === undefined) {
                self._sessions[session.sessionid] = session;
                session.join({video: true});
                self.onInitiatorConnected();
            }
        };

        // On getting local media stream
        this.connection.onstream = function(e) {
            self._debug("New local stream: ", e);
            e.stream.muted = true;
            self._domVideoElement.src = e.blobURL;
            self._domVideoElement.play();
        };

        this.connection.onleave = function(e) {
            self._debug("User has left: ", e);
            if (e.entireSessionClosed) {
                self._sessions[self.connection.sessionid] = undefined;
                self.onInitiatorDisconnected();
            }
        };

        // Close connection on closing the browser window
        window.onbeforeunload = this.connection.close;
    },

    /* Log a debug message, wraps the built-in console.log() function
     */
    _debug: function () {
        "use strict";
        if (this.debug)
            console.log.apply(console, arguments);
    }
};

