import { getUser } from "@/models/users";
import type { DocRequestParams } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export const useGetUser = () => {
  return useMutation({
    mutationFn: (params: DocRequestParams) => getUser(params),
  });
};
