import { createCollectionRef, db } from "@/lib/firebase";
import { getDocs, or, orderBy, query, where } from "firebase/firestore";
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

export { getUserTransactionHistories };
