var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var vertx = require("vertx2-core");
var app = express();

app.use(bodyParser.json());

app.post('/api', function (req, res) {
    console.log("Received Message: %s", JSON.stringify(req.body));
    if (Object.getOwnPropertyNames(req.body).length > 0) {
        vertx.eventbus.send("tictactoe", req.body, function(message) {
            res.json(message.body);
        });
    } else {
        res.status(400).send("Empty Object");
    }
});

app.get('/api', function(req, res) {
    console.log("Init-Request received.");
    vertx.eventbus.send("init_ttt", {}, function(message) {
        res.json(message.body);
    });
});

app.get('/:file', function(req, res) {
    var file = req.params.file;
    console.log("Received request for file %s", file);
    var filename = path.join(__dirname, "web", file);
    var strFile = new String(filename);
    fs.readFile(filename, "utf8", function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var contentType = "text/html";
            if (strFile.endsWith(".js")) {
                contentType = "text/javascript";
            } else if (strFile.endsWith(".css")) {
                contentType = "text/css";
            }
            res.set("Content-type", contentType);
            res.send(data);
            res.end();
        }
    });
});

var server = app.listen(9000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log( "TicTacToe-Server is listening on http://%s:%s", host, port);
});
