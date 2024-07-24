const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');
const { SECRET_KEY } = process.env;

const axios = require('axios');
const API_KEY = process.env.SPOONACULAR_API_KEY; 

// const API_ID = 'YOUR_EDAMAM_API_ID'; 
// const API_KEY = 'YOUR_EDAMAM_API_KEY'; 

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
      // const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ username, email, password});
      await user.save();

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1d' });

      return {
        token,
        user
      };
    },
    login: async (_, { email, password }) => {
      console.log("hello");
      console.log(email, password);
      const user = await User.findOne({ email });
      console.log("this is User = " , user);

      if (!user) throw AuthenticationError;

      const valid = await bcrypt.compare(password, user.password);

      console.log("this is valid " ,valid);
      if (!valid)throw AuthenticationError;

    

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1d' });
    
      console.log("this is token = ", token);

      return {
        token,
        user
      };
   
    }
  },

  Query: {
    recipes: async (_, { query }) => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
          params: {
            query: query,
            apiKey: API_KEY
          }
        });

        return response.data.results; // Adjust based on Spoonacular API response structure
      } catch (error) {
        console.error('Error fetching recipes:', error);
        throw new Error('Failed to fetch recipes from Spoonacular API');
      }
    },
  },
};

// Query: {
//   recipes: async (_, { query }) => {
//     try {
//       const response = await axios.get(`https://api.edamam.com/search`, {
//         params: {
//           q: query,
//           app_id: API_ID,
//           app_key: API_KEY
//         }
//       });

//       return response.data.hits.map(hit => ({
//         id: hit.recipe.uri,
//         title: hit.recipe.label,
//         image: hit.recipe.image,
//         sourceName: hit.recipe.source,
//         sourceUrl: hit.recipe.url
//       }));
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//       throw new Error('Failed to fetch recipes from Edamam API');
//     }
//   },
// },
// };

module.exports = resolvers;