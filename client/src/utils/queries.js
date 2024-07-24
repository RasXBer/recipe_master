import { gql } from '@apollo/client';
export const QUERY_PROFILES = gql`
  query allUsers {
    users {
         email
        id
        recipes
        username
    }
  }
`
export const GET_RECIPES = gql`
  query GetRecipes($query: String!) {
    recipes(query: $query) {
      id
      title
      image
      sourceName
      SourceUrl
    }
  }
`;