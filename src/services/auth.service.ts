import { cookies } from "next/headers";

const AUTH_API = process.env.AUTH_URL
export const authService = {
  getSession:async()=>{
    try{
        const cookieStore = await cookies()
        console.log('vjkhcjhhhjhvhcookieStore',cookieStore)
        console.log('jhfjykufyuhfhjcookieStore.toString()',cookieStore.toString())

  const res = await fetch(`${AUTH_API}/get-session`,{
    headers:{
      Cookie: cookieStore.toString()  
    },
    cache:"no-store"
  });
  

  const session = await res.json();
  
  console.log("Session data in authService:", session);
  return session;
    }catch(e:any){
        console.error("Failed to get session", e);
        throw new Error(e.message);
    }

  }
}