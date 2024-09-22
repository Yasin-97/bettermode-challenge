import { gql } from "@apollo/client";

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
