var http = require("http");
var vertx = require("vertx2-core");

function processBody(request, callback) {
  var strBody = "";
  request.on("data", function(data) {
    strBody += data;
    if(strBody.length > 1e6)
      callback({code: 413, msg: "Too much data."});
    });
    request.on("end", function() {
      try {
        console.log("Received Message: " + strBody)
        var body = JSON.parse(strBody);
        callback(null, body);
      } catch (err) {
        console.error("Received Message - Error: " + err)
        callback({code: 400, msg: "Body is not a valid JSON object."});
      }
    });
  };

var server = http.createServer(function(request, response) {
  if (request.method.toUpperCase() === "POST") {
    processBody(request, function (err, body) {
      if (err != null) {
        response.writeHead(err.code, {});
        response.end(err.msg)
      } else {
        vertx.eventbus.send("tictactoe", body, function(message) {
          response.write(message.body);
          response.end();
        });
      }
    });
  } else {
    response.write("Message Type not allowed");
    response.end();
  }
});

server.listen(9000, function() {
  console.log( "TicTacToe-Server is listening on port 9000" );
});
