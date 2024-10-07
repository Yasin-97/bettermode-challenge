import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./login/Login";
import { ApolloProvider } from "@apollo/client";
import PostDetails from "./dashboard/[postid]/PostDetails";
import NotFound from "../components/NotFound";
import Dashboard from "./dashboard/dashboard";
import UnderConstruction from "@/components/UnderConstruction";

function App({ apolloClient }: any) {
  return (
    <ApolloProvider client={apolloClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:postid" element={<PostDetails />} />
        <Route path="/dashboard/forum" element={<UnderConstruction />} />
        <Route path="/dashboard/directory" element={<UnderConstruction />} />
        <Route path="/dashboard/notification" element={<UnderConstruction />} />
        <Route path="/dashboard/message" element={<UnderConstruction />} />
        <Route path="/logout" element={<UnderConstruction />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
