use `ssafy_project`;

DROP TABLE IF EXISTS `recipe_ingredient`;
DROP TABLE IF EXISTS `game_statistic`;
DROP TABLE IF EXISTS `recipe`;
DROP TABLE IF EXISTS `beverage`;
DROP TABLE IF EXISTS `device`;
DROP TABLE IF EXISTS `game`;
DROP TABLE IF EXISTS `account`;

CREATE TABLE `beverage` (
	`beverage_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`beverage_name`	VARCHAR(30)	NOT NULL,
	`beverage_image_url`	VARCHAR(100)	NULL
);

CREATE TABLE `recipe` (
	`recipe_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`recipe_name`	VARCHAR(30)	NOT NULL,
	`recipe_desc`	VARCHAR(200)	NULL,
	`recipe_use_count`	Integer	NOT NULL	DEFAULT 0
);

CREATE TABLE `device` (
	`device_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`account_id`	Integer	NOT NULL,
	`device_name`	VARCHAR(30)	NOT NULL,
	`recipe_maker_ip`	CHAR(11)	NOT NULL	DEFAULT '127.0.0.1',
	`recipe_maker_port`	Integer	NOT NULL	DEFAULT 9090
);

CREATE TABLE `game` (
	`game_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`game_name`	VARCHAR(30)	NULL,
	`game_desc`	VARCHAR(200)	NULL
);

CREATE TABLE `recipe_ingredient` (
	`recipe_id`	Integer	NOT NULL,
	`beverage_id`	Integer	NOT NULL,
	`recipe_ingredient_ratio`	Integer	NOT NULL	DEFAULT 1
);

CREATE TABLE `account` (
	`account_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`account_user_id`	VARCHAR(30)	NOT NULL,
	`account_user_password`	VARCHAR(30)	NOT NULL,
	`account_name`	VARCHAR(30)	NULL,
	`role`	ENUM('admin','manager')	NOT NULL	DEFAULT 'manager',
	`account_is_removed`	BOOLEAN	NOT NULL	DEFAULT false
);

CREATE TABLE `game_statistic` (
	`game_id`	Integer	NOT NULL,
	`account_id`	Integer	NOT NULL,
	`game_play_count`	Integer	NOT NULL	DEFAULT 0
);

ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `PK_RECIPE_INGREDIENT` PRIMARY KEY (`recipe_id`,`beverage_id`);

ALTER TABLE `game_statistic` ADD CONSTRAINT `PK_GAME_STATISTIC` PRIMARY KEY (`game_id`,`account_id`);

ALTER TABLE `device` ADD CONSTRAINT `FK_account_TO_device_1` FOREIGN KEY (`account_id`) 
REFERENCES `account` (`account_id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `FK_recipe_TO_recipe_ingredient_1` FOREIGN KEY (`recipe_id`)
REFERENCES `recipe` (`recipe_id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `FK_beverage_TO_recipe_ingredient_1` FOREIGN KEY (`beverage_id`)
REFERENCES `beverage` (`beverage_id`)
ON DELETE CASCADE
ON UPDATE CASCADE
;

ALTER TABLE `game_statistic` ADD CONSTRAINT `FK_game_TO_game_statistic_1` FOREIGN KEY (`game_id`)
REFERENCES `game` (`game_id`)
ON DELETE CASCADE
ON UPDATE CASCADE
;

ALTER TABLE `game_statistic` ADD CONSTRAINT `FK_account_TO_game_statistic_1` FOREIGN KEY (`account_id`)
REFERENCES `account` (`account_id`)
ON DELETE CASCADE
ON UPDATE CASCADE
;

CREATE INDEX `account_user_id` on account(account_user_id);
CREATE INDEX `account_name` on account(account_name);
CREATE INDEX `beverage_name` on beverage(beverage_name);
CREATE INDEX `recipe_name` on recipe(recipe_name);
CREATE INDEX `recipe_use_count` on recipe(recipe_use_count);
CREATE INDEX `game_name` on game(game_name);
CREATE INDEX `game_play_count` on game_statistic(game_play_count);

use `ssafy_project_test`;

DROP TABLE IF EXISTS `recipe_ingredient`;
DROP TABLE IF EXISTS `game_statistic`;
DROP TABLE IF EXISTS `recipe`;
DROP TABLE IF EXISTS `beverage`;
DROP TABLE IF EXISTS `device`;
DROP TABLE IF EXISTS `game`;
DROP TABLE IF EXISTS `account`;

CREATE TABLE `beverage` (
	`beverage_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`beverage_name`	VARCHAR(30)	NOT NULL,
	`beverage_image_url`	VARCHAR(100)	NULL
) ENGINE=MEMORY;

CREATE TABLE `recipe` (
	`recipe_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`recipe_name`	VARCHAR(30)	NOT NULL,
	`recipe_desc`	VARCHAR(200)	NULL,
	`recipe_use_count`	Integer	NOT NULL	DEFAULT 0
) ENGINE=MEMORY;

CREATE TABLE `device` (
	`device_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`account_id`	Integer	NOT NULL,
	`device_name`	VARCHAR(30)	NOT NULL,
	`recipe_maker_ip`	CHAR(11)	NOT NULL	DEFAULT '127.0.0.1',
	`recipe_maker_port`	Integer	NOT NULL	DEFAULT 9090
) ENGINE=MEMORY;

CREATE TABLE `game` (
	`game_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`game_name`	VARCHAR(30)	NULL,
	`game_desc`	VARCHAR(200)	NULL
) ENGINE=MEMORY;

CREATE TABLE `recipe_ingredient` (
	`recipe_id`	Integer	NOT NULL,
	`beverage_id`	Integer	NOT NULL,
	`recipe_ingredient_ratio`	Integer	NOT NULL	DEFAULT 1
) ENGINE=MEMORY;

CREATE TABLE `account` (
	`account_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`account_user_id`	VARCHAR(30)	NOT NULL,
	`account_user_password`	VARCHAR(30)	NOT NULL,
	`account_name`	VARCHAR(30)	NULL,
	`role`	ENUM('admin','manager')	NOT NULL	DEFAULT 'manager',
	`account_is_removed`	BOOLEAN	NOT NULL	DEFAULT false
) ENGINE=MEMORY;

CREATE TABLE `game_statistic` (
	`game_id`	Integer	NOT NULL,
	`account_id`	Integer	NOT NULL,
	`game_play_count`	Integer	NOT NULL	DEFAULT 0
) ENGINE=MEMORY;

ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `PK_RECIPE_INGREDIENT` PRIMARY KEY (`recipe_id`,`beverage_id`);

ALTER TABLE `game_statistic` ADD CONSTRAINT `PK_GAME_STATISTIC` PRIMARY KEY (`game_id`,`account_id`);

ALTER TABLE `device` ADD CONSTRAINT `FK_account_TO_device_1` FOREIGN KEY (`account_id`) 
REFERENCES `account` (`account_id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `FK_recipe_TO_recipe_ingredient_1` FOREIGN KEY (`recipe_id`)
REFERENCES `recipe` (`recipe_id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `FK_beverage_TO_recipe_ingredient_1` FOREIGN KEY (`beverage_id`)
REFERENCES `beverage` (`beverage_id`)
ON DELETE CASCADE
ON UPDATE CASCADE
;

ALTER TABLE `game_statistic` ADD CONSTRAINT `FK_game_TO_game_statistic_1` FOREIGN KEY (`game_id`)
REFERENCES `game` (`game_id`)
ON DELETE CASCADE
ON UPDATE CASCADE
;

ALTER TABLE `game_statistic` ADD CONSTRAINT `FK_account_TO_game_statistic_1` FOREIGN KEY (`account_id`)
REFERENCES `account` (`account_id`)
ON DELETE CASCADE
ON UPDATE CASCADE
;

CREATE INDEX `account_user_id` on account(account_user_id);
CREATE INDEX `account_name` on account(account_name);
CREATE INDEX `beverage_name` on beverage(beverage_name);
CREATE INDEX `recipe_name` on recipe(recipe_name);
CREATE INDEX `recipe_use_count` on recipe(recipe_use_count);
CREATE INDEX `game_name` on game(game_name);
CREATE INDEX `game_play_count` on game_statistic(game_play_count);