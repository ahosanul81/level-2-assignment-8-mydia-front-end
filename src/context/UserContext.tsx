"use client";

import { getCurrentUserFromToken } from "@/services/auth";
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
interface IUserModifiedProviderValue {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  refreshUser: () => Promise<void>;
}
export const UserContext = createContext<
  IUserModifiedProviderValue | undefined
>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const userData = await getCurrentUserFromToken();
      if (userData) {
        const user = await userFromDB(userData);
        setUser(user.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser(); // ✅ run only once on mount
  }, []);
  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading, setIsLoading, refreshUser }}
    >
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
