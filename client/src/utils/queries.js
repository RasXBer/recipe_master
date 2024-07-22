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
`;