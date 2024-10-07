import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { logo } from "../assets";
import { navlinks } from "../constants";
import { IoSearchOutline } from "react-icons/io5";
import { RiMenu4Fill } from "react-icons/ri";
import { useSearchPosts } from "../hooks/useSearchPosts";
import { formatDistanceToNow } from "date-fns";
import useDebounce from "../lib/useDebounce";
import { useQuery } from "@apollo/client";
import { useDecodeJWT } from "@/lib/useDecodeJWT";
import { GetMemberQuery } from "@/graphql/member/type";
import { GET_MEMBER } from "@/graphql/member";
import Navlink from "../components/Navlink";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 400);
  const { posts } = useSearchPosts({ input: debouncedSearchQuery });

  const cookies = new Cookies();
  const token = cookies.get("access_token");
  const decodedToken = useDecodeJWT(token);
  const { data, error, loading } = useQuery<GetMemberQuery>(GET_MEMBER, {
    variables: {
      id: decodedToken?.id,
    },
  });
  const userAvatar = data?.member?.profilePicture?.url;

  const searchedPosts = posts[0]?.hits;

  const onPostClick = (entityId: string) => {
    navigate(`/dashboard/${entityId}`);
    setSearchQuery("");
  };

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    if (!loading && !userAvatar) navigate("/login");
  }, []);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between gap-6 sticky top-4 bg-background-dark pb-4">
      <div className="flex items-center gap-3 w-full">
        <div className="lg:flex-1 flex flex-row py-2 pl-4 pr-2 h-[52px] bg-background rounded-[100px] relative w-full">
          <IoSearchOutline className="w-6 h-6 font-bold text-secondary-light self-center mr-2" />
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search for posts"
            className="placeholder:font-medium flex w-full font-epilogue font-medium text-[16px] placeholder:text-secondary-dark text-gray-200 bg-transparent outline-none"
          />
          <div className="absolute top-[52px] left-0 right-0 w-full">
            {!!searchedPosts?.length && (
              <div className="p-4 bg-background rounded-[10px] space-y-4 border border-slate-500">
                {searchedPosts.map((post) => (
                  <div
                    className="flex flex-col border-b-2 border-slate-700 last:border-none pb-2 gap-2 cursor-pointer hover:pl-1 transition-all "
                    onClick={() => onPostClick(post.entityId)}
                  >
                    <div className="flex items-center gap-2">
                      <h4 className="font-epilogue font-semibold text-[18px] leading-[22px] text-gray-200">
                        {post.title}
                      </h4>
                    </div>
                    <div className="text-gray-500">
                      <span>
                        {formatDistanceToNow(new Date(post?.created))} ago
                      </span>
                      <span className="ml-4 ">By</span>
                      <span className="ml-1 text-gray-400 font-medium uppercase">
                        {post.by.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {userAvatar && (
          <img
            src={userAvatar}
            alt="user avatar"
            className="w-11 h-11 rounded-full"
          />
        )}
      </div>
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-primary-dark flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
            onClick={() => {
              navigate("/dashboard");
              setToggleDrawer(false);
            }}
          />
        </div>

        <RiMenu4Fill
          onClick={() => setToggleDrawer((prev) => !prev)}
          className="w-[34px] h-[34px] text-gray-200 cursor-pointer"
        />
        <div
          className={`absolute top-[60px] right-0 left-0 bg-background z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className=" px-2">
            {navlinks.map((navlink) => (
              <Navlink
                key={navlink.name}
                handleClick={() => {
                  navigate(navlink.link);
                }}
                isActive={pathname === navlink.link}
                {...navlink}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
