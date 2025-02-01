export type Asset = {
  url: string;
  _ref: string;
  _type: string;
};
export type Image = {
  asset: Asset;
};

export type Category = {
  name: string;
  slug: { current: string };
  _id: string;
};

export type product = {
  name: string;
  _id: string;
  slug: { current: string };
  categories: Array<Category>;
  image: {
    asset: {
      url: string;
    };
  };
  publishedAt: string;
  total: number;
  _updatedAt: string;
  price: number;
  stock: number;
  description: string;
};
