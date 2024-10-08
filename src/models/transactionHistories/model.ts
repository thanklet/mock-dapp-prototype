import { createCollectionRef, db } from "@/lib/firebase";
import {
  addDoc,
  doc,
  getDocs,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type {
  CreateTransactionHistoryParams,
  GetUserTransactionHistoriesParams,
  TransactionHistory,
} from "./types";

const getUserTransactionHistories = async ({
  userId,
}: GetUserTransactionHistoriesParams) => {
  const collectionRef = createCollectionRef<TransactionHistory>(
    db,
    "transaction_histories",
  );
  const q = query(
    collectionRef,
    or(
      where("send_user_id", "==", userId),
      where("receive_user_id", "==", userId),
    ),
    orderBy("created_at", "desc"),
  );
  return await getDocs(q);
};

const createTransactionHistory = async ({
  transactionHistory,
  transaction,
}: CreateTransactionHistoryParams) => {
  const collectionRef = createCollectionRef<TransactionHistory>(
    db,
    "transaction_histories",
  );
  if (transaction) {
    const docRef = doc(collectionRef);
    return await transaction.set(docRef, transactionHistory);
  }

  return await addDoc(collectionRef, transactionHistory);
};

export { createTransactionHistory, getUserTransactionHistories };
