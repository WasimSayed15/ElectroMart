"use client";

import { useState } from "react";
import type { Product } from "@/context/CartContext";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

const allProducts: Product[] = [
  {
    id: 1,
    name: "Smartphone",
    price: "₹25,000",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Laptop",
    price: "₹65,000",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Headphones",
    price: "₹3,000",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: "₹15,000",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Tablet",
    price: "₹35,000",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    price: "₹8,000",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
  },
];

interface ProductsProps {
  onProductClick: (product: Product) => void;
}

export default function Products({ onProductClick }: ProductsProps) {
  const [products, setProducts] = useState(allProducts);

  const handleSearch = (query: string) => {
    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filtered);
  };

  return (
    <section id="products" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover our selection of premium electronics
          </p>
        </div>

        <Filter onSearch={handleSearch} />

        {products.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No products found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
