"use client";

import { createContext, useContext, useState } from "react";

type PageTitleContextType = {
  title: string;
  setTitle: (title: string) => void;
};

const PageTitleContext = createContext<PageTitleContextType>({
  title: "Dashboard",
  setTitle: () => null,
});

export function usePageTitle() {
  return useContext(PageTitleContext);
}

export function PageTitleProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState("Dashboard");

  const value = {
    title,
    setTitle,
  };

  return (
    <PageTitleContext.Provider value={value}>
      {children}
    </PageTitleContext.Provider>
  );
} 