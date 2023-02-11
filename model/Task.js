const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/todoapp";

mongoose.set("strictQuery", false);
mongoose.connect(url);

const Task = mongoose.model("Task", {
  work: {
    type: String,
    required: true,
  },
});

const List = mongoose.model("List", {
  name: {
    type: String,
    required: true,
  },
  taskList: [Task.schema],
});

module.exports = { Task, List };
