require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');
const timeLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');


const app = express();


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('Connection error:', err));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(timeLogger);

app.use('/tasks', taskRoutes); // saare task routes "/tasks" ke andar mount ho gaye


app.use('/auth', authRoutes);
app.use(errorHandler); // sबसे neeche



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});