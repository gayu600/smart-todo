const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  if(!token) return res.status(401).json({ msg:'No token provided' });
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET123');
    req.user = { id: decoded.id, email: decoded.email };
    next();
  }catch(err){ return res.status(401).json({ msg:'Invalid token' }) }
};
