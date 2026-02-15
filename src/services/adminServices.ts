
import { Search } from 'lucide-react';
export const adminServices = {
    getAllUsers: async(params:{search?:string,role?:string,isActive?:string})=>{
        try {
            const query = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
              if (value) query.append(key, value);
            });

            const res = await fetch(`http://localhost:3000/admin/users?${query.toString()}`, {
              method: "GET",
              credentials: "include",
              cache:"no-store",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if(res.ok){
                const data = await res.json();
                return data;
            }else{
              console.log("Failed to fetch users", res.statusText);
                //throw new Error("Failed to fetch users");
            }
        } catch (error) {
            console.error(error);
            //throw error;
        }
    },
    getAllOrders:async(params:{page:number,limit:number})=>{
        try {
            const query = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
               if (value !== undefined && value !== null) {
                 query.append(key, String(value));
               }
            });

            console.log("Query parameters for orders:", query.toString());
            const res = await fetch(`http://localhost:3000/admin/orders?${query.toString()}`, {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if(res.ok){
                const data = await res.json();
                return data;
            }else{
                console.log("Failed to fetch orders", res.statusText);
              //  throw new Error("Failed to fetch orders");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    updateUserStatus:async(userId:string,status:string)=>{
        try {
            const res = await fetch(`http://localhost:3000/admin/users/${userId}`, {
              method: "PUT",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({status}),
            });
            if(res.ok){
                const data = await res.json();
                return data;
            }else{
                throw new Error("Failed to update user status");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}