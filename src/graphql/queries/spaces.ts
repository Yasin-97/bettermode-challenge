import { gql } from "@apollo/client";

export const GET_SPACES = gql`
  query GetSpaces(
    $after: String
    $before: String
    $collectionId: String
    $limit: Int!
    $memberId: ID
    $offset: Int
    $orderBy: SpaceListOrderByEnum
    $query: String
    $reverse: Boolean
    $type: [SpaceType!]
  ) {
    spaces(
      after: $after
      before: $before
      collectionId: $collectionId
      limit: $limit
      memberId: $memberId
      offset: $offset
      orderBy: $orderBy
      query: $query
      reverse: $reverse
      type: $type
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        name
        description
        createdAt
        updatedAt
        type
      }
    }
  }
`;
