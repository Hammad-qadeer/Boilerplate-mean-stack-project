const { DataTypes } = require('sequelize');
const sequelize = require('../models/index');

module.exports = (sequelize, Sequelize) => {
const Role = sequelize.define('roles', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, { 
    freezeTableName: true,
    timestamps: false
});
  return Role;
}
  
  
  
  