const activityController = require('../controllers/activity.controller');


module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });

      app.get("/api/activities", activityController.getActivities);
      app.post("/api/activity", activityController.createActivity);
      app.get("/api/activity/:id", activityController.getActivityById);
      app.put("/api/activity/:id", activityController.updateActivity);
      app.delete("/api/activity/:id", activityController.deleteActivity);
      app.post("/api/mapping", activityController.activity_mapping);
      app.get("/api/selected/:roleId", activityController.getAllActivities);
}