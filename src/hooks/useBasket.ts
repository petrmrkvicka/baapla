import { Basket } from "@/types/basket";
import { useState } from "react";

export const useHandleBasket = (): {
  basket: Basket;
  addToBasket: (productId: number) => void;
} => {
  const [basket, setBasket] = useState<{ [key: number]: number }>({});

  /**
   * Adds a product to the basket or increments its quantity if it already exists.
   * @param productId - The unique identifier of the product to add to the basket.
   */
  const addToBasket = (productId: number) => {
    setBasket((prevBasket) => ({
      ...prevBasket,
      [productId]: (prevBasket[productId] ?? 0) + 1,
    }));
  };

  return { basket, addToBasket };
};
