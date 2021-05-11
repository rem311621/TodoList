const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/todolist";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("todo連線成功");
});
const todoSchema = new mongoose.Schema({
  id: Number,
  title: String,
  content: String,
});
todoSchema.set("collection", "todolist");
const Todomodel = mongoose.model("todolist", todoSchema);
module.exports = Todomodel;
