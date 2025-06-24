"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import React, { useEffect, useState } from "react";
import { TIdea } from "@/types/idea";
import Image from "next/image";

import { TbCurrencyTaka } from "react-icons/tb";
import { FaRegMessage } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

import { voteCount } from "@/services/vote";
import { useUser } from "@/context/UserContext";
import defaultUserIcon from "../../../../../public/image/user-icon.png";
import Comments from "./Comments";
import Vote from "./Vote";

import CommentInput from "./CommentInput";
// import UpdateIdea from "./update idea/UpdateIdea";
import UpdateIdeaModal from "./update idea/UpdateIdeaModal";
import DeleteIdea from "./delete-idea/DeleteIdea";
import { initPayment } from "@/services/payment/initPayment";
import { redirect } from "next/navigation";
import { formateDate } from "@/utils/formateDate";

interface IdeaProps {
  data: TIdea[];
}
export default function Idea({ data }: IdeaProps) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
  // console.log(currentUrl);

  // console.log(data);
  const { user } = useUser();
  // console.log(user);

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
  // action state ----update and delete idea
  const [showActionButtons, setShowActionButtons] = useState<{
    [key: string]: boolean;
  }>({});

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

  const handlePayment = async (ideaId: string, memberId: string) => {
    console.log("ideaId", ideaId);
    console.log("memberId", memberId);

    const res = await initPayment(ideaId, memberId);

    redirect(res.url);
    // window.open(res.url, "_blank");
  };
  // console.log(user?.data.id);

  return (
    <div className="grid grid-cols-1  mx-auto gap-4 py-4">
      {data?.map(
        ({
          id,
          title,
          problemStatement,
          proposedSolution,
          description,
          imageUrls,
          isPaid,
          price,
          member,
          category,
          votes,
          comments,
          createdAt,
        }: TIdea) => {
          // transform date
          const formattedDateOfCreatedAt = formateDate(createdAt);

          return (
            <Card
              key={id}
              className="max-w-3xl px-3 border-1 bg-white  rounded-md"
            >
              <CardHeader className="flex flex-col justify-start items-start">
                <div className="w-full flex justify-between mb-2 relative">
                  <div className="flex gap-3">
                    <Image
                      alt="profile photo"
                      src={member?.profilePhoto || defaultUserIcon}
                      width={50}
                      height={50}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h1>{member?.name}</h1>
                      <p className="text-xs">{formattedDateOfCreatedAt}</p>
                    </div>
                  </div>
                  <div>
                    {currentUrl ===
                      `${process.env.NEXT_PUBLIC_BASE_URL}/profile` && (
                      <BsThreeDotsVertical
                        onClick={() =>
                          setShowActionButtons((prev) => ({
                            ...prev,
                            [id]: !prev[id],
                          }))
                        }
                        className="hover:bg-gray-200 rounded-full p-1 text-2xl hover:cursor-pointer"
                      />
                    )}
                    {currentUrl ===
                      `${process.env.NEXT_PUBLIC_BASE_URL}/profile` &&
                      showActionButtons[id] && (
                        <div className="rounded-md absolute  top-6 right-0  p-3   dark:bg-gray-50 dark:text-gray-800 border border-gray-200">
                          <UpdateIdeaModal
                            idea={{
                              id,
                              title,
                              problemStatement,
                              proposedSolution,
                              description,
                              imageUrls,
                              isPaid,
                              price,
                              member,
                              category,
                            }}
                          />
                          <DeleteIdea ideaId={id} />
                        </div>
                      )}
                  </div>
                </div>
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
                  {isPaid && (
                    <span className="bg-amber-600 text-white rounded-sm px-3">
                      <span className="flex items-center ">
                        <TbCurrencyTaka /> {price}
                      </span>
                    </span>
                  )}
                  <span className="bg-green-800 text-white rounded-sm px-3 capitalize">
                    {category?.categoryName}
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
                />

                <div className="flex gap-1">
                  <p className="font-semibold text-default-400 text-small">
                    {Array.isArray(comments) ? comments.length : 0}
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
                <div className="w-full text-right">
                  {user?.data?.id && (
                    <button
                      onClick={() => handlePayment(id, user?.data?.id)}
                      type="button"
                      className="view-button view-button:hover"
                    >
                      View Idea
                    </button>
                  )}
                </div>
              </CardFooter>

              {openComment[id] && (
                <div className="px-3 relative w-full">
                  <div className="border-t-2 border-gray-300"></div>
                  {/* if there has no comment // comment= [] */}
                  {!comments?.length ? (
                    <div className="flex flex-col justify-center items-center p-7 text-3xl text-gray-400">
                      <FaRegMessage />
                      <span>No Comments</span>
                    </div>
                  ) : (
                    <>
                      {comments?.map((comment) => (
                        <Comments
                          key={comment.id}
                          id={id}
                          user={user}
                          comment={comment}
                          allComments={comments}
                        />
                      ))}
                    </>
                  )}
                  {/* main stream comment */}
                  {/* {comments &&
                    comments.length &&
                    comments?.map((comment) => (
                      <Comments
                        key={comment.id}
                        id={id}
                        user={user}
                        comment={comment}
                        allComments={comments}
                      ></Comments>
                    ))} */}

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
              />
            </Card>
          );
        }
      )}
    </div>
  );
}
