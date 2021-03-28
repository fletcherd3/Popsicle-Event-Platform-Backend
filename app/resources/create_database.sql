# MySQL scripts for dropping existing tables and recreating the database table structure


### DROP EVERYTHING ###
# Tables/views must be dropped in reverse order due to referential constraints (foreign keys).

DROP TABLE IF EXISTS `event_attendees`;
DROP TABLE IF EXISTS `event_category`;
DROP TABLE IF EXISTS `event`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `attendance_status`;
DROP TABLE IF EXISTS `category`;

### TABLES ###
# Tables must be created in a particular order due to referential constraints i.e. foreign keys.

CREATE TABLE `user`
(
    `id`             int(11)      NOT NULL AUTO_INCREMENT,
    `email`          varchar(128) NOT NULL,
    `first_name`     varchar(64)  NOT NULL,
    `last_name`      varchar(64)  NOT NULL,
    `image_filename` varchar(64)  DEFAULT NULL,
    `password`       varchar(256) NOT NULL COMMENT 'Only store the hash here, not the actual password!',
    `auth_token`     varchar(256) DEFAULT NULL,

    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_key` (`email`)
);


CREATE TABLE `event`
(
    `id`                          int(11)        NOT NULL AUTO_INCREMENT,
    `title`                       VARCHAR(128)   NOT NULL,
    `description`                 VARCHAR(2048)  NOT NULL,
    `date`                        DATETIME       NOT NULL,
    `image_filename`              VARCHAR(64)    NULL,
    `is_online`                   tinyint(1)     NOT NULL DEFAULT 0,
    `url`                         VARCHAR(128)            DEFAULT NULL,
    `venue`                       VARCHAR(512)            DEFAULT NULL,
    `capacity`                    int(11)                 DEFAULT NULL,
    `requires_attendance_control` tinyint(1)     NOT NULL DEFAULT 0,
    `fee`                         DECIMAL(13, 2) NOT NULL DEFAULT 0.00,
    `organizer_id`                int(11)        NOT NULL,

    PRIMARY KEY (`id`),
    UNIQUE KEY (`title`, `date`, `organizer_id`),
    FOREIGN KEY (`organizer_id`) REFERENCES `user` (`id`)
);


CREATE TABLE `category`
(
    `id`   int(11)     NOT NULL AUTO_INCREMENT,
    `name` varchar(24) NOT NULL,

    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
);


CREATE TABLE `event_category`
(
    `id`          int(11) NOT NULL AUTO_INCREMENT,
    `event_id`    int(11) NOT NULL,
    `category_id` int(11) NOT NULL,

    PRIMARY KEY (`id`),
    UNIQUE KEY (`event_id`, `category_id`),
    FOREIGN KEY (`event_id`) REFERENCES `event` (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
);


CREATE TABLE `attendance_status`
(
    `id`   int(11)     NOT NULL AUTO_INCREMENT,
    `name` varchar(24) NOT NULL,

    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
);


CREATE TABLE `event_attendees`
(
    `id`                   int(11)  NOT NULL AUTO_INCREMENT,
    `event_id`             int(11)  NOT NULL,
    `user_id`              int(11)  NOT NULL,
    `attendance_status_id` int(11)           DEFAULT NULL,
    `date_of_interest`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),
    UNIQUE KEY (`event_id`, `user_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    FOREIGN KEY (`event_id`) REFERENCES `event` (`id`),
    FOREIGN KEY (`attendance_status_id`) REFERENCES `attendance_status` (`id`)
);

