const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017";

mongoose.connect(url);

const Task = mongoose.model("Task", {
  work: {
    type: string,
    required: true,
  },
});

module.exports = Task;
