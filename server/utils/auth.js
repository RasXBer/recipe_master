const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = process.env.SECRET_KEY; // .env secret key

const authenticateToken = async (token) => {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded.id) throw new Error('Token payload missing user ID');
    const user = await User.findById(decoded.id);
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    console.error('Authentication Error:', error.message); // Added for debugging
    throw new Error('Invalid or expired token');
  }
};

module.exports = { authenticateToken };