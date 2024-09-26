import { gql } from "@apollo/client";

export const LOGIN_NETWORK = gql`
  mutation LoginNetwork($usernameOrEmail: String!, $password: String!) {
    loginNetwork(
      input: { usernameOrEmail: $usernameOrEmail, password: $password }
    ) {
      accessToken
      role {
        name
        scopes
      }
      member {
        id
        name
        email
        profilePicture {
          ... on Image {
            url
          }
        }
      }
    }
  }
`;
