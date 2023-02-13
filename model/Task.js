const mongoose = require("mongoose");
const url =
  "mongodb+srv://Afif:Afif21jepara@cluster0.yqbfjfb.mongodb.net/todoapp";

mongoose.set("strictQuery", false);
mongoose.connect(url);

const Task = mongoose.model("Task", {
  work: {
    type: String,
    required: true,
  },
});

module.exports = Task;
