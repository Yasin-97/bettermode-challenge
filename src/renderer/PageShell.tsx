import React, { ReactNode } from "react";
import "./PageShell.css";
import { PageContextProvider } from "../providers/usePageContext";

export { PageShell };

type PageShellType = {
  pageContext: any;
  children: ReactNode;
};
function PageShell({ pageContext, children }: PageShellType) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        {children}
      </PageContextProvider>
    </React.StrictMode>
  );
}
