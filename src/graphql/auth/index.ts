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

export const GET_GUEST_TOKEN = gql`
  query {
    tokens(networkDomain: "creativehub-afc3kw87.bettermode.io") {
      accessToken
      role {
        name
        scopes
      }
      member {
        id
        name
      }
    }
  }
`;
