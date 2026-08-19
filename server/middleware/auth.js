const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'serengeti_luxury_safari_secret_key_2026';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.query.token;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access Denied: No Token Provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or Expired Token' });
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Access Restricted to Administrators' });
    }
  });
};

module.exports = { verifyToken, verifyAdmin, JWT_SECRET };
