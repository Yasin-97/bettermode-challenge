export type LoginArgs = {
  usernameOrEmail: string;
  password: string;
};

export type HandleLogin = (args: LoginArgs) => Promise<any | void>;

export type LoginResponse = {
  data?: {
    loginNetwork: {
      accessToken: string;
      role: {
        name: string;
        scopes: string[];
        __typename: string;
      };
      member: {
        id: string;
        name: string;
        __typename: string;
      };
      __typename: string;
    };
  };
  errors?: Record<string, any>;
  extensions: {
    complexity: number;
  };
};

export type GuestTokenResponse = {
  data: {
    tokens: {
      accessToken: string;
      role: {
        name: string;
        scopes: string[];
        __typename: string;
      };
      member: {
        id: string;
        name: string;
        __typename: string;
      };
      __typename: string;
    };
  };
  extensions: {
    complexity: number;
  };
};
