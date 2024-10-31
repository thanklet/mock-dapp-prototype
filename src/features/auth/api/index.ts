import type { SignUpSchema } from "@/features/auth/validation";
import { signUp } from "@/models/auth";
import { getUser } from "@/models/users";
import type { DocRequestParams } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export const useGetUser = () => {
  return useMutation({
    mutationFn: (params: DocRequestParams) => getUser(params),
  });
};

export const usePostUser = () => {
  return useMutation({
    mutationFn: (params: Omit<SignUpSchema, "termsAndConditions">) =>
      signUp(params),
  });
};
