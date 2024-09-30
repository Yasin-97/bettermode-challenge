import { useNavigate } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import { Button } from "@/components";
import { GET_MEMBER } from "@/graphql/queries/member";
import { useQuery } from "@apollo/client";
import Cookies from "universal-cookie";
import { useDecodeJWT } from "@/lib/useDecodeJWT";

const NotFound = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();
  const token = cookies.get("access_token");
  const decodedToken = useDecodeJWT(token);

  const { data } = useQuery(GET_MEMBER, {
    variables: {
      id: decodedToken?.id,
    },
  });

  const handleGoHome = () => {
    if (data?.member) {
      navigate("/login");
    }
    navigate("/dashboard");
  };

  return (
    <PublicLayout>
      <div className="bg-background flex justify-center items-center flex-col rounded-xl sm:p-10 p-4">
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-primary rounded-[10px] w-full">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-gray-200">
            404 - Page Not Found
          </h1>
        </div>

        <div className="w-full mt-[65px] flex flex-col gap-[30px] items-center">
          <p className="text-gray-200 sm:text-[18px] text-[14px]">
            Oops! The page you are looking for does not exist.
          </p>
          <Button
            onClick={handleGoHome}
            className="w-full mt-4 bg-primary-light"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default NotFound;
