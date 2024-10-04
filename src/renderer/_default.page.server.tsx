export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps", "urlPathname", "apolloIntialState"];
import { StaticRouter } from "react-router-dom/server";
import ReactDOMServer from "react-dom/server";
import { PageShell } from "./PageShell";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import logoUrl from "./logo.svg";
import App from "@/pages";
import { getDataFromTree } from "@apollo/client/react/ssr";

async function render(pageContext) {
  const { Page, apolloClient, urlPathname, urlOriginal } = pageContext;
  // This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
  const tree = (
    <StaticRouter location={urlPathname}>
      <App apolloClient={apolloClient} />
    </StaticRouter>
  );
  // );
  const pageHtml = await getDataFromTree(tree);
  const apolloIntialState = apolloClient.extract();

  // See https://vite-plugin-ssr.com/head
  // const { documentProps } = pageContext.exports;
  // const title = (documentProps && documentProps.title) || "Vite SSR app";
  // const desc =
  //   (documentProps && documentProps.description) ||
  //   "App using Vite + vite-plugin-ssr";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
      <script type="module" src="/src/renderer/_default.page.client.tsx"></script>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      apolloIntialState,
    },
  };
}
