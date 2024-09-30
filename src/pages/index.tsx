import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./login/Login";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/client";
import PostDetails from "./spaces/PostDetails";
import NotFound from "../components/NotFound";
import Dashboard from "./dashboard/dashboard";
import PrivateRoute from "@/components/PrivateRoute";
import UnderConstruction from "@/components/UnderConstruction";

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={Dashboard} />}
        />
        <Route
          path="/spaces/:spacename/:postid"
          element={<PrivateRoute element={PostDetails} />}
        />
        <Route
          path="/dashboard/forum"
          element={<PrivateRoute element={UnderConstruction} />}
        />
        <Route
          path="/dashboard/directory"
          element={<PrivateRoute element={UnderConstruction} />}
        />
        <Route
          path="/dashboard/notification"
          element={<PrivateRoute element={UnderConstruction} />}
        />
        <Route
          path="/dashboard/message"
          element={<PrivateRoute element={UnderConstruction} />}
        />
        <Route
          path="/dashboard/logout"
          element={<PrivateRoute element={UnderConstruction} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
