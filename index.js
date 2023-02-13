// import all depedencies
const express = require("express");
const bodyParser = require("body-parser");
const expressEjsLayouts = require("express-ejs-layouts");
const dayTime = require("./date");
const Task = require("./model/Task");
const List = require("./model/List");
// const List = require("./model/List");
const _ = require("lodash");

// initialization
const app = express();
const port = 3000;

// setup
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// data template
const task1 = new Task({ work: "Php Coding" });
const task2 = new Task({ work: "Python Coding" });
const task3 = new Task({ work: "Delete This" });
const defaultTemplate = [task1, task2, task3];
// =============

app.get("/", async (req, res) => {
  const date = dayTime.getDate();
  const datas = await Task.find();

  res.render("home", {
    layout: "layouts/main",
    heading: date,
    activities: datas,
    title: "Today",
  });
});

app.get("/:customList", (req, res) => {
  const customName = _.capitalize(req.params.customList);

  List.findOne({ name: customName }, (error, foundList) => {
    if (foundList) {
      // show existing list by custom name
      res.render("home", {
        layout: "layouts/main",
        heading: customName,
        activities: foundList.taskList,
        title: customName,
      });
    } else {
      // make new list
      const newList = new List({
        name: customName,
        taskList: defaultTemplate,
      });

      newList.save((err) => {
        if (err) return console.log("Cant added list");
      });
      res.redirect("/" + customName);
    }
  });
});

app.post("/", (req, res) => {
  const listName = req.body.listName;

  // udemy method
  // const newItem = new Task({ work: req.body.work });
  // if (listName == "Today") {
  //   newItem.save((err) => {
  //     if (err) return console.log("cant add");
  //   });
  //   res.redirect("/");
  // } else {
  //   List.findOne({ name: listName }, (error, foundList) => {
  //     foundList.taskList.push(newItem);
  //     foundList.save();
  //     res.redirect("/" + listName);
  //   });
  // }

  if (listName == "Today") {
    Task.insertMany(req.body, (error, response) => {
      if (error) return console.log("Cant add data");
      res.redirect("/");
    });
  } else {
    List.findOne({ name: listName }, (error, foundList) => {
      foundList.taskList.push(req.body);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", (req, res) => {
  const listName = req.body.listName;

  if (listName == "Today") {
    Task.findByIdAndDelete(req.body.check, (err) => {
      if (err) return console.log(err);
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate(
      { name: listName },
      {
        $pull: { taskList: { _id: req.body.check } },
      },
      (error) => {
        if (error) return console.log("delete fail");
        res.redirect("/" + listName);
      }
    );
  }
});

app.listen(port, () => console.log("Connected"));
