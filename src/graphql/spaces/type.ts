export type GetSpacesQueryVariables = {
  after?: string;
  before?: string;
  collectionId?: string;
  limit: number;
  memberId?: string;
  offset?: number;
  orderBy?: SpaceListOrderByEnum;
  query?: string;
  reverse?: boolean;
};

export type GetSpacesQuery = {
  spaces: {
    totalCount: number;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    nodes: Array<{
      id: string;
      name: string;
      description: string;
      createdAt: string;
      updatedAt: string;
      type: string;
    }>;
  };
};

export type SpaceListOrderByEnum = "NAME" | "CREATED_AT" | "UPDATED_AT";
