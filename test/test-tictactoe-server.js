var assert = require("assert");
var core = require("../tictactoe-core");
var gameHandler = core.gameHandler;

// test move with testing/asserting the return value to something expected
var testMove = function(player, x, y, expectedStatus) {
  gameHandler.handle({player: player, coord: [x, y]}, function(obj) {
    assert.equal(expectedStatus, obj.status);
  })
};

describe('GameHandler', function() {
  describe('#init()', function() {
    it('should throw an error', function() {
      assert.throws(function() {
        gameHandler.handle({player: "x", coord: [0, 0]}, function(obj) {});
      }, Error);
    });

    it('should return "TicTacToe initialized. Start your new game!"', function() {
      gameHandler.init(function(result) {
        assert.equal("TicTacToe initialized. Start your new game!", result.status);
      });
    });

    it('should NOT throw an error', function() {
      assert.doesNotThrow(function() {
        gameHandler.handle({player: "x", coord: [0, 0]}, function(obj) {});
      }, Error);
    });
  });

  describe('#handle()', function() {
    beforeEach(function() {
      gameHandler.init(function(result) {});
    });

    it('should return "Illegal coordinates: Coordinates must be in range of [0..2]."', function() {
      testMove("x", -1, 0, "Illegal coordinates: Coordinates must be in range of [0..2].");
    });

    it('should return "Illegal coordinates: Coordinates must be in range of [0..2]."', function() {
      testMove("x", 1, 3, "Illegal coordinates: Coordinates must be in range of [0..2].");
    });

    it('should return "Illegal move: It is not your turn."', function() {
      gameHandler.board = [["x", null, null], [null, null, null], [null, null, null]];
      gameHandler.lastPlayer = "x";
      testMove("x", 0, 1, "Illegal move: It is not your turn.");
    });

    it('should return "Illegal move: Field already occupied."', function() {
      gameHandler.board = [[null, null, null], [null, "o", null], [null, null, null]];
      gameHandler.lastPlayer = "o";
      testMove("x", 1, 1, "Illegal move: Field already occupied.");
    });

    it('should return "Player X has won. Congratulations!!"', function() {
      gameHandler.board = [["x", "x", null], [null, "o", null], [null, "o", null]];
      gameHandler.lastPlayer = "o";
      testMove("x", 0, 2, "Player X has won. Congratulations!!");
    });

    it('should return "Game over :-(" (after X has won)', function() {
      gameHandler.board = [["x", "x", "x"], [null, "o", null], [null, "o", null]];
      gameHandler.lastPlayer = "x";
      gameHandler.isGameOver = true;
      testMove("x", 1, 1, "Game over :-(")
    });

    it('should return "Game over :-(" (after tie)', function() {
      gameHandler.board = [["x", "o", "x"], ["x", "o", "x"], ["o", "x", "o"]];
      gameHandler.lastPlayer = "x";
      gameHandler.isGameOver = true;
      testMove("o", 1, 1, "Game over :-(");
    });
  });

  describe("#isWinner()", function() {
    it("should be winner: X", function() {
      gameHandler.board = [["X", "O", "X"], ["O", "X", "O"], ["X", null, null]];
      assert.ok(function() {
        return gameHandler.isWinner("X");
      }());
    });
    it("should NOT be winner: O", function() {
      gameHandler.board = [["X", "O", "X"], ["O", "X", "O"], ["X", null, null]];
      assert.ifError(gameHandler.isWinner("O"));
    });
  });

  describe("#isTie()", function() {
    it("should return 'true'", function() {
      gameHandler.board = [["X", "O", "X"], ["X", "O", "X"], ["O", "X", "O"]];
      assert.ok(gameHandler.isTie());
    });

    it("should return 'false'", function() {
      gameHandler.board = [["X", "O", "X"], ["X", "O", "X"], ["O", "X", null]];
      assert.ifError(gameHandler.isTie());
    });
  });
});
