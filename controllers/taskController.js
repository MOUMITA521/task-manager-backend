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
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const newTask = await Task.create({
      text: req.body.text,
      description: req.body.description || "",
      userId,
      dueDate: req.body.dueDate || null,
      category: req.body.category || 'Other',
      priority: req.body.priority || 'Medium',
    });
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
}

// DELETE task
async function deleteTask(req, res, next) {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const task = await Task.findOne({ _id: req.params.id, userId });

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully", id: req.params.id });
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

async function updateTask(req, res, next) {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const task = await Task.findOne({ _id: req.params.id, userId });

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }

    if (req.body.text !== undefined) task.text = req.body.text;
    if (req.body.description !== undefined) task.description = req.body.description;
    if (req.body.dueDate !== undefined) task.dueDate = req.body.dueDate;
    if (req.body.category !== undefined) task.category = req.body.category;
    if (req.body.priority !== undefined) task.priority = req.body.priority;

    await task.save();
    res.json(task);
  } catch (error) {
    next(error);
  }
}


module.exports = { getAllTasks, getTaskById, createTask, deleteTask, toggleTask, updateTask };