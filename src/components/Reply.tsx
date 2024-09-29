import { formatDistanceToNow } from "date-fns";

type ReplyProps = {
  reply: {
    createdBy: {
      member: {
        profilePicture: {
          url: string;
        };
        name: string;
      };
    };
    createdAt: string;
    description: string;
  };
};

const Reply = ({ reply }: ReplyProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <img
          src={reply.createdBy.member.profilePicture.url}
          alt={reply.createdBy.member.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-epilogue font-semibold text-[18px] leading-[22px] text-gray-200">
            {reply.createdBy.member.name}
          </span>
          <span className="text-gray-400 text-sm">
            {formatDistanceToNow(new Date(reply.createdAt))} ago
          </span>
        </div>
      </div>
      <div className="ml-10 mt-2 text-gray-400">{reply.description}</div>
    </div>
  );
};

export default Reply;
