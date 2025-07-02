"use server";

import { cookies } from "next/headers";
import { getTokenFromCookies } from "../token/getToken";
type TCreateMemberPayload = {
  email: string;
  name: string;
  contactNumber: string;
  address: string;
  password: string;
  files: File[];
};

export const createMember = async (payload: TCreateMemberPayload) => {
  const { files, password, ...rest } = payload;
  const formData = new FormData();
  const data = {
    password,
    userData: { ...rest },
  };
  formData.append("data", JSON.stringify(data));
  files?.forEach((file) => {
    formData.append("files", file);
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/users/create-member`,
    {
      method: "POST",
      body: formData,
    }
  );
  const result = await res.json();
  if (result.success) {
    (await cookies()).set("accessToken", result.data.accessToken);
  }
  return result;
};
export const userFromDB = async (userData: { email: string; role: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/users/me/${userData.email}`,
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
};
// for dashboard user table
export const getAllUser = async (queries: Record<string, string | null>) => {
  const cleanedQueries: Record<string, string> = Object.fromEntries(
    Object.entries(queries).filter(
      ([, v]) =>
        v !== null && v !== undefined && v !== "null" && v !== "undefined"
    )
  ) as Record<string, string>;
  const query = new URLSearchParams(cleanedQueries).toString() || "";
  // console.log(`${process.env.NEXT_PUBLIC_BASE_API}/users?${query}`);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/users?${query}`,
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
};
export const updateUserStatus = async (
  userId: string,
  payload: { status: string | undefined }
) => {
  console.log(payload);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/users/update/user-status/${userId}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: await getTokenFromCookies(),
      },
      body: JSON.stringify(payload),
    }
  );
  const result = await res.json();
  return result;
};

export const getMe = async (email: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/users/me/${email}`,
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
};
