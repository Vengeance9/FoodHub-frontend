import { NextRequest, NextResponse } from "next/server";

import { UserRole } from "./constants/roles";
import { authService } from "./services/auth.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let role = null;

  const  data  = await authService.getSession();

  console.log("Session data in proxy:", data);

  if (data) {
    isAuthenticated = true;
    role = data.user.role;
  }

 
  if (!isAuthenticated) {
    if(pathname.startsWith("/admin") || pathname.startsWith("/ManageProvider") || pathname.startsWith("/checkOutOrder") || pathname.startsWith("/providerEdit") || pathname.startsWith("/providerProfile")){
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

 
  if (role === UserRole.admin) {

    if (
      pathname.startsWith("/ManageProvider") ||
      pathname.startsWith("/providerEdit") ||
      pathname.startsWith("/providerProfile")
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }


  if (role === UserRole.provider) {
    
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

 
  if (role === UserRole.customer) {
    
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

  
    if (
      pathname.startsWith("/ManageProvider") ||
      pathname.startsWith("/providerEdit") ||
      pathname.startsWith("/providerProfile")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
   

    "/admin",
    "/admin/:path*",

    "/ManageProvider",
    "/ManageProvider/:path*",

    "/providerEdit",
    "/providerEdit/:path*",

    "/providerProfile",
    "/providerProfile/:path*",
  ],
};
