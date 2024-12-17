const express = require("express");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require('mongoose');
const { connectDB } = require('./db');
const cors=require('cors');
connectDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("ok..!");
});

const todoSchema = new mongoose.Schema({
  todo: String,
  completed: Boolean
});

const todoModel = mongoose.model('todo', todoSchema);

app.get('/todo', async (req, res) => {
  const todos = await todoModel.find();
  res.json(todos);
});

app.post('/todo', async (req, res) => {
  const newTodo = new todoModel({
    todo: req.body.todo,
    completed: false
  });
  await newTodo.save();
  res.json(newTodo); 
});

app.delete('/todo/:id', async (req, res) => {
  try {
    await todoModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => { console.log(`Server Running on PORT: ${PORT}`) });
