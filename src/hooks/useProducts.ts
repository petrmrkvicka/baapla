"use client";
import { Product } from "@/app/api/products/route";
import { useState } from "react";
import toast from "react-hot-toast";

export const useProducts = (): { products: Product[] } => {
  const [products, setProducts] = useState<Product[]>([]);

  fetch("/api/products")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    })
    .then((data) => setProducts(data))
    .catch((err) => {
      console.error(err);
      toast.error("Failed to fetch products. Please try again.");
    });

  return { products };
};
