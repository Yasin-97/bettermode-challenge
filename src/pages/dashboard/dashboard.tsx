import PostsList from "@/components/PostList";
import PrivateLayout from "@/layouts/PrivateLayout";

const Dashboard = () => {
  return (
    <PrivateLayout>
      <div>
        <h1 className="font-epilogue font-semibold text-xl md:text-2xl text-white text-left">
          Posts
        </h1>
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          <PostsList />
        </div>
      </div>
    </PrivateLayout>
  );
};

export default Dashboard;
