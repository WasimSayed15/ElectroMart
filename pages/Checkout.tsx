"use client";

import React from "react"

import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { parsePrice } from "@/utils/price";
import { saveOrder } from "@/utils/ordersStorage";
import { ArrowLeft, User, Phone, MapPin, CreditCard } from "lucide-react";

interface CheckoutProps {
  onBack: () => void;
  onOrderPlaced: () => void;
}

export default function Checkout({ onBack, onOrderPlaced }: CheckoutProps) {
  const { cart, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all details");
      return;
    }

    const order = {
      id: Date.now(),
      customer: form,
      items: cart,
      total: totalPrice,
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);
    clearCart();

    if (onOrderPlaced) onOrderPlaced();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Checkout
          </h1>
          <p className="mt-2 text-muted-foreground">
            Complete your order by filling in the details below
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                  1
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  Shipping Details
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Full Name
                  </label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Delivery Address
                  </label>
                  <textarea
                    name="address"
                    placeholder="Enter your full address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                  2
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  Payment Method
                </h2>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-accent bg-accent/10 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                  <CreditCard className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Cash on Delivery
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pay when your order arrives
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <h2 className="mb-6 text-lg font-semibold text-foreground">
                Order Summary
              </h2>

              <div className="mb-6 max-h-64 space-y-4 overflow-y-auto">
                {cart.map((item) => (
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
                      {(parsePrice(item.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    {"₹"}
                    {totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-accent">Free</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-lg font-semibold text-foreground">
                    Total
                  </span>
                  <span className="text-xl font-bold text-foreground">
                    {"₹"}
                    {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                className="mt-6 w-full rounded-lg bg-accent py-4 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
