import Basket from "@/components/Basket";
import { useState } from "react";

export const useHandleBasket = (): {
  basket: Basket;
  addToBasket: (productId: number) => void;
} => {
  const [basket, setBasket] = useState<{ [key: number]: number }>({});

  const addToBasket = (productId: number) => {
    setBasket((prevBasket) => ({
      ...prevBasket,
      [productId]: (prevBasket[productId] || 0) + 1,
    }));
  };

  return { basket, addToBasket };
};
