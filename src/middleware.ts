import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUserFromToken } from "./services/auth";

type Role = keyof typeof roleBasedPrivateRoutes;
const publicRoutes = ["/login", "/signUp"];

const roleBasedPrivateRoutes = {
  admin: [/^\/dashboard/],
};
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUserFromToken();

  if (!userInfo) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }
  if (pathname.startsWith("/profile")) {
    return NextResponse.next();
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/login", "/profile/:path*", "/dashboard/:page*"],
};
