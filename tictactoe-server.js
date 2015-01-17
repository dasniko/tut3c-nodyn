var eventBus = require("vertx/event_bus");

eventBus.registerHandler("tictactoe", function(message, replier) {
  java.lang.System.err.println("TTT: Received request from player " + message.player + " with coordinate "+message.coord[0]+", "+message.coord[1]+".");
  //replier({wait_time: message.amount * 1.75});
});

java.lang.System.err.println("Let the games begin!");
