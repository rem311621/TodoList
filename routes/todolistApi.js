const express = require("express");
const router = express.Router();
const todoModel = require("../models/todoModel");
var allList = [];
var id = 2;
router.post("/input", (req, res) => {
  const newTodo = new todoModel({
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  id++;
  allList.push(newTodo);
  newTodo.save((error, data) => {
    res.json({ status: 0, msg: "success", data: newTodo });
  });
});
router.get("/getList", function (req, res) {
  res.json(allList);
});
module.exports = router;
