const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');
const { SECRET_KEY } = process.env;

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await User.findById(user.id);
    }
  },
  Mutation: {
    signUp: async (_, { username, email, password }) => {
      console.log("hello");
      console.log(username, email, password);
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
      if (!user) throw new AuthenticationError('No user found with this email.');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new AuthenticationError('Invalid password.');

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1d' });

      return {
        token,
        user
      };
    }
  }
};

module.exports = resolvers;