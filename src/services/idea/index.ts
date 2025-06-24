"use server";
import { getTokenFromCookies } from "../token/getToken";
import { getTokenByJsCookies } from "../token/jsCookies";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllIdea = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ideas`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
export const addIdea = async (formData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/ideas/add-idea`,
      {
        method: "POST",
        headers: {
          Authorization: await getTokenFromCookies(),
        },
        body: formData,
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
export const getMyIdea = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/ideas/get/my-idea`,
      {
        method: "GET",
        headers: {
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
export const getIdeaById = async (ideaId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/ideas/${ideaId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
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

export const updateIdeaById = async (ideaId: string, formData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/ideas/update-idea/${ideaId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: await getTokenFromCookies(),
        },
        body: formData,
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
export const deleteIdeaById = async (ideaId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/ideas/delete-idea/${ideaId}`,
      {
        method: "DELETE",
        headers: {
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
export const getAllStatusIdea = async (status: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/ideas/status/${status}`,
      {
        method: "GET",
        headers: {
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
export const updateIdeaStatus = async (
  ideaId: string,
  updatedStatus: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/ideas/update-idea-status/${ideaId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: await getTokenFromCookies(),
        },
        body: JSON.stringify({ status: updatedStatus }),
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
