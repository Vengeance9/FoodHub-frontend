

export const categoryService = {
    getCategories:async function(){
        try {
          const response = await fetch("http://localhost:3000/categories");
          if (!response.ok) {
            throw new Error("Failed to fetch categories");
          }
          const data = await response.json();
          return data.categories;
        } catch (e: any) {
          console.error(e);
         // throw new Error(e.message);
        }
    },

    getCategoryProviders:async function(name:string){
        try {
          const response = await fetch(`http://localhost:3000/categories/providers/${name}`);
          if (!response.ok) {
            throw new Error("Failed to fetch category Providers");
          }
          const data = await response.json();
          return data;
        } catch (e: any) {
          console.error(e);
         // throw new Error(e.message);
        }
    },

    getCategoryMeals:async function(category:string,providerId:string){
        try {
          const response = await fetch(`http://localhost:3000/categories/providers/${category}/${providerId}/meals`);
          if (!response.ok) {
            throw new Error("Failed to fetch category meals");
          }
          const data = await response.json();
          return data;
        } catch (e: any) {
          console.error(e);
          //throw new Error(e.message);
        }
    },
    
  getMeals: async (params: {
    search?: string;
    category?: string;
    ratings?: string;
    isAvailable?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
    limit?: string;
  }) => {
    const query = new URLSearchParams();

    console.log("Params in getMeals:", params.search);

    Object.entries(params).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    const res = await fetch(`http://localhost:3000/meal?${query.toString()}`,{
      cache:'no-store',
    }
  
  );

    // if (!res.ok) {
    //   console.log(res.json())
    //   throw new Error("Failed to fetch meals");
    // }
    const data = await res.json()
    console.log('data from category service',data)
    return data
  },

}

