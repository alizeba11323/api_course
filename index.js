const express = require("express");
require("dotenv").config();
let todos = [];
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.post("/todos", function (req, res) {
  const { title, body } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title Not Be Empty" });
  if (!body) {
    return res
      .status(400)
      .json({ success: false, message: "Body Not Be Empty" });
  }
  todos.push({ id: todos.length + 1, title, body });
  return res.status(201).json({ message: "Todo created successfully", todos });
});
app.get("/todos", function (req, res) {
  if (todos.length > 0) {
    return res
      .status(200)
      .json({ message: "Todo Fetched Successfully", todos });
  } else {
    return res.status(200).json({ message: "it has 0 todo" });
  }
});

app.get("/todos/:id", function (req, res) {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === +id);
  if (!todo || Object.keys(todo).length <= 0) {
    return res.status(400).json({ success: false, message: "Todo Not Found" });
  } else {
    return res
      .status(200)
      .json({ success: true, message: "Todo Fetched Successfully", todo });
  }
});
app.put("/todos/:id", function (req, res) {
  const { id } = req.params;
  const { title, body } = req.body;
  if (!title || !body)
    return res
      .status(400)
      .json({ success: false, message: "Title or Body Field is Required" });
  todos = todos.map((todo) => {
    if (todo.id === +id) {
      return {
        ...todo,
        title,
        body,
      };
    } else {
      return todo;
    }
  });
  return res
    .status(200)
    .json({ success: true, message: "Todo Updated Successfully", todos });
});
app.delete("/todos/:id", function (req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: "Id Not Found" });
  }
  todos = todos.filter((todo) => todo.id !== +id);
  return res
    .status(200)
    .json({ message: "Todo Deleted Successfully", success: true });
});
app.listen(port, function () {
  console.log(`app running on port ${port}`);
});
