/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getTokenFromCookies } from "../token/getToken";

export const addUpVote = async (ideaId: string, upVote: boolean) => {
  console.log(ideaId, upVote);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/votes/up-vote/${ideaId}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: await getTokenFromCookies(),
        },
        body: JSON.stringify({
          upVote: upVote,
        }),
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
export const addDownVote = async (ideaId: string, downVote: boolean) => {
  console.log("down", ideaId, downVote);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/votes/dwon-vote/${ideaId}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: await getTokenFromCookies(),
        },
        body: JSON.stringify({
          downVote: downVote,
        }),
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
export const voteCount = async (ideaId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/votes/vote-count/${ideaId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await getTokenFromCookies(),
        },
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
