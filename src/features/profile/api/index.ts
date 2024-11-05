import { getUser, updateUser } from "@/models/users";
import type { User } from "@/models/users/types";
import type { DocRequestParams } from "@/types/api";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

export const useGetUser = (params: DocRequestParams) => {
  return useSuspenseQuery({
    queryKey: ["users", params],
    queryFn: () => getUser(params),
  });
};

export const usePostUser = () => {
  return useMutation({
    mutationFn: (params: DocRequestParams & { user: User }) =>
      updateUser(params),
  });
};
