const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

const SECRET_KEY = process.env.SECRET_KEY; // .env secret key
const expiration = '2h';


module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

   // Middleware function to handle authentication
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // split the token string into an array and return actual token. Parse token from Authorization header if present
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, SECRET_KEY, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
  },
  
    // Function to sign JWT token with user data
   signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };  
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

