import { getCookie } from "cookies-next/client";

const AUTH_API = process.env.NEXT_PUBLIC_AUTH_URL;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
export const authService = {
  // getSession: async () => {
  //   try {
  //     const cookieStore = await cookies();
  //     console.log("vjkhcjhhhjhvhcookieStore", cookieStore);
  //     console.log(
  //       "jhfjykufyuhfhjcookieStore.toString()",
  //       cookieStore.toString()
  //     );

  //     const res = await fetch(`${AUTH_API}/get-session`, {
  //       headers: {
  //         Cookie: cookieStore.toString(),
  //       },
  //       credentials: "include",
  //       cache: "no-store",
  //     });

  //     const session = await res.json();

  //     console.log("Session data in authService:", session);
  //     return session;
  //   } catch (e: any) {
  //     console.error("Failed to get session", e);
  //     throw new Error(e.message);
  //   }
  // },
  getServerSession: async () => {
    try {
      const sessionToken = getCookie("__Secure-better-auth.session_token");
      const result = await fetch(`${NEXT_PUBLIC_API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
        },
      });
      const data = await result.json();
      console.log(data);
      return data;
    } catch (e: any) {
      console.log(e.message);
    }
  },
  signIn: async (email: string, password: string) => {
    const data = await fetch(`${NEXT_PUBLIC_API_URL}/api/auth/sign-in/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
        callbackURL: `${window.location.origin}/`,
      }),
    });

    const result = await data.json();
    console.log('THIS IS THE LOGIN RESULT',result);
    return result;
  },
  signUp: async (email: string, password: string, name: string) => {
    const data = await fetch(`${NEXT_PUBLIC_API_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
        callbackURL: `${window.location.origin}/`,
      }),
    });
    const result = await data.json();
    return result;
  },
};
