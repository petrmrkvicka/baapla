"use client";
import { useState, useEffect, useCallback } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
}

export default function Component() {
  const [products, setProducts] = useState<Product[]>([]);
  const [basket, setBasket] = useState<{ [key: number]: number }>({});
  const [orderId, setOrderId] = useState<number | null>(null);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  fetch("/api/products")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    })
    .then((data) => setProducts(data))
    .catch((err) => setError(err.message));

  const addToBasket = useCallback((productId: number) => {
    setBasket((prevBasket) => ({
      ...prevBasket,
      [productId]: (prevBasket[productId] || 0) + 1,
    }));
  }, []);

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
      setOrderId(data.orderId);
    } catch (err) {
      console.error(err);
      setError("Failed to submit order. Please try again.");
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (orderId) {
      intervalId = setInterval(async () => {
        try {
          const response = await fetch(`/api/order-status/${orderId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch order status");
          }
          const data = await response.json();
          setOrderStatus(data.status);
          if (data.status === "collected") {
            clearInterval(intervalId);
          }
        } catch (err) {
          console.error(err);
          setError("Failed to fetch order status. Please refresh the page.");
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [orderId]);

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as { [key: string]: Product[] });

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">BAAApla Food Ordering</h1>

      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <div key={category}>
          <h2 className="text-2xl font-semibold mt-8 mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryProducts.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg">
                <div className="relative w-full h-48 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToBasket(product.id)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add to Basket
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

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

      {orderId && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Order Status</h2>
          <p>Order ID: {orderId}</p>
          <p>Status: {orderStatus}</p>
        </div>
      )}
    </div>
  );
}
