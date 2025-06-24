"use client";

import { getCurrentUser } from "@/services/auth";
import { userFromDB } from "@/services/user";
import { IUserModified } from "@/types/user";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
interface IUserModifiedProviderValue {
  user: IUserModified | null;
  setUser: (user: IUserModified | null) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
export const UserContext = createContext<
  IUserModifiedProviderValue | undefined
>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserModified | null>(null);
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
