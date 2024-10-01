import { db } from "@/lib/firebase";
import { createTransactionHistory } from "@/models/transactionHistories";
import type { TransactionHistory } from "@/models/transactionHistories/types";
import { getUser, updateUser } from "@/models/users";
import type { DocRequestParams } from "@/types/api";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { runTransaction } from "firebase/firestore";

type SendThanksParams = {
  transactionHistory: TransactionHistory;
  sendUserThanks: number;
  receiveUserThanks: number;
};

const sendThanks = async (params: SendThanksParams) => {
  try {
    await runTransaction(db, async (transaction) => {
      await createTransactionHistory({
        transactionHistory: params.transactionHistory,
        transaction,
      });
      await updateUser({
        documentId: params.transactionHistory.send_user_id,
        user: { thanks: params.sendUserThanks },
        transaction,
      });
      await updateUser({
        documentId: params.transactionHistory.receive_user_id,
        user: { thanks: params.receiveUserThanks },
        transaction,
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export const useSendThanks = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: sendThanks,
    onSuccess,
  });
};

export const useGetUser = (params: DocRequestParams) => {
  return useSuspenseQuery({
    queryKey: ["users", params],
    queryFn: () => getUser(params),
  });
};
