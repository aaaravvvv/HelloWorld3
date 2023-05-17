const db = require("./db_connection");
const fs = require("fs");

const drop_pos_table_sql = "DROP TABLE IF EXISTS pos;"
const drop_users_table_sql = "DROP TABLE IF EXISTS users;"
const drop_words_table_sql = "DROP TABLE IF EXISTS words;"
const drop_words_user_xref_table_sql = "DROP TABLE IF EXISTS words_user_xref;"

db.execute(drop_words_user_xref_table_sql);
db.execute(drop_words_table_sql);
db.execute(drop_pos_table_sql);
db.execute(drop_users_table_sql);





const createPos = fs.readFileSync(__dirname+"/sql/create_pos.sql").toString();        
db.execute(createPos);

const createUsers = fs.readFileSync(__dirname+"/sql/create_users.sql").toString();
db.execute(createUsers);

const createWords = fs.readFileSync(__dirname+"/sql/create_words.sql").toString();
db.execute(createWords);

const createWords_Users = fs.readFileSync(__dirname+"/sql/create_words_users.sql").toString();        
db.execute(createWords_Users);





db.end();

