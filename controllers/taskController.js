const Task = require('../models/Task');
const mongoose = require('mongoose');

// GET all tasks
async function getAllTasks(req, res, next) {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId); // explicitly convert kiya
    const tasks = await Task.find({ userId: userId });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

// GET single task
async function getTaskById(req, res, next) {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
}

// POST new task
async function createTask(req, res, next) {
  try {
    if (!req.body.text) {
      const error = new Error("Task text is required");
      error.statusCode = 400;
      throw error;
    }

    const newTask = await Task.create({
      text: req.body.text,
      userId: req.user.userId, // is task ko current user se link kiya
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
}

// DELETE task
async function deleteTask(req, res, next) {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }

    await Task.findByIdAndDelete(req.params.id);
    res.send('Task deleted');
  } catch (error) {
    next(error);
  }
}


// PUT toggle complete
async function toggleTask(req, res, next) {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    next(error);
  }
}


module.exports = { getAllTasks, getTaskById, createTask, deleteTask, toggleTask };