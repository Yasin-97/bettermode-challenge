import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SPACES } from "@/graphql/queries/spaces.js";
import { SpacesResponse } from "@/types/spaces";

export const useSpaces = (limit: number) => {
  const { data, loading, error } = useQuery<SpacesResponse>(GET_SPACES, {
    variables: {
      limit: limit,
      orderBy: "CREATED_AT",
      reverse: true,
    },
  });

  return {
    spaces: data?.spaces.nodes || [],
    loading: loading,
    error,
  };
};
