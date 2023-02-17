const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;