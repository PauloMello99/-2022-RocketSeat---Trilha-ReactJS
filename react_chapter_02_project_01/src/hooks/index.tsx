import { ReactNode } from "react";
import { TransactionsProvider } from "./transactions";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return <TransactionsProvider>{children}</TransactionsProvider>;
}
