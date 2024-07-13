// test.js
const mongoose = require('mongoose');
const { User, Recipe, Comment } = require('./models'); // Adjust path if necessary
const db = require('./config/connection');

db.once('open', async () => {
  try {
    console.log('Database connection established');

    // Create a new User
    const user = await User.create({ username: 'testuser', email: 'test@example.com', password: 'password' });
    console.log('User created:', user);

    // Create a new Recipe
    const recipe = await Recipe.create({
      title: 'Test Recipe',
      author: user._id,
      description: 'Delicious',
      ingredients: ['ingredient1'],
      instructions: 'Cook it',
      tags: ['test']
    });
    console.log('Recipe created:', recipe);

    // Create a new Comment
    const comment = await Comment.create({ recipe: recipe._id, user: user._id, text: 'Great recipe!' });
    console.log('Comment created:', comment);

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
  }
});