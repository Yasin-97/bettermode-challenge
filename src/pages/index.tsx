import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./login/Login";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/client";
import PostDetails from "./spaces/PostDetails";
import Dashboard from "./dashboard/Dashboard";

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/spaces/:spacename/:postid" element={<PostDetails />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
