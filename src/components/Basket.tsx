"use client";
import { useHandleBasket } from "@/hooks/useBasket";
import { useProducts } from "@/hooks/useProducts";
import { Basket } from "@/types/basket";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export const BasketContext = React.createContext<{
  basket: Basket;
  setBasket: Dispatch<SetStateAction<Basket>>;
}>({
  basket: {},
  setBasket: () => {},
});

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
  const [basket, setBasket] = React.useState<Basket>({});

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

const BasketComponent = () => {
  const { basket, clearBasket } = useHandleBasket();
  const { products } = useProducts();

  const submitOrder = async () => {
    try {
      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(basket),
      });
      if (!response.ok) {
        throw new Error("Failed to submit order");
      }
      const data = await response.json();
      // Clear the basket after successfully submitting the order
      clearBasket();
      toast.success(`Order submitted! Order ID: ${data.orderId}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit order. Please try again.");
    }
  };

  const hasActiveBasket = Object.keys(basket).length > 0;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Your Basket</h2>
      {Object.entries(basket).map(([productId, quantity]) => {
        const product = products.find((p) => p.id === parseInt(productId));
        return product ? (
          <div
            key={productId}
            className="flex justify-between items-center mb-2"
          >
            <span>
              {product.name} x {quantity}
            </span>
            <span>${(product.price * quantity).toFixed(2)}</span>
          </div>
        ) : null;
      })}
      {hasActiveBasket && (
        <button
          onClick={submitOrder}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit Order
        </button>
      )}
    </div>
  );
};

export default BasketComponent;
