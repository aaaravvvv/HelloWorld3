//set up the server
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");
const DEBUG = true;
const db = require('./db/db_connection');
app.use(logger("dev"));
app.use(express.static(__dirname + '/public'));
// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({ extended: false }) );

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
order by words_id asc

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
order by words_id asc
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

// define a route for assignment DELETE
const delete_assignment_sql = `
    DELETE 
    FROM
        words
    WHERE
        words_id = ?
`
const delete_xref_sql = `
    DELETE 
    FROM
        words_user_xref, users
    WHERE
        words_id = ?  
`

app.get("/assignments/:id/delete", ( req, res ) => {
    db.execute(delete_assignment_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/assignments");
        }
    });
});

const update_assignment_sql = `
    UPDATE
        words
    SET
        word = ?,
        difficulty = ?,
        pos_id = ?,
        definition = ?
    WHERE
        words_id = ?
`;

app.post("/assignments/:id", (req, res) => {
    const word = req.body.word || null;
    const difficulty = req.body.difficulty || null;
    const pos = req.body.pos || null;
    const definition = req.body.definition || null;
    const assignmentId = req.params.id || null;

    // Check if the provided pos_id exists in the pos table
    const checkPosExistsSql = `SELECT * FROM pos WHERE pos_id = ?`;
    db.execute(checkPosExistsSql, [pos], (posError, posResults) => {
        if (posError) {
            console.error(posError);
            res.status(500).send("Internal Server Error");
        } else if (posResults.length === 0) {
            res.status(400).send(`Invalid pos_id: ${pos}`);
        } else {
            db.execute(
                update_assignment_sql,
                [word, difficulty, pos, definition, assignmentId],
                (updateError, updateResults) => {
                    if (updateError) {
                        console.error(updateError);
                        res.status(500).send("Internal Server Error");
                    } else {
                        res.redirect(`/assignments/${assignmentId}`);
                    }
                }
            );
        }
    });
});



// define a route for assignment CREATE
const create_assignment_sql = `
    INSERT INTO words 
        (word, difficulty, pos_id, definition) 
    VALUES 
        (?, ?, ?, ?);
`
app.post("/assignments", (req, res) => {
    const word = req.body.word || null;
    const difficulty = req.body.difficulty || null;
    const pos = req.body.pos || null; // Update to 'pos' instead of 'pos_id'
    const definition = req.body.definition || null;

    db.execute(create_assignment_sql, [word, difficulty, pos, definition], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            // Handle the success case
            res.redirect(`/assignments/${results.insertId}`);
        }
    });
});



