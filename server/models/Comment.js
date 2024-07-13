const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    recipe: { 
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true },

    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true },
    text: { 
      type: String, 
      required: true },
    createdAt: { 
      type: Date, 
      default: Date.now },
});

// module.exports = commentSchema;

const Comment = model('Comment', commentSchema);

module.exports = Comment;