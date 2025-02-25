"use client";

import React, { useState } from "react";

interface BreadcrumbContextType {
  pageName: string | null;
  setPageName: (str: string | null) => void;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextType | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

export default function BreadcrumbProvider({ children }: Props) {
  const [pageName, setPageName] = useState<string | null>(null);

  return (
    <BreadcrumbContext value={{ pageName, setPageName }}>
      {children}
    </BreadcrumbContext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBreadcrumb = () => {
  const breadcrumbContext = React.useContext(BreadcrumbContext);

  if (!breadcrumbContext) {
    throw new Error("useBreadcrumb has to be used within <BreadcrumbContext>");
  }

  return breadcrumbContext;
};
