import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./login/Login";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/client";
import PostDetails from "./spaces/PostDetails";
import NotFound from "./notFound/NotFound";
import Dashboard from "./dashboard/dashboard";

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/spaces/:spacename/:postid" element={<PostDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
