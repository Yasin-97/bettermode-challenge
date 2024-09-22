import { useMutation } from "@apollo/client";
import { ADD_REACTION } from "../graphql/mutations/posts.js";

type AddReactionInput = {
  reaction: string;
  overrideSingleChoiceReactions: boolean;
};

type AddReactionVariables = {
  input: AddReactionInput;
  postId: string;
};

type AddReactionResponse = {
  addReaction: {
    status: string;
  };
};

export const useAddReaction = () => {
  const [addReaction, { data, loading, error }] = useMutation<
    AddReactionResponse,
    AddReactionVariables
  >(ADD_REACTION);

  return {
    addReaction,
    data,
    loading,
    error,
  };
};
