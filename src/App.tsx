/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailView } from './components/ProductDetailView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { OrderConfirmedView } from './components/OrderConfirmedView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { SellerDashboard } from './components/SellerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { CustomerAccountView } from './components/CustomerAccountView';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Store, 
  Flame, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    language, 
    activeView, 
    setActiveView, 
    products, 
    updateFilter 
  } = useMarketplace();

  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  // Filter specific curated home subsets
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 6);
  const aiProducts = products.filter(p => p.hasAi).slice(0, 4);
  const dealProducts = products.filter(p => (p.discountPercent || 0) >= 15).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#070D1A] text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && (
          <div className="space-y-0">
            {/* Hero Section */}
            <Hero />

            {/* Category horizontal bar */}
            <CategoryBar />

            {/* Featured Selection: "منتجات مختارة لك" */}
            <section className="py-12 bg-[#070D1A]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                      {language === 'ar' ? 'اختيارات General Tech المعتمدة' : 'Curated Hardware'}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {language === 'ar' ? 'منتجات مختارة لك' : 'Featured Products'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      {language === 'ar'
                        ? 'أحدث الهواتف والحواسيب وملحقات الصوت المصنفة كأفضل أداء لعام 2026'
                        : 'Top-tier laptops, smartphones, and acoustic systems hand-picked for high performance'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      updateFilter('category', 'all');
                      setActiveView('catalog');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <span>{language === 'ar' ? 'عرض الكتالوج بالكامل' : 'View Full Catalog'}</span>
                    <Arrow className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>

            {/* AI Hardware Spotlight Banner */}
            <section className="py-12 bg-gradient-to-b from-[#070D1A] via-[#09152b] to-[#070D1A] border-t border-b border-cyan-900/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-lg">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{language === 'ar' ? 'تقنيات الجيل القادم' : 'Next-Gen Neural Hardware'}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {language === 'ar' ? 'منتجات وتقنيات الذكاء الاصطناعي' : 'AI Devices & Neural Hardware'}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {language === 'ar'
                        ? 'محطات عمل عصبية، رقائق NPU طرفية وكاميرات مراقبة ذكية بمعالجة محلية'
                        : 'High-bandwidth local inference accelerators and smart edge sensors'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      updateFilter('category', 'ai-devices');
                      setActiveView('catalog');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <span>{language === 'ar' ? 'تصفح قسم الذكاء الاصطناعي' : 'Explore AI Gear'}</span>
                    <Arrow className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {aiProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>

            {/* Hot Deals Section */}
            {dealProducts.length > 0 && (
              <section className="py-12 bg-[#070D1A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-950/40 border border-rose-500/30 px-3 py-1 rounded-lg mb-1">
                        <Flame className="w-3.5 h-3.5 text-rose-400" />
                        <span>{language === 'ar' ? 'خصومات تصل حتى 20%' : 'Limited Season Sale'}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {language === 'ar' ? 'عروض وتخفيضات اليوم' : 'Daily Deals & Discounts'}
                      </h2>
                    </div>

                    <button
                      onClick={() => {
                        updateFilter('category', 'deals');
                        setActiveView('catalog');
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <span>{language === 'ar' ? 'عرض كافة العروض' : 'All Deals'}</span>
                      <Arrow className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dealProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Marketplace Seller Invitation Banner */}
            <section className="py-14 bg-[#081020] border-t border-cyan-900/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="rounded-3xl bg-gradient-to-r from-[#0d1f42] via-[#091730] to-[#070D1A] border border-cyan-500/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
                  <div className="max-w-2xl space-y-4 relative z-10 text-start">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-lg">
                      <Store className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{language === 'ar' ? 'منصة تجارة وسوق إلكتروني متكامل' : 'Marketplace for Sellers'}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {language === 'ar'
                        ? 'هل تمتلك متجراً أو منتجات تقنية ترغب في بيعها؟'
                        : 'Sell your tech hardware on General Tech Hub Pro'}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {language === 'ar'
                        ? 'انضم كبائع معتمد في General Tech Hub Pro، واستفد من لوحة تحكم متطورة لإدارة المخزون والطلبات والتحليلات والوصول إلى آلاف المشترين يومياً.'
                        : 'Open your seller account today, manage your stock, fulfill orders, and reach thousands of verified tech enthusiasts across the region.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setActiveView('seller-dashboard')}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-[#070D1A] font-extrabold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-cyan-950/40"
                      >
                        {language === 'ar' ? 'الدخول إلى بوابة التجار' : 'Go to Seller Portal'}
                      </button>

                      <button
                        onClick={() => setActiveView('admin-dashboard')}
                        className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                      >
                        {language === 'ar' ? 'لوحة إدارة المنصة (Admin)' : 'Admin Dashboard'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust Section */}
            <TrustSection />
          </div>
        )}

        {/* Catalog View */}
        {activeView === 'catalog' && <ProductCatalog />}

        {/* Product Details View */}
        {activeView === 'product-details' && <ProductDetailView />}

        {/* Cart View */}
        {activeView === 'cart' && <CartView />}

        {/* Checkout View */}
        {activeView === 'checkout' && <CheckoutView />}

        {/* Order Confirmed View */}
        {activeView === 'order-confirmed' && <OrderConfirmedView />}

        {/* Order Tracking View */}
        {activeView === 'order-tracking' && <OrderTrackingView />}

        {/* Seller Dashboard */}
        {activeView === 'seller-dashboard' && <SellerDashboard />}

        {/* Admin Dashboard */}
        {activeView === 'admin-dashboard' && <AdminDashboard />}

        {/* Customer Account & Wishlist */}
        {(activeView === 'account' || activeView === 'wishlist') && <CustomerAccountView />}
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <MarketplaceProvider>
      <AppContent />
    </MarketplaceProvider>
  );
}
