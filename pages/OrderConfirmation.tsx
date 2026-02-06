"use client";

import { CheckCircle2, ArrowRight, Package } from "lucide-react";

interface OrderConfirmationProps {
  onContinue: () => void;
  onViewOrders: () => void;
}

export default function OrderConfirmation({
  onContinue,
  onViewOrders,
}: OrderConfirmationProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle2 className="h-10 w-10 text-accent" />
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
          Order Placed Successfully!
        </h1>

        <p className="mb-8 text-lg text-muted-foreground">
          Thank you for your order. Your items will be delivered soon. We will
          send you a confirmation email with tracking details.
        </p>

        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Package className="h-5 w-5" />
            <span>Expected delivery: 2-3 business days</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onContinue}
            className="group flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent py-3 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onViewOrders}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-transparent py-3 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}
