import { orders } from "@/db/orders";
import { delay } from "@/helpers/delay";
import { getRandomNumber } from "@/helpers/randomNumber";
import { NextResponse } from "next/server";

export const GET = async () => {
  // Update status
  const localOrders = orders
    .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())
    .map((o) => {
      const submittedTime = o.submittedAt.getTime();
      const currentTime = new Date().getTime();

      const updatedOrder = {
        ...o,
        submittedAt: o.submittedAt.toLocaleString(),
      };

      const timeDiff = currentTime - submittedTime;
      const timeDiffInSeconds = timeDiff / 1000;

      if (timeDiffInSeconds < 10) {
        return { ...updatedOrder, status: "submitted" };
      } else if (timeDiffInSeconds < 20) {
        return { ...updatedOrder, status: "preparing" };
      } else if (timeDiffInSeconds < 30) {
        return { ...updatedOrder, status: "collected" };
      } else {
        return { ...updatedOrder, status: "delivered" };
      }
    });

  // Simulate server processing time
  await delay(getRandomNumber(0, 8000));

  return NextResponse.json({ orders: localOrders });
};
