"use client";
import { OrderType } from "@/types/order";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const OrderStatuses = () => {
  const [orders, setOrders] = React.useState<OrderType[]>([]);
  const statusVersion = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        statusVersion.current++;
        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch order status");
        }
        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch order status. Please try again.");
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-8 mb-4 w-full flex">
        Order Statuses{" "}
        <span className="ml-auto font-mono text-gray-500 text-sm">
          Version {statusVersion.current}
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {orders.length ? (
          orders.map((order) => <OrderComponent key={order.id} order={order} />)
        ) : (
          <p>No orders yet</p>
        )}
      </div>
    </div>
  );
};

export default OrderStatuses;

const OrderComponent = ({ order }: { order: OrderType }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-xl font-semibold">{order.id}</h3>
      <OrderStatusBadge status={order.status} />
    </div>
  );
};

const OrderStatusBadge = ({ status }: { status: OrderType["status"] }) => {
  const statusColorMap: {
    [key in OrderType["status"]]: string;
  } = {
    submitted: "blue",
    preparing: "yellow",
    collected: "green",
    delivered: "red",
  };
  return (
    <p className={`text-${statusColorMap[status]}-600`}>Status: {status}</p>
  );
};
