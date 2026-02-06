"use client";

import { useContext } from "react";
import { CartContext, type Product } from "@/context/CartContext";
import { Plus, Minus, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export default function ProductCard({
  product,
  onProductClick,
}: ProductCardProps) {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
      <div
        className="relative aspect-square cursor-pointer overflow-hidden bg-secondary"
        onClick={() => onProductClick(product)}
      >
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="p-4">
        <h3
          className="cursor-pointer text-lg font-semibold text-foreground transition-colors hover:text-accent"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>
        <p className="mt-1 text-xl font-bold text-accent">{product.price}</p>

        <div className="mt-4">
          {quantity === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between rounded-lg border border-border bg-secondary p-1">
              <button
                onClick={() => removeFromCart(product.id)}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-card text-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[2rem] text-center text-sm font-semibold text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => addToCart(product)}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground transition-colors hover:bg-accent/90"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
