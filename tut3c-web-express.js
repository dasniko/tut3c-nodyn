var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var vertx = require("vertx2-core");
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.post('/', function (req, res) {
    console.log("Received Message: %s", JSON.stringify(req.body));
    if (Object.getOwnPropertyNames(req.body).length > 0) {
        vertx.eventbus.send("tictactoe", req.body, function(message) {
            res.json(message.body);
        });
    } else {
        res.status(400).send("Empty Object");
    }
});

app.get('/init', function(req, res) {
    vertx.eventbus.send("init_ttt", {}, function(message) {
        res.json(message.body);
    });
});

/*app.get('/', function(req, res) {
    var filename = path.join(__dirname, 'index.html');
    console.log(filename);
    res.sendFile(filename);
});*/

var server = app.listen(9000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log( "TicTacToe-Server is listening on http://%s:%s", host, port);
});
