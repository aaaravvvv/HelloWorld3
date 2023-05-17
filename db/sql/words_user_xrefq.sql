SELECT first_name, last_name, word FROM words_user_xref 
RIGHT JOIN words
    ON words_user_xref.words_id = words.words_id
RIGHT JOIN users  
    ON words_user_xref.user_id = users.user_id