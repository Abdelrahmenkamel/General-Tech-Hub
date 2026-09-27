export type Language = 'ar' | 'en';

export type CategoryId = 
  | 'smartphones'
  | 'laptops'
  | 'monitors'
  | 'audio'
  | 'smartwatches'
  | 'gaming'
  | 'chargers'
  | 'ai-devices'
  | 'security'
  | 'smart-home'
  | 'deals';

export interface Category {
  id: CategoryId;
  nameAr: string;
  nameEn: string;
  iconName: string;
  count: number;
  descriptionAr: string;
}

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  brand: string;
  categoryId: CategoryId;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  gallery?: string[];
  descriptionAr: string;
  descriptionEn: string;
  specs: Record<string, string>;
  colors: { nameAr: string; nameEn: string; hex: string }[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  hasAi?: boolean;
  sellerId: string;
  sellerName: string;
  condition: 'new' | 'open_box' | 'refurbished';
  warranty: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type OrderStatus = 'received' | 'processing' | 'shipped' | 'in_transit' | 'delivered';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  customer: OrderCustomer;
  items: CartItem[];
  paymentMethod: 'cod' | 'card' | 'wallet';
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  estimatedDelivery: string;
  trackingUpdates: {
    status: OrderStatus;
    titleAr: string;
    descriptionAr: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface Seller {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  phone: string;
  rating: number;
  totalSales: number;
  revenue: number;
  activeProductsCount: number;
  joinedDate: string;
  verified: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  commentAr: string;
  date: string;
  verifiedPurchase: boolean;
}

export type ActiveView = 
  | 'home'
  | 'catalog'
  | 'product-details'
  | 'cart'
  | 'checkout'
  | 'order-tracking'
  | 'order-confirmed'
  | 'seller-dashboard'
  | 'admin-dashboard'
  | 'wishlist'
  | 'account';
