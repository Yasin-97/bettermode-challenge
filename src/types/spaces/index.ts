export type Space = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  type: string;
};

export type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
};

export type SpacesResponse = {
  spaces: {
    totalCount: number;
    pageInfo: PageInfo;
    nodes: Space[];
  };
};
