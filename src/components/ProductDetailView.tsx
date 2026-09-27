import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  Star, 
  ShoppingCart, 
  Zap, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  ArrowLeft,
  ArrowRight,
  Store,
  Sparkles,
  Info
} from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ProductDetailView: React.FC = () => {
  const { 
    language, 
    currency, 
    products, 
    selectedProductId, 
    setActiveView, 
    addToCart, 
    buyNow, 
    toggleWishlist, 
    isInWishlist, 
    showToast 
  } = useMarketplace();

  const product = products.find(p => p.id === selectedProductId) || products[0];
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.nameAr || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'shipping'>('specs');

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const Arrow = language === 'ar' ? ArrowRight : ArrowLeft;

  // Related products in the same category
  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(
      language === 'ar' ? 'تم نسخ رابط المنتج بنجاح' : 'Product Link Copied',
      product.nameAr,
      'info'
    );
  };

  return (
    <div className="py-8 bg-[#070D1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setActiveView('catalog')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <Arrow className="w-4 h-4" />
            <span>{language === 'ar' ? 'العودة لكتالوج المنتجات' : 'Back to Store'}</span>
          </button>

          <div className="text-xs text-slate-400">
            <span>General Tech Hub Pro</span>
            <span className="mx-2">/</span>
            <span className="text-slate-300">{product.brand}</span>
            <span className="mx-2">/</span>
            <span className="text-cyan-400 truncate max-w-[200px] inline-block align-bottom">
              {language === 'ar' ? product.nameAr : product.nameEn}
            </span>
          </div>
        </div>

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Large Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#091224] border border-cyan-500/20 shadow-xl">
              <img
                src={selectedImage || product.image}
                alt={product.nameAr}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              <div className="absolute top-4 start-4 flex flex-col gap-2">
                {product.discountPercent && (
                  <span className="text-xs font-bold text-rose-300 bg-rose-950/80 border border-rose-500/40 px-2.5 py-1 rounded-lg">
                    {product.discountPercent}% {language === 'ar' ? 'خصم متاح' : 'OFF'}
                  </span>
                )}
                {product.hasAi && (
                  <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Neural AI Ready</span>
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail selector */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-3">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-cyan-400 scale-102 shadow-md shadow-cyan-900/40'
                        : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Seller Guarantee Box */}
            <div className="p-4 rounded-xl bg-[#0a1428] border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center">
                    <Store className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{product.sellerName}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="text-[11px] text-slate-400">بائع موثق ومعتمد على منصة Hub Pro</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-amber-400 font-mono flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.98</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{product.warranty}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>شحن سريع 24-48 ساعة</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>إرجاع سهل 14 يوم</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-cyan-400">
                  {product.brand}
                </span>
                <span className="text-emerald-400 font-medium">
                  {language === 'ar' ? `متوفر في المخزون (${product.stock} قطعة)` : `In Stock (${product.stock} units)`}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {language === 'ar' ? product.nameAr : product.nameEn}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="ms-1.5 font-bold font-mono text-white text-sm">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span>·</span>
                <span>{product.reviewCount} {language === 'ar' ? 'تقييم معتمد من المشترين' : 'verified reviews'}</span>
                <span>·</span>
                <span className="text-slate-400 font-mono">SKU: {product.id}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-[#0c162c] border border-cyan-500/20 flex items-baseline justify-between">
              <div>
                <div className="text-xs text-slate-400">
                  {language === 'ar' ? 'السعر الشامل لضريبة القيمة المضافة' : 'VAT inclusive price'}
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-extrabold text-cyan-400 font-mono tabular-nums">
                    {product.price.toLocaleString()} {currency}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-slate-500 line-through font-mono tabular-nums">
                      {product.originalPrice.toLocaleString()} {currency}
                    </span>
                  )}
                </div>
              </div>

              {product.originalPrice > product.price && (
                <div className="text-end">
                  <div className="text-xs text-emerald-400 font-semibold">
                    {language === 'ar' 
                      ? `وفرت ${(product.originalPrice - product.price).toLocaleString()} ${currency}` 
                      : `Save ${(product.originalPrice - product.price).toLocaleString()} ${currency}`}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {language === 'ar' ? 'توصيل مجاني للطلبات فوق 500 ر.س' : 'Free delivery available'}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'ar' ? product.descriptionAr : product.descriptionEn}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>{language === 'ar' ? 'اللون المتاح:' : 'Available Color:'}</span>
                  <span className="text-cyan-400">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c.nameAr)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        selectedColor === c.nameAr
                          ? 'bg-blue-900/40 border-cyan-400 text-white shadow'
                          : 'bg-[#091224] border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-white/20" 
                        style={{ backgroundColor: c.hex }} 
                      />
                      <span>{language === 'ar' ? c.nameAr : c.nameEn}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-slate-300">
                  {language === 'ar' ? 'الكمية:' : 'Quantity:'}
                </span>
                <div className="flex items-center border border-slate-700 rounded-xl bg-[#091224] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-white font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => addToCart(product, quantity, selectedColor)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#111e3b] hover:bg-[#16274e] border border-cyan-500/40 text-cyan-300 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-950/20"
                >
                  <ShoppingCart className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={() => buyNow(product, quantity, selectedColor)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 active:scale-95 text-[#070D1A] font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-[#070D1A]" />
                  <span>{language === 'ar' ? 'شراء الآن فوري' : 'Buy Now'}</span>
                </button>
              </div>

              {/* Wishlist & Share Secondary Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isFavorited
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                      : 'bg-[#091224] border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isFavorited ? (language === 'ar' ? 'في المفضلة' : 'Saved') : (language === 'ar' ? 'إضافة للمفضلة' : 'Add to Wishlist')}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#091224] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'ar' ? 'مشاركة المنتج' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specs & Details Tabs */}
        <div className="mt-14 pt-8 border-t border-slate-800">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'ar' ? 'المواصفات التقنية الكاملة' : 'Technical Specifications'}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'ar' ? 'آراء المشترين والتقييمات' : 'Customer Reviews'}
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'shipping'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'ar' ? 'الشحن والضمان والاسترجاع' : 'Warranty & Returns'}
            </button>
          </div>

          <div className="py-6">
            {activeTab === 'specs' && (
              <div className="bg-[#091224] rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-xs sm:text-sm text-start">
                  <tbody>
                    {Object.entries(product.specs).map(([specKey, specVal], idx) => (
                      <tr 
                        key={idx} 
                        className={idx % 2 === 0 ? 'bg-[#0a1529]/60' : 'bg-[#08101f]/60'}
                      >
                        <td className="py-3 px-5 font-bold text-slate-300 w-1/3 border-e border-slate-800/80">
                          {specKey}
                        </td>
                        <td className="py-3 px-5 text-slate-200 font-mono">
                          {specVal}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#091224] border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-extrabold text-white font-mono">
                      {product.rating} / 5.0
                    </div>
                    <div className="text-xs text-slate-400">بناءً على {product.reviewCount} عملية شراء مؤكدة</div>
                  </div>
                  <div className="flex items-center text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#0a1529] border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">م. سلطان الشمري</span>
                      <span className="text-[11px] text-slate-500 font-mono">قبل 3 أيام</span>
                    </div>
                    <div className="text-amber-400 flex items-center gap-0.5 text-xs">
                      ⭐⭐⭐⭐⭐
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      جهاز فائق الجودة والسرعة، تجربة الشراء من General Tech Hub Pro كانت ممتازة والتغليف آمن جداً مع كرت الضمان.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0a1529] border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">رغد العتيبي</span>
                      <span className="text-[11px] text-slate-500 font-mono">قبل أسبوع</span>
                    </div>
                    <div className="text-amber-400 flex items-center gap-0.5 text-xs">
                      ⭐⭐⭐⭐⭐
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      وصلت الشحنة في أقل من 24 ساعة، الأداء مبهر ومطابق تماماً للمواصفات المعروضة. أنصح بالتعامل مع المتجر.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="p-6 rounded-2xl bg-[#091224] border border-slate-800 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">الشحن والتسليم السريع:</div>
                    <p className="text-slate-400 mt-0.5">
                      يتم شحن الطلبات من مستودعاتنا المركزية عبر أسطول النقل السريع المبرد والمحمي خلال 24 إلى 48 ساعة لكافة مناطق ومدن المملكة.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">الضمان المعتمد:</div>
                    <p className="text-slate-400 mt-0.5">
                      جميع الأجهزة مشمولة بضمان الوكيل الرسمي المعتمد سنتان على الأقل يشمل الصيانة وقطع الغيار الأصلية والاستبدال الفوري في حالة وجود عيب مصنعي.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">سياسة الاسترجاع والاستبدال:</div>
                    <p className="text-slate-400 mt-0.5">
                      يحق للعميل استرجاع المنتج خلال 14 يوماً من تاريخ الاستلام في حالته الأصلية دون أي رسوم إضافية.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">
              {language === 'ar' ? 'منتجات يشتريها العملاء أيضاً مع هذا المنتج' : 'Customers Also Bought'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
