var eventBus = require("vertx/event_bus");

var gameHandler = {
  board: [[null, null, null], [null, null, null], [null, null, null]],

  handle: function(message, replier) {
    java.lang.System.err.println("TTT: Received request from player " + message.player + " with coordinate "+message.coord[0]+", "+message.coord[1]+".");
    this.board[message.coord[0]][message.coord[1]] = message.player;
    java.lang.System.err.println("board: "+this.board);
    replier({"board": this.board, "status": this.getStatus(message)});
  },

  getStatus: function(message) {
    return this.hasWon(message.player, message.coord[0], message.coord[1]);
  },

  hasWon: function(player, currentRow, currentCol) {
    return (this.board[currentRow][0] === player         // 3-in-the-row
      && this.board[currentRow][1] === player
      && this.board[currentRow][2] === player
      || this.board[0][currentCol] === player      // 3-in-the-column
      && this.board[1][currentCol] === player
      && this.board[2][currentCol] === player
      || currentRow === currentCol            // 3-in-the-diagonal
      && this.board[0][0] === player
      && this.board[1][1] === player
      && this.board[2][2] === player
      || currentRow + currentCol === 2  // 3-in-the-opposite-diagonal
      && this.board[0][2] === player
      && this.board[1][1] === player
      && this.board[2][0] === player);
    }


};

eventBus.registerHandler("tictactoe", gameHandler.handle);

//gameHandler.handle({player:"x",coord:[1,1]}, function(obj){java.lang.System.err.println("board result: "+JSON.stringify(obj, " "));});
//gameHandler.handle({player:"x",coord:[1,2]}, function(obj){java.lang.System.err.println("board result: "+JSON.stringify(obj, " "));});
//gameHandler.handle({player:"x",coord:[1,0]}, function(obj){java.lang.System.err.println("board result: "+JSON.stringify(obj, " "));});

java.lang.System.err.println("Let the games begin!");
