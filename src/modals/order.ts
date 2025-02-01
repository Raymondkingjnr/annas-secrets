export type ProductReference = {
  _type: "reference";
  _ref: string;
};

export type ProductItem = {
  _key: string; // Add this line
  product: ProductReference;
  quantity: number;
};

export type Order = {
  _type: "order";
  _id: string;
  products: ProductItem[];
  totalPrice: number;
  status: "pending" | "Paid" | "Shipped" | "delivered" | "cancelled";
  OrderDate: string;
  customerName?: string;
  email?: string;
  phone?: string;
  address?: string;
};
