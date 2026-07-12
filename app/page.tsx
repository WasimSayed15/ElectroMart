"use client";

import { useState } from "react";
import { CartProvider, type Product } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Cart from "@/pages/Cart";
import ProductDetail from "@/components/ProductDetail";
import Checkout from "@/pages/Checkout";
import OrderHistory from "@/pages/OrderHistory";
import AdminPanel from "@/pages/AdminPanel";
import OrderConfirmation from "@/pages/OrderConfirmation";

function AppContent() {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const resetToHome = () => {
    setShowCart(false);
    setShowCheckout(false);
    setShowOrders(false);
    setShowAdmin(false);
    setShowConfirmation(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onCartClick={() => {
          setShowCart(true);
          setShowCheckout(false);
          setShowOrders(false);
          setShowAdmin(false);
          setShowConfirmation(false);
          setSelectedProduct(null);
        }}
        onOrdersClick={() => {
          setShowOrders(true);
          setShowCart(false);
          setShowCheckout(false);
          setShowAdmin(false);
          setShowConfirmation(false);
          setSelectedProduct(null);
        }}
        onAdminClick={() => {
          setShowAdmin(true);
          setShowCart(false);
          setShowCheckout(false);
          setShowOrders(false);
          setShowConfirmation(false);
          setSelectedProduct(null);
        }}
        onLogoClick={resetToHome}
      />

      {showConfirmation ? (
        <OrderConfirmation
          onContinue={() => {
            setShowConfirmation(false);
            setSelectedProduct(null);
          }}
          onViewOrders={() => {
            setShowConfirmation(false);
            setShowOrders(true);
          }}
        />
      ) : showAdmin ? (
        <AdminPanel onBack={() => setShowAdmin(false)} />
      ) : showOrders ? (
        <OrderHistory onBack={() => setShowOrders(false)} />
      ) : showCheckout ? (
        <Checkout
          onBack={() => {
            setShowCheckout(false);
            setShowCart(true);
          }}
          onOrderPlaced={() => {
            setShowCheckout(false);
            setShowConfirmation(true);
          }}
        />
      ) : showCart ? (
        <Cart
          onBack={() => setShowCart(false)}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
        />
      ) : selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <>
          <Hero />
          <Products onProductClick={setSelectedProduct} />
        </>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
