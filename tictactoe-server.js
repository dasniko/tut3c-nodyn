var eventBus = require("vertx/event_bus");

var gameHandler = {
  board: [[null, null, null], [null, null, null], [null, null, null]],

  lastPlayer: null,

  handle: function(message, replier) {
    java.lang.System.err.println("TTT: Received request from player " + message.player + " with coordinate "+message.coord[0]+", "+message.coord[1]+".");

    if(message.player !== this.lastPlayer) {
      // it is player's turn
      var row = message.coord[0];
      var col = message.coord[1];

      if(this.board[row][col] == null) {
        // field is still empty
        this.board[row][col] = message.player;
        this.lastPlayer = message.player;

        java.lang.System.err.println("board: "+this.board);

        replier({"board": this.board, "status": this.getStatus(message)});
      } else {
        replier({"board": this.board, "status": "Illegal move: Field already occupied."});
      }


    } else {
      replier({"board": this.board, "status": "Illegal move: It is not your turn."});
    }


  },

  getStatus: function(message) {
    if(this.hasWon(message.player, message.coord[0], message.coord[1])) {
      return "Player "+message.player.toUpperCase()+" has won. Congratulations!!";
    } else {
      var otherPlayer = "X";
      if(message.player.toLowerCase() === "x") {
        otherPlayer = "O";
      }

      return "It is "+otherPlayer+"'s turn'";
    }
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

var globalHandler = function(message, replier) {
  gameHandler.handle(message, replier);
}

eventBus.registerHandler("tictactoe", globalHandler);

// globalHandler({player:"x",coord:[1,1]}, function(obj){java.lang.System.err.println("board result: "+JSON.stringify(obj, " "));});
// globalHandler({player:"x",coord:[1,2]}, function(obj){java.lang.System.err.println("board result: "+JSON.stringify(obj, " "));});
// globalHandler({player:"o",coord:[1,0]}, function(obj){java.lang.System.err.println("board result: "+JSON.stringify(obj, " "));});
// globalHandler({player:"x",coord:[1,1]}, function(obj){java.lang.System.err.println("board result: "+JSON.stringify(obj, " "));});
// globalHandler({player:"x",coord:[1,2]}, function(obj){java.lang.System.err.println("board result: "+JSON.stringify(obj, " "));});

java.lang.System.err.println("Let the games begin!");
