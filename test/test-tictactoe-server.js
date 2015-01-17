var assert = require("assert")
var class_under_test = require("../tictactoe-core")

var testMove = function(player, x, y, expectedStatus) {
  class_under_test.gameHandler.handle({player: player, coord: [x, y]}, function(obj) {
    assert.equal(expectedStatus, obj.status);
  })
}

describe('GameHandler', function(){
  describe('#handle()', function(){
    it('should return "Illegal coordinates: Coordinates must be in range of [0..2]."', function(){
      testMove("x", -1, 0, "Illegal coordinates: Coordinates must be in range of [0..2].");
    });
    it('should return "Illegal coordinates: Coordinates must be in range of [0..2]."', function(){
      testMove("x", 1, 3, "Illegal coordinates: Coordinates must be in range of [0..2].");
    });
    //it('should throw an error', function() {
    //    assert.throws(
    //    class_under_test.gameHandler.handle({}, function(obj) {
    //    }), TypeError, "Error thrown");
    //});
    it('should return "TicTacToe initialized. Start your new game!"', function() {
        class_under_test.gameHandler.init(function(result) {
            assert.equal("TicTacToe initialized. Start your new game!", result.status);
        });
    });
    it('should return "Illegal move: It is not your turn."', function(){
      testMove("x", 0, 0, "It is O's turn");
      testMove("x", 0, 1, "Illegal move: It is not your turn.");
    });
    it('should return "Illegal move: Field already occupied."', function(){
      testMove("o", 1, 1, "It is X's turn");
      testMove("x", 1, 1, "Illegal move: Field already occupied.");
    });
    it('should return "Player X has won. Congratulations!!"', function(){
      testMove("x", 0, 1, "It is O's turn");
      testMove("o", 2, 1, "It is X's turn");
      testMove("x", 0, 2, "Player X has won. Congratulations!!");
    });
    it('should return "Game over :-( Send a GET request to start a new Game!"', function() {
      testMove("x", 1, 1, "Game over :-( Send a GET request to start a new Game!")
    });
  })
})
