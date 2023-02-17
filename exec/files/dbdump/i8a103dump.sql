CREATE SCHEMA `ssafy_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin ;
CREATE SCHEMA `ssafy_project_test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

use `ssafy_project`;

DROP TABLE IF EXISTS `game_statistic`;

DROP TABLE IF EXISTS `recipe_ingredient`;
DROP TABLE IF EXISTS `account_game_statistic`;
DROP TABLE IF EXISTS `game_log`;
DROP TABLE IF EXISTS `recipe`;
DROP TABLE IF EXISTS `beverage`;
DROP TABLE IF EXISTS `device`;
DROP TABLE IF EXISTS `game`;
DROP TABLE IF EXISTS `account`;

CREATE TABLE `beverage` (
	`beverage_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`beverage_name`	VARCHAR(30)	NOT NULL,
	`beverage_image_url`	VARCHAR(2083)	NULL
);

CREATE TABLE `recipe` (
	`recipe_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`recipe_name`	VARCHAR(30)	NOT NULL,
	`recipe_desc`	VARCHAR(1000)	NULL,
	`recipe_use_count`	Integer	NOT NULL	DEFAULT 0
);

CREATE TABLE `device` (
	`device_mac_address`	CHAR(17)	NOT NULL PRIMARY KEY,
	`account_id`	Integer	NOT NULL,
	`device_name`	VARCHAR(30)	NOT NULL
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
	`account_user_password`	VARCHAR(60)	NOT NULL,
	`account_name`	VARCHAR(30)	NULL,
	`role`	ENUM('admin','manager')	NOT NULL	DEFAULT 'manager',
	`account_is_removed`	BOOLEAN	NOT NULL	DEFAULT false
);

CREATE TABLE `account_game_statistic` (
	`game_id`	Integer	NOT NULL,
	`account_id`	Integer	NOT NULL,
	`game_play_count`	Integer	NOT NULL	DEFAULT 0
);

CREATE TABLE `game_log` (
	`log_id`	Integer	NOT NULL	PRIMARY KEY AUTO_INCREMENT,
	`device_mac_address`	CHAR(17)	NOT NULL,
	`game_id`	Integer	NOT NULL,
	`log_date`	DATETIME	NULL	DEFAULT now(),
	`log_player_count`	Integer	NOT NULL
);

ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `PK_RECIPE_INGREDIENT` PRIMARY KEY (`recipe_id`,`beverage_id`);

ALTER TABLE `account_game_statistic` ADD CONSTRAINT `PK_ACCOUNT_GAME_STATISTIC` PRIMARY KEY (`game_id`,`account_id`);

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

ALTER TABLE `account_game_statistic` ADD CONSTRAINT `FK_game_TO_account_game_statistic_1` FOREIGN KEY (`game_id`)
REFERENCES `game` (`game_id`)
ON DELETE CASCADE
ON UPDATE CASCADE
;

ALTER TABLE `account_game_statistic` ADD CONSTRAINT `FK_account_TO_account_game_statistic_1` FOREIGN KEY (`account_id`)
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
CREATE INDEX `game_play_count` on account_game_statistic(game_play_count);
CREATE INDEX `device_mac_address` on game_log(device_mac_address);
CREATE INDEX `game_id` on game_log(game_id);
CREATE INDEX `log_date` on game_log(log_date);

use `ssafy_project_test`;

DROP TABLE IF EXISTS `game_statistic`;

DROP TABLE IF EXISTS `recipe_ingredient`;
DROP TABLE IF EXISTS `account_game_statistic`;
DROP TABLE IF EXISTS `game_log`;
DROP TABLE IF EXISTS `recipe`;
DROP TABLE IF EXISTS `beverage`;
DROP TABLE IF EXISTS `device`;
DROP TABLE IF EXISTS `game`;
DROP TABLE IF EXISTS `account`;

CREATE TABLE `beverage` (
	`beverage_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`beverage_name`	VARCHAR(30)	NOT NULL,
	`beverage_image_url`	VARCHAR(2083)	NULL
) ENGINE=MEMORY;

CREATE TABLE `recipe` (
	`recipe_id`	Integer	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`recipe_name`	VARCHAR(30)	NOT NULL,
	`recipe_desc`	VARCHAR(1000)	NULL,
	`recipe_use_count`	Integer	NOT NULL	DEFAULT 0
) ENGINE=MEMORY;

CREATE TABLE `device` (
	`device_mac_address`	CHAR(17)	NOT NULL PRIMARY KEY,
	`account_id`	Integer	NOT NULL,
	`device_name`	VARCHAR(30)	NOT NULL
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
	`account_user_password`	VARCHAR(60)	NOT NULL,
	`account_name`	VARCHAR(30)	NULL,
	`role`	ENUM('admin','manager')	NOT NULL	DEFAULT 'manager',
	`account_is_removed`	BOOLEAN	NOT NULL	DEFAULT false
) ENGINE=MEMORY;

CREATE TABLE `account_game_statistic` (
	`game_id`	Integer	NOT NULL,
	`account_id`	Integer	NOT NULL,
	`game_play_count`	Integer	NOT NULL	DEFAULT 0
) ENGINE=MEMORY;

CREATE TABLE `game_log` (
	`log_id`	Integer	NOT NULL	PRIMARY KEY AUTO_INCREMENT,
	`device_mac_address`	CHAR(17)	NOT NULL,
	`game_id`	Integer	NOT NULL,
	`log_date`	DATETIME	NULL	DEFAULT now(),
	`log_player_count`	Integer	NOT NULL
) ENGINE=MEMORY;

ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `PK_RECIPE_INGREDIENT` PRIMARY KEY (`recipe_id`,`beverage_id`);

ALTER TABLE `account_game_statistic` ADD CONSTRAINT `PK_ACCOUNT_GAME_STATISTIC` PRIMARY KEY (`game_id`,`account_id`);

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

ALTER TABLE `account_game_statistic` ADD CONSTRAINT `FK_game_TO_account_game_statistic_1` FOREIGN KEY (`game_id`)
REFERENCES `game` (`game_id`)
ON DELETE CASCADE
ON UPDATE CASCADE
;

ALTER TABLE `account_game_statistic` ADD CONSTRAINT `FK_account_TO_account_game_statistic_1` FOREIGN KEY (`account_id`)
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
CREATE INDEX `game_play_count` on account_game_statistic(game_play_count);
CREATE INDEX `device_mac_address` on game_log(device_mac_address);
CREATE INDEX `game_id` on game_log(game_id);
CREATE INDEX `log_date` on game_log(log_date);

use `ssafy_project`;
INSERT INTO `beverage` (`beverage_id`, `beverage_name`, `beverage_image_url`) VALUES
	(1, '소주', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675354999/%EC%86%8C%EC%A3%BC_cy9gun.png'),
	(2, '맥주', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675354999/%EB%A7%A5%EC%A3%BC_hc03t4.png'),
	(3, '백세주', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675354998/%EB%B0%B1%EC%84%B8%EC%A3%BC_nug6ho.png'),
	(4, '산사춘', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675355000/%EC%82%B0%EC%82%AC%EC%B6%98_i6w28o.png'),
	(5, '매화수', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675354999/%EB%A7%A4%ED%99%94%EC%88%98_cxxslg.png'),
	(6, '막걸리', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675354999/%EB%A7%89%EA%B1%B8%EB%A6%AC_vcyfvn.png'),
	(7, '예거마이스터', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675355000/%EC%98%88%EA%B1%B0%EB%A7%88%EC%9D%B4%EC%8A%A4%ED%84%B0_hlvpba.png'),
	(8, '위스키', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675355000/%EC%9C%84%EC%8A%A4%ED%82%A4_o02nua.png'),
	(9, '버니니', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675354998/%EB%B2%84%EB%8B%88%EB%8B%88_dmckzb.png'),
	(10, '진저에일', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675355000/%EC%A7%84%EC%A0%80%EC%97%90%EC%9D%BC_ngo3pb.png'),
	(11, '토닉워터', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675354999/%ED%86%A0%EB%8B%89%EC%9B%8C%ED%84%B0_nplve5.png'),
	(12, '콜라', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675355001/%EC%BD%9C%EB%9D%BC_eph60v.png'),
	(13, '사이다', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675355000/%EC%82%AC%EC%9D%B4%EB%8B%A4_cogcri.png'),
	(14, '홍초', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675355000/%ED%99%8D%EC%B4%88_pjrjuc.png'),
	(15, '레쓰비', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675354999/%EB%A0%88%EC%93%B0%EB%B9%84_ygi6qj.png'),
	(16, '토마토주스', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675355001/%ED%86%A0%EB%A7%88%ED%86%A0%EC%A3%BC%EC%8A%A4_lren77.png'),
	(17, '파워에이드', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675355001/%ED%8C%8C%EC%9B%8C%EC%97%90%EC%9D%B4%EB%93%9C_icjgih.png'),
	(18, '핫식스', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675355000/%ED%95%AB%EC%8B%9D%EC%8A%A4_odu4g6.png'),
	(20, '포카리', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675355001/%ED%8F%AC%EC%B9%B4%EB%A6%AC_zmjen5.png'),
	(21, '게토레이', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675354998/%EA%B2%8C%ED%86%A0%EB%A0%88%EC%9D%B4_rut87i.png'),
	(22, '아메리카노', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675355001/%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8_bbybds.png'),
	(23, '솔의눈', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675354999/%EC%86%94%EC%9D%98%EB%88%88_es0tjv.png'),
	(24, '실론티', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675354999/%EC%8B%A4%EB%A1%A0%ED%8B%B0_ubckym.png'),
	(25, '보성홍차아이스티', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1675354999/%EB%B3%B4%EC%84%B1%ED%99%8D%EC%B0%A8%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0_xumpnx.png'),
	(301, '요구르트', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1676435542/%EC%9A%94%EA%B5%AC%EB%A5%B4%ED%8A%B8_jm1co6.png'),
	(302, '비타500', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1676435542/%EB%B9%84%ED%83%80500_mvcdwb.png'),
	(303, '크랜베리주스', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1676435543/%ED%81%AC%EB%9E%9C%EB%B2%A0%EB%A6%AC%EC%A3%BC%EC%8A%A4_i6ab0p.png'),
	(304, '자몽주스', 'https://res.cloudinary.com/de31ny8xi/image/upload/v1676435543/%EC%9E%90%EB%AA%BD%EC%A3%BC%EC%8A%A4_ywt53u.png');


INSERT INTO `recipe` (`recipe_id`, `recipe_name`, `recipe_desc`, `recipe_use_count`) VALUES
	(1, '쏘맥1', '쏘맥', 0),
	(2, '소원주', '소원주', 0),
	(3, '소메리카노', '소메리카노', 0),
	(4, '홍익인간주', '홍익인간주', 0),
	(5, '링겔주', '링겔주', 0),
	(6, '암바사주', '암바사주', 0),
	(7, '밀키스주', '밀키스주', 0),
	(8, '막소사', '막소사', 0),
	(9, '소백산맥', '소백산맥', 0),
	(10, '예거밤', '예거밤', 0),
	(11, '에너자이저주', '에너자이저주', 0),
	(12, '소닉워터주', '소닉워터주', 0),
	(13, '레드아이', '레드아이', 0),
	(15, '하이볼', '진저에일하이볼', 0),
	(16, '맥사토', '맥사토', 0),
	(17, '뿅가리스웨트', '뿅가리스웨트', 0),
	(18, '소맥포', '소맥포', 0),
	(19, '게토하리', '개토하리', 0),
	(20, '막맥', '막맥', 0),
	(21, '진솔루트', '진솔루트', 0),
	(22, '태극주', '태극주', 0),
	(23, '우쭈쭈메로니', '우쭈쭈메로니', 0),
	(24, '스크류키스', '스크류키스', 0),
	(25, '구슬아이스주', '구슬아이스크림주', 0),
	(26, '버블탱크', '버블탱크', 0),
	(27, '기범주', '기범주', 0),
	(28, '얼그레이주', '얼그레이 하이볼', 0),
	(29, '아이스티주', '보성홍차소주', 0),
	(30, '소니니', '소니니', 0),
	(31, '소원주', '소원주', 0),
	(32, '소주하이볼', '소주/하이볼', 0),
	(33, '소주하이볼', '소주/진저에일', 0),
	(34, '막사', '막사', 0),
	(35, '쏘맥2', '쏘맥2', 0),
	(36, '쏘맥3', '쏘맥3', 0),
	(37, '우정주', '우정주', 0),
	(38, '요구르트주', '요구르트주', 0),
	(39, '비타민주', '비타민주', 0),
	(40, '시브리즈', '시브리즈', 0);

INSERT INTO `recipe_ingredient` (`recipe_id`, `beverage_id`, `recipe_ingredient_ratio`) VALUES
	(1, 1, 3),
	(1, 2, 7),
	(2, 1, 1),
	(2, 22, 5),
	(3, 1, 1),
	(3, 15, 3),
	(4, 1, 9),
	(4, 14, 1),
	(5, 1, 1),
	(5, 5, 1),
	(6, 1, 1),
	(6, 2, 2),
	(6, 13, 2),
	(7, 1, 1),
	(7, 2, 1),
	(7, 13, 1),
	(8, 1, 1),
	(8, 6, 1),
	(8, 13, 1),
	(9, 1, 1),
	(9, 2, 1),
	(9, 3, 1),
	(9, 4, 1),
	(10, 7, 1),
	(10, 18, 1),
	(11, 1, 1),
	(11, 17, 2),
	(11, 18, 2),
	(12, 1, 1),
	(12, 11, 1),
	(13, 2, 1),
	(13, 16, 1),
	(15, 8, 1),
	(15, 10, 2),
	(16, 2, 1),
	(16, 13, 1),
	(16, 16, 1),
	(17, 1, 1),
	(17, 20, 2),
	(18, 1, 1),
	(18, 2, 1),
	(18, 20, 2),
	(19, 1, 1),
	(19, 21, 2),
	(20, 2, 1),
	(20, 6, 9),
	(21, 1, 1),
	(21, 23, 1),
	(22, 1, 1),
	(22, 14, 1),
	(22, 17, 1),
	(23, 1, 5),
	(23, 13, 3),
	(24, 1, 2),
	(24, 13, 3),
	(25, 1, 1),
	(25, 13, 4),
	(26, 1, 1),
	(26, 13, 1),
	(27, 1, 1),
	(27, 24, 2),
	(28, 1, 1),
	(28, 11, 1),
	(28, 24, 2),
	(29, 1, 1),
	(29, 25, 2),
	(30, 1, 1),
	(30, 9, 2),
	(31, 1, 1),
	(31, 15, 3),
	(32, 1, 1),
	(32, 11, 2),
	(33, 1, 1),
	(33, 10, 2),
	(34, 6, 1),
	(34, 13, 1),
	(35, 1, 4),
	(35, 2, 5),
	(36, 1, 1),
	(36, 2, 2),
	(37, 1, 9),
	(37, 2, 1),
	(38, 1, 1),
	(38, 12, 1),
	(38, 301, 3),
	(39, 1, 1),
	(39, 13, 2),
	(39, 302, 4),
	(40, 1, 1),
	(40, 303, 2),
	(40, 304, 1);
