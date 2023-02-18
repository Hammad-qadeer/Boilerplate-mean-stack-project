const { sequelize } = require("../models/index.js")

exports.getRoles = async (req, res) => {
    const roles = await sequelize.query(`SELECT * FROM roles`, 
    {type: sequelize.QueryTypes.SELECT})

    res.json({roles})
}

exports.createRole = async (req, res) => {
    const {name} = req.body;
    await sequelize.query(`INSERT into roles (name) VALUES(:name)`,
    {replacements: {name}, type: sequelize.QueryTypes.INSERT})

    res.json({message: 'Role Created Successfully'});
}

exports.getRoleById = async (req, res) => {
    const {id} = req.params;
    const roleById = await sequelize.query(`SELECT * FROM roles where ID = :id`, {
        replacements: {id},
        type: sequelize.QueryTypes.SELECT
    });

    res.json([roleById[0]]);
}

exports.updateRole = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    await sequelize.query(`UPDATE roles 
    SET name = :name WHERE ID = :id`,{
        replacements:{ name, id},
        type: sequelize.QueryTypes.UPDATE
    })

    res.json({message: 'Role Updated Successfully'});
}

exports.deleteRole = async (req, res) => {
    const {id} = req.params;
    await sequelize.query(`Delete from roles WHERE ID = :id`, {
        replacements: {id},
        type: sequelize.QueryTypes.DELETE
    })

    res.json({message: 'Role Deleted Successfully'});
}
