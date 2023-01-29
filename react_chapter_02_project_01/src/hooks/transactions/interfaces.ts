import { ReactNode } from "react";
import { Transaction } from "../../interfaces";

export interface TransactionsProviderProps {
  children: ReactNode;
}

export type TransactionInput = Omit<Transaction, "id" | "createdAt">;

export interface Summary {
  total: number;
  income: number;
  outcome: number;
}

export interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (input: TransactionInput) => Promise<void>;
  summary: Summary;
}
