export type GetMemberQueryVariables = {
  id?: string;
  username?: string;
  externalId?: string;
};

export type GetMemberQuery = {
  member: {
    id: string;
    name: string;
    email: string;
    profilePicture: {
      url: string;
    };
  };
};
