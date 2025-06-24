"use client";

import { TIdea } from "@/types/idea";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

import { BsThreeDotsVertical } from "react-icons/bs";

interface IdeaUpdateProps {
  idea: TIdea;
}

export default function IdeaUpdateDropdown({ idea }: IdeaUpdateProps) {
  console.log(idea);

  const items = [
    { key: "update", label: "Update" },
    { key: "delete", label: "Delete" },
  ];

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <BsThreeDotsVertical className="cursor-pointer" />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Idea Actions"
          className="bg-white border border-gray-300 rounded-md px-5"
          items={items}
        >
          {(item) => (
            <DropdownItem
              key={item.key}
              color={item.key === "delete" ? "danger" : "default"}
            >
              {item.key === "update" ? (
                <span className="cursor-pointer">{item.label}</span>
              ) : (
                <span className="cursor-pointer">{item.label}</span>
              )}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
