/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { getTokenFromCookies } from "../token/getToken";
type TUserData = {
  email: string;
  password: string;
};
export const loginUser = async (userData: TUserData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result.data.refreshToken);
    }
    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
export const logOutUser = async () => {
  try {
    const token = await getTokenFromCookies();
    if (!token) {
      throw new Error("You already have logged out");
    }
    (await cookies()).delete("accessToken");

    return { success: true, message: "Logged out successfully" };
  } catch {
    return { success: false, message: "Logged out failed" };
  }
};

export const getCurrentUserFromToken = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};
