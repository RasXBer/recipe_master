const { connect, connection } = require('mongoose');

// connect('mongodb://127.0.0.1:27017/recipe');

connect('mongodb://127.0.0.1:27017/recipe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
  

module.exports = connection;
