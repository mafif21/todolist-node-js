// import all depedencies
const express = require("express");
const bodyParser = require("body-parser");
const expressEjsLayouts = require("express-ejs-layouts");
const dayTime = require("./date");
const Task = require("./model/Task");

// initialization
const app = express();
const port = 3000;

// setup
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const date = dayTime.getDate();
  const datas = await Task.find();

  res.render("home", {
    layout: "layouts/main",
    title: date,
    activities: datas,
  });
});

app.post("/", (req, res) => {
  Task.insertMany(req.body, (error, response) => {
    if (error) return console.log(error);

    res.redirect("/");
  });
});

app.listen(port, () => console.log("Connected"));
