export interface OrderItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export interface Order {
  id: number;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: OrderItem[];
  total: number;
  createdAt: string;
}

export function saveOrder(order: Order): void {
  const existing = JSON.parse(localStorage.getItem("orders") || "[]");
  existing.push(order);
  localStorage.setItem("orders", JSON.stringify(existing));
}

export function getOrders(): Order[] {
  return JSON.parse(localStorage.getItem("orders") || "[]");
}

export function clearOrders(): void {
  localStorage.removeItem("orders");
}
