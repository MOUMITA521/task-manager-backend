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
    type: mongoose.Schema.Types.ObjectId, // ye ek User document ka ID store karega
    ref: 'User', // batata hai ye 'User' model se related hai
    required: true,
  },
}, { timestamps: true }); // ye automatically createdAt, updatedAt add karta hai

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;