import { useQuery } from "@apollo/client";
import {
  SearchPostsQuery,
  SearchPostsQueryVariables,
} from "@/graphql/posts/type.js";
import { SEARCH_POSTS } from "@/graphql/posts";

export const useSearchPosts = ({ input }: SearchPostsQueryVariables) => {
  const { data, loading, error } = useQuery<SearchPostsQuery>(SEARCH_POSTS, {
    variables: { input: { query: input, includeExternal: true } },
  });

  return {
    posts: data?.search.hits || [],
    loading,
    error,
  };
};
