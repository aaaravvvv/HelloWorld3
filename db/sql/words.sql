CREATE TABLE `webapp_9MF_aardud25`.`words_user_xref1` (
  `words_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`words_id`, `user_id`),
  INDEX `users1_foreign_key_idx` (`user_id` ASC),
  CONSTRAINT `users1_foreign_key`
    FOREIGN KEY (`user_id`)
    REFERENCES `webapp_9MF_aardud25`.`users_1` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `words1_foreign_key`
    FOREIGN KEY (`words_id`)
    REFERENCES `webapp_9MF_aardud25`.`words_1` (`words_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `webapp_9MF_aardud25`.`words_1` 
DROP FOREIGN KEY `pos1_foreign_key`;
ALTER TABLE `webapp_9MF_aardud25`.`words_1` 
ADD INDEX `pos1_foreign_key_idx` (`pos_id` ASC),
DROP INDEX `pos_foreign_key_idx` ;
;
ALTER TABLE `webapp_9MF_aardud25`.`words_1` 
ADD CONSTRAINT `pos1_foreign_key`
  FOREIGN KEY (`pos_id`)
  REFERENCES `webapp_9MF_aardud25`.`pos_1` (`pos_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
SET FOREIGN_KEY_CHECKS=0