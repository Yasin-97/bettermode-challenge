export type LoginNetworkVariables = {
  usernameOrEmail: string;
  password: string;
};

export type LoginNetworkResponse = {
  loginNetwork: {
    accessToken: string;
    role: {
      name: string;
      scopes: string[];
    };
    member: {
      id: string;
      name: string;
      email: string;
      profilePicture?: {
        url: string;
      };
    };
  };
};

export type GetGuestTokenResponse = {
  tokens: {
    accessToken: string;
    role: {
      name: string;
      scopes: string[];
    };
    member: {
      id: string;
      name: string;
    };
  };
};
