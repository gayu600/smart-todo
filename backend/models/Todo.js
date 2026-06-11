const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Todo = sequelize.define('Todo', {
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('pending','completed'), defaultValue: 'pending' },
  due_date: { type: DataTypes.DATE }
}, { timestamps: true });
module.exports = Todo;
