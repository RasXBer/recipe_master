const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const { signToken, AuthenticationError } = require("../utils/auth");
const { SECRET_KEY } = process.env;

const axios = require("axios");
const API_KEY = process.env.SPOONACULAR_API_KEY;

// const API_ID = 'YOUR_EDAMAM_API_ID';
// const API_KEY = 'YOUR_EDAMAM_API_KEY';

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      return await User.findById(user.id);
    },
  },
  Mutation: {
    signUp: async (_, { username, email, password }) => {
      console.log("hello");
      console.log(username, email, password);
      // const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ username, email, password });
      await user.save();

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1d" });

      return {
        token,
        user,
      };
    },
    login: async (_, { email, password }) => {
      console.log("hello");
      console.log(email, password);
      const user = await User.findOne({ email });
      console.log("this is User = ", user);
      if (!user) throw AuthenticationError;

      const valid = await bcrypt.compare(password, user.password);

      console.log("this is valid ", valid);
      if (!valid) throw AuthenticationError;
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1d" });
      console.log("this is token = ", token);

      return {
        token,
        user,
      };
    },

    addRecipe: async (_, { title, ingredients, instructions, tags }, context ) => {
      try {
        // Example of saving to MongoDB
        const newRecipe = await Recipe.create({
          title,
          ingredients,
          instructions,
          tags,
          
        });

        return newRecipe;
      } catch (error) {
        console.error("Error adding recipe:", error);
        throw new Error("Failed to add recipe");
      }
    },

    deleteRecipe : async (_, { id }, context) => {
      try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) throw new Error('Recipe not found');
        return deletedRecipe; 
      } catch (error) {
        console.error('Error deleting recipe:', error);
        throw new Error('Failed to delete recipe');
      }
    }
  },

  Query: {
    recipes: async (_, { query }) => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch`,
          {
            params: {
              query: query,
              apiKey: API_KEY,
            },
          }
        );

        return response.data.results; // Spoonacular API response structure
      } catch (error) {
        console.error("Error fetching recipes:", error);
        throw new Error("Failed to fetch recipes from Spoonacular API");
      }
    },
    StoredRecipes: async (parent, args, context) => {
      try {
        const GetAllRecipes = await Recipe.find();
        return GetAllRecipes;
      } catch (error) {
        console.log(error);
        throw AuthenticationError;
      }
    },
  },
};


module.exports = resolvers;
