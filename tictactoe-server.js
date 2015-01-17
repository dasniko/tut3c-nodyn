var eventBus = require("vertx/event_bus");
var core = require("./tictactoe-core");


var globalHandler = function(message, replier) {
  java.lang.System.err.println("TTT: Received request from player " + message.player + " with coordinate "+message.coord[0]+", "+message.coord[1]+".");
  core.gameHandler.handle(message, replier);
}

eventBus.registerHandler("tictactoe", globalHandler);

eventBus.registerHandler("init_ttt", function(message, replier) {
  java.lang.System.err.println("TTT initialize request received.");
  core.gameHandler.init(function(result) {
      replier(result);
  });
});


java.lang.System.err.println("Let the games begin!");
