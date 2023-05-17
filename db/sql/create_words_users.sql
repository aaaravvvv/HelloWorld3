CREATE TABLE `webapp_9MF_aardud25`.`words_user_xref` (
  `words_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  INDEX `users_foreign_key_idx` (`user_id` ASC),
  INDEX `words_foreign_key_idx` (`words_id` ASC),
  CONSTRAINT `users_foreign_key`
    FOREIGN KEY (`user_id`)
    REFERENCES `webapp_9MF_aardud25`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `words_foreign_key`
    FOREIGN KEY (`words_id`)
    REFERENCES `webapp_9MF_aardud25`.`words` (`words_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);