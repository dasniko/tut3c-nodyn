var eventBus = require("vertx/event_bus");


var gameHandler = {
  board: [[null, null, null], [null, null, null], [null, null, null]],

  handle: function(message, replier) {
    java.lang.System.err.println("TTT: Received request from player " + message.player + " with coordinate "+message.coord[0]+", "+message.coord[1]+".");
    this.board[message.coord[0]][message.coord[1]] = message.player;
    java.lang.System.err.println("board: "+this.board);
    replier({"board": this.board});
  }
};

eventBus.registerHandler("tictactoe", gameHandler.handle);

//gameHandler.handle({player:"x",coord:[1,2]}, function(obj){java.lang.System.err.println("board result: "+JSON.stringify(obj, " "));});

java.lang.System.err.println("Let the games begin!");
