"use client";
import React from "react";
import Link from "next/link";
import { LiaHomeSolid } from "react-icons/lia";
import { FcIdea } from "react-icons/fc";
import { RiBloggerLine } from "react-icons/ri";

import NavbarRight from "./NavbarRight";
import NavbarTop from "./NavbarTop";

export default function Navbar() {
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
    <div>
      <div className="block sm:hidden py-2">
        <NavbarTop />
      </div>

      <div className="relative flex items-center justify-between border-b-1 border-gray-300 py-2 z-50">
        <div className="hidden sm:block w-1/5 flex items-center gap-2">
          <div className="w-1/3">
            <Link href={"/"}>
              <h1 className="text-3xl font-bold ">MyDia</h1>
            </Link>
          </div>
          {/* search input */}

          <div className="w-2/3 absolute top-4 left-28">
            <div className=" flex items-center border w-48 focus-within:border-indigo-500 transition duration-300 pr-3 gap-2 bg-white border-gray-500/30 h-[30px] rounded-[5px] overflow-hidden">
              <input
                type="text"
                placeholder="Search for ideas"
                className="w-full h-full pl-4 outline-none placeholder-gray-500 text-sm"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="22"
                height="22"
                viewBox="0 0 30 30"
                fill="#6B7280"
              >
                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-3/5">
          <div className="flex justify-center ">
            <ul className="flex  gap-6 text-3xl">{navlinks}</ul>
          </div>
        </div>

        {/* <div className="w-1/5 flex justify-end space-x-3">
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
            <>
              <Link href={"/signUp"}>
                <button
                  type="button"
                  className="cursor-pointer px-4 py-1 font-semibold border border-gray-400  rounded dark:border-gray-800 dark:text-gray-800"
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
            </>
          )}
        </div> */}
        <div className="w-1/5 hidden sm:block ">
          <div className="w-full flex justify-end">
            <NavbarRight />
          </div>
        </div>
      </div>
    </div>
  );
}
