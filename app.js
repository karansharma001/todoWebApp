const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Database setup

mongoose.connect("mongodb+srv://user:user@cluster0.vcdi38f.mongodb.net/tododWebAppDB");

const tasksSchema = new mongoose.Schema({
  content: String,
});

const tasksDbModel = mongoose.model("Task", tasksSchema);

let tasksCont = [];

app.get("/", (req, res) => {
  tasksDbModel.find({}, (err, tasks) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { tasks: tasks });
    }
  });
});

app.post("/addTask", (req, res) => {
  let newTaskContent = req.body.newTask;
  const newTask = new tasksDbModel({
    content: newTaskContent,
  });

  newTask.save().then(() => console.log("Task Added!"));
  res.redirect("/");
});

app.get("/deleteTask/:taskId", (req, res) => {
  let taskId = req.params.taskId;
  tasksDbModel.deleteOne({ _id: taskId }, (err, tasks) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("todo-v2 is live at port 3000");
});
