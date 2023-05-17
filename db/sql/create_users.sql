CREATE TABLE `webapp_9MF_aardud25`.`users` (
  `user_id` INT NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NULL,
  `phone_number` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `dob` DATE NULL,
  `password` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`user_id`));