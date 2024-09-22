import { gql, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({ uri: "https://api.bettermode.com" });

const authLink = setContext((_, { headers }) => {
  const token =
    localStorage.getItem("userAccessToken") ||
    localStorage.getItem("guestAccessToken");
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
