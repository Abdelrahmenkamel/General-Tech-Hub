import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Store, 
  Truck, 
  SlidersHorizontal, 
  Globe, 
  Menu, 
  X, 
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    currency, 
    activeView, 
    setActiveView, 
    cartCount, 
    cartTotal, 
    wishlist, 
    filters, 
    updateFilter,
    products,
    openProductDetails
  } = useMarketplace();

  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  // Suggestions for search
  const searchSuggestions = filters.searchQuery.trim().length > 1
    ? products
        .filter(p => 
          p.nameAr.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
          p.nameEn.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(filters.searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const handleNavClick = (view: typeof activeView, category?: string) => {
    if (category) {
      updateFilter('category', category as any);
    } else if (view === 'catalog') {
      updateFilter('category', 'all');
    }
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-900/30 bg-[#070D1A]/95 backdrop-blur-md transition-colors">
      {/* Top micro promo bar */}
      <div className="bg-gradient-to-r from-blue-950 via-[#0a1b38] to-cyan-950 px-4 py-1.5 text-xs text-cyan-200 border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-cyan-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              {language === 'ar' ? 'عروض الذكاء الاصطناعي والإلكترونيات' : 'AI & Tech Season'}
            </span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="hidden sm:inline text-slate-300">
              {language === 'ar' ? 'استخدم كود الخصم TECH10 لخصم 10% فوري' : 'Use code TECH10 for 10% off'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <button
              onClick={() => handleNavClick('order-tracking')}
              className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors text-xs font-medium cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'ar' ? 'تتبع طلبك' : 'Track Order'}</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="inline-flex items-center gap-1 hover:text-white transition-colors text-xs font-medium cursor-pointer"
              title={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 md:gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-start group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-base tracking-tighter">GT</span>
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors leading-none">
                GENERAL TECH HUB PRO
              </span>
              <span className="text-[11px] text-cyan-400 font-medium tracking-wide">
                {language === 'ar' ? 'جينرال تك هب برو · كل التكنولوجيا في مكان واحد' : 'Technology. Shopping. Future.'}
              </span>
            </div>
          </button>
        </div>

        {/* Live Search Bar with Suggestions */}
        <div className="hidden lg:flex flex-1 max-w-xl relative">
          <div className="relative w-full">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => {
                updateFilter('searchQuery', e.target.value);
                if (activeView !== 'catalog') setActiveView('catalog');
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
              placeholder={language === 'ar' ? 'ابحث عن هاتف، لابتوب، شاشة، ذكاء اصطناعي...' : 'Search phones, laptops, monitors, AI gear...'}
              className="w-full bg-[#0d182e] text-slate-100 placeholder:text-slate-500 text-sm rounded-xl py-2.5 ps-10 pe-4 border border-cyan-900/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all"
            />
            <Search className="w-4 h-4 text-cyan-400/80 absolute start-3.5 top-3 pointer-events-none" />
            {filters.searchQuery && (
              <button
                onClick={() => updateFilter('searchQuery', '')}
                className="absolute end-3 top-2.5 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Dropdown Suggestion */}
          {searchFocused && searchSuggestions.length > 0 && (
            <div className="absolute top-full mt-2 inset-x-0 bg-[#0c162c] border border-cyan-500/20 rounded-xl shadow-2xl p-2 z-50">
              <div className="text-[11px] font-semibold text-cyan-400 px-3 py-1 uppercase tracking-wider">
                {language === 'ar' ? 'منتجات مطابقة' : 'Matching Products'}
              </div>
              {searchSuggestions.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => openProductDetails(prod.id)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/60 text-start transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={prod.image} 
                      alt={prod.nameAr} 
                      className="w-9 h-9 rounded object-cover border border-slate-700" 
                    />
                    <div>
                      <div className="text-sm font-medium text-slate-200 group-hover:text-cyan-300">
                        {language === 'ar' ? prod.nameAr : prod.nameEn}
                      </div>
                      <div className="text-xs text-slate-500">{prod.brand}</div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-cyan-400 font-mono">
                    {prod.price.toLocaleString()} {currency}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zone 3: Primary Actions (Wishlist, Cart, Portal/Account, Mobile Menu) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist Button */}
          <button
            onClick={() => handleNavClick('wishlist')}
            className={`relative p-2.5 rounded-xl border transition-all cursor-pointer ${
              activeView === 'wishlist'
                ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                : 'bg-[#0d182e] border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
            title={language === 'ar' ? 'المفضلة' : 'Wishlist'}
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-400 fill-rose-400/20' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -end-1 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => handleNavClick('cart')}
            className={`relative p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer ${
              activeView === 'cart' || activeView === 'checkout'
                ? 'bg-blue-600/30 border-cyan-400 text-cyan-300'
                : 'bg-gradient-to-r from-blue-700/80 to-cyan-600/80 border-cyan-400/40 text-white hover:opacity-95 shadow-md shadow-blue-900/30'
            }`}
            title={language === 'ar' ? 'سلة المشتريات' : 'Shopping Cart'}
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -end-2 w-5 h-5 bg-cyan-400 text-[#070D1A] text-[11px] font-extrabold rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold font-mono tracking-tight">
              {cartTotal.toLocaleString()} {currency}
            </span>
          </button>

          {/* Account / Portal Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="p-2.5 sm:px-3 sm:py-2 rounded-xl bg-[#0d182e] border border-slate-800 hover:border-cyan-500/40 text-slate-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <User className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline text-xs font-medium">
                {language === 'ar' ? 'حسابي والمنصة' : 'Portal'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:inline" />
            </button>

            {accountDropdownOpen && (
              <div 
                className="absolute end-0 top-full mt-2 w-56 bg-[#0c162c] border border-cyan-500/20 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setAccountDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <div className="text-xs font-bold text-white">General Tech ID</div>
                  <div className="text-[11px] text-slate-400">abdelrahmenkamel2@gmail.com</div>
                </div>

                <button
                  onClick={() => {
                    handleNavClick('account');
                    setAccountDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-lg text-start transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'ar' ? 'طلباتي وحساب العميل' : 'My Orders & Account'}</span>
                </button>

                <button
                  onClick={() => {
                    handleNavClick('order-tracking');
                    setAccountDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-lg text-start transition-colors cursor-pointer"
                >
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'ar' ? 'تتبع حالة الشحنات' : 'Track Order Status'}</span>
                </button>

                <div className="my-1 border-t border-slate-800" />

                <button
                  onClick={() => {
                    handleNavClick('seller-dashboard');
                    setAccountDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-cyan-300 hover:text-cyan-200 hover:bg-cyan-950/40 rounded-lg text-start transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-cyan-400" />
                    <span>{language === 'ar' ? 'بوابة البائع (لوحة التاجر)' : 'Seller Dashboard'}</span>
                  </div>
                  <span className="text-[10px] bg-cyan-900/60 text-cyan-300 px-1.5 py-0.5 rounded">Pro</span>
                </button>

                <button
                  onClick={() => {
                    handleNavClick('admin-dashboard');
                    setAccountDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-indigo-300 hover:text-indigo-200 hover:bg-indigo-950/40 rounded-lg text-start transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    <span>{language === 'ar' ? 'لوحة إدارة المنصة (Admin)' : 'Admin Dashboard'}</span>
                  </div>
                  <span className="text-[10px] bg-indigo-900/60 text-indigo-300 px-1.5 py-0.5 rounded">Root</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#0d182e] border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Zone 2: Clean 5-link text navigation bar (Desktop) */}
      <nav className="hidden lg:block border-t border-slate-800/80 bg-[#070D1A]/80">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8 py-2.5 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors hover:text-cyan-400 cursor-pointer ${
                activeView === 'home' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 -mb-2.5 pb-2' : 'text-slate-300'
              }`}
            >
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </button>

            <button
              onClick={() => handleNavClick('catalog')}
              className={`transition-colors hover:text-cyan-400 cursor-pointer ${
                activeView === 'catalog' && filters.category === 'all'
                  ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 -mb-2.5 pb-2'
                  : 'text-slate-300'
              }`}
            >
              {language === 'ar' ? 'المتجر والمنتجات' : 'All Products'}
            </button>

            <button
              onClick={() => handleNavClick('catalog', 'smartphones')}
              className={`transition-colors hover:text-cyan-400 cursor-pointer ${
                filters.category === 'smartphones' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {language === 'ar' ? 'الهواتف الذكية' : 'Smartphones'}
            </button>

            <button
              onClick={() => handleNavClick('catalog', 'laptops')}
              className={`transition-colors hover:text-cyan-400 cursor-pointer ${
                filters.category === 'laptops' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {language === 'ar' ? 'اللابتوبات والكمبيوتر' : 'Laptops & PC'}
            </button>

            <button
              onClick={() => handleNavClick('catalog', 'ai-devices')}
              className={`transition-colors hover:text-cyan-400 cursor-pointer flex items-center gap-1.5 ${
                filters.category === 'ai-devices' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'ar' ? 'أجهزة الذكاء الاصطناعي' : 'AI Hardware'}</span>
            </button>

            <button
              onClick={() => handleNavClick('catalog', 'deals')}
              className={`transition-colors hover:text-rose-400 cursor-pointer ${
                filters.category === 'deals' ? 'text-rose-400 font-semibold' : 'text-rose-300/90'
              }`}
            >
              {language === 'ar' ? 'العروض الحصرية' : 'Hot Deals'}
            </button>

            <button
              onClick={() => handleNavClick('seller-dashboard')}
              className={`transition-colors hover:text-cyan-400 cursor-pointer flex items-center gap-1.5 text-cyan-400/90 ${
                activeView === 'seller-dashboard' ? 'text-cyan-300 font-bold' : ''
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'سوق البائعين' : 'Marketplace'}</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            {language === 'ar' ? 'ضمان رسمي عامين · شحن سريع لكافة المدن' : '2-Year Warranty · Express Delivery'}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1224] border-b border-cyan-900/30 p-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => {
                updateFilter('searchQuery', e.target.value);
                setActiveView('catalog');
              }}
              placeholder={language === 'ar' ? 'ابحث في المتجر...' : 'Search marketplace...'}
              className="w-full bg-[#0d182e] text-slate-100 placeholder:text-slate-500 text-sm rounded-xl py-2.5 ps-10 pe-4 border border-slate-700"
            />
            <Search className="w-4 h-4 text-cyan-400 absolute start-3.5 top-3 pointer-events-none" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className="p-3 rounded-lg bg-slate-900/80 text-start text-slate-200 hover:text-cyan-400"
            >
              {language === 'ar' ? '🏠 الرئيسية' : 'Home'}
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className="p-3 rounded-lg bg-slate-900/80 text-start text-slate-200 hover:text-cyan-400"
            >
              {language === 'ar' ? '🛍️ جميع المنتجات' : 'Products'}
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'smartphones')}
              className="p-3 rounded-lg bg-slate-900/80 text-start text-slate-200 hover:text-cyan-400"
            >
              {language === 'ar' ? '📱 الهواتف الذكية' : 'Smartphones'}
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'laptops')}
              className="p-3 rounded-lg bg-slate-900/80 text-start text-slate-200 hover:text-cyan-400"
            >
              {language === 'ar' ? '💻 الحواسيب' : 'Laptops'}
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'ai-devices')}
              className="p-3 rounded-lg bg-slate-900/80 text-start text-cyan-300 hover:text-cyan-200"
            >
              {language === 'ar' ? '🤖 أجهزة AI' : 'AI Devices'}
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'deals')}
              className="p-3 rounded-lg bg-slate-900/80 text-start text-rose-300 hover:text-rose-200"
            >
              {language === 'ar' ? '🔥 العروض والخصومات' : 'Deals'}
            </button>
            <button
              onClick={() => handleNavClick('seller-dashboard')}
              className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-start text-cyan-300"
            >
              {language === 'ar' ? '🏪 بوابة التاجر' : 'Seller Hub'}
            </button>
            <button
              onClick={() => handleNavClick('order-tracking')}
              className="p-3 rounded-lg bg-slate-900/80 text-start text-slate-200 hover:text-cyan-400"
            >
              {language === 'ar' ? '🚚 تتبع شحنتك' : 'Track Order'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
