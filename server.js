//requires
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.port || 3001;
const app = express();

//middle
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//server on
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API now running on port ${PORT}!`);
  });
});