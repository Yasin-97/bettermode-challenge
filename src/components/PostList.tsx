import React from "react";
import Post from "./Post";
import { usePosts } from "../hooks/usePosts";
import { Post as PostType } from "../types/posts";
import { Button } from ".";

const PostsList = () => {
  const { posts, loading, isFetchingMore, error, loadMorePosts, hasNextPage } =
    usePosts(5, ["kSdFvnYgWwnG"]);

  if (error) return <p>Error loading posts: {error.message}</p>;

  return (
    <div className="w-full p-4 flex flex-col bg-[#1c1c24] rounded-[10px] flex-[2] overflow-auto">
      <div className="flex flex-col gap-1">
        {!loading && !posts.length && (
          <div className="flex flex-col items-center h-[300px] justify-center">
            <p className="mb-5 font-epilogue font-medium text-[16px] leading-[30px] text-[#808191]">
              No posts available.
            </p>
          </div>
        )}
        {loading && (
          <img
            src="/path/to/loader.gif"
            alt="loader"
            className="w-[100px] h-[100px] object-contain self-center"
          />
        )}
        {!loading &&
          posts.map((post: PostType) => <Post key={post.id} post={post} />)}
        {hasNextPage && (
          <Button
            onClick={loadMorePosts}
            isLoading={isFetchingMore}
            className="self-center w-full mt-4 max-w-xs bg-transparent border-2 border-stone-500 hover:border-stone-400 "
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostsList;
