import React, { useContext, ReactNode } from "react";

export { PageContextProvider };
export { usePageContext };

const Context = React.createContext(undefined);

type PageContextProviderType = {
  pageContext: any;
  children: ReactNode;
};
function PageContextProvider({
  pageContext,
  children,
}: PageContextProviderType) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
  const pageContext = useContext(Context);
  return pageContext;
}
