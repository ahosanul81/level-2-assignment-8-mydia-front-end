"use client";

import { getCurrentUser } from "@/services/auth";
import { userFromDB } from "@/services/user";
import { IUser } from "@/types/user";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
interface IUserProviderValue {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
export const UserContext = createContext<IUserProviderValue | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUSer = async () => {
    const userData = await getCurrentUser();

    if (userData) {
      const user = await userFromDB(userData);
      setUser(user);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleUSer();
  }, [isLoading]);
  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be within the userProvider context");
  }
  return context;
};
