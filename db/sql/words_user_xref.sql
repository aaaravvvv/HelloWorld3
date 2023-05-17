CREATE TABLE `webapp_9MF_aardud25`.`words_1` (
  `words_id` INT NOT NULL,
  `pos_id` INT NOT NULL,
  `words` VARCHAR(45) NULL,
  `definition` VARCHAR(45) NULL,
  `difficulty` VARCHAR(45) NULL,
  PRIMARY KEY (`words_id`, `pos_id`),
  INDEX `pos_foreign_key_idx` (`pos_id` ASC),
  CONSTRAINT `pos1_foreign_key`
    FOREIGN KEY (`pos_id`)
    REFERENCES `webapp_9MF_aardud25`.`pos_1` (`pos_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `webapp_9MF_aardud25`.`words_user_xref1` 
ADD CONSTRAINT `words_foreign_key`
  FOREIGN KEY (`words_id`)
  REFERENCES `webapp_9MF_aardud25`.`words_1` (`words_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `users_foreign_key`
  FOREIGN KEY (`user_id`)
  REFERENCES `webapp_9MF_aardud25`.`users_1` (`user_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


