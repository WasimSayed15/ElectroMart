"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { parsePrice } from "@/utils/price";
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

interface CartProps {
  onBack: () => void;
  onCheckout: () => void;
}

export default function Cart({ onBack, onCheckout }: CartProps) {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Your Cart
          </h1>
          <p className="mt-2 text-muted-foreground">
            {cart.length === 0
              ? "Your cart is empty"
              : `${cart.length} item${cart.length > 1 ? "s" : ""} in your cart`}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Your cart is empty
            </h3>
            <p className="mb-6 text-muted-foreground">
              Add some products to get started
            </p>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4 sm:gap-6 sm:p-6"
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-secondary sm:h-32 sm:w-32">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-accent">{item.price}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary p-1">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="h-4 w-4" />
                          ) : (
                            <Minus className="h-4 w-4" />
                          )}
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground transition-colors hover:bg-accent/90"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-lg font-bold text-foreground">
                        {"₹"}
                        {(parsePrice(item.price) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">
                  {"₹"}
                  {totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border py-4">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-accent">Free</span>
              </div>
              <div className="flex items-center justify-between pt-4">
                <span className="text-lg font-semibold text-foreground">
                  Total
                </span>
                <span className="text-2xl font-bold text-foreground">
                  {"₹"}
                  {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full rounded-lg bg-accent py-4 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
