import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
      user {
        email
        id
        recipes
        username
      }
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }`;
  
export const ADD_RECIPE = gql`
  mutation addRecipe($title: String!, $ingredients: [String]!, $instructions: String!,$tags: [String]) {
  addRecipe(title: $title, ingredients: $ingredients, instructions: $instructions, tags: $tags) {
      id
      title
    }
  }`;

export const GET_STORED_RECIPES = gql`
  query {
    storedRecipes {
      id
      title
      ingredients
      instructions
      tags
    }
  }`;

export const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id
      title
      ingredients
      instructions
      tags
    }
  }`;