import { addComment, addReply, updateComment } from "@/services/comment";
import { IUser } from "@/types/user";
import defaultUserIcon from "@/utils/defaultUserIcon";
import Image from "next/image";
import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { toast } from "sonner";

interface UserProps {
  id: string;
  user: IUser | null;
  parentId: string | null;
  commentId: string | null;
  fnName: string;
}
export default function CommentInput({
  id,
  user,
  parentId,
  commentId,
  fnName,
}: UserProps) {
  const handleAddComment = async (
    event: React.FormEvent<HTMLFormElement>,
    ideaId: string
  ) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const comment = (form.elements.namedItem("comment") as HTMLInputElement)
      ?.value;
    // console.log(ideaId, user);

    if (fnName === "addComment" && comment && ideaId && user?.memberId) {
      const res = await addComment(ideaId, user?.memberId, comment);

      if (res.success) {
        toast.success("Comment posted successfully!");

        form.reset();
      } else {
        toast.error(res.message);
      }
    }
    if (fnName === "updateComment" && comment && ideaId && user?.memberId) {
      const res = await updateComment(
        ideaId,
        user?.memberId,
        commentId,
        comment
      );

      if (res.success) {
        toast.success("Comment updated successfully!");
        form.reset();
      } else {
        toast.error(res.message);
      }
    }
    if (fnName === "addReply" && comment && ideaId && user?.memberId) {
      const res = await addReply(ideaId, user?.memberId, parentId, comment);

      if (res.success) {
        toast.success("Added reply successfully!");
        form.reset();
      } else {
        toast.error(res.message);
      }
    }
  };
  return (
    <form onSubmit={(event) => handleAddComment(event, id)}>
      <div className="flex items-center gap-2 relative w-full mt-2 mb-2">
        {user?.profilePhoto && (
          <Image
            width={50}
            height={50}
            src={user?.profilePhoto || defaultUserIcon}
            alt="profile photo"
            className="rounded-full w-7 h-7"
          />
        )}
        <input
          type="text"
          name="comment"
          placeholder={`Comment as ${user?.name}`}
          className="w-full py-2 bg-gray-100 px-3 pr-10 rounded-sm border border-gray-200"
        />
        <button
          type="submit"
          className="absolute right-7 top-5 -translate-y-1/2 text-2xl text-amber-600 cursor-pointer"
        >
          <FaLocationArrow />
        </button>
      </div>
    </form>
  );
}
