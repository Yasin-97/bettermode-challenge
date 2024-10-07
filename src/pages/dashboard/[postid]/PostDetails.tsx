import PrivateLayout from "@/layouts/PrivateLayout";
import { useParams } from "react-router-dom";
import Replies from "./Replies";
import PostDetailsContent from "./PostDetailsContent";

function PostDetails() {
  const { postid } = useParams();

  return (
    <PrivateLayout>
      <PostDetailsContent id={postid as string} />
      <Replies postId={postid as string} />
    </PrivateLayout>
  );
}

export default PostDetails;
