import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  privateRoutes
} from "./routes";

export default async function middlwware(request: NextRequest) {
  const { nextUrl } = request;
  const token = await getToken({ req: request });

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);


  if (token && isAuthRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (!token && isPrivateRoute) {
    return Response.redirect(
      new URL(`/auth/login?redirect_url=${nextUrl.pathname}`, nextUrl)
    );
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
