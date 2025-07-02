import { addDownVote, addUpVote } from "@/services/vote";
import { TVote } from "@/types/idea";
import { IUser } from "@/types/user";
import React from "react";
import { MdOutlineThumbDownOffAlt, MdOutlineThumbUpAlt } from "react-icons/md";
interface VoteProps {
  id: string;
  user: IUser | null;
  votes: TVote[] | undefined;
  voteCounts: { [key: string]: number };
  setUpVotedId: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  setDownVotedId: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  upVotedId: { [key: string]: boolean };
  downVotedId: { [key: string]: boolean };
}
export default function Vote({
  id,
  user,
  votes,
  voteCounts,
  setUpVotedId,
  setDownVotedId,
  upVotedId,
  downVotedId,
}: VoteProps) {
  // identify already voted or not
  const userUpVoted = votes?.find(
    ({ ideaId, memberId, upVote }) =>
      ideaId === id && memberId === user?.memberId && upVote === 1
  );
  const userDownVoted = votes?.find(
    ({ ideaId, memberId, downVote }) =>
      ideaId === id && memberId === user?.memberId && downVote === 1
  );
  return (
    <div className="flex items-center gap-1 ">
      <p className="font-semibold text-default-400 text-small">
        {voteCounts[id] ?? 0}
      </p>
      <p className=" text-default-400 text-2xl">
        <MdOutlineThumbUpAlt
          onClick={() => {
            const hasVoted = upVotedId[id] ?? !!userUpVoted;
            const newUpVoteStatus = !hasVoted;
            addUpVote(id, newUpVoteStatus);
            setUpVotedId((prev) => ({
              ...prev,
              [id]: newUpVoteStatus,
            }));
            // If upvoting, make sure downvote is off
            if (newUpVoteStatus) {
              setDownVotedId((prev) => ({
                ...prev,
                [id]: false,
              }));
            }
          }}
          className={`cursor-pointer ${upVotedId[id] ? "text-amber-600" : ""}`}
        />
      </p>

      <p className=" text-default-400 text-2xl">
        <MdOutlineThumbDownOffAlt
          onClick={() => {
            const hasVoted = downVotedId[id] ?? !!userDownVoted;
            const newDownVoteStatus = !hasVoted;
            addDownVote(id, newDownVoteStatus);
            setDownVotedId((prev) => ({
              ...prev,
              [id]: newDownVoteStatus,
            }));
            // If downvoting, make sure upVote is off
            if (newDownVoteStatus) {
              setUpVotedId((prev) => ({
                ...prev,
                [id]: false,
              }));
            }
          }}
          className={`cursor-pointer ${
            downVotedId[id] ? "text-amber-600" : ""
          }`}
        />
      </p>
    </div>
  );
}
