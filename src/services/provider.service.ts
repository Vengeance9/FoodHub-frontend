import { get } from "http";
import { register } from "module";
const API_URL = process.env.API_URL;

export const providerServices:any = {

  register:async(providerData:FormData)=>{
        try {
          const response = await fetch(`${API_URL}/provider/register`,{
            method:"POST",
            credentials:'include',
            body:providerData,
          });
          
          const data = await response.json();
          console.log('THIS IS THE DATA',data)
          return data;
        } catch (e: any) {
          console.error(e);
          throw new Error(e.message);
        }
  },
    getProviderById:async(id:string)=>{
        try {
          const response = await fetch(`${API_URL}/meal/providers/${id}`,{
            next: { revalidate: 60 },
          });
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
    },

    getProviders:async()=>{
        try{
            const response = await fetch(`${API_URL}/meal/providers`,{
                method:"GET",
                credentials:'include',
                next: { revalidate: 60 },

            });
            
            const data = await response.json();
            console.log('THIS IS THE PROVIDERS DATA',data)
            return data

        }catch(e:any){
            console.error(e);
            
        }
    },
    getRestaurants:async(searchTerm:string)=>{
      try{
         const params = new URLSearchParams();
         if (searchTerm) {
           params.append("searchTerm", searchTerm);
         }
          const response = await fetch(
            `${API_URL}/provider/my_providers?${params.toString()}`,
            {
              method: "GET",
              credentials: "include",
              cache: "no-store",
            }
          );
          if(!response.ok){
            throw new Error("Failed to fetch providers")
        }

        const data = await response.json();
        return data
      }catch(e:any){
          console.error(e);
          throw new Error(e.message)
      }
    },
    updateProvider:async(providerId:string, providerData:FormData)=>{
      try{
        const response = await fetch(`${API_URL}/provider/update_provider/${providerId}`,{
          method:"PUT",
          credentials:'include',
          body:providerData
        })
        console.log('THIS IS THE RESPONSE',response)
        if(!response.ok){
          throw new Error("Failed to update provider")
        }
        const data = await response.json();
        return data
      }catch(e:any){
        console.error(e);
        throw new Error(e.message)
      }
    },
    CreateMeals:async(mealData:FormData,id:string)=>{
      try{
        const response = await fetch(`${API_URL}/provider/meals/${id}`,{
          method:"POST",
          credentials:'include',
          body:mealData
        })
        if(!response.ok){
          throw new Error("Failed to create meal")
        }
        const data = await response.json();
        return data
      }catch(e:any){
        console.error(e);
        throw new Error(e.message)
      }
    },
    getProviderMeals:async(id:string)=>{
      try{
        const response = await fetch(`${API_URL}/provider/providerMeals/${id}`,{
          method:"GET",
          credentials:'include',
          next:{revalidate:150}
        })
        if(!response.ok){
          throw new Error("Failed to fetch meals")
        }
        const data = await response.json();
        return data
      }catch(e:any){
        console.error(e);
        throw new Error(e.message)
      }
    },
    updateProviderMeal:async(mealData:FormData,mealId:string)=>{
      try{
        for (let pair of mealData.entries()) {
          console.log(pair[0], pair[1]);
        }
        const response = await fetch(`${API_URL}/provider/meals/${mealId}`,{
          method:"PUT",
          credentials:'include',
          body:mealData
        })
        if(!response.ok){
          throw new Error("Failed to update meal")
        }
        const data = await response.json();
        return data
      }catch(e:any){
        console.error(e);
        throw new Error(e.message)
      }
    },
    deleteMeal:async(mealId:string)=>{
      try{
        const response = await fetch(`${API_URL}/provider/meals/${mealId}`,{
          method:"DELETE",
          credentials:'include',
        })
        if(!response.ok){
          throw new Error("Failed to delete meal")
        }
        const data = await response.json();
        return data
      }catch(e:any){
        console.error(e);
        throw new Error(e.message)
      }
    },
    getOrders:async(id:string)=>{
      const response = await fetch(
        `${API_URL}/provider/provider_orders/${id}`,{
          method:"GET",
          credentials:'include'
        }
      );
      if(!response.ok){
        throw new Error("Failed to fetch orders")
      }
      const data = await response.json();
      console.log('THIS IS THE ORDERS DATA',data)
      return data
    },
    updateOrderStatus:async(orderId:string, newStatus:string)=>{
      try{
        const response = await fetch(`${API_URL}/provider/updateOrderStatus/${orderId}`,{
          method:"PUT",
          credentials:'include',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({status:newStatus})
        })
        if(!response.ok){
          throw new Error("Failed to update order status")
        }
        const data = await response.json();
        return data
      }catch(e:any){
        console.error(e);
        throw new Error(e.message)
      }
    }

}