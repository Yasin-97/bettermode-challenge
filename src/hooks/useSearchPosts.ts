import { useQuery } from "@apollo/client";
import { SEARCH_POSTS } from "../graphql/queries/posts.js";

export const useSearchPosts = (input: string) => {
  const { data, loading, error } = useQuery(SEARCH_POSTS, {
    variables: { input: { query: input, includeExternal: true } },
  });

  return {
    posts: data?.search.hits || [],
    loading,
    error,
  };
};
