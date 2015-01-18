var eventBus = require("vertx/event_bus");
var console = require("vertx/console");
var core = require("./tictactoe-core");


eventBus.registerHandler("tictactoe", function(message, replier) {
  console.log("TTT: Received request from player " + message.player + " with coordinate " + message.coord[0] + ", " + message.coord[1] + ".");
  core.gameHandler.handle(message, function(result) {
    console.log("Response: " + JSON.stringify(result));
    replier(result);
  });
});

eventBus.registerHandler("init_ttt", function(message, replier) {
  console.log("TTT: initialize request received.");
  core.gameHandler.init(function(result) {
    console.log("Response: " + JSON.stringify(result));
    replier(result);
  });
});


java.lang.System.err.println("Let the games begin!");
