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

module.exports = Task;
