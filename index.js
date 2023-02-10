// import all depedencies
const express = require("express");
const bodyParser = require("body-parser");
const expressEjsLayouts = require("express-ejs-layouts");

// initialization
const app = express();
const port = 3000;

// setup
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { layout: "layouts/main" });
});

app.listen(port, () => console.log("Connected"));
