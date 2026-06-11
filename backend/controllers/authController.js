const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.signup = async (req,res)=>{
  try{
    const { name,email,password } = req.body;
    const hashed = await bcrypt.hash(password,10);
    const user = await User.create({ name,email,password:hashed });
    res.json({ message:'Signup successful', userId: user.id });
  }catch(err){ console.error(err); res.status(500).json({error:'Server error'}) }
};
exports.login = async (req,res)=>{
  try{
    const { email,password } = req.body;
    const user = await User.findOne({ where:{ email }});
    if(!user) return res.status(404).json({ msg:'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ msg:'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'SECRET123', { expiresIn: '7d' });
    res.json({ msg:'Login successful', token, user:{ id: user.id, name: user.name, email: user.email }});
  }catch(err){ console.error(err); res.status(500).json({error:'Server error'}) }
};
