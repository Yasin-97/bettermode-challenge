import { client } from "@/providers/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";

export { Page };

function Page() {
  return <Login />;
}
