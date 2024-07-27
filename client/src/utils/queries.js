import { gql } from '@apollo/client';
export const QUERY_PROFILES = gql`
  query allUsers {
    users {
         email
        id
        recipes
        username
    }
  }`;

export const GET_RECIPES = gql`
  query GetRecipes($query: String!) {
    recipes(query: $query) {
      id
      title
      image
      sourceName
      SourceUrl
    }
  }`;

export const GET_ADDRECIPES = gql`
  query GetaddRecipes($query: String!) {
    recipes(query: $query) {
      id
      title
   }
  }`;

export const GET_STORED_RECIPES = gql`
  query GetStoredRecipes {
    StoredRecipes {
      id
      title
      ingredients
      instructions
    }
  }`;
// export const DELETE_RECIPE = gql`
//   mutation deleteRecipe($id: ID!) {
//     deleteRecipe(id: $id) {
//       id
//       title
//       ingredients
//       instructions
//       tags
//     }
//   }
// `;