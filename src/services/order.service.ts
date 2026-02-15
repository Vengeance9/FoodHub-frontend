export const orderService = {
    AddToCart:async function(providerMealId:string,quantity:number){
            try {
            const response = await fetch(`http://localhost:3000/order/add_to_cart/${providerMealId}`,{
                method:"POST",
                credentials:'include',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    quantity:quantity
                })
            });
            if (!response.ok) {
                console.log("Failed to add to cart", response.statusText);
                throw new Error("Failed to add to cart");
            }
            const data = await response.json();
            console.log(data.message);
            return data;
            } catch (e: any) {
            console.error(e);
            //throw new Error(e.message);
            }
    },

    GetCart:async function(){
        try{
            const response = await fetch(`http://localhost:3000/order/cart`, {
              method: "GET",
              credentials:'include',
                cache: "no-store"
            });
            // if(!response.ok){
            //     console.log('Failed to get cart')
            //     throw new Error('Failed to get cart')
            // }
            const data = await response.json()
            console.log(data.message)
            return data

        }catch(e:any){
            console.error(e);
            //throw new Error(e.message);
        }
    },
    ClearCart:async function(){
        const response = await fetch(`http://localhost:3000/order/clear_cart`,{
            method:'DELETE',
            credentials:'include'
        })
        if(!response.ok){
            console.log('Failed to clear cart')
        }
        return response.json()
    },
    checkOutOrder:async function(deliveryAddress:string,contact:string){
        const response = await fetch(`http://localhost:3000/order/checkout`,{
            method:'POST',
            credentials:'include',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({deliveryAddress,contact})
        })
        if(!response.ok){
            console.log('Failed to checkout order')
        }
        return response.json()
    }
}