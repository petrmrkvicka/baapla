import { delay } from "@/helpers/delay";
import { NextResponse } from "next/server";

export const POST = async () => {
  // Simulate server processing time
  await delay(1000);

  const orderId = Math.floor(Math.random() * 1000000);
  return NextResponse.json({ orderId });
};
