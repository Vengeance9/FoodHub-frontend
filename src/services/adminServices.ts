"use server";
import { cookies } from "next/headers";
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  export const getAllUsers= async (params: {
    search?: string;
    role?: string;
    isActive?: string;
  }) => {
    const store = await cookies();
    const token = store.get("token")?.value;
    try {
      const query = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value) query.append(key, value);
      });

      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/admin/users?${query.toString()}`,
        {
          method: "GET",
          //credentials: "include",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            Authorization: token!,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        console.log("Failed to fetch users", res.statusText);
        //throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.error(error);
      //throw error;
    }
  }
  export const getAllOrders=async (params: { page: number; limit: number }) => {
    const store = await cookies();
    const token = store.get("token")?.value;
    try {
      const query = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      console.log("Query parameters for orders:", query.toString());
      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/admin/orders?${query.toString()}`,
        {
          method: "GET",
          //credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: token!,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        console.log("Failed to fetch orders", res.statusText);
        //  throw new Error("Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  export const updateUserStatus= async (userId: string, status: string) => {
    const store = await cookies();
    const token = store.get("token")?.value;
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/admin/users/${userId}`, {
        method: "PUT",
       // credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Failed to update user status");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

