import { GET_POST_BY_ID, GET_REPLIES } from "@/graphql/queries/posts";
import PrivateLayout from "@/layouts/PrivateLayout";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { FaEllipsisV, FaHeart, FaSmile, FaSurprise } from "react-icons/fa";
import React, { useState } from "react";
import { Button } from "@/components";
import { useAddReaction } from "@/hooks/useAddReactions";
import { useRemoveReaction } from "@/hooks/useRemoveReaction";
import { formatDistanceToNow } from "date-fns";
import Reply from "@/components/Reply";

function PostDetails() {
  const { spacename, postid } = useParams();

  const {
    data: postData,
    loading,
    error,
    fetchMore,
  } = useQuery<PostsResponse>(GET_POST_BY_ID, {
    variables: {
      id: postid,
    },
  });

  const { data: replies, loading: repLoading } = useQuery<PostsResponse>(
    GET_REPLIES,
    {
      variables: {
        postId: postid,
        limit: 10,
      },
    }
  );
  const [reaction, setReaction] = useState<string | null>(
    postData?.reactions?.[0]?.reaction
  );
  const { addReaction } = useAddReaction();
  const { removeReaction } = useRemoveReaction();

  const handleReaction = async (newReaction: string) => {
    if (!postData) return;
    try {
      if (reaction === newReaction) {
        setReaction(null);
        await removeReaction({
          variables: {
            reaction,
            postId: postData.post.id,
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
            postId: postData.post.id,
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { fields, createdAt, category, createdBy, space } = postData.post;

  const titleField = fields.find((field) => field.key === "title");
  const contentField = fields.find((field) => field.key === "content");

  const title = titleField ? JSON.parse(titleField.value) : "";
  const content = contentField ? JSON.parse(contentField.value) : "";

  return (
    <PrivateLayout>
      <div className="w-full p-4 flex flex-col bg-[#1c1c24] rounded-[10px] flex-[2] overflow-auto">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <img
              src={createdBy.member.profilePicture.url}
              alt={createdBy.member.profilePicture.name}
              className="w-10 h-10 rounded-full bg-red-100"
            />
            <div className="flex flex-col">
              <span className="font-epilogue font-semibold text-[18px] leading-[22px] text-white">
                {createdBy.member.name}
              </span>
              <div>
                <span className="text-gray-400 text-sm">
                  {formatDistanceToNow(new Date(createdAt))} ago | In the
                </span>
                <span className="text-gray-400 text-sm font-bold">
                  {" "}
                  {space.name}
                </span>
              </div>
            </div>
            <button onClick={handleMenuOpen} className="ml-auto">
              <FaEllipsisV className="text-gray-400" />
            </button>
          </div>
          <div className="mt-4">
            <h4
              className="font-epilogue font-semibold text-[18px] leading-[22px] text-white"
              dangerouslySetInnerHTML={{ __html: title }}
            ></h4>
            <p
              className="text-gray-400 mt-2"
              dangerouslySetInnerHTML={{ __html: content }}
            ></p>
          </div>
        </div>
        <div className="flex items-center space-x-2 self-end mt-4">
          <Button
            compact
            className={`!text-red-500 hover:!text-red-700 ${
              reaction === "heart" && "text-[28px]"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleReaction("heart");
            }}
          >
            <FaHeart />
          </Button>
          <Button
            compact
            className={`!text-yellow-500 hover:!text-yellow-700 ${
              reaction === "smile" && "text-[28px]"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleReaction("smile");
            }}
          >
            <FaSmile />
          </Button>
          <Button
            compact
            className={`!text-blue-500 hover:!text-blue-700 ${
              reaction === "open_mouth" && "text-[28px]"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleReaction("open_mouth");
            }}
          >
            <FaSurprise />
          </Button>
        </div>
      </div>

      <div className="mt-4 w-full p-4 flex flex-col bg-[#1c1c24] rounded-[10px] flex-[2] overflow-aut gap-10">
        {replies &&
          replies?.replies?.nodes?.map((reply) => (
            <Reply key={reply.id} reply={reply} />
          ))}
      </div>
    </PrivateLayout>
  );
}

export default PostDetails;
