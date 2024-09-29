import { ReactNode } from "react";

type CardPaperProps = {
  children: ReactNode;
  className?: string;
};

const CardPaper = ({ children, className }: CardPaperProps) => {
  return (
    <div
      className={`w-full p-4 flex flex-col bg-background rounded-xl overflow-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default CardPaper;
