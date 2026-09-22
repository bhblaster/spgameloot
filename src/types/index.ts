export interface Game {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  salePrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  releaseDate: string;
  developer: string;
  publisher: string;
  genres: string[];
  platforms: string[];
  tags: string[];
  coverImage: string;
  heroImage: string;
  gallery: string[];
  features: string[];
  systemRequirements?: {
    minimum: string[];
    recommended: string[];
  };
  featured?: boolean;
  trending?: boolean;
  newRelease?: boolean;
  discount?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  icon: string;
}

export interface CartItem {
  game: Game;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  status: 'pending' | 'completed' | 'failed';
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  orderNumber?: string;
}

export interface SearchFilters {
  genre?: string;
  platform?: string;
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
}

export interface DeliveryResult {
  success: boolean;
  message: string;
  orderId?: string;
}
