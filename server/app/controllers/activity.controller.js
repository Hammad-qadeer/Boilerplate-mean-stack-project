const { sequelize } = require("../models/index.js")

exports.getActivities = async (req, res) => {
    const activities = await sequelize.query(`SELECT * FROM activities`, 
    {type: sequelize.QueryTypes.SELECT})

    res.json({activities})
}

exports.createActivity = async (req, res) => {
    const {name, description, url, icon, active} = req.body;
    await sequelize.query(`INSERT into activities (name, description, url, icon, active) 
    VALUES(:name, :description, :url, :icon, :active)`,
    {replacements: {name, description, url, icon, active}, type: sequelize.QueryTypes.INSERT})

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
    const {name, description,url, icon, active} = req.body;
    await sequelize.query(`UPDATE activities 
    SET name = :name, description = :description, url = :url, icon = :icon, active = :active WHERE ID = :id`,{
        replacements:{ name, description, url, icon, active, id},
        type: sequelize.QueryTypes.UPDATE
    })

    res.json({message: 'Activity Updated Successfully'});
}

exports.deleteActivity = async (req, res) => {
    const {id} = req.params;

    await sequelize.query(`DELETE FROM role_activities WHERE activity_id = :activityId`,
        { replacements: { activityId: id }, type: sequelize.QueryTypes.DELETE });

    await sequelize.query(`Delete from activities WHERE ID = :id`, {
        replacements: {id},
        type: sequelize.QueryTypes.DELETE
    })

    res.json({message: 'Activtiy Deleted Successfully'});
}

exports.activity_mapping = async (req, res, next) => {
    const activities = req.body;
    const promises = activities.map(async (activity) => {
      const { role_id, activity_id, isCreate, isRead, isUpdate, isDelete } = activity;
      try {
        await sequelize.query(
          `INSERT INTO role_activities (role_id, activity_id, can_create, can_read, can_update, can_delete) 
          VALUES (:role_id, :activity_id, :can_create, :can_read, :can_update, :can_delete) 
          ON DUPLICATE KEY UPDATE can_create=:can_create, can_read=:can_read, can_update=:can_update, can_delete=:can_delete`,
          {
            replacements: {
              role_id,
              activity_id,
              can_create: isCreate === 1 ? 1 : 0,
              can_read: isRead === 1 ? 1: 0,
              can_update: isUpdate === 1 ? 1: 0,
              can_delete: isDelete === 1 ? 1 : 0
            },
            type: sequelize.QueryTypes.INSERT
          }
        );
      } catch (err) {
        throw err;
      }
    });
  
    try {
      await Promise.all(promises);
      res.status(201).json({ message: "Activities assigned to role successfully." });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };

  exports.getAllActivities =  async (req, res, next) => {
    const {roleId} = req.params;
    const result = await sequelize.query("SELECT * FROM activities ", { type: sequelize.QueryTypes.SELECT })
    const existingActivitiesAndPermissionsForRole = await sequelize.query(`SELECT activities.*, 
    role_activities.can_create, role_activities.can_read, role_activities.can_update, role_activities.can_delete 
    FROM activities 
    JOIN role_activities ON activities.id = role_activities.activity_id 
    where role_activities.role_id = :roleId`,
    { replacements: { roleId }, type: sequelize.QueryTypes.SELECT });
    const activities = result.map((result) => {
        const returnedObject = existingActivitiesAndPermissionsForRole.find(eAPR => 
            eAPR.id === result.id)

        return ({...result, ...returnedObject})
    })
    res.json({activities});
};

exports.activityMappingData = async (req, res) => {
  const activityMapping = await sequelize.query(`SELECT roles.name AS rolename,
  activities.name AS activityname, role_activities.can_create,role_activities.can_read,role_activities.can_update,
  role_activities.can_delete, role_activities.created_at,role_activities.updated_at
  FROM roles
  JOIN role_activities ON roles.id = role_activities.role_id
  JOIN activities ON activities.id = role_activities.activity_id;`, {type: sequelize.QueryTypes.SELECT});

  res.json({activityMapping})

}
   