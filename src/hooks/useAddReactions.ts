import { ADD_REACTION } from "@/graphql/posts";
import {
  AddReactionMutation,
  AddReactionMutationVariables,
} from "@/graphql/posts/type";
import { useMutation } from "@apollo/client";

export const useAddReaction = () => {
  const [addReaction, { data, loading, error }] = useMutation<
    AddReactionMutation,
    AddReactionMutationVariables
  >(ADD_REACTION);

  return {
    addReaction,
    data,
    loading,
    error,
  };
};
