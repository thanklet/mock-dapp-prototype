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

export const useGetUsersByIds = ({
  userIds,
}: { userIds: DocRequestParams[] }) => {
  return useSuspenseQuery({
    queryKey: ["users", userIds],
    queryFn: async () => {
      const ids = userIds.map((userId) => userId.documentId);
      const users = await Promise.all(
        ids.map((id) => getUser({ documentId: id })),
      );

      return users;
    },
  });
};

export const usePostUser = () => {
  return useMutation({
    mutationFn: (params: DocRequestParams & { user: User }) =>
      updateUser(params),
  });
};
