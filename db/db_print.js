const db = require("./db_connection");

const pos = "SELECT * FROM pos";
const users  = "SELECT * FROM users";
const words = "SELECT * FROM words";
const words_user_xref = "SELECT * FROM words_user_xref";


db.execute(pos, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'pos' contents:")
        console.log(results);
    }
);

db.execute(users, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'users' contents:")
        console.log(results);
    }
);

db.execute(words, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'words' contents:")
        console.log(results);
    }
);

db.execute(words_user_xref, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'words_user_xref' contents:")
        console.log(results);
    }
);

db.end();



