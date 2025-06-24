"use client";
import { CustomDropdown } from "@/components/reUseableComponent/dropdown/CustomDropdown";
import React, { useState } from "react";
import { PiTextAlignRightLight } from "react-icons/pi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

export default function UserFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortMenu, setSortMenu] = useState<boolean>(false);
  const [selectedSortRoleShowUi, setSelectedSortRoleShowUi] =
    useState<string>("");
  const [selectedStatusShowUi, setSelectedStatusShowUi] = useState<string>("");
  const handleSortByRole = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
      setSelectedSortRoleShowUi(value);
    } else {
      params.delete(key);
    }
    if (value === "any") {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };
  const handleSortByStatus = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
      setSelectedStatusShowUi(value);
    } else {
      params.delete(key);
    }
    if (value === "any") {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex flex-row-reverse items-center justify-start gap-5">
      <div>
        <button onClick={() => setSortMenu(!sortMenu)} className="text-3xl">
          <PiTextAlignRightLight />
        </button>
      </div>
      {sortMenu && (
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5 border border-gray-400 px-4 rounded-md">
            <CustomDropdown
              triggerButton={
                <button>
                  {selectedSortRoleShowUi
                    ? selectedSortRoleShowUi
                    : "Sort By Role"}
                </button>
              }
              items={[
                { value: "admin", option: "Admin" },
                { value: "member", option: "Member" },
                { value: "any", option: "Any" },
              ]}
              selectedValueFn={(value) => handleSortByRole("role", value)}
            />
            <MdKeyboardArrowDown />
          </div>
          <div className="flex items-center gap-5 border border-gray-400 px-4 rounded-md">
            <CustomDropdown
              triggerButton={
                <button>
                  {selectedStatusShowUi
                    ? selectedStatusShowUi
                    : "Sort By Status"}
                </button>
              }
              items={[
                { value: "active", option: "Active" },
                { value: "blocked", option: "Blocked" },
                { value: "deleted", option: "Deleted" },
                { value: "any", option: "Any" },
              ]}
              selectedValueFn={(value) => handleSortByStatus("status", value)}
            />
            <MdKeyboardArrowDown />
          </div>
        </div>
      )}
    </div>
  );
}
