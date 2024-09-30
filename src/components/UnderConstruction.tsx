import { useNavigate } from "react-router-dom";
import { Button } from "@/components";

import PrivateLayout from "@/layouts/PrivateLayout";

const UnderConstruction = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  return (
    <PrivateLayout>
      <div className="bg-background flex justify-center items-center flex-col rounded-xl sm:p-10 p-4 max-w-[480px] mx-auto">
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-primary rounded-[10px] w-full">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-gray-200">
            Page Under Construction
          </h1>
        </div>

        <div className="w-full mt-[65px] flex flex-col gap-[30px] items-center">
          <p className="text-gray-200 sm:text-[18px] text-[14px]">
            This page is currently under construction. Please check back later.
          </p>
          <Button
            onClick={handleGoHome}
            className="w-full mt-4 bg-primary-light"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default UnderConstruction;
