import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

export function middleware(request:NextRequest) {
    const path = request.nextUrl.pathname.slice(3);
    return createMiddleware(routing)(request);
}
export const config = {
    matcher: ["/", "/(en|ar|fr)/:path*"],
  };
  