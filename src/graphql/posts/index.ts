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

export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    post(id: $id) {
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
      createdBy {
        member {
          name
          email
          profilePicture {
            ... on Image {
              url
            }
          }
        }
      }
      createdAt
      publishedAt
      status
      title
      description
      totalRepliesCount
    }
  }
`;

export const GET_REPLIES = gql`
  query GetReplies(
    $postId: ID!
    $limit: Int!
    $after: String
    $before: String
    $excludePins: Boolean
    $offset: Int
    $orderBy: PostListOrderByEnum
    $reverse: Boolean
  ) {
    replies(
      postId: $postId
      limit: $limit
      after: $after
      before: $before
      excludePins: $excludePins
      offset: $offset
      orderBy: $orderBy
      reverse: $reverse
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
        createdBy {
          member {
            name
            email
            profilePicture {
              ... on Image {
                url
              }
            }
          }
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
