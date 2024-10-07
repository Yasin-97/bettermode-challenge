import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <PublicLayout>
      <div className=" bg-background flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-primary rounded-[10px] w-full">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-gray-200">
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
          <Button
            isLoading={guestTokenLoading || loginLoading}
            btnType="submit"
            className="w-full mt-4 bg-primary-light"
          >
            Login
          </Button>
        </form>
      </div>
    </PublicLayout>
  );
};

export default Login;
