"use client";

import React from "react"

import { useState } from "react";
import { Search } from "lucide-react";

interface FilterProps {
  onSearch: (query: string) => void;
}

export default function Filter({ onSearch }: FilterProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-8 flex justify-center">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleChange}
          className="w-full rounded-lg border border-border bg-secondary py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
    </div>
  );
}
