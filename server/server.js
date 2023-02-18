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
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});