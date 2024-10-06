import { REMOVE_REACTION } from "@/graphql/posts";
import {
  RemoveReactionMutation,
  RemoveReactionMutationVariables,
} from "@/graphql/posts/type";
import { useMutation } from "@apollo/client";

export const useRemoveReaction = () => {
  const [removeReaction, { data, loading, error }] = useMutation<
    RemoveReactionMutation,
    RemoveReactionMutationVariables
  >(REMOVE_REACTION);

  return {
    removeReaction,
    data,
    loading,
    error,
  };
};
