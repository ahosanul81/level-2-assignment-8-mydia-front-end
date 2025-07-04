/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTokenFromCookies } from "../token/getToken";

export const getAllPaymentCompleted = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_BACKEND_API}/payment/completed`,
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
