import { ReactNode } from "react";
import { RiLoader4Fill } from "react-icons/ri";

type ButtonType = {
  btnType?: "submit" | "reset" | "button";
  children: ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
  isLoading?: boolean;
  compact?: boolean;
};

const Button = ({
  btnType,
  children,
  onClick,
  className,
  isLoading,
  compact,
}: ButtonType) => {
  return (
    <button
      disabled={isLoading}
      type={btnType}
      className={`flex justify-center items-center font-epilogue font-semibold text-[16px] leading-[26px] text-gray-200 min-h-[52px] rounded-[10px] transition-all ${
        compact && "!min-h-[32px]"
      } ${className}`}
      onClick={onClick}
    >
      {isLoading && <RiLoader4Fill className={`rotate-constant w-8 h-8`} />}
      {!isLoading && children}
    </button>
  );
};

export default Button;
