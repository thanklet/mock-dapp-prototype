import type { Timestamp } from "firebase/firestore";
import type { Transaction } from "firebase/firestore";
type TransactionHistory = {
  created_at: Timestamp;
  emoji: string;
  receive_user_id: string;
  send_user_id: string;
  thanks: number;
};

type GetUserTransactionHistoriesParams = {
  userId: string;
};

type CreateTransactionHistoryParams = {
  transactionHistory: TransactionHistory;
  transaction?: Transaction;
};

export type {
  CreateTransactionHistoryParams,
  GetUserTransactionHistoriesParams,
  TransactionHistory,
};
