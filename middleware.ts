import { clerkClient, clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = ["/", "/api/webhook/register", "/sign-up", "sign-in"];

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (userId && !publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (userId) {
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const role = user.publicMetadata.role as string | undefined;

      if (role === "admin" && req.nextUrl.pathname === "dashboard") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }

      if (publicRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(
          new URL(role === "admin" ? "/admin/dashboard" : "/dashboard", req.url)
        );
      }
    } catch (error) {
      console.log(error);
      return NextResponse.redirect(new URL("/error", req.url));
    }
  }
});

export const config = {
  publicRoutes,
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
