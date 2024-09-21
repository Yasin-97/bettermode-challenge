import { client } from "@/providers/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";

export { Page };

function Page() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}
