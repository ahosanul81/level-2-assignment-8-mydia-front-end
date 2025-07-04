"use server";

import { getTokenFromCookies } from "../token/getToken";

export const ideaCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_BACKEND_API}/categories`,
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
