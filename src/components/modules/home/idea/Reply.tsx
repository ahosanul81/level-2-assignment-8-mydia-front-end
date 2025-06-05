import CommentUpdateDropdown from "@/components/reUseableComponent/comment/CommentUpdateDropdown";
import { TComment } from "@/types/idea";
import Image from "next/image";
import React, { useState } from "react";
import CommentInput from "./CommentInput";
import { IUser } from "@/types/user";
interface replyProps {
  user: IUser | null;
  comment: TComment;
  replyItem: TComment;
}
export default function Reply({ user, comment, replyItem }: replyProps) {
  const [commentUpdate, setCommentUpdate] = useState<{
    [key: string]: boolean;
  }>({});
  const [addReplyOfComment, setAddReplyOfComment] = useState<{
    [key: string]: boolean;
  }>({});
  return (
    <div key={replyItem.id} className="flex justify-end">
      <div className="flex gap-2 py-3 w-11/12 bg-gray-100 rounded-xl px-3">
        {replyItem?.member?.profilePhoto ? (
          <Image
            width={50}
            height={50}
            src={replyItem.member.profilePhoto}
            alt="profile photo"
            className="rounded-full w-7 h-7"
          />
        ) : null}

        <p className="text-justify flex flex-col">
          <span className="font-bold text-xs">{replyItem.member.name}</span>
          <span>
            <span className="font-bold text-xs">{comment.member.name}</span>{" "}
            {replyItem?.text}
          </span>
        </p>
        <CommentUpdateDropdown
          comment={comment}
          setCommentUpdate={setCommentUpdate}
        />
        {commentUpdate[comment.id] && (
          <>
            <CommentInput
              id={replyItem.ideaId}
              user={user}
              commentId={replyItem.id}
              parentId={null}
              fnName="updateComment"
            ></CommentInput>
          </>
        )}
        <span
          onClick={() => {
            setAddReplyOfComment((prev) => ({
              ...prev,
              [replyItem.id]: !prev[replyItem.id],
            }));
          }}
          className="text-gray-400 cursor-pointer ml-3"
        >
          Reply
        </span>

        {addReplyOfComment[replyItem.id] && (
          <>
            <CommentInput
              id={replyItem.ideaId}
              user={user}
              commentId={null}
              parentId={comment.id}
              fnName="addReply"
            ></CommentInput>
          </>
        )}
      </div>
    </div>
  );
}
