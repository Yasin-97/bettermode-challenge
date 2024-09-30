import { loader } from "../assets";
type LoaderType = { text?: string; className?: string };
const Loader = ({ text = "Please wait...", className }: LoaderType) => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img
        src={loader}
        alt="loader"
        className={`w-[100px] h-[100px] object-contain ${className}`}
      />
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-gray-200 text-center">
        {text}
      </p>
    </div>
  );
};

export default Loader;
