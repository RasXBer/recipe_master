require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const { authenticateToken } = require('./utils/auth');


// Environment variables
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/recipe';
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    console.log('Received Token:', token); // Added for debugging
    // Remove 'Bearer ' if present
    const tokenWithoutBearer = token.replace('Bearer ', '');
    
    const user = await authenticateToken(token.replace('Bearer ', ''));
    console.log('Authenticated User:', user); // Added for debugging
    return { user };
  }
});

// Start Apollo Server and apply middleware
const startServer = async () => {
  await server.start(); // Wait for the server to start
  server.applyMiddleware({ app, path: '/graphql' }); // Apply middleware and set path to /graphql

  // Connect to MongoDB and start the Express server
  mongoose.connect(MONGO_URI).then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`GraphQL endpoint at http://localhost:${PORT}${server.graphqlPath}`);
    });
  }).catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
};

// Start the server
startServer();