"use server"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers";

const AUTH_API = process.env.NEXT_PUBLIC_AUTH_URL;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  
  export const loginUser= async (userData:any) => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    const storeCookie = await cookies();
    if (result.success) {
      console.log('THIS IS THE RESULT in login',result)
      storeCookie.set("token", result?.data?.token);
    }
    return result;
  } catch (error) {
    console.log('THIS IS THE ERROR in login',error);
  }
}

    
  export const signUp = async (email: string, password: string, name: string) => {
    const data = await fetch(`${NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    const result = await data.json();
    const storeCookie = await cookies();
    if (result.success) {
      storeCookie.set("token", result?.data?.token);
    }

    return result;
  }

  export const getUser=async()=>{
    try {
      const storeCookie = await cookies();
      const token = storeCookie.get("token")?.value;
      if (!token) {
        return null;
      }
      const decodedToken:any = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.log("Error decoding token:", error);
      return null;
    }
  }

  export const getMe = async()=>{
     const storeCookie = await cookies();
     const token = storeCookie.get("token")?.value;
    try {
     
      if (!token) {
        return null;
      }
      
      const user = await fetch(
        `${NEXT_PUBLIC_API_URL}/auth/me`,
        {
          method: "GET",
          headers: {
            Authorization: token!,
          },
        }
      );
      const data = await user.json();
      console.log("THIS IS THE USER in getMe", data);
      return data
      
    
    }catch(e){
        console.log(e)
      }
  }

  export const UserLogOut = async () => {
    const storeCookie = await cookies();
    storeCookie.delete("token");
  };

  
