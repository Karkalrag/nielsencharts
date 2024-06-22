interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string; // Assuming date is in ISO 8601 format
  reviewerName: string;
  reviewerEmail: string;
}

interface Meta {
  createdAt: string; // Assuming date is in ISO 8601 format
  updatedAt: string; // Assuming date is in ISO 8601 format
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export type ProductResponse = {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
};

export type PiechartData = {
  name: string;
  y: number;
};

export type Category = {
  slug: string;
  name: string;
  url: string;
};
