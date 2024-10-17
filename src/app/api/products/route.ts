import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Pizza Margherita",
    category: "Pizza",
    image: "/pizza-margherita.jpg",
    price: 10,
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    category: "Pizza",
    image: "/pepperoni-pizza.jpg",
    price: 12,
  },
  {
    id: 3,
    name: "Vegetarian Pizza",
    category: "Pizza",
    image: "/vegetarian-pizza.jpg",
    price: 11,
  },
  {
    id: 4,
    name: "Cheeseburger",
    category: "Burgers",
    image: "/cheeseburger.jpg",
    price: 8,
  },
  {
    id: 5,
    name: "Veggie Burger",
    category: "Burgers",
    image: "/veggie-burger.jpg",
    price: 9,
  },
  {
    id: 6,
    name: "French Fries",
    category: "Sides",
    image: "/french-fries.jpg",
    price: 4,
  },
  {
    id: 7,
    name: "Onion Rings",
    category: "Sides",
    image: "/onion-rings.jpg",
    price: 5,
  },
  { id: 8, name: "Cola", category: "Drinks", image: "/cola.jpg", price: 2 },
  {
    id: 9,
    name: "Lemonade",
    category: "Drinks",
    image: "/lemonade.jpg",
    price: 2,
  },
];

export const GET = async (req: NextApiRequest) => {
  console.log("🚀 ~ req:", req);

  return NextResponse.json(products, {
    status: 200,
    statusText: "OK",
  });
};
