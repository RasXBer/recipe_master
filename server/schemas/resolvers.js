const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../utils/auth');

const SECRET_KEY = process.env.SECRET_KEY; //  .env key

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return User.findById(user.id);
    }
  },
  Mutation: {
    signUp: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1d' });

      return {
        token,
        user
      };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('No user found with this email.');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password.');

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1d' });

      return {
        token,
        user
      };
    }
  }
};

module.exports = resolvers;