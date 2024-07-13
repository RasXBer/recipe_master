// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // Ensure to use environment variables for secrets

module.exports = {
  async createUser(req, res) {
    try {
      const { email, username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const dbUserData = await User.create({ email, username, password: hashedPassword });
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};