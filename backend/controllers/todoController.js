const Todo = require('../models/Todo');
exports.createTodo = async (req,res)=>{
  try{
    const { title, description, due_date } = req.body;
    const todo = await Todo.create({ title, description, due_date, UserId: req.user.id });
    res.json(todo);
  }catch(err){ console.error(err); res.status(500).json({error:'Server error'}) }
};
exports.getTodos = async (req,res)=>{
  try{
    const todos = await Todo.findAll({ where: { UserId: req.user.id }, order:[['createdAt','DESC']] });
    res.json(todos);
  }catch(err){ console.error(err); res.status(500).json({error:'Server error'}) }
};
exports.updateTodo = async (req,res)=>{
  try{
    const { id } = req.params;
    await Todo.update(req.body, { where: { id, UserId: req.user.id }});
    res.json({ message:'Updated successfully' });
  }catch(err){ console.error(err); res.status(500).json({error:'Server error'}) }
};
exports.deleteTodo = async (req,res)=>{
  try{
    const { id } = req.params;
    await Todo.destroy({ where: { id, UserId: req.user.id }});
    res.json({ message:'Deleted successfully' });
  }catch(err){ console.error(err); res.status(500).json({error:'Server error'}) }
};
