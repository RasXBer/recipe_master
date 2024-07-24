const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    recipes: [ID]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

 type Query {
    me: User
    users: [User] # Return a list of users if needed
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

   type Recipe {
    id: ID!
    title: String!
    image: String
    sourceName: String
    sourceUrl: String
  }

  type Query {
    recipes(query: String!): [Recipe!]!
  }
`;

module.exports = typeDefs;