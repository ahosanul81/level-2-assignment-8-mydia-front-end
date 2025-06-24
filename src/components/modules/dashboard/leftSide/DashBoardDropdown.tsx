"use client";
import React, { useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { BiCategory } from "react-icons/bi";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
type Checked = DropdownMenuCheckboxItemProps["checked"];
export default function DashBoardDropdown() {
  const idea = [
    { to: "/dashboard/add-idea", title: "add idea" },
    { to: "/dashboard/update-idea", title: "update idea" },
    { to: "/dashboard/delete-idea", title: "delete idea" },
  ];

  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  // const [showActivityBar, setShowActivityBar] = useState<Checked>(false);
  // const [showPanel, setShowPanel] = useState<Checked>(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-3 items-center">
            <BiCategory />
            <Link href={"/"} className="font-semibold">
              Idea
            </Link>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-56">
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            {Array.isArray(idea) &&
              idea.map((item) => (
                <Link href={item.to} key={item.to}>
                  {item.title}
                </Link>
              ))}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex gap-3 items-center">
        {/* <IoIosTrendingUp /> */}
        {/* <Link href={""} className="font-semibold">
          Trending
        </Link> */}
      </div>
    </>
  );
}
