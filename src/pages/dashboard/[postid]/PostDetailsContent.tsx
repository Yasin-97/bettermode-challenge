import { loader } from "@/assets";
import { Button } from "@/components";
import CardPaper from "@/components/CardPaper";
import { GET_POST_BY_ID } from "@/graphql/posts";
import {
  GetPostByIdQuery,
  GetPostByIdQueryVariables,
} from "@/graphql/posts/type";
import { useAddReaction } from "@/hooks/useAddReactions";
import { useRemoveReaction } from "@/hooks/useRemoveReaction";
import { useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaHeart, FaSmile, FaSurprise } from "react-icons/fa";
type PostDetailsContentType = { id: string };
const PostDetailsContent = ({ id }: PostDetailsContentType) => {
  const {
    data: postData,
    loading: postDataLoading,
    error,
    fetchMore,
  } = useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GET_POST_BY_ID, {
    variables: {
      id,
    },
  });

  const [reaction, setReaction] = useState<string | null | undefined>(
    postData?.post?.reactions?.[0]?.reaction
  );
  useEffect(() => {
    setReaction(postData?.post?.reactions?.[0]?.reaction);
  }, [postData]);
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

  if (postDataLoading) {
    return (
      <CardPaper>
        <img
          src={loader}
          alt="loader"
          className="w-[100px] h-[200px] object-contain self-center"
        />
      </CardPaper>
    );
  }

  const titleField = postData?.post?.fields.find(
    (field) => field.key === "title"
  );
  const contentField = postData?.post?.fields.find(
    (field) => field.key === "content"
  );

  const title = titleField ? JSON.parse(titleField.value) : "";
  const content = contentField ? JSON.parse(contentField.value) : "";

  return (
    <CardPaper>
      {postDataLoading && (
        <img
          src={loader}
          alt="loader"
          className="w-[100px] h-[200px] object-contain self-center"
        />
      )}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <img
            src={postData?.post?.createdBy.member.profilePicture.url}
            alt={postData?.post?.createdBy.member.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-epilogue font-semibold text-[18px] leading-[22px] text-gray-200">
              {postData?.post?.createdBy.member.name}
            </span>
            <div>
              <span className="text-gray-400 text-sm">
                {formatDistanceToNow(
                  new Date(postData?.post?.createdAt as string)
                )}{" "}
                ago | In the
              </span>
              <span className="text-gray-400 text-sm font-bold">
                {" "}
                {postData?.post?.space?.name}
              </span>
            </div>
          </div>
          <button className="ml-auto">
            <FaEllipsisV className="text-gray-400" />
          </button>
        </div>
        <div className="mt-4">
          <h4
            className="font-epilogue font-semibold text-[18px] leading-[22px] text-gray-200"
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
            e?.preventDefault();
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
            e?.preventDefault();
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
            e?.preventDefault();
            handleReaction("open_mouth");
          }}
        >
          <FaSurprise />
        </Button>
      </div>
    </CardPaper>
  );
};

export default PostDetailsContent;
