import React from "react";
import Post from "./Post";
import { Button } from "../../components";
import { usePosts } from "@/hooks/usePosts";
import { PostType } from "@/types/posts";
import { loader } from "@/assets";
import { useSpaces } from "@/hooks/useSpaces";
import CardPaper from "../../components/CardPaper";

const PostsList = () => {
  const { spaces, loading: loadingSpace } = useSpaces({ limit: 10 });
  const spaceIds: string[] = spaces.reduce((acc: string[], curr) => {
    acc.push(curr.id);
    return acc;
  }, []);

  const { posts, loading, isFetchingMore, error, loadMorePosts, hasNextPage } =
    usePosts({ limit: 5, spaceIds, options: { skip: loadingSpace } });

  if (error) return <p>Error loading posts: {error.message}</p>;

  return (
    <CardPaper>
      <div className="flex flex-col gap-2">
        {!loading && !posts.length && (
          <div className="flex flex-col items-center h-[300px] justify-center">
            <p className="mb-5 font-epilogue font-medium text-[16px] leading-[30px] text-secondary">
              No posts available.
            </p>
          </div>
        )}
        {loading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[200px] object-contain self-center"
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
    </CardPaper>
  );
};

export default PostsList;
