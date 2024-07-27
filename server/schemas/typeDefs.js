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

  type Recipe {
    id: ID!
    title: String!
    ingredients: [String]!
    instructions: String!
    tags: [String]
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addRecipe(title: String!, ingredients: [String]!, instructions: String!, tags: [String]): Recipe
    deleteRecipe(id: ID!): Recipe
  }

  type Query {
    recipes(query: String!): [Recipe!]!

  StoredRecipes: [Recipe]
  }
`;

module.exports = typeDefs;