import type { Timestamp } from "firebase/firestore";

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

export type { GetUserTransactionHistoriesParams, TransactionHistory };
