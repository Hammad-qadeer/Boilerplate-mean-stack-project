const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:4200"],
    })
  );

//routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/activity.routes")(app);
require("./app/routes/role.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});