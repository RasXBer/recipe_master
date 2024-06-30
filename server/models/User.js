const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    password: { 
      type: String, 
      required: true },

    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "recipe"
      }
    ]
   
    
  });


// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
