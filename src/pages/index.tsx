import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./login/Login";
import Dashboard from "./dashboard/dashboard";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
