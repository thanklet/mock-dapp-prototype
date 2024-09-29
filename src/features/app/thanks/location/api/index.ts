import { getUsers } from "@/models/users";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetLocation = () => {
  return useSuspenseQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};
