export { render };

import { hydrateRoot } from "react-dom/client";
import { PageShell } from "./PageShell";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "@/pages";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/client";

async function render(pageContext: any) {
  const root = document.getElementById("react-root");
  if (!root) throw new Error("DOM element #react-root not found");
  hydrateRoot(
    root,
    <BrowserRouter>
      <ApolloProvider client={client}>
        <PageShell pageContext={pageContext}>
          <App />
        </PageShell>
      </ApolloProvider>
    </BrowserRouter>
  );
}
