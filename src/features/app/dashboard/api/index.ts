import { getUserTransactionHistories } from "@/models/transactionHistories";
import { getUser } from "@/models/users";
import type { DocRequestParams } from "@/types/api";
import { useSuspenseQueries } from "@tanstack/react-query";

export const useGetDashboard = (params: DocRequestParams) => {
  const getUserParams = params;
  const getUserTransactionHistoriesParams = { userId: params.documentId };
  return useSuspenseQueries({
    queries: [
      {
        queryKey: ["user", getUserParams],
        queryFn: () => getUser(getUserParams),
      },
      {
        queryKey: ["transaction_histories", getUserTransactionHistoriesParams],
        queryFn: () =>
          getUserTransactionHistories(getUserTransactionHistoriesParams),
      },
    ],
  });
};
