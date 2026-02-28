"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";


const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;


  export const register=async (providerData: FormData) => {
    const store = await cookies();
    const token = store.get("token")?.value

    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/provider/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: token!,
        },
        body: providerData,
      });

      const data = await response.json();      
      console.log("THIS IS THE DATA", data);
      return data;
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
  }
  export const getProviderById=async (id: string) => {
    const store = await cookies();
    const token = store.get("token")?.value;
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/meal/providers/${id}`,
        {
          next: { revalidate: 60 },
          headers: {
            Authorization: token!,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch provider details");
      }
      const data = await response.json();
      //  console.log('THIS IS THE DATA',data)
      return data.data;
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
  }

  export const getProviders=async () => {
    const store = await cookies();
    const token = store.get("token")?.value;
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/meal/providers`, {
        method: "GET",
        //credentials: "include",
        headers: {
          Authorization: token!,
        },
        next: { revalidate: 60 },
      });

      const data = await response.json();
      //console.log("THIS IS THE PROVIDERS DATA", data);
      return data;
    } catch (e: any) {
      console.error(e);
    }
  }
  export const getRestaurants=async (searchTerm: string) => {
    const store = await cookies();
    const token = store.get("token")?.value;
    try {
      const params = new URLSearchParams();
      if (searchTerm) {
        params.append("searchTerm", searchTerm);
      }
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/provider/my_providers?${params.toString()}`,
        {
          method: "GET",
        //  credentials: "include",
          headers: {
            Authorization: token!,
          },
          next: { revalidate: 60 },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch providers");
      }

      const data = await response.json();
      return data;
    } catch (e: any) {
      console.error(e);
     // throw new Error(e.message);
    }
  }
  export const updateProvider=async (providerId: string, providerData: FormData) => {
    const store = await cookies();
    const token = store.get("token")?.value;
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/provider/update_provider/${providerId}`,
        {
          method: "PUT",
          //credentials: "include",
          headers: {
            Authorization: token!,
          },
          body: providerData,
        }
      );
      console.log("THIS IS THE RESPONSE", response);
      if (!response.ok) {
        throw new Error("Failed to update provider");
      }
      const data = await response.json();
      return data;
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
  }
  export const CreateMeals=async (mealData: FormData, id: string) => {
    const store = await cookies();
    const token = store.get("token")?.value;
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/provider/meals/${id}`,
        {
          method: "POST",
          //credentials: "include",
          headers: {
            Authorization: token!,
          },
          body: mealData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create meal");
      }
      const data = await response.json();
      return data;
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
  }
  export const getProviderMeals=async (id: string) => {
    
    try {
      const store = await cookies();
      const token = store.get("token")?.value;
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/provider/providerMeals/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers:{
            Authorization: token!,
          },
          next: { revalidate: 10 },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }
      const data = await response.json();
      return data;
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
  }
  export const updateProviderMeal=async (mealData: FormData, mealId: string) => {
    const store = await cookies();
    const token = store.get("token")?.value;
    try {
      for (let pair of mealData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/provider/meals/${mealId}`,
        {
          method: "PUT",
         // credentials: "include",
          headers: {
            Authorization: token!,
          },

          body: mealData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update meal");
      }
      const data = await response.json();
      return data;
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
  }
  export const deleteMeal=async (mealId: string) => {
    const store = await cookies();
    const token = store.get("token")?.value;
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/provider/meals/${mealId}`,
        {
          method: "DELETE",
         // credentials: "include",
          headers: {
            Authorization: token!,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete meal");
      }
      const data = await response.json();
      return data;
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
  }
  export const getOrders=async (id: string) => {
    const store = await cookies();
    const token = store.get("token")?.value;
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/provider/provider_orders/${id}`,
      {
        method: "GET",
      //  credentials: "include",
        headers: {
          Authorization: token!,
        },
        next: { revalidate: 20 },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const data = await response.json();
    console.log("THIS IS THE ORDERS DATA", data);
    return data;
  }
  export const updateOrderStatus=async (orderId: string, newStatus: string) => {
    const store = await cookies();
    const token = store.get("token")?.value;
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/provider/updateOrderStatus/${orderId}`,
        {
          method: "PUT",
          //credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: token!,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      const data = await response.json();
      return data;
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
  }

