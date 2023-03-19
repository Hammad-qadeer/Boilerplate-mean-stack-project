CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE user_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
);

INSERT INTO `user_mgmt`.`roles` (`name`) VALUES ('ADMIN');
INSERT INTO `user_mgmt`.`roles` (`name`) VALUES ('LEAD');
INSERT INTO `user_mgmt`.`roles` (`name`) VALUES ('CASHIER');
INSERT INTO `user_mgmt`.`roles` (`name`) VALUES ('MANAGER');
INSERT INTO `user_mgmt`.`roles` (`name`) VALUES ('DIRECTOR');

INSERT INTO `user_mgmt`.`users` (`name`, `email`, `active`) VALUES ('John ', 'john@gmail.com', '1');
INSERT INTO `user_mgmt`.`users` (`name`, `email`, `active`) VALUES ('Hammad', 'hammad@gmail.com', '1');
INSERT INTO `user_mgmt`.`users` (`name`, `email`, `active`) VALUES ('Doe', 'doe@gmail.com', '1');

INSERT INTO `user_mgmt`.`user_roles` (`user_id`, `role_id`) VALUES ('1', '1');
INSERT INTO `user_mgmt`.`user_roles` (`user_id`, `role_id`) VALUES ('2', '1');
INSERT INTO `user_mgmt`.`user_roles` (`user_id`, `role_id`) VALUES ('3', '2');

CREATE TABLE activities (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  url VARCHAR(255),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

INSERT INTO `user_mgmt`.`activities` (`name`, `description`, `url`, `active`) VALUES ('Profile', 'Profile ', '/management/view-profiles', '1');
INSERT INTO `user_mgmt`.`activities` (`name`, `description`, `url`, `active`) VALUES ('User', 'User ', '/management/user', '1');
INSERT INTO `user_mgmt`.`activities` (`name`, `description`, `url`, `active`) VALUES ('Activity', 'Activity', '/management/view-activities', '1');


CREATE TABLE role_activities (
  id INT NOT NULL AUTO_INCREMENT,
  role_id INT NOT NULL,
  activity_id INT NOT NULL,
  can_create BOOLEAN NOT NULL DEFAULT false,
  can_read BOOLEAN NOT NULL DEFAULT false,
  can_update BOOLEAN NOT NULL DEFAULT false,
  can_delete BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (activity_id) REFERENCES activities(id)
);

INSERT INTO `user_mgmt`.`role_activities` (`role_id`, `activity_id`, `can_create`, `can_read`, `can_update`, `can_delete`, `created_at`) VALUES ('1', '1', '1', '1', '1', '1', '1');
INSERT INTO `user_mgmt`.`role_activities` (`role_id`, `activity_id`, `can_create`, `can_read`, `can_update`, `can_delete`, `created_at`) VALUES ('1', '2', '1', '1', '1', '1', '1');