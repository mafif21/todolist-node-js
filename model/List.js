const mongoose = require("mongoose");
const Task = require("./Task");
const url = "mongodb://127.0.0.1:27017/todoapp";

mongoose.set("strictQuery", false);
mongoose.connect(url);

const List = mongoose.model("List", {
  name: {
    type: String,
    required: true,
  },
  taskList: [Task.schema],
});

module.exports = List;
