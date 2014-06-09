// This is interface to WebRTC share
vat share = (function() {
  return {

    // Example of how to generate ids:
    //   Id may be a hash key, such that the server has the private key.
    //   When the server get the key, it unhash the key and checks the result
    //   is a valid string.

    // Client module, should provide it's own video to the share system.
    client: (function(id, name) {
      var id = id;  // Application innder id
      var name = name;  // User identifying string to display for others
      return {
        // Getters.
        id: function() { return id; }
        name: function() { return name; }
        share: function() {
          // Connects to system using WebRTC.
          // Start sharing own camera with others
        }
      };
    });

    // View module, should provide access to all video of all clients.
    // Example:
    //   var view = share.view('1234');
    //   var clients = view.clients()
    //   for (var idx in clients) {
    //     var client = clients[idx];
    //     view.bind_client_video(client.id(), $('video').find('.' + client.name());)
    //   }
    view: (function(id) {
      var id;

      return {

        id: function() { return id; }

        clients: function() {
          // Returns list of clients
        },

        bind_client_video: function(client_id, video_element) {
          // Binds HTML5 video element to display specific client.
        }
      };
    });
  };

}());
