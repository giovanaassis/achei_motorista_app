import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/edit-profile", "/edit-account"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (
    !token &&
    protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/edit-profile"],
};
