"use server";
import { getTokenFromCookies } from "../token/getToken";

export const initPayment = async (
  ideaId: string,
  memberId: string | undefined
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_BACKEND_API}/payment/init/${ideaId}/${memberId}`,
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
