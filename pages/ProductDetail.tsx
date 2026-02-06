"use client";

import { useContext } from "react";
import { CartContext, type Product } from "@/context/CartContext";
import { ArrowLeft, ShoppingBag, Shield, Truck, RefreshCw } from "lucide-react";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </button>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div>
              <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                In Stock
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-3xl font-bold text-accent">
                {product.price}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-lg leading-relaxed text-muted-foreground">
                High-quality {product.name} for your daily use. Experience
                premium technology with cutting-edge features designed for
                modern lifestyles. Add to your cart and enjoy the best prices!
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <Truck className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Free Delivery
                  </p>
                  <p className="text-xs text-muted-foreground">2-3 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Warranty</p>
                  <p className="text-xs text-muted-foreground">1 Year</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <RefreshCw className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Returns</p>
                  <p className="text-xs text-muted-foreground">7 Days</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => addToCart(product)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent py-4 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
