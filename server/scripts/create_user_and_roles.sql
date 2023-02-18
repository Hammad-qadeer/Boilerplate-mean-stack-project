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