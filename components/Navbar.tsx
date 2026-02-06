"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { ShoppingCart, Package, Settings, Zap } from "lucide-react";

interface NavbarProps {
  onCartClick: () => void;
  onOrdersClick: () => void;
  onAdminClick: () => void;
  onLogoClick: () => void;
}

export default function Navbar({
  onCartClick,
  onOrdersClick,
  onAdminClick,
  onLogoClick,
}: NavbarProps) {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
            <Zap className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            ElectroMart
          </span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={onOrdersClick}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Orders</span>
          </button>

          <button
            onClick={onAdminClick}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
