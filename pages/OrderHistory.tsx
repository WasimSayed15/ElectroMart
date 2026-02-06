"use client";

import { useEffect, useState } from "react";
import { parsePrice } from "@/utils/price";
import type { Order } from "@/utils/ordersStorage";
import {
  ArrowLeft,
  Package,
  Calendar,
  Trash2,
  ShoppingBag,
} from "lucide-react";

interface OrderHistoryProps {
  onBack: () => void;
}

export default function OrderHistory({ onBack }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders([...saved].reverse());
  }, []);

  const clearOrders = () => {
    localStorage.removeItem("orders");
    setOrders([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Order History
          </h1>
          <p className="mt-2 text-muted-foreground">
            {orders.length === 0
              ? "No orders placed yet"
              : `${orders.length} order${orders.length > 1 ? "s" : ""} placed`}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              No orders yet
            </h3>
            <p className="mb-6 text-muted-foreground">
              Your order history will appear here
            </p>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="flex flex-col gap-4 border-b border-border bg-secondary/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                      <Package className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Order #{order.id}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                      Delivered
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-4 space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 overflow-hidden rounded-lg bg-secondary">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {item.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold text-foreground">
                          {"₹"}
                          {(
                            parsePrice(item.price) * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-xl font-bold text-foreground">
                      {"₹"}
                      {order.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearOrders}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive bg-transparent py-3 text-base font-semibold text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
              Clear Order History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
