import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { PUBLIC_ROUTES,LOGIN,ROOT } from "./utils/routes(tapas)";


const {auth}= NextAuth(authConfig)

export async function middleware ( request){
  const {nextUrl}= request;
  console.log("middlewareeeeeeeeeeeeeee");
  let session = await auth();
  console.log("session",session);
  const isAuthenticated= !!session?.user;
  // return NextResponse.redirect(new URL ('/dashboard', request.url))

  let isPublicRoute= (PUBLIC_ROUTES.find(route=>nextUrl.pathname.startsWith(route))|| nextUrl.pathname==ROOT)

  console.log(isPublicRoute);

  if(!isAuthenticated && !isPublicRoute){
    return NextResponse.redirect(new URL(LOGIN, nextUrl))
  }
}

// export const config = {
//   matcher:"/myProfile/:path*"
// }

export const config = {
  matcher:["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
}