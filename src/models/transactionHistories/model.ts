import { createCollectionRef, db } from "@/lib/firebase";
import { getDocs, query, where } from "firebase/firestore";
import type {
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
  const sendQuery = query(collectionRef, where("send_user_id", "==", userId));
  const receiveQuery = query(
    collectionRef,
    where("receive_user_id", "==", userId),
  );
  const [sendQuerySnapshot, receiveQuerySnapshot] = await Promise.all([
    getDocs(sendQuery),
    getDocs(receiveQuery),
  ]);
  return {
    sendHistories: sendQuerySnapshot,
    receiveHistories: receiveQuerySnapshot,
  };
};

export { getUserTransactionHistories };
