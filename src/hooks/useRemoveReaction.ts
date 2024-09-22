import { useMutation } from "@apollo/client";
import { REMOVE_REACTION } from "../graphql/mutations/posts.js";

type RemoveReactionVariables = {
  reaction: string;
  postId: string;
};

type RemoveReactionResponse = {
  removeReaction: {
    status: string;
  };
};

export const useRemoveReaction = () => {
  const [removeReaction, { data, loading, error }] = useMutation<
    RemoveReactionResponse,
    RemoveReactionVariables
  >(REMOVE_REACTION);

  return {
    removeReaction,
    data,
    loading,
    error,
  };
};
