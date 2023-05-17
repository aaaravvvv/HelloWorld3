//set up the server
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.static(__dirname + '/public'));

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile(__dirname + "/views/index.html" );
} );

app.get( "/assignments", ( req, res ) => {
    res.sendFile(__dirname + "/views/assignments.html" );
} );

app.get( "/details", ( req, res ) => {
    res.sendFile(__dirname + "/views/detail.html" );
} );

app.get( "/word-of-the-day", ( req, res ) => {
    res.sendFile(__dirname + "/views/word.html" );
} );

app.get( "/sign-in", ( req, res ) => {
    res.sendFile(__dirname + "/views/signin.html" );
} );