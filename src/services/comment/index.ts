import { getTokenByJsCookies } from "../token/jsCookies";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const addComment = async (
  ideaId: string,
  memberId: string,
  text: string
) => {
  console.log({ ideaId, memberId, text });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/comments/add-comment/${ideaId}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: await getTokenByJsCookies(),
        },
        body: JSON.stringify({ ideaId, memberId, text }),
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
export const addReply = async (
  ideaId: string,
  memberId: string,
  parentId: string | null,
  text: string
) => {
  console.log({ ideaId, parentId, text });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/comments/add-reply-comment/${ideaId}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: await getTokenByJsCookies(),
        },
        body: JSON.stringify({ ideaId, memberId, parentId, text }),
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
export const updateComment = async (
  ideaId: string,
  memberId: string,
  commentId: string | null,
  text: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/comments/update-comment/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: await getTokenByJsCookies(),
        },
        body: JSON.stringify({ ideaId, memberId, text }),
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
