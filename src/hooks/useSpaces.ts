import { useState } from "react";
import { useQuery } from "@apollo/client";
import { SpacesResponse } from "@/types/spaces";
import { GetSpacesQuery, GetSpacesQueryVariables } from "@/graphql/spaces/type";
import { GET_SPACES } from "@/graphql/spaces";

export const useSpaces = ({ limit }: GetSpacesQueryVariables) => {
  const { data, loading, error } = useQuery<GetSpacesQuery>(GET_SPACES, {
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
