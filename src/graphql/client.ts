import { gql, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import Cookies from "universal-cookie";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({ uri: "https://api.bettermode.com" });

const authLink = setContext((_, { headers }) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("access_token");
  const guestAccessToken = cookies.get("guest_access_token");
  const token = accessToken || guestAccessToken;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
