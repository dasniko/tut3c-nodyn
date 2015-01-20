var gameHandler = {
  board: null,
  lastPlayer: null,
  isGameOver: false,

  init: function(callback) {
    this.board = [[null, null, null], [null, null, null], [null, null, null]];
    this.lastPlayer = null;
    this.isGameOver = false;
    var result = {"board": this.board, "status": "TicTacToe initialized. Start your new game!"};
    callback(result);
  },

  handle: function(message, callback) {

    if (this.board === null) {
      throw new Error("Game is not initialized!");
    }

    if (this.isGameOver || this.isTie()) {
      callback({"board": this.board, "status": "Game over :-("});
      return;
    }

    var player = message.player;
    var row = message.coord[0];
    var col = message.coord[1];
    if(row < 0 || row > 2 || col < 0 || col > 2) {
      callback({"board": this.board, "status": "Illegal coordinates: Coordinates must be in range of [0..2]."});
      return;
    }

    if(player !== this.lastPlayer) {

      // it is player's turn
      if(this.board[row][col] == null) {
        // field is still empty
        this.setMove(player, row, col);
        var status = this.getStatus(message);
        callback({"board": this.board, "status": status});
      } else {
        callback({"board": this.board, "status": "Illegal move: Field already occupied."});
      }

    } else {
      callback({"board": this.board, "status": "Illegal move: It is not your turn."});
    }

  },

  setMove: function(player, x, y) {
    this.board[x][y] = player;
    this.lastPlayer = player;
  },

  getStatus: function(message) {
    if(this.hasWon(message.player, message.coord[0], message.coord[1])) {
      this.isGameOver = true;
      return "Player " + message.player.toUpperCase() + " has won. Congratulations!!";
    } else {
      var otherPlayer = "X";
      if(message.player.toLowerCase() === "x") {
        otherPlayer = "O";
      }
      return "It is " + otherPlayer + "'s turn";
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
  },

  isTie: function() {
    var n = 0;
    for (var x = 0; x < this.board.length; x++) {
      for (var y = 0; y < this.board[x].length; y++) {
        if (this.board[x][y] !== null)
          n++;
      }
    }
    var tie = false;
    if (n === 9) {
      tie = true;
      this.isGameOver = true;
    }
    return tie;
  }

};

module.exports = {
  gameHandler: gameHandler
}
