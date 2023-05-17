const db = require("./db_connection");

const delete_users_1_table_sql = "DELETE FROM users_1"
db.execute(delete_users_1_table_sql);

const delete_pos_1_table_sql = "DELETE FROM pos_1;"
db.execute(delete_pos_1_table_sql);

const delete_words_1_table_sql = "DELETE FROM words_1;"
db.execute(delete_words_1_table_sql);

const delete_words_user_xref1_table_sql = "DELETE FROM words_user_xref1;"
db.execute(delete_words_user_xref1_table_sql);

/**** Create some sample subjects and assignments ****/

const insert_words_1_sql = `
    INSERT INTO words_1 
        (words_id, pos_id, words, definition, difficulty) 
    VALUES 
        (?, ?, ?, ?, ?);
`
db.execute(insert_words_1_sql, [1, 1, 'cattywampus', 'positioned diagonally', '2']);
db.execute(insert_words_1_sql, [2, 2, 'splat', 'a slat of wood in the middle of the back of a straight chair', '4']);
db.execute(insert_words_1_sql, [3, 3, 'cattywampus', 'to understand intuitively', '9']);
db.execute(insert_words_1_sql, [4, 4, 'cheerfully', 'in a way that displays happiness or optimism', '6']);
db.execute(insert_words_1_sql, [5, 2, 'splurge', 'an act of spending money freely or extravagantly', '5']);


const insert_pos_1_sql = `
    INSERT INTO pos_1 
        (pos_id, pos) 
    VALUES 
        (?, ?);
`
db.execute(insert_pos_1_sql, [1, 'adjective']);
db.execute(insert_pos_1_sql, [2, 'noun']);
db.execute(insert_pos_1_sql, [3, 'verb']);
db.execute(insert_pos_1_sql, [4, 'adverb']);

const insert_users_1_sql = `
    INSERT INTO users_1
        (user_id, first_name, last_name, phone_number, email, dob, password) 
    VALUES 
        (?, ?, ?, ?, ?, ?, ?);
`
db.execute(insert_users_1_sql, [1, 'Aarav', 'Dudhia', '201-123-4567', 'aardud25@bergen.org', 2007-02-19, 'ddddd']);
db.execute(insert_users_1_sql, [2, 'Mudasir', 'Ali', '201-321-7654', 'mudali25@bergen.org', 2007-02-23, 'mmmmm']);


const insert_words_user_xref1_sql = `
    INSERT INTO words_user_xref1
        (words_id, user_id)  
    VALUES 
        (?, ?);
`
db.execute(insert_words_user_xref1_sql, [1, 1]);
db.execute(insert_words_user_xref1_sql, [2, 1]);
db.execute(insert_words_user_xref1_sql, [3, 1]);
db.execute(insert_words_user_xref1_sql, [4, 2]);
db.execute(insert_words_user_xref1_sql, [5, 2]);

db.end();


