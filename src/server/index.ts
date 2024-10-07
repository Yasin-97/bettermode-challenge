// This file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562
// Consequently:
//  - When changing this file, you needed to manually restart your server for your changes to take effect.
//  - To use your environment variables defined in your .env files, you need to install dotenv, see https://vite-plugin-ssr.com/env
//  - To use your path aliases defined in your vite.config.js, you need to tell Node.js about them, see https://vite-plugin-ssr.com/path-aliases

// If you want Vite to process your server code then use one of these:
//  - vavite (https://github.com/cyco130/vavite)
//     - See vavite + vite-pugin-ssr examples at https://github.com/cyco130/vavite/tree/main/examples
//  - vite-node (https://github.com/antfu/vite-node)
//  - HatTip (https://github.com/hattipjs/hattip)
//    - You can use Bati (https://batijs.github.io/) to scaffold a vite-plugin-ssr + HatTip app. Note that Bati generates apps that use the V1 design (https://vite-plugin-ssr.com/migration/v1-design) and Vike packages (https://vite-plugin-ssr.com/vike-packages)
import express from "express";
import compression from "compression";
import { renderPage } from "vite-plugin-ssr/server";
import { root } from "./root.js";
import { setContext } from "@apollo/client/link/context/index.js";
import fetch from "node-fetch";
import cookie from "cookie";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/index.js";
import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";

startServer();

async function startServer() {
  const app = express();

  app.use(compression());

  // Vite integration
  if (isProduction) {
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  // Authentication middleware
  app.use((req, res, next) => {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.access_token || cookies.guest_access_token;

    if (token) {
      try {
        const decodedToken = jwt.decode(token);

        if (decodedToken) {
          return next();
        }
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }
    if (req.url === "/login") {
      return next();
    }
    res.redirect("/login");
  });

  // Vite-plugin-ssr middleware
  app.get("*", async (req, res, next) => {
    const apolloClient = makeApolloClient(req);

    const pageContextInit = {
      headers: req.headers,
      urlOriginal: req.originalUrl,
      apolloClient,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return next();
    } else {
      const { body, statusCode, headers, earlyHints } = httpResponse;
      if (res.writeEarlyHints)
        res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
      headers.forEach(([name, value]) => res.setHeader(name, value));
      res.status(statusCode).send(body);
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port);
}

function makeApolloClient(req: any) {
  const httpLink = createHttpLink({
    uri: "https://api.bettermode.com",
    fetch,
  });

  const authLink = setContext((_, { headers }) => {
    const cookies = cookie.parse(req.headers.cookie || "");

    const accessToken = cookies.access_token;
    const guestAccessToken = cookies.guest_access_token;
    const token = accessToken || guestAccessToken;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
