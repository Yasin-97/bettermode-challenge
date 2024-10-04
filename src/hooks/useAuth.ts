import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { GET_GUEST_TOKEN } from "../graphql/queries/auth.js";
import { LOGIN_NETWORK } from "../graphql/mutations/auth.js";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

import {
  GuestTokenResponse,
  HandleLogin,
  LoginResponse,
} from "../types/auth/index.js";
import { GET_MEMBER } from "@/graphql/queries/member.js";
import { makeApolloClient } from "@/renderer/_default.page.client.js";

export const useAuth = () => {
  const cookies = new Cookies();

  const [
    fetchGuestTokenQuery,
    {
      data: guestTokenData,
      loading: guestTokenLoading,
      error: guestTokenError,
    },
  ] = useLazyQuery<GuestTokenResponse>(GET_GUEST_TOKEN);

  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation<LoginResponse>(LOGIN_NETWORK, {
      onCompleted: (data) => {
        makeApolloClient().writeQuery({
          query: GET_MEMBER,
          data: { ...data.loginNetwork.member },
        });
      },
    });

  const fetchGuestToken = async () => {
    try {
      const { data } = await fetchGuestTokenQuery();
      const accessToken = data.tokens.accessToken;
      cookies.set("guest_access_token", accessToken, { path: "/" });
      return accessToken;
    } catch (err) {
      toast.error("Failed to fetch guest token");
      throw err;
    }
  };

  const handleLogin: HandleLogin = async ({ usernameOrEmail, password }) => {
    try {
      const { data } = await login({
        variables: { usernameOrEmail, password },
      });
      const accessToken = data?.loginNetwork?.accessToken;
      cookies.set("access_token", accessToken, { path: "/" });
      return data?.loginNetwork?.member;
    } catch (err: any) {
      const errorMessage = err.message.replace("ApolloError: ", "");
      toast.error("Login failed: " + errorMessage);
      throw err;
    }
  };

  return {
    fetchGuestToken,
    guestToken: guestTokenData?.tokens.accessToken,
    guestTokenLoading,
    guestTokenError,
    login: handleLogin,
    user: loginData?.loginNetwork.member,
    loginLoading,
    loginError,
  };
};
