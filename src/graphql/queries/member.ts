import { gql } from "@apollo/client";

export const GET_MEMBER = gql`
  query GetMember($id: ID, $username: String, $externalId: String) {
    member(id: $id, username: $username, externalId: $externalId) {
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
`;
