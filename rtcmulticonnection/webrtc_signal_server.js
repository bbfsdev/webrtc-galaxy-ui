// useful libs
var http = require("http");
var fs = require("fs");

// general variables
var port = 8181;

// web server functions
var http_server = http.createServer(function(request, response) {
  var path = request.url !== '/' ? request.url.substring(1) : 'index.html';
  fs.readFile(path, function(error, data) {
      if (error) {
        log_error(error);
      } else {
        response.end(data);
				log_comment("served " + request.url);
      }
  });
});
http_server.listen(port, '0.0.0.0', function() {
  log_comment("server listening (port "+port+")");
});

// utility functions
function log_error(error) {
  if (error !== "Connection closed" && error !== undefined) {
    log_comment("ERROR: "+error);
  }
}
function log_comment(comment) {
  console.log((new Date())+" "+comment);
}
