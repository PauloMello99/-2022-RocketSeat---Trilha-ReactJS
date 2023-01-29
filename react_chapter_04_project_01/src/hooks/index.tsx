import { ReactNode } from "react";
import { QueryClientProvider } from "react-query";

import { queryClient } from "../services/query";

import { SideBarProvider } from "./sideBar";

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SideBarProvider>{children}</SideBarProvider>
    </QueryClientProvider>
  );
}
