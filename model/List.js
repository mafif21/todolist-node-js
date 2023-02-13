const mongoose = require("mongoose");
const Task = require("./Task");
const url =
  "mongodb+srv://Afif:Afif21jepara@cluster0.yqbfjfb.mongodb.net/todoapp";

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
