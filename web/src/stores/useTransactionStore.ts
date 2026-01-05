import { create } from "zustand";
import { Address, Hash } from "viem";

type TransactionStatus = "pending" | "success" | "error";

interface Transaction {
  hash: Hash;
  description: string;
  status: TransactionStatus;
  timestamp: number;
}

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (hash: Hash, description: string) => void;
  updateTransaction: (hash: Hash, status: TransactionStatus) => void;
  clearTransactions: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  addTransaction: (hash, description) =>
    set((state) => ({
      transactions: [
        {
          hash,
          description,
          status: "pending",
          timestamp: Date.now(),
        },
        ...state.transactions.slice(0, 9), // Keep last 10
      ],
    })),
  updateTransaction: (hash, status) =>
    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx.hash === hash ? { ...tx, status } : tx
      ),
    })),
  clearTransactions: () => set({ transactions: [] }),
}));

export type { Transaction, TransactionStatus };
