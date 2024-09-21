import { loader } from "../assets";
type LoaderType = { className?: string };
const Loader = ({ className }: LoaderType) => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img
        src={loader}
        alt="loader"
        className={`w-[100px] h-[100px] object-contain ${className}`}
      />
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
        Please wait...
      </p>
    </div>
  );
};

export default Loader;
