'use client'

import OrderInfo from "@/components/OrderInfo";
import { orderService } from "@/services/order.service";
import { useEffect, useState } from "react";

type CartItem = {
  providerMeal: {
    meal: {
      name: string;
      description: string;
    };
    provider: {
      restaurantName: string;
    };
    price: number;
  };
  quantity: number;
};

export default function CheckOut() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await orderService.GetCart();

      if (cart?.data?.cart?.items) {
        setItems(cart.data.cart.items);
        setTotalAmount(cart.data.totalAmount);
        setId(cart.data.cart.id);
      }
      console.log(id);
    };

    fetchCart();
  }, []);

  console.log(id);
  return (
    <div className="flex justify-between">
        <div className="w-1/2 ml-20">
            <OrderInfo/>
        </div>
      {items.length > 0 && <div className="border border-gray-600 rounded-b-lg  pl-2 pb-5 mr-10">
        {items.map((item, index) => (
          <div key={index} className="border-b flex gap-8 justify-between">
            <div className=" pb-3 mb-3">
              <h3 className="font-medium">{item.providerMeal.meal.name}</h3>

              <p className="text-sm text-gray-900 font-medium">
                From:
                {item.providerMeal.provider.restaurantName}
              </p>

              <p className="text-sm  font-medium">
                Price: {item.providerMeal.price} ৳
              </p>

              <p className="text-sm font-medium">Quantity: {item.quantity}</p>

              <p className="text-sm font-bold text-green-800">
                Subtotal: {item.providerMeal.price * item.quantity} ৳
              </p>
            </div>
            <div>
              <img src={item.providerMeal.image} className="w-25 rounded-bl-xl" alt="" />
            </div>
          </div>
        ))}

        {items.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold">Total: {totalAmount} ৳</p>
          </div>
        )}
      </div>}
    </div>
  );
}
