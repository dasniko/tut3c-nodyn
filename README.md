# The Ultimate Tic-Tac-Toe Challenge with Nodyn & Vert.x

## Install/Clone & build:

(You'll need Java and Maven)

- http://nodejs.org
- http://vertx.io
- http://github.com/nodyn/nodyn
- http://github.com/nodyn/mod-nodyn
- http://github.com/nodyn/vertx2-core

Test your installations with https://github.com/dasniko/beer-as-a-service

## Current state

So far, there is a first attempt of Vert.x JS verticle, calculating the board state:

    tictactoe-server.js

Additionally, there are two web servers with the Nodyn/Vert.x combination:

    tut3c-web.js

and

    tut3c-web-express.js

(One with express, one without ;-) )

## Mocha unit tests
can be run with:
	mocha
