import Link from "next/link";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import Image from "next/image";
import defaultUserIcon from "@/utils/defaultUserIcon";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { logOutUser } from "@/services/auth";
import { toast } from "sonner";
// interface NavbarRightProps {
//   isLoading: boolean;
//   user: IUser | null;
// }

export default function NavbarRight() {
  const { isLoading, setUser, user } = useUser(); // UserContext
  const router = useRouter();
  const handleLogOut = async () => {
    const res = await logOutUser();
    if (res?.success) {
      setUser(null); // ✅ remove user from context
      router.push("/login");
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };
  return (
    <div className="  space-x-3">
      {!isLoading && user ? (
        <>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Image
                width={50}
                height={50}
                src={user?.profilePhoto || defaultUserIcon}
                alt="profile photo"
                className="transition-transform w-10 h-10 rounded-full border-2 border-orange-400 "
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="bg-white rounded-md"
            >
              <DropdownItem
                key="profile"
                className="h-14 gap-2 hover:bg-gray-200 "
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold text-wrap">{user?.name}</p>
              </DropdownItem>
              <DropdownItem key="myProfile">
                <Link href={`/profile/${user.email}`}>My Profile</Link>
              </DropdownItem>
              {user && user.role === "admin" ? (
                <DropdownItem key="settings">
                  <Link href={"/dashboard"}>Dashboard</Link>
                </DropdownItem>
              ) : null}

              <DropdownItem key="analytics">Analytics</DropdownItem>

              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                onClick={() => handleLogOut()}
                key="logout"
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Link href={"/signUp"}>
            <button
              type="button"
              className="text-nowrap cursor-pointer px-4 py-1 font-semibold border border-gray-400  rounded dark:border-gray-800 dark:text-gray-800"
            >
              Sign Up
            </button>
          </Link>
          <Link href={"/login"}>
            <button
              type="button"
              className="cursor-pointer px-4 py-1 font-semibold border border-gray-400  rounded dark:border-gray-800 dark:text-gray-800"
            >
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
