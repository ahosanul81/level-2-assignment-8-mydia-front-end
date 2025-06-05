"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import React, { useEffect, useState } from "react";
import { TIdea } from "@/types/idea";
import Image from "next/image";
import { TbCurrencyTaka } from "react-icons/tb";

import { FaRegMessage } from "react-icons/fa6";
import { voteCount } from "@/services/vote";
import { useUser } from "@/context/UserContext";

import Comments from "./Comments";
import Vote from "./Vote";

import CommentInput from "./CommentInput";

interface IdeaProps {
  data: TIdea[];
}
export default function Idea({ data }: IdeaProps) {
  // console.log(data);
  const { user } = useUser();
  // upVote states
  const [upVotedId, setUpVotedId] = useState<{ [key: string]: boolean }>({});
  const [expandId, setExpandId] = useState<string | null>(null);
  const [voteCounts, setVoteCounts] = useState<{ [key: string]: number }>({});
  // downVote states
  const [downVotedId, setDownVotedId] = useState<{ [key: string]: boolean }>(
    {}
  );
  // comment state
  const [openComment, setOpenComment] = useState<{ [key: string]: boolean }>(
    {}
  );

  // for vote count
  useEffect(() => {
    const fetchVoteCounts = async () => {
      const counts: { [key: string]: number } = {};

      await Promise.all(
        data?.map(async (idea) => {
          const result = await voteCount(idea.id);

          counts[idea.id] = result.data || 0;
        })
      );

      setVoteCounts(counts);
    };

    fetchVoteCounts();
  }, [data, upVotedId, downVotedId]);

  // update local state those who are already voted or commented particular idea
  useEffect(() => {
    data?.forEach((idea: TIdea) => {
      // voting mechanism
      const upVoted = idea.votes?.find(
        (vote) =>
          vote.ideaId === idea.id &&
          vote.memberId === user?.data.id &&
          vote.upVote === 1
      );

      if (upVoted) {
        setUpVotedId((prev) => ({
          ...prev,
          [upVoted.ideaId]: true,
        }));
      }
      const downVoted = idea.votes?.find(
        (vote) =>
          vote.ideaId === idea.id &&
          vote.memberId === user?.data.id &&
          vote.downVote === 1
      );
      if (downVoted) {
        setDownVotedId((prev) => ({
          ...prev,
          [downVoted.ideaId]: true,
        }));
      }
    });

    // comment mechanism
  }, [data, user?.data?.id]);

  // for comment count

  return (
    <div className="grid grid-cols-1 w-4/5 mx-auto gap-4 py-4">
      {data?.map(
        ({
          id,
          title,
          problemStatement,
          description,
          imageUrls,
          isPaid,
          price,
          category,
          votes,
          comments,
        }: TIdea) => {
          return (
            <Card
              key={id}
              className="max-w-3xl px-3 border-1 border-gray-400 rounded-md"
            >
              <CardHeader className="justify-between">
                <div>
                  <h1 className="text-2xl font-semibold ">{title}</h1>
                  <p className="text-gray-500 ">{problemStatement}</p>
                </div>
              </CardHeader>

              <CardBody className=" py-0 text-small text-default-400">
                <div className="flex gap-3">
                  {imageUrls &&
                    imageUrls.length > 0 &&
                    imageUrls?.map((image: string, index: number) => (
                      <Image
                        key={index}
                        width={100}
                        height={70}
                        src={image}
                        className="rounded-xl"
                        alt={`${title}`}
                      />
                    ))}
                </div>
                <p className="bg-gray-200 rounded-sm px-2 mt-2">
                  {description.slice(1, 100)}
                  <a
                    onClick={() => setExpandId(id)}
                    className="text-blue-400 hover:underline "
                  >
                    {expandId !== id && "....more"}
                  </a>
                  {expandId && expandId === id && description}
                  <span
                    className="text-gray-500"
                    onClick={() => setExpandId(null)}
                  >
                    {expandId && " less"}
                  </span>
                </p>
                <span className="flex gap-3 pt-2 ">
                  <span className="bg-green-200 rounded-sm px-3">
                    {isPaid ? "PAID" : "FREE"}
                  </span>
                  <span className="bg-amber-600 text-white rounded-sm px-3">
                    {isPaid && (
                      <span className="flex items-center ">
                        <TbCurrencyTaka /> {price}
                      </span>
                    )}
                  </span>
                  <span className="bg-green-800 text-white rounded-sm px-3">
                    {category.categoryName}
                  </span>
                </span>
              </CardBody>

              <CardFooter className="gap-3">
                <Vote
                  id={id}
                  user={user}
                  votes={votes}
                  voteCounts={voteCounts}
                  setUpVotedId={setUpVotedId}
                  setDownVotedId={setDownVotedId}
                  upVotedId={upVotedId}
                  downVotedId={downVotedId}
                ></Vote>

                <div className="flex gap-1">
                  <p className="font-semibold text-default-400 text-small">
                    {comments.length ?? 0}
                  </p>
                  <p
                    onClick={() =>
                      setOpenComment((prev) => ({
                        ...prev,
                        [id]: !prev[id],
                      }))
                    }
                    className="text-default-400 text-small"
                  >
                    Comments
                  </p>
                </div>
              </CardFooter>

              {openComment[id] && (
                <div className="px-3 relative w-full">
                  <div className="border-t-2 border-gray-300"></div>
                  {/* if there has no comment // comment= [] */}
                  {!comments.length && (
                    <div className="flex flex-col justify-center items-center p-7 text-3xl text-gray-400">
                      <FaRegMessage />
                      <span>No Comments</span>
                    </div>
                  )}
                  {/* main stream comment */}
                  {comments &&
                    comments.length &&
                    comments?.map((comment) => (
                      <Comments
                        key={comment.id}
                        id={id}
                        user={user}
                        comment={comment}
                        allComments={comments}
                      ></Comments>
                    ))}

                  <div className="border-t-2 border-gray-200 mt-2"></div>
                </div>
              )}

              {/* comment box */}
              <CommentInput
                id={id}
                user={user}
                commentId={null}
                parentId={null}
                fnName="addComment"
              ></CommentInput>
            </Card>
          );
        }
      )}
    </div>
  );
}
