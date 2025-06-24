"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// type Checked = DropdownMenuCheckboxItemProps["checked"];
interface CustomDropdownProps {
  triggerButton: React.ReactNode;
  items: { value: string; option: string }[];
  selectedValueFn?: (value: string) => void;
}
export function CustomDropdown({
  triggerButton,
  items,
  selectedValueFn,
}: CustomDropdownProps) {
  //   const [selectedStatus, setSelectedStatus] =
  //     React.useState<DropdownMenuCheckboxItemProps["checked"]>(true);
  //   const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  //   const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  //   const [showPanel, setShowPanel] = React.useState<Checked>(false);

  const handleSelect = async (value: string) => {
    selectedValueFn?.(value);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Array.isArray(items) &&
          items?.map((item) => (
            <DropdownMenuCheckboxItem
              key={item.option}
              checked={false}
              onClick={() => handleSelect(item.value)}
            >
              {item.option}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
