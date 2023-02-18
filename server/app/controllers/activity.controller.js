const { sequelize } = require("../models/index.js")

exports.getActivities = async (req, res) => {
    const activities = await sequelize.query(`SELECT * FROM activities`, 
    {type: sequelize.QueryTypes.SELECT})

    res.json({activities})
}

exports.createActivity = async (req, res) => {
    const {name, description, url, active} = req.body;
    await sequelize.query(`INSERT into activities (name, description, url, active) 
    VALUES(:name, :description, :url, :active)`,
    {replacements: {name, description, url, active}, type: sequelize.QueryTypes.INSERT})

    res.json({message: 'Activity Created Successfully'});
}

exports.getActivityById = async (req, res) => {
    const {id} = req.params;
    const activityById = await sequelize.query(`SELECT * FROM activities where ID = :id`, {
        replacements: {id},
        type: sequelize.QueryTypes.SELECT
    });

    res.json([activityById[0]]);
}

exports.updateActivity = async (req, res) => {
    const {id} = req.params;
    const {name, description,url, active} = req.body;
    await sequelize.query(`UPDATE activities 
    SET name = :name, description = :description, url = :url, active = :active WHERE ID = :id`,{
        replacements:{ name, description, url, active, id},
        type: sequelize.QueryTypes.UPDATE
    })

    res.json({message: 'Activity Updated Successfully'});
}

exports.deleteActivity = async (req, res) => {
    const {id} = req.params;
    await sequelize.query(`Delete from activities WHERE ID = :id`, {
        replacements: {id},
        type: sequelize.QueryTypes.DELETE
    })

    res.json({message: 'Activtiy Deleted Successfully'});
}