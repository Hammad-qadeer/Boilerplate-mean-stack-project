module.exports = (sequelize, Sequelize) => {
    const User_Role = sequelize.define('user_roles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    }, { 
      freezeTableName: true,
      timestamps: false
    });
    return User_Role;
  }