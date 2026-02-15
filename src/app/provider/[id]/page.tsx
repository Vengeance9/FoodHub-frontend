import MealSection from "@/components/mealSection";
import ReviewSection from "@/components/ReviewSection";
import { providerServices } from "@/services/provider.service";
import React from "react";
import { MapPin, Clock, Star as StarIcon } from "lucide-react";



export default async function Provider({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  const data = await providerServices.getProviderById(id);
  const rating = data.averageRating;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <img
          src={data.image}
          alt={data.restaurantName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Provider Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {data.restaurantName}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              {/* Rating */}
              <div className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full">
                <StarIcon className="h-5 w-5 fill-gray-900" />
                <span className="font-semibold">
                  {rating ? rating.toFixed(1) : "New"}
                </span>
              </div>

              {/* Status */}
              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  data.isOpen
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {data.isOpen ? "Open Now" : "Closed"}
              </span>

              {/* Address */}
              <span className="flex items-center gap-2 text-white/90">
                <MapPin className="h-5 w-5" />
                {data.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
          <p className="text-gray-600 leading-relaxed">
            {data.description ||
              "Experience delicious meals at this restaurant."}
          </p>

          {/* Cuisine Tags */}
          {data.cuisineType && data.cuisineType.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {data.cuisineType.map((cuisine: string) => (
                <span
                  key={cuisine}
                  className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Meals Section */}
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <MealSection id={id} cuisineType={data.cuisineType} />
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <ReviewSection id={id} />
      </div>
    </div>
  );
}
