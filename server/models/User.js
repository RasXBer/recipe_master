const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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

  // set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
