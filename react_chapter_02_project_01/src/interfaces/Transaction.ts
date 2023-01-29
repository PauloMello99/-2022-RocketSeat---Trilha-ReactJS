export type TransactionType = "income" | "outcome";

export interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  createdAt: string;
  type: TransactionType;
}
