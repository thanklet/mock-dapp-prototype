import { createTransactionHistory } from "@/models/transactionHistories";
import type { TransactionHistory } from "@/models/transactionHistories/types";
import { getUser, updateUser } from "@/models/users";
import type { DocRequestParams } from "@/types/api";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

type SendThanksParams = {
  transactionHistory: TransactionHistory;
  sendUserThanks: number;
  receiveUserThanks: number;
};

const sendThanks = async (params: SendThanksParams) => {
  await createTransactionHistory(params.transactionHistory);
  await updateUser({
    documentId: params.transactionHistory.send_user_id,
    user: { thanks: params.sendUserThanks },
  });
  await updateUser({
    documentId: params.transactionHistory.receive_user_id,
    user: { thanks: params.receiveUserThanks },
  });
};

export const useSendThanks = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: sendThanks,
    onSuccess,
  });
};

export const useGetUser = (params: DocRequestParams) => {
  return useSuspenseQuery({
    queryKey: ["user", params],
    queryFn: () => getUser(params),
  });
};
