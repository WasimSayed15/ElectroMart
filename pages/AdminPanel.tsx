"use client";

import { useState } from "react";
import type { Order } from "@/utils/ordersStorage";
import {
  ArrowLeft,
  Package,
  User,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
} from "lucide-react";

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [orders] = useState<Order[]>(() => {
    if (typeof window !== "undefined") {
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      return savedOrders.reverse();
    }
    return [];
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Admin Panel
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage and view all customer orders
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2">
            <Package className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-xl font-bold text-foreground">
                {orders.length}
              </p>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              No orders yet
            </h3>
            <p className="text-muted-foreground">
              Orders will appear here when customers place them
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {orders.map((order) => (
              <div
                key={order.id}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="flex items-center justify-between border-b border-border bg-secondary/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                      #{String(order.id).slice(-4)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Order #{order.id}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                    {"₹"}
                    {order.total.toLocaleString()}
                  </span>
                </div>

                <div className="p-4">
                  <div className="mb-4 space-y-2 rounded-lg border border-border bg-secondary/50 p-3">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {order.customer.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {order.customer.phone}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <span className="text-foreground">
                        {order.customer.address}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                      Items Ordered
                    </p>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded-lg bg-secondary/50 p-2"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-md bg-secondary">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {item.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-foreground">
                            {"₹"}
                            {(
                              Number(item.price.replace(/[₹,]/g, "")) *
                              item.quantity
                            ).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
