export type GetPostsQueryVariables = {
  after?: string;
  before?: string;
  excludePins?: boolean;
  limit: number;
  offset?: number;
  orderByString?: string;
  postTypeIds?: string[];
  reverse?: boolean;
  spaceIds?: string[];
  query?: string;
  options?: any;
};

export type GetPostsQuery = {
  posts: {
    totalCount: number;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    nodes: {
      id: string;
      slug: string;
      fields: {
        key: string;
        value: string;
      }[];
      reactions: {
        reacted: boolean;
        reaction: string;
      }[];
      space: {
        relativeUrl: string;
        type: string;
        name: string;
      };
      createdAt: string;
      publishedAt: string;
      status: string;
      title: string;
      description: string;
      totalRepliesCount: number;
    }[];
  };
};

export type SearchPostsQueryVariables = {
  input: string;
};

export type SearchPostsQuery = {
  search: {
    totalCount: number;
    hits: Array<{
      entityType: string;
      hits: Array<{
        id: string;
        title: string;
        created: string;
        content: string;
        entityId: string;
        url: string;
        subtitle: string;
        entityType: string;
        in: {
          id: string;
          networkId: string;
          name: string;
          description: string;
          slug: string;
          type: string;
          layout: string;
          isHomepage: boolean;
          address: {
            path: string;
            exact: boolean;
            editable: boolean;
          };
          createdById: string;
          groupId: string;
          imageId: string;
          bannerId: string;
          membersCount: number;
          createdAt: string;
          updatedAt: string;
          private: boolean;
          hidden: boolean;
          inviteOnly: boolean;
          nonAdminsCanInvite: boolean;
          customOrderingIndexInGroup: number;
          whoCanPost: string;
          whoCanReact: string;
          whoCanReply: string;
          customSeoDetail: {
            description: string;
            noIndex: boolean;
            thumbnail:
              | {
                  id: string;
                  url: string;
                  width: number;
                  height: number;
                  dominantColorHex: string;
                  dpi: number;
                  cropHeight: number;
                  cropWidth: number;
                  cropX: number;
                  cropY: number;
                  cropZoom: number;
                  urls: {
                    full: string;
                    large: string;
                    medium: string;
                    small: string;
                    thumb: string;
                  };
                }
              | {
                  id: string;
                  text: string;
                }
              | {
                  id: string;
                  text: string;
                  variant: string;
                }
              | {
                  id: string;
                  name: string;
                  url: string;
                };
            thumbnailId: string;
            title: string;
          };
          relativeUrl: string;
          url: string;
          image: {
            id: string;
            url: string;
            width: number;
            height: number;
            dominantColorHex: string;
            dpi: number;
            cropHeight: number;
            cropWidth: number;
            cropX: number;
            cropY: number;
            cropZoom: number;
            urls: {
              full: string;
              large: string;
              medium: string;
              small: string;
              thumb: string;
            };
          };
        };
        by: {
          name: string;
          email: string;
          profilePictureId: string;
        };
      }>;
    }>;
  };
};

export type GetPostByIdQueryVariables = {
  id: string;
};

export type GetPostByIdQuery = {
  post: {
    id: string;
    slug: string;
    fields: Array<{
      key: string;
      value: string;
    }>;
    reactions?: Array<{
      reacted: boolean;
      reaction: string;
    }>;
    space: {
      relativeUrl: string;
      type: string;
      name: string;
    };
    createdBy: {
      member: {
        name: string;
        email: string;
        profilePicture: {
          url: string;
        };
      };
    };
    createdAt: string;
    publishedAt: string;
    status: string;
    title: string;
    description: string;
    totalRepliesCount: number;
  };
};

export type GetRepliesQueryVariables = {
  postId: string;
  limit?: number;
  after?: string;
  before?: string;
  excludePins?: boolean;
  offset?: number;
  reverse?: boolean;
};

export type GetRepliesQuery = {
  replies: {
    totalCount: number;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    nodes: Array<{
      id: string;
      slug: string;
      fields: Array<{
        key: string;
        value: string;
      }>;
      reactions: Array<{
        reacted: boolean;
        reaction: string;
      }>;
      space: {
        relativeUrl: string;
        type: string;
        name: string;
      };
      createdBy: {
        member: {
          name: string;
          email: string;
          profilePicture: {
            url: string;
          };
        };
      };
      createdAt: string;
      publishedAt: string;
      status: string;
      title: string;
      description: string;
      totalRepliesCount: number;
    }>;
  };
};

export type AddReactionMutationVariables = {
  input: AddReactionInput;
  postId: string;
};

export type AddReactionMutation = {
  addReaction: {
    status: string;
  };
};

export type AddReactionInput = {
  reaction: string;
  overrideSingleChoiceReactions: boolean;
};

export type RemoveReactionMutationVariables = {
  reaction: string;
  postId: string;
};

export type RemoveReactionMutation = {
  removeReaction: {
    status: string;
  };
};
