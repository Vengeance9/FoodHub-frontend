export const reviewServices = {
    reviewProvider:async (providerId: string, rating?: number,comment?:string) => {
        try {
        console.log("Submitting review for provider:", providerId, "with rating:", rating, "and comment:", comment);
        const response = await fetch(
          `http://localhost:3000/review/provider/${providerId}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ rating, comment }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
            return{ok:false,message:data.message}
        }
        
        console.log(data)
        return data
        } catch (error) {
        console.error('Error submitting review:', error);
        throw error;
    }
},
getMyReviews:async(providerId:string)=>{
    try{
        const response = await fetch(`http://localhost:3000/review/my_reviews/${providerId}`,{
            method:"GET",
            credentials:'include',
            cache:"no-store"
        })
        if(!response.ok){
            throw new Error("Failed to fetch reviews")
        }
        const data = await response.json();
        console.log(data)
        return data
    }catch(e:any){
        console.error(e);
        throw new Error(e.message);
}
},
getAllReviews:async(providerId:string)=>{
    try{
        const response = await fetch(`http://localhost:3000/review/all_reviews/${providerId}`,{
            method:"GET",
            credentials:'include'
        })
        if(!response.ok){
            throw new Error("Failed to fetch reviews")
        }
        const data = await response.json();
        console.log(data)
        return data
    }catch(e:any){
        console.error(e);
        throw new Error(e.message);
}
}
}