import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { makeApolloClient } from "@/renderer/_default.page.client.js";
import { GET_GUEST_TOKEN, LOGIN_NETWORK } from "@/graphql/auth/index.js";
import {
  GetGuestTokenResponse,
  LoginNetworkResponse,
  LoginNetworkVariables,
} from "@/graphql/auth/types";
import { GET_MEMBER } from "@/graphql/member";

export const useAuth = () => {
  const cookies = new Cookies();

  const [
    fetchGuestTokenQuery,
    {
      data: guestTokenData,
      loading: guestTokenLoading,
      error: guestTokenError,
    },
  ] = useLazyQuery<GetGuestTokenResponse>(GET_GUEST_TOKEN);

  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation<LoginNetworkResponse, LoginNetworkVariables>(LOGIN_NETWORK, {
      onCompleted: (data) => {
        makeApolloClient().writeQuery({
          query: GET_MEMBER,
          data: { member: data.loginNetwork.member },
        });
      },
    });

  const fetchGuestToken = async (): Promise<string | undefined> => {
    try {
      const { data } = await fetchGuestTokenQuery();
      const accessToken = data?.tokens.accessToken;
      cookies.set("guest_access_token", accessToken, { path: "/" });
      return accessToken;
    } catch (err) {
      toast.error("Failed to fetch guest token");
      throw err;
    }
  };

  const handleLogin = async ({
    usernameOrEmail,
    password,
  }: LoginNetworkVariables): Promise<
    LoginNetworkResponse["loginNetwork"]["member"] | undefined
  > => {
    try {
      const { data } = await login({
        variables: { usernameOrEmail, password },
      });
      const accessToken = data?.loginNetwork?.accessToken;
      if (accessToken) {
        cookies.set("access_token", accessToken, { path: "/" });
      }
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
