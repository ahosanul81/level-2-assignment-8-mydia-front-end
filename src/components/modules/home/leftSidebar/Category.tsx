"use client";
import React, { useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { BiCategory } from "react-icons/bi";
import { IoIosTrendingUp } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
type Checked = DropdownMenuCheckboxItemProps["checked"];
export default function Category() {
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
              Category
            </Link>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex gap-3 items-center">
        <IoIosTrendingUp />
        <Link href={"/"} className="font-semibold">
          Trending
        </Link>
      </div>
    </>
  );
}
