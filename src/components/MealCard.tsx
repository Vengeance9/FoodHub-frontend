"use client";
import { authClient } from "@/lib/auth";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { getUser } from "@/services/auth.service";
import { AddToCart } from "@/services/order.service";
import { useRouter } from "next/navigation";

export default function MealCard({ meal }: { meal: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getCurrentUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    getCurrentUser();
  }, []);
  const isAuthenticated = !!user;

  const handleAddToCart = async (quantity: number, mealId: string) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }

    setIsAdding(true);
    try {
      const response = await AddToCart(mealId, quantity);
      if (response.ok) {
        toast.success(response.message);
        setIsModalOpen(false);
        setQuantity(1);
      } else {
        toast.error(response.message);
      }
    } catch (e: any) {
      console.log(e.message);
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
      setTimeout(()=>{
        router.refresh()
      },2000)
    }
  };

  return (
    <>
      {/* Meal Card */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer hover:border-yellow-200"
      >
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={meal.image || "/placeholder-food.png"}
            alt={meal.meal.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors mb-2">
            {meal.meal.name}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {meal.meal.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-yellow-600">
              ৳{meal.price}
            </span>
            <button className="p-2 bg-yellow-400 rounded-full text-gray-900 hover:bg-yellow-500 transition-colors">
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Image */}
            <div className="relative h-72 w-full">
              <img
                src={meal.image || "/placeholder-food.png"}
                alt={meal.meal.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {meal.meal.name}
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {meal.meal.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-3xl font-bold text-yellow-600">
                  ৳{meal.price}
                </span>

                <div className="flex items-center gap-6">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>

                    <span className="text-xl font-semibold w-8 text-center">
                      {quantity}
                    </span>

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(quantity, meal.id)}
                    disabled={isAdding || !isAuthenticated}
                    className={`
                                            px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2
                                            ${
                                              isAdding || !isAuthenticated
                                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                : "bg-yellow-400 text-gray-900 hover:bg-yellow-500 active:scale-95"
                                            }
                                        `}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {isAdding ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              </div>

              {!isAuthenticated && (
                <p className="text-sm text-red-500 mt-4 text-center">
                  Please login to add items to cart
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
