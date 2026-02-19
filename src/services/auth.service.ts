import { cookies } from "next/headers";

const AUTH_API = process.env.NEXT_PUBLIC_AUTH_URL;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
export const authService = {
  getSession: async () => {
    try {
      const cookieStore = await cookies();
      console.log("vjkhcjhhhjhvhcookieStore", cookieStore);
      console.log(
        "jhfjykufyuhfhjcookieStore.toString()",
        cookieStore.toString()
      );

      const res = await fetch(`${AUTH_API}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
      });

      const session = await res.json();

      console.log("Session data in authService:", session);
      return session;
    } catch (e: any) {
      console.error("Failed to get session", e);
      throw new Error(e.message);
    }
  },
  getServerSession:async()=>{
    try{
      const result = await fetch(`${NEXT_PUBLIC_API_URL}/auth/session`, {
        method:"GET",
        credentials:"include",
        //cache:"no-store",
        
      })
    
        const data = await result.json();
        return data;
      

    }catch(e:any){
      console.log(e.message);
    }
  }
};
