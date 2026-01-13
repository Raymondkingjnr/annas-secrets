interface Asset {
  _ref: string;
  _type: string;
}

interface Image {
  _type: string;
  asset: Asset;
}

interface Slug {
  _type: string;
  current: string;
}

interface CategoryRef {
  _key: string;
  _ref: string;
  _type: string;
}

interface IProduct {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  categories: CategoryRef[];
  description: string;
  image: Image;
  name: string;
  price: number;
  slug: Slug;
  stock: number | null;
  topSales: boolean;
}

interface ProductItem {
  _key: string;
  product: IProduct;
  quantity: number;
}

interface IOrderHistory {
  OrderDate: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  address: string;
  clerkUserId: string;
  customerName: string;
  email: string;
  orderNumber: string;
  phone: string;
  products: ProductItem[];
  status: string;
  totalPrice: number;
}
