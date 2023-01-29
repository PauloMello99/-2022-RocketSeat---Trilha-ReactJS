import { createContext, useContext, useEffect, useState } from "react";
import { Transaction } from "../../interfaces";
import { api } from "../../services";

import {
  TransactionsContextData,
  TransactionInput,
  TransactionsProviderProps,
  Summary,
} from "./interfaces";

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadTransactions = async () => {
    try {
      const { data } = await api.get("/transactions");
      const { transactions } = data;

      setTransactions(transactions);
    } catch (error) {
      console.error(error);
    }
  };

  const createTransaction = async (input: TransactionInput) => {
    await api.post("/transactions", input);
    await loadTransactions();
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const summary: Summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
        acc.total += transaction.amount;
      } else if (transaction.type === "outcome") {
        acc.outcome += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    { income: 0, outcome: 0, total: 0 }
  );

  return (
    <TransactionsContext.Provider
      value={{ transactions, summary, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
