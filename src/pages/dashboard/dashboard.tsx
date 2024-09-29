import PostsList from "@/components/PostList";
import PrivateLayout from "@/layouts/PrivateLayout";

const Dashboard = () => {
  return (
    <PrivateLayout>
      <h1 className="font-epilogue font-semibold text-xl md:text-2xl text-gray-200 text-left">
        Posts
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        <PostsList />
      </div>
    </PrivateLayout>
  );
};

export default Dashboard;
