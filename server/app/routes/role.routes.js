const roleController = require('../controllers/role.controller');


module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });

      app.get("/api/roles", roleController.getRoles);
      app.post("/api/role", roleController.createRole);
      app.get("/api/role/:id", roleController.getRoleById);
      app.put("/api/role/:id", roleController.updateRole);
      app.delete("/api/role/:id", roleController.deleteRole);
}