const { sequelize } = require("../models/index.js");
const bcrypt = require("bcryptjs");

  exports.getAllUsers = async (req, res) => {
      const users = await sequelize.query(
        `SELECT u.username,u.email,u.password,u.active,u.id as userId, rs.name as roleName, rs.id as roleId FROM users u 
        INNER JOIN user_roles ur ON u.id = ur.user_id
        INNER JOIN roles rs ON ur.role_id = rs.id`,
        { type: sequelize.QueryTypes.SELECT }
      );
      res.json({ users });
    };

exports.createUser = async (req, res) => {
  try{
    const {username, email, password, active, roleId} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await sequelize.query(`INSERT INTO users(username, email, password,active) VALUES (:username,:email,:password, :active)`,
    {replacements: {username, email, password: hashedPassword, active},
    type: sequelize.QueryTypes.INSERT})

    // Then, insert a new row into the `user_roles` table to associate the user with the given roleId
    await sequelize.query(`INSERT INTO user_roles(user_id, role_id) VALUES (:userId, :roleId)`,
        { replacements: { userId, roleId }, type: sequelize.QueryTypes.INSERT });
    res.json({message: "User Created Successfully"});
  }
  catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server error'})
  }

}

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const userById = await sequelize.query(`SELECT u.username,u.email,u.active,u.id as userId, rs.name as roleName, rs.id as roleId 
    FROM users u 
    INNER JOIN user_roles ur ON u.id = ur.user_id
    INNER JOIN roles rs ON ur.role_id = rs.id
    WHERE u.id = :id`, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT // Add this line to execute the query as a SELECT statement
    });
    res.json(userById[0]); // Return the first (and only) row of the query result as an object
  }

exports.updateUser = async (req, res) =>{
    const { id } = req.params;
    const { username, email, password, active, roleId } = req.body;
    await sequelize.query(`UPDATE users SET 
    username = :username, email = :email, password: :password, active = :active WHERE ID = :id`,
    {replacements: {id, username, email, password, active}, type: sequelize.QueryTypes.UPDATE})

    await sequelize.query(`UPDATE user_roles SET 
        role_id = :roleId WHERE user_id = :userId`,
        { replacements: { roleId, userId: id }, type: sequelize.QueryTypes.UPDATE });

    res.json({message : "User Updated Successfully"})
}

exports.updateUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const {status} = req.body;

    await sequelize.query(`UPDATE users SET active = :status WHERE id = :userId`, 
    {replacements: {status, userId}, type: sequelize.QueryTypes.UPDATE})
    res.json({message: 'User Status updated successfully'})
  }
  catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server error'})
  }
}


exports.deleteUser = async (req, res) => {
    const {id} = req.params;

    await sequelize.query(`DELETE FROM user_roles WHERE user_id = :userId`,
        { replacements: { userId: id }, type: sequelize.QueryTypes.DELETE });

    await sequelize.query(`DELETE FROM users WHERE ID = :id`, {replacements: {id},
    type: sequelize.QueryTypes.DELETE
})
    res.json({message: "User deleted Successfully"});
}