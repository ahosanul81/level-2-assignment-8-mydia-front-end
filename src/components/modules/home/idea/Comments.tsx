import { TComment } from "@/types/idea";
import Image from "next/image";
import React, { useState } from "react";

import Reply from "./Reply";
import CommentInput from "./CommentInput";
import { IUserModified } from "@/types/user";
import CommentUpdateDropdown from "@/components/reUseableComponent/comment/CommentUpdateDropdown";
import defaultUserIcon from "@/utils/defaultUserIcon";
interface IdeaProps {
  user: IUserModified | null;
  comment: TComment;
  allComments: TComment[];
  id: string; //id means ideaId
}
export default function Comments({
  id,
  user,
  comment,
  allComments,
}: IdeaProps) {
  const [commentUpdate, setCommentUpdate] = useState<{
    [key: string]: boolean;
  }>({});
  const [addReplyOfComment, setAddReplyOfComment] = useState<{
    [key: string]: boolean;
  }>({});
  const replyComment = allComments.filter(
    (c) => c.ideaId === id && c.parentId === comment.id
  );

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col  gap-2 ">
        {comment.parentId === null && (
          <>
            <div key={comment.id} className="flex items-center">
              <Image
                width={50}
                height={50}
                src={comment?.member?.profilePhoto || defaultUserIcon}
                alt="profile photo"
                className="rounded-full w-7 h-7"
              />

              <p
                key={comment.id}
                className="flex flex-col bg-gray-200 px-4 py-2 rounded-2xl"
              >
                <span className="text-xs font-bold">
                  {comment?.member?.name}
                </span>{" "}
                <span className="text-gray-700">{comment.text}</span>
              </p>

              <div>
                <CommentUpdateDropdown
                  comment={comment}
                  setCommentUpdate={setCommentUpdate}
                />
              </div>
              <span
                onClick={() => {
                  setAddReplyOfComment((prev) => ({
                    ...prev,
                    [comment.id]: !prev[comment.id],
                  }));
                }}
                className="text-gray-400 cursor-pointer ml-3"
              >
                Reply
              </span>

              {addReplyOfComment[comment.id] && (
                <>
                  <CommentInput
                    id={comment.ideaId}
                    user={user}
                    commentId={null}
                    parentId={comment.id}
                    fnName="addReply"
                  ></CommentInput>
                </>
              )}
            </div>
          </>
        )}

        {commentUpdate[comment.id] && (
          <>
            <CommentInput
              id={id}
              user={user}
              commentId={comment.id}
              parentId={null}
              fnName="updateComment"
            ></CommentInput>
          </>
        )}
        {replyComment.length > 0 &&
          replyComment?.map((reply) => (
            <Reply
              key={reply.id}
              user={user}
              comment={comment}
              replyItem={reply}
            ></Reply>
          ))}
      </div>
    </div>
  );
}
