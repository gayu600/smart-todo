const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const User = require('./models/User');
const Todo = require('./models/Todo');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', require('./routes/authRoutes'));
app.use('/todo', require('./routes/todoRoutes'));
User.hasMany(Todo);
Todo.belongsTo(User);
const PORT = process.env.PORT || 5000;
sequelize.sync().then(()=> {
  console.log('DB synced');
  app.listen(PORT, ()=> console.log('Server running on port', PORT));
}).catch(err=> { console.error('DB sync error', err) });
