// Initiator

var params = {
    channelID: 'bb-channel',
    onParticipantConnected: function (participantID) {},
    onParticipantVideoReady: function (participantID) {},
    onParticipantLeft: function (participantID) {},
};

var initiator = new RTCInitiator(params);

initiator.bindVideo(participantID, videoHTMLElement);
initiator.unbindVideo(participantID);


// Participant

var params = {
    channelID: 'bb-channel',
    participantID: 'bb-scandinavia',
    onInitiatorDisconnected: function () {},
    onInitiatorReconnected: function () {},
};

var participant = new RTCParticipant(params);

participant.startBroadcast(videoHTMLElement);
