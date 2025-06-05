import { cookies } from "next/headers";

export const getTokenFromCookies = async () => {
  const token = (await cookies()).get("accessToken")!.value;

  return token;
};
