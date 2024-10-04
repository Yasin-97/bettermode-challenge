export { render };

import { hydrateRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "@/pages";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "universal-cookie";
import "./index.css";

async function render(pageContext: any) {
  const root = document.getElementById("react-root");
  if (!root) throw new Error("DOM element #react-root not found");
  const apolloClient = makeApolloClient(pageContext.apolloIntialState);
  hydrateRoot(
    root,
    <BrowserRouter>
      <App apolloClient={apolloClient} />
    </BrowserRouter>
  );
}

export function makeApolloClient(apolloIntialState) {
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

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(apolloIntialState),
  });
}
