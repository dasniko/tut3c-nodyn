var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var vertx = require("vertx2-core");
var app = express();


app.use(bodyParser.json());

app.post('/', function (req, res) {
    console.log("Received Message: %s", JSON.stringify(req.body));
    if (Object.getOwnPropertyNames(req.body).length > 0) {
        vertx.eventbus.send("tictactoe", req.body, function(message) {
            res.json(message.body);
        });
    } else {
        res.status(500).send("Empty Object");
    }
});

app.get('/', function(req, res) {
    res.write("Message Type not allowed");
    res.end();
});

var server = app.listen(9000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log( "TicTacToe-Server is listening on http://%s:%s", host, port);
});
