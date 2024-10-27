"use client";
import { BasketContext } from "@/components/Basket";
import { Basket } from "@/types/basket";
import { useContext } from "react";

/**
 * Custom hook to manage a basket of products.
 *
 * @returns An object containing:
 * - `basket`: An object representing the current state of the basket, where keys are product IDs and values are quantities.
 * - `addToBasket`: A function to add a product to the basket or increment its quantity if it already exists.
 */
export const useHandleBasket = (): {
  basket: Basket;
  addToBasket: (productId: number) => void;
} => {
  const { basket, setBasket } = useContext(BasketContext);

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
