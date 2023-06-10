//set up the server
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");
const DEBUG = true;
const db = require('./db/db_connection');
app.use(logger("dev"));
app.use(express.static(__dirname + '/public'));

app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );


// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.render('index');
} );


// define a route for the assignment list page
const read_assignments_all_sql = `
SELECT words_id, word, difficulty, pos, definition
FROM words
LEFT JOIN pos 
	ON words.pos_id = pos.pos_id

`
app.get( "/assignments", ( req, res ) => {
    db.execute(read_assignments_all_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else{
            let data = { hwlist : results };
            res.render('assignments', data);
        }
            
    });
});



// define a route for the assignment detail page
const read_assignment_detail_sql = `
SELECT words_id, word, difficulty, pos, definition
FROM words
LEFT JOIN pos 
	ON words.pos_id = pos.pos_id
WHERE words_id = ?
`
app.get( "/assignments/:id", ( req, res ) => {
    db.execute(read_assignment_detail_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
            
        else if (results.length == 0)
            res.status(404).send(`No assignment found with id = "${req.params.id}"` );
        else{
            let data = {hw: results[0]}; 
            res.render('detail', data); 

        }
            
    });
});

app.get( "/word-of-the-day", ( req, res ) => {
    res.sendFile(__dirname + "/views/word.ejs" );
} );

app.get( "/sign-in", ( req, res ) => {
    res.sendFile(__dirname + "/views/signin.ejs" );
} );