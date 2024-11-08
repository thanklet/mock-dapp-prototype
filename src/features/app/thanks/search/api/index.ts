import { getUsers } from "@/models/users";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useSuspenseQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};
