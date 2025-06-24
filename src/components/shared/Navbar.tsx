"use client";
import React from "react";
import Link from "next/link";
import { LiaHomeSolid } from "react-icons/lia";
import { FcIdea } from "react-icons/fc";
import { RiBloggerLine } from "react-icons/ri";
import { useUser } from "@/context/UserContext";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import Image from "next/image";
import defaultUserIcon from "@/utils/defaultUserIcon";
export default function Navbar() {
  // const user = useContext(UserContext);
  const { user } = useUser();

  const navlinks = (
    <>
      <Link href={"/"}>
        <LiaHomeSolid />
      </Link>
      <Link href={"/ideas"}>
        <FcIdea />
      </Link>
      <Link href={"/blogs"}>
        <RiBloggerLine />
      </Link>
    </>
  );
  return (
    <div className="flex justify-between items-center border-b-1 border-gray-400 bg-white py-1 z-50">
      <div>
        {/* <Image width={70} height={70} src={logo} alt="logo" /> */}
        <Link href={"/"}>
          <h1 className="text-3xl font-bold ">MyDia</h1>
        </Link>
      </div>
      <div>
        <ul className="flex justify-between gap-6 text-3xl">{navlinks}</ul>
      </div>

      <div className="space-x-3">
        {user && user ? (
          <>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Image
                  width={50}
                  height={50}
                  src={user?.data?.profilePhoto || defaultUserIcon}
                  alt="profile photo"
                  className="transition-transform w-14 h-14 rounded-full border-2 border-orange-400 p-1"
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
                  <p className="font-semibold text-wrap">{user?.data?.name}</p>
                </DropdownItem>
                <DropdownItem key="myProfile">
                  <Link href={`/profile/${user.data.email}`}>My Profile</Link>
                </DropdownItem>
                <DropdownItem key="settings">
                  <Link href={"/dashboard"}>Dashboard</Link>
                </DropdownItem>

                <DropdownItem key="analytics">Analytics</DropdownItem>

                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <>
            <Link href={"/sign-up"}>
              <button
                type="button"
                className="px-4 py-1 font-semibold border border-gray-400  rounded dark:border-gray-800 dark:text-gray-800"
              >
                Sign Up
              </button>
            </Link>
            <Link href={"/login"}>
              <button
                type="button"
                className="px-4 py-1 font-semibold border border-gray-400  rounded dark:border-gray-800 dark:text-gray-800"
              >
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
