import React, { useState } from "react";
import { FaHeart, FaSmile, FaSurprise } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { Button } from ".";
import { BiCommentDetail } from "react-icons/bi";
import { PostType } from "@/types/posts";
import { useAddReaction } from "@/hooks/useAddReactions";
import { useRemoveReaction } from "@/hooks/useRemoveReaction";

type PostProps = {
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [reaction, setReaction] = useState<string | null>(
    post.reactions?.[0]?.reaction
  );
  const { addReaction } = useAddReaction();
  const { removeReaction } = useRemoveReaction();

  const handleReaction = async (newReaction: string) => {
    try {
      if (reaction === newReaction) {
        setReaction(null);
        await removeReaction({
          variables: {
            reaction,
            postId: post.id,
          },
        });
      } else {
        setReaction(newReaction);
        await addReaction({
          variables: {
            input: {
              reaction: newReaction,
              overrideSingleChoiceReactions: true,
            },
            postId: post.id,
          },
        });
      }
    } catch (error) {
      console.error(
        `Error ${reaction ? "removing" : "adding"} reaction:`,
        error
      );
    }
  };

  return (
    <div className="p-4 bg-[#13131a] rounded-[10px] space-y-4">
      <div className="flex flex-col border border-b-2 last:border-none">
        <div className="flex items-center gap-2">
          <h4 className="font-epilogue font-semibold text-[18px] leading-[22px] text-white">
            {post.title}
          </h4>
        </div>
        <p className="mt-[20px] font-epilogue font-semibold text-[14px] leading-[22px] text-[#808191]">
          {post.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-500">
            <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
            <span className="ml-4 ">
              {post.totalRepliesCount}
              <BiCommentDetail className="inline ml-1 w-4 h-4" />
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              compact
              className={`!text-red-500 hover:!text-red-700 ${
                reaction === "heart" && "text-[28px]"
              }`}
              onClick={() => handleReaction("heart")}
            >
              <FaHeart />
            </Button>
            <Button
              compact
              className={`!text-yellow-500 hover:!text-yellow-700 ${
                reaction === "smile" && "text-[28px]"
              }`}
              onClick={() => handleReaction("smile")}
            >
              <FaSmile />
            </Button>
            <Button
              compact
              className={`!text-blue-500 hover:!text-blue-700 ${
                reaction === "open_mouth" && "text-[28px]"
              }`}
              onClick={() => handleReaction("open_mouth")}
            >
              <FaSurprise />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
