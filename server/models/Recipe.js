const { Schema, model } = require('mongoose');
const Response = require('./Comment');

// Schema to create Post model
const recipeSchema = new Schema(
  {
    title: { 
      type: String, 
      required: true },

    ingredients: [{ type: String, required: true }],

    instructions: { 
      type: String, 
      required: true },

    tags: [{ type: String }],
  }
);

// Create a virtual property `comment` 

 

// Initialize our Recipe model
const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
