"use client";
import { useHandleBasket } from "@/hooks/useBasket";
import { useProducts } from "@/hooks/useProducts";
import React from "react";
import toast from "react-hot-toast";

const BasketComponent = () => {
  const { basket } = useHandleBasket();
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
      toast.success(`Order submitted! Order ID: ${data.order}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit order. Please try again.");
    }
  };

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
      <button
        onClick={submitOrder}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit Order
      </button>
    </div>
  );
};

export default BasketComponent;
