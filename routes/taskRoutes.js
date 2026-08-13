const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, taskController.getAllTasks);
router.get('/:id', verifyToken, taskController.getTaskById);
router.post('/', verifyToken, taskController.createTask);
router.delete('/:id', verifyToken, taskController.deleteTask);
router.put('/:id', verifyToken, taskController.toggleTask);

module.exports = router;