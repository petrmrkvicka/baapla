import { orders } from "@/db/orders";
import { delay } from "@/helpers/delay";
import { NextRequest, NextResponse } from "next/server";
import Crypto from "node:crypto";

export const POST = async (req: NextRequest) => {
  const submittedBasket = await req.json();
  const orderId = Crypto.randomUUID();

  orders.push({
    basket: submittedBasket,
    status: "submitted",
    id: orderId,
    submittedAt: new Date(),
  });

  // Simulate server processing time
  await delay(1000);

  return NextResponse.json({ orderId });
};
