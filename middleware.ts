import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = ["/sign-in", "/sign-up", "/", "blogpost"];
  const isPublicPath = publicPaths.includes(path);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/sign-in", "/sign-up", "/blogpost"],
};
