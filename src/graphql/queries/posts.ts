import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts(
    $after: String
    $before: String
    $excludePins: Boolean
    $filterBy: [PostListFilterByInput!]
    $limit: Int!
    $offset: Int
    $orderBy: PostListOrderByEnum
    $orderByString: String
    $postTypeIds: [String!]
    $reverse: Boolean
    $spaceIds: [ID!]
    $query: String
  ) {
    posts(
      after: $after
      before: $before
      excludePins: $excludePins
      filterBy: $filterBy
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      orderByString: $orderByString
      postTypeIds: $postTypeIds
      reverse: $reverse
      spaceIds: $spaceIds
      query: $query
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        slug
        fields {
          key
          value
        }
        reactions {
          reacted
          reaction
        }
        space {
          relativeUrl
          type
          name
        }
        createdAt
        publishedAt
        status
        title
        description
        totalRepliesCount
      }
    }
  }
`;

export const SEARCH_POSTS = gql`
  query SearchPosts($input: SearchInput!) {
    search(input: $input) {
      totalCount
      hits {
        entityType
        hits {
          id
          title
          created
          content
          entityId
          url
          subtitle
          entityType
          in {
            ... on Space {
              id
              networkId
              name
              description
              slug
              type
              layout
              isHomepage
              address {
                path
                exact
                editable
              }
              createdById
              groupId
              imageId
              bannerId
              membersCount
              createdAt
              updatedAt
              private
              hidden
              inviteOnly
              nonAdminsCanInvite
              customOrderingIndexInGroup
              whoCanPost
              whoCanReact
              whoCanReply
              customSeoDetail {
                description
                noIndex
                thumbnail {
                  ... on Image {
                    id
                    url
                    width
                    height
                    dominantColorHex
                    dpi
                    cropHeight
                    cropWidth
                    cropX
                    cropY
                    cropZoom
                    urls {
                      full
                      large
                      medium
                      small
                      thumb
                    }
                  }
                  ... on Emoji {
                    id
                    text
                  }
                  ... on Glyph {
                    id
                    text
                    variant
                  }
                  ... on File {
                    id
                    name
                    url
                  }
                }
                thumbnailId
                title
              }
              relativeUrl
              url
              image {
                ... on Image {
                  id
                  url
                  width
                  height
                  dominantColorHex
                  dpi
                  cropHeight
                  cropWidth
                  cropX
                  cropY
                  cropZoom
                  urls {
                    full
                    large
                    medium
                    small
                    thumb
                  }
                }
              }
            }
          }
          by {
            ... on Member {
              name
              email
              profilePictureId
            }
          }
        }
      }
    }
  }
`;
