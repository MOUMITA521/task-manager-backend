const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dueDate: {
    type: Date,
    default: null,
  },
  category: {
    type: String,
    enum: ['Work', 'Personal', 'Health', 'Other'],
    default: 'Other',
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;