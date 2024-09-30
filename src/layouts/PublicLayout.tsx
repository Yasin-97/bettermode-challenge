import { ReactNode } from "react";

type PublicLayoutProps = { children: ReactNode };

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="relative p-4 bg-background-dark min-h-screen flex flex-col">
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;
