export { render };

import { hydrateRoot } from "react-dom/client";
import { PageShell } from "./PageShell";
import { BrowserRouter } from "react-router-dom";

async function render(pageContext: any) {
  const { Page, pageProps } = pageContext;
  if (!Page)
    throw new Error(
      "Client-side render() hook expects pageContext.Page to be defined"
    );
  const root = document.getElementById("react-root");
  if (!root) throw new Error("DOM element #react-root not found");
  hydrateRoot(
    root,
    <BrowserRouter>
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    </BrowserRouter>
  );
}
