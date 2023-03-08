const userController = require("../controllers/user.controller");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.get("/api/users", userController.getAllUsers);
  app.post("/api/user", userController.createUser);
  app.get("/api/user/:id", userController.getUserById);
  app.put("/api/user/:id", userController.updateUser);
  app.delete("/api/user/:id", userController.deleteUser);
  app.put("/api/update-user-status/:id", userController.updateUserStatus)
};
