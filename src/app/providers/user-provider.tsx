import type { User } from "firebase/auth";
import { type PropsWithChildren, createContext, useContext } from "react";

type UserContextType = { user: User } | null;

type Props = PropsWithChildren & {
  user: User;
};

const UserContext = createContext<UserContextType>(null);

const UserProvider = ({ user, children }: Props) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};

export { UserProvider, useUser };
