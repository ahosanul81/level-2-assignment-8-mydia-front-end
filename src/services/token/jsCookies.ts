"use client";
import Cookies from "js-cookie";

export const getTokenByJsCookies = (): string => {
  const token = Cookies.get("accessToken");
  if (!token) {
    throw new Error(" token not found in cookies.");
  }
  return token;
};
