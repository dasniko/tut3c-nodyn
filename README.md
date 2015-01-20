[![Build Status](https://travis-ci.org/dasniko/tut3c-nodyn.svg?branch=master)](https://travis-ci.org/dasniko/tut3c-nodyn)
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

Due to the fact, that Nodyn isn't able to serve static files with ExpressJS,
we implemented a workaround in `tut3c-web-express.js` for serving the UI files.
This isn't a good approach, but there was no other way in this short time of the day, so be patient with us. ;-)

## Mocha unit tests

are in the `test` subfolder and can be run with:

    mocha test-tictactoe-server.js

They are surely not the best way, yet. But as there was agenda initially to build test,
we're pretty proud to have some in any way! (Good girls!)
