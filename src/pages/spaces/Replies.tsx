import { loader } from "@/assets";
import CardPaper from "@/components/CardPaper";
import Reply from "@/components/Reply";
import { GET_REPLIES } from "@/graphql/queries/posts";
import { useQuery } from "@apollo/client";
import React from "react";

type ReplyProps = { postId: string };

const Replies = ({ postId }: ReplyProps) => {
  const { data: replies, loading: repliesLoading } = useQuery<PostsResponse>(
    GET_REPLIES,
    {
      variables: {
        postId,
        limit: 10,
      },
    }
  );
  if (repliesLoading) {
    return (
      <CardPaper className="mt-4 gap-6">
        <img
          src={loader}
          alt="loader"
          className="w-[100px] h-[50px] object-contain self-center"
        />
      </CardPaper>
    );
  }
  return (
    <CardPaper className="mt-4 gap-6">
      {!replies?.replies?.totalCount && (
        <h4 className="font-epilogue font-semibold text-[18px] leading-[22px] text-gray-400">
          No replies yet.
        </h4>
      )}
      {!!replies?.replies?.nodes.length && (
        <>
          <h4 className="font-epilogue font-semibold text-[18px] leading-[22px] text-gray-400">
            Replies ({replies?.replies?.totalCount})
          </h4>
          {replies?.replies?.nodes?.map((reply) => (
            <Reply key={reply.id} reply={reply} />
          ))}
        </>
      )}
    </CardPaper>
  );
};

export default Replies;
