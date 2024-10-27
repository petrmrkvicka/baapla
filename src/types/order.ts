import { Basket } from "./basket";

export type OrderType = {
  basket: Basket;
  status: "submitted" | "preparing" | "collected";
  id: string;
  submittedAt: Date;
};
