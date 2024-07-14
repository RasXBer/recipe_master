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
        email
        id
        recipes
        username
      }
    }
  }`;