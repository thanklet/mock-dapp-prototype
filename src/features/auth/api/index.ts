import { getUser } from "@/models/users";
import type { DocRequestParams } from "@/types/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetUser = (params: DocRequestParams | null) => {
  return useSuspenseQuery({
    queryKey: ["user", params],
    queryFn: () => (params ? getUser(params) : null),
  });
};
