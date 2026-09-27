import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Category, 
  CartItem, 
  Order, 
  Seller, 
  ActiveView, 
  CategoryId, 
  Language, 
  OrderStatus 
} from '../types';
import { 
  CATEGORIES, 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_SELLER 
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface FilterState {
  category: CategoryId | 'all';
  searchQuery: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  hasAiOnly: boolean;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
}

interface MarketplaceContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: string;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  openProductDetails: (productId: string) => void;
  
  // Data
  categories: Category[];
  products: Product[];
  orders: Order[];
  seller: Seller;
  
  // Filters & Search
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  filteredProducts: Product[];
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  buyNow: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  couponApplied: boolean;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Orders
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'trackingUpdates'>) => Order;
  lookupOrder: (query: string) => Order | undefined;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // Seller actions
  addProduct: (newProduct: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => void;
  deleteProduct: (productId: string) => void;
  updateSellerProfile: (updated: Partial<Seller>) => void;
  
  // Toast notifications
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'gth_cart_v1',
  WISHLIST: 'gth_wishlist_v1',
  PRODUCTS: 'gth_products_v1',
  ORDERS: 'gth_orders_v1',
  LANG: 'gth_lang_v1',
  SELLER: 'gth_seller_v1'
};

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANG);
      return (saved === 'en' ? 'en' : 'ar');
    } catch {
      return 'ar';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    } catch (e) {
      console.error(e);
    }
  };

  const currency = language === 'ar' ? 'ر.س' : 'SAR';

  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from local storage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading orders from local storage:', e);
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Seller state
  const [seller, setSeller] = useState<Seller>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SELLER);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SELLER;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SELLER, JSON.stringify(seller));
    } catch (e) {
      console.error(e);
    }
  }, [seller]);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading cart:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return ['prod-phone-titanium', 'prod-headphones-hifi'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    searchQuery: '',
    brand: 'all',
    minPrice: 0,
    maxPrice: 15000,
    inStockOnly: false,
    hasAiOnly: false,
    sortBy: 'featured'
  });

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      searchQuery: '',
      brand: 'all',
      minPrice: 0,
      maxPrice: 15000,
      inStockOnly: false,
      hasAiOnly: false,
      sortBy: 'featured'
    });
  };

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'TECH10' || normalized === 'HUB10' || normalized === 'WELCOME2026') {
      setCouponApplied(true);
      setCouponCode(normalized);
      showToast(
        language === 'ar' ? 'تم تطبيق كود الخصم بنجاح!' : 'Coupon applied successfully!',
        language === 'ar' ? 'حصلت على خصم 10% إضافي على إجمالي المشتريات' : '10% discount has been applied',
        'success'
      );
      return true;
    } else {
      showToast(
        language === 'ar' ? 'كود الخصم غير صالح' : 'Invalid coupon code',
        language === 'ar' ? 'يرجى تجربة كود "TECH10" للحصول على خصم 10%' : 'Try code "TECH10" for 10% off',
        'warning'
      );
      return false;
    }
  };

  // Cart calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartDiscount = couponApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const cartShipping = cartSubtotal > 500 || cartSubtotal === 0 ? 0 : 35;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const color = selectedColor || product.colors[0]?.nameAr || 'الافتراضي';
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });

    showToast(
      language === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to Cart',
      language === 'ar' ? `${product.nameAr} (${quantity})` : `${product.nameEn} (${quantity})`,
      'success'
    );
  };

  const buyNow = (product: Product, quantity = 1, selectedColor?: string) => {
    addToCart(product, quantity, selectedColor);
    setActiveView('checkout');
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor))));
    showToast(language === 'ar' ? 'تم حذف المنتج من السلة' : 'Item removed from cart', '', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor)) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    if (exists) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast(language === 'ar' ? 'تمت الإزالة من المفضلة' : 'Removed from Wishlist', '', 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast(language === 'ar' ? 'تمت الإضافة إلى المفضلة' : 'Added to Wishlist', '', 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Active tracking order
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(orders[0] || null);

  const lookupOrder = (query: string): Order | undefined => {
    const clean = query.trim().toLowerCase();
    if (!clean) return undefined;
    return orders.find(o => 
      o.orderNumber.toLowerCase() === clean || 
      o.customer.phone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, ''))
    );
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'trackingUpdates'>): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `GTH-${randomSuffix}`;
    const now = new Date().toISOString();
    
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      orderNumber,
      createdAt: now,
      status: 'received',
      trackingUpdates: [
        {
          status: 'received',
          titleAr: 'تم استلام وتأكيد الطلب',
          descriptionAr: 'شكراً لطلبك من General Tech Hub Pro. طلبك قيد المراجعة والاعتماد',
          timestamp: 'الآن',
          completed: true
        },
        {
          status: 'processing',
          titleAr: 'جاري التجهيز وفحص الجودة بالمستودع',
          descriptionAr: 'تجهيز الأجهزة ومطابقة الأرقام التسلسلية والتغليف الواقي',
          timestamp: 'خلال الساعات القادمة',
          completed: false
        },
        {
          status: 'shipped',
          titleAr: 'تسليم الشحنة لشركة الشحن',
          descriptionAr: 'إصدار بوليصة التتبع والتسليم لمندوب الشحن السريع',
          timestamp: 'متوقع غداً',
          completed: false
        },
        {
          status: 'in_transit',
          titleAr: 'الشحنة في الطريق للعميل',
          descriptionAr: 'المندوب يتحرك لتوصيل الشحنة للعنوان المحدد',
          timestamp: 'خلال 24-48 ساعة',
          completed: false
        },
        {
          status: 'delivered',
          titleAr: 'تم التسليم بنجاح',
          descriptionAr: 'تسليم الشحنة وتوقيع إيصال الاستلام',
          timestamp: 'قريباً',
          completed: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    clearCart();
    
    // Update seller metrics
    setSeller(prev => ({
      ...prev,
      totalSales: prev.totalSales + 1,
      revenue: prev.revenue + newOrder.total
    }));

    showToast(
      language === 'ar' ? 'تم تسجيل طلبك بنجاح!' : 'Order Placed Successfully!',
      language === 'ar' ? `رقم تتبع الطلب الخاص بك: ${orderNumber}` : `Tracking ID: ${orderNumber}`,
      'success'
    );

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const statusMap: Record<OrderStatus, number> = {
          received: 0,
          processing: 1,
          shipped: 2,
          in_transit: 3,
          delivered: 4
        };
        const activeLevel = statusMap[status];

        const updatedTracking = order.trackingUpdates.map((step, idx) => ({
          ...step,
          completed: idx <= activeLevel,
          timestamp: idx === activeLevel ? 'تم التحديث الآن' : step.timestamp
        }));

        const updatedOrder: Order = {
          ...order,
          status,
          trackingUpdates: updatedTracking
        };

        if (activeTrackingOrder?.id === orderId) {
          setActiveTrackingOrder(updatedOrder);
        }

        return updatedOrder;
      }
      return order;
    }));

    showToast(language === 'ar' ? 'تم تحديث حالة الطلب بنجاح' : 'Order status updated', '', 'info');
  };

  // Seller operations
  const addProduct = (newProdData: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id,
      rating: 5.0,
      reviewCount: 1,
      sellerId: seller.id,
      sellerName: seller.storeName,
    };

    setProducts(prev => [newProduct, ...prev]);
    setSeller(prev => ({
      ...prev,
      activeProductsCount: prev.activeProductsCount + 1
    }));

    showToast(
      language === 'ar' ? 'تم نشر المنتج بنجاح في المنصة' : 'Product Published Successfully',
      newProduct.nameAr,
      'success'
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setSeller(prev => ({
      ...prev,
      activeProductsCount: Math.max(0, prev.activeProductsCount - 1)
    }));
    showToast(language === 'ar' ? 'تم حذف المنتج' : 'Product deleted', '', 'info');
  };

  const updateSellerProfile = (updated: Partial<Seller>) => {
    setSeller(prev => ({ ...prev, ...updated }));
    showToast(language === 'ar' ? 'تم تحديث بيانات المتجر' : 'Store profile updated', '', 'success');
  };

  const openProductDetails = (productId: string) => {
    setSelectedProductId(productId);
    setActiveView('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered products calculation
  const filteredProducts = products.filter(product => {
    // Category match
    if (filters.category !== 'all' && product.categoryId !== filters.category) {
      if (filters.category === 'deals' && (!product.discountPercent || product.discountPercent <= 0)) {
        return false;
      }
      if (filters.category !== 'deals') {
        return false;
      }
    }

    // Search query match
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchNameAr = product.nameAr.toLowerCase().includes(q);
      const matchNameEn = product.nameEn.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchDesc = product.descriptionAr.toLowerCase().includes(q);
      if (!matchNameAr && !matchNameEn && !matchBrand && !matchDesc) {
        return false;
      }
    }

    // Brand match
    if (filters.brand !== 'all' && product.brand !== filters.brand) {
      return false;
    }

    // Price range match
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }

    // In stock only
    if (filters.inStockOnly && product.stock <= 0) {
      return false;
    }

    // AI hardware only
    if (filters.hasAiOnly && !product.hasAi) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return (b.discountPercent || 0) - (a.discountPercent || 0);
      case 'featured':
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  return (
    <MarketplaceContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        activeView,
        setActiveView,
        selectedProductId,
        setSelectedProductId,
        openProductDetails,
        categories: CATEGORIES,
        products,
        orders,
        seller,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        filteredProducts,
        cart,
        addToCart,
        buyNow,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        couponCode,
        applyCoupon,
        couponApplied,
        wishlist,
        toggleWishlist,
        isInWishlist,
        createOrder,
        lookupOrder,
        activeTrackingOrder,
        setActiveTrackingOrder,
        updateOrderStatus,
        addProduct,
        deleteProduct,
        updateSellerProfile,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
