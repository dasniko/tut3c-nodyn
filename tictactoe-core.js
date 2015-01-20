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
        var status = this.getStatus(message.player);
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

  getStatus: function(player) {
    if(this.isWinner(player)) {
      this.isGameOver = true;
      return "Player " + player.toUpperCase() + " has won. Congratulations!!";
    } else {
      var otherPlayer = "X";
      if(player.toUpperCase() === "X") {
        otherPlayer = "O";
      }
      return "It is " + otherPlayer + "'s turn";
    }
  },

  isWinner: function(player) {
    var isWinner = false;
    var b = this.board;
    // this works only if it's a 3x3 board...
    // check vertically and horizontally
    for (var i = 0; i < 3; i++) {
      if (b[i][0] === player && b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
        isWinner = true;
      };
      if (b[0][i] === player && b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
        isWinner = true;
      };
    }
    // check diagonally
    if (b[0][0] === player && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
      isWinner = true;
    };
    if (b[0][2] === player && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
      isWinner = true;
    };
    return isWinner;
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
