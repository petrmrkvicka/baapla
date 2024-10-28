import { delay } from "@/helpers/delay";
import { getRandomNumber } from "@/helpers/randomNumber";
import { NextResponse } from "next/server";
import { orders } from "../submit-order/route";

export const GET = async () => {
  // Update status
  const localOrders = orders.map((o) => {
    const submittedTime = o.submittedAt.getTime();
    const currentTime = new Date().getTime();

    const timeDiff = currentTime - submittedTime;
    const timeDiffInSeconds = timeDiff / 1000;

    if (timeDiffInSeconds < 5) {
      return { ...o, status: "submitted" };
    } else if (timeDiffInSeconds < 10) {
      return { ...o, status: "preparing" };
    } else if (timeDiffInSeconds < 15) {
      return { ...o, status: "collected" };
    } else {
      return { ...o, status: "delivered" };
    }
  });

  // Simulate server processing time
  await delay(getRandomNumber(0, 8000));

  return NextResponse.json({ orders: localOrders });
};
