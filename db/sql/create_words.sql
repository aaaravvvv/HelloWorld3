CREATE TABLE `webapp_9MF_aardud25`.`words` (
  `words_id` INT NOT NULL AUTO_INCREMENT,
  `pos_id` INT NOT NULL,
  `word` VARCHAR(45) NULL,
  `definition` VARCHAR(45) NULL,
  `difficulty` VARCHAR(45) NULL,
  PRIMARY KEY (`words_id`),
  INDEX `pos_foreign_key_idx` (`pos_id` ASC),
  CONSTRAINT `pos_foreign_key`
    FOREIGN KEY (`pos_id`)
    REFERENCES `webapp_9MF_aardud25`.`pos` (`pos_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);