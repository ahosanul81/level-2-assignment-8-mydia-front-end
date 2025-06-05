import { TComment } from "@/types/idea";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
interface CommentProps {
  comment: TComment;
  setCommentUpdate: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
}
export default function CommentUpdateDropdown({
  comment,
  setCommentUpdate,
}: CommentProps) {
  const items = [
    {
      key: "update",
      label: "update",
    },
  ];
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <HiOutlineDotsHorizontal className="cursor-pointer" />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions "
          className="bg-white"
          items={items}
        >
          {(item) => (
            <DropdownItem
              key={item.key}
              className={item.key === "update" ? "text-danger" : ""}
              color={item.key === "delete" ? "danger" : "default"}
            >
              <span
                onClick={() =>
                  setCommentUpdate((prev) => ({
                    ...prev,
                    [comment.id]: !prev[comment.id], // toggle true/false
                  }))
                }
              >
                {" "}
                {item.label}
              </span>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
