import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const statuses = ["received", "in progress", "ready", "collected"];

export const GET = (req: NextApiRequest) => {
  console.log("🚀 ~ GET ~ req:", req);
  const { orderId } = req.query;

  // Simulate changing status over time
  const statusIndex = Math.floor(Math.random() * statuses.length);
  const status = statuses[statusIndex];

  return NextResponse.json({ orderId, status });
};
