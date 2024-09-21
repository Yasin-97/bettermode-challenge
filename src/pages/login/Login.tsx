import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../hooks/useAuth";
import PublicLayout from "@/layouts/PublicLayout";
import { Button, FormField, Loader } from "@/components";
import { HandleLogin, LoginArgs } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginArgs>();
  const navigate = useNavigate();
  const { fetchGuestToken, login, loginLoading, guestTokenLoading } = useAuth();

  const onSubmit: HandleLogin = async ({ usernameOrEmail, password }) => {
    try {
      await fetchGuestToken();
      await login({ usernameOrEmail, password });

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <PublicLayout>
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        {(loginLoading || guestTokenLoading) && <Loader />}
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] w-full">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            Login
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <FormField
            labelName="Email *"
            placeholder="Enter your email"
            inputType="email"
            name="usernameOrEmail"
            control={control}
            rules={{ required: "Email is required" }}
            errors={errors}
            handleChange={() => {}}
          />
          <FormField
            labelName="Password *"
            placeholder="Enter your password"
            inputType="password"
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            errors={errors}
            handleChange={() => {}}
          />
          <Button btnType="submit" className="w-full mt-4 bg-[#8c6dfd]">
            Login
          </Button>
        </form>
      </div>
    </PublicLayout>
  );
};

export default Login;
