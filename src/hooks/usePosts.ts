import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetPostsQuery, GetPostsQueryVariables } from "@/graphql/posts/type.js";
import { GET_POSTS } from "@/graphql/posts";

export const usePosts = ({
  limit,
  spaceIds,
  options,
}: GetPostsQueryVariables) => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { data, loading, error, fetchMore } = useQuery<GetPostsQuery>(
    GET_POSTS,
    {
      variables: {
        limit,
        spaceIds,
        orderByString: "reactionsCount",
        reverse: true,
      },
      ...options,
    }
  );

  const loadMorePosts = async () => {
    if (data?.posts.pageInfo.hasNextPage) {
      setIsFetchingMore(true);
      await fetchMore({
        variables: {
          after: data.posts.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          setIsFetchingMore(false);
          if (!fetchMoreResult) return previousResult;
          return {
            posts: {
              ...fetchMoreResult.posts,
              nodes: [
                ...previousResult.posts.nodes,
                ...fetchMoreResult.posts.nodes,
              ],
            },
          };
        },
      });
    }
  };

  return {
    posts: data?.posts.nodes || [],
    loading: loading,
    isFetchingMore,
    error,
    loadMorePosts,
    hasNextPage: data?.posts.pageInfo.hasNextPage,
  };
};
