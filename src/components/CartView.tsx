import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const CartView: React.FC = () => {
  const { 
    language, 
    currency, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal, 
    couponCode, 
    applyCoupon, 
    couponApplied, 
    setActiveView,
    openProductDetails 
  } = useMarketplace();

  const [inputCoupon, setInputCoupon] = useState('');
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 bg-[#070D1A] min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 max-w-md bg-[#091224] rounded-2xl border border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center shadow-lg">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {language === 'ar' ? 'سلة المشتريات فارغة حالياً' : 'Your cart is empty'}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {language === 'ar'
              ? 'لم تقم بإضافة أي أجهزة أو ملحقات تقنية بعد. استكشف أفضل العروض والمنتجات وابدأ بالتسوق الآن.'
              : 'Explore our latest hardware and tech deals to add items to your cart.'}
          </p>
          <button
            onClick={() => setActiveView('catalog')}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-[#070D1A] font-bold text-xs hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-cyan-950/40"
          >
            {language === 'ar' ? 'تصفح المتجر والمنتجات' : 'Browse Products'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-[#070D1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {language === 'ar' ? 'سلة المشتريات' : 'Shopping Cart'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ar' 
                ? `لديك ${cart.reduce((a, b) => a + b.quantity, 0)} منتجات في سلتك جاهزة للإتمام` 
                : `${cart.reduce((a, b) => a + b.quantity, 0)} items in your shopping cart`}
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'تفريغ السلة بالكامل' : 'Clear Cart'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item, index) => {
              const itemTotal = item.product.price * item.quantity;

              return (
                <div
                  key={`${item.product.id}-${item.selectedColor || index}`}
                  className="p-4 sm:p-5 rounded-2xl bg-[#091224] border border-slate-800/80 hover:border-cyan-500/30 flex flex-col sm:flex-row items-center gap-4 transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.nameAr}
                    onClick={() => openProductDetails(item.product.id)}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-slate-700/60 shrink-0 cursor-pointer"
                  />

                  {/* Info */}
                  <div className="flex-1 w-full space-y-1.5 text-center sm:text-start">
                    <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                      {item.product.brand}
                    </div>
                    <h3 
                      onClick={() => openProductDetails(item.product.id)}
                      className="text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      {language === 'ar' ? item.product.nameAr : item.product.nameEn}
                    </h3>
                    
                    {item.selectedColor && (
                      <div className="text-xs text-slate-400">
                        <span>{language === 'ar' ? 'اللون المحدد:' : 'Color:'} </span>
                        <span className="text-slate-300 font-medium">{item.selectedColor}</span>
                      </div>
                    )}

                    <div className="text-xs text-slate-400">
                      <span>{language === 'ar' ? 'سعر الوحدة:' : 'Unit:'} </span>
                      <span className="font-mono text-cyan-400 font-bold">
                        {item.product.price.toLocaleString()} {currency}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-700 rounded-xl bg-[#070D1A] overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                        className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 text-xs font-bold text-white font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                        className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="w-24 text-end">
                      <div className="text-sm font-bold text-cyan-300 font-mono tabular-nums">
                        {itemTotal.toLocaleString()} {currency}
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title="حذف من السلة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Back to shopping link */}
            <div className="pt-2">
              <button
                onClick={() => setActiveView('catalog')}
                className="text-xs text-slate-400 hover:text-cyan-400 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>{language === 'ar' ? '← متابعة تصفح المنتجات وإضافة المزيد' : '← Continue Shopping'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 space-y-5">
            {/* Promo Code Box */}
            <div className="p-5 rounded-2xl bg-[#091224] border border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-cyan-400" />
                <span>{language === 'ar' ? 'هل تمتلك كود خصم أو قسيمة؟' : 'Apply Coupon'}</span>
              </h3>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="TECH10"
                  className="flex-1 bg-[#070D1A] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'تطبيق' : 'Apply'}
                </button>
              </form>
              {couponApplied && (
                <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3" />
                  <span>تم تطبيق كود ({couponCode}) - خصم 10% إضافي!</span>
                </div>
              )}
            </div>

            {/* Summary card */}
            <div className="p-6 rounded-2xl bg-[#091224] border border-cyan-500/30 space-y-4 shadow-xl shadow-cyan-950/20">
              <h2 className="text-base font-bold text-white pb-3 border-b border-slate-800">
                {language === 'ar' ? 'ملخص الحساب والطلب' : 'Order Summary'}
              </h2>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                  <span className="font-mono tabular-nums text-white">
                    {cartSubtotal.toLocaleString()} {currency}
                  </span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>{language === 'ar' ? 'قيمة الخصم (10%):' : 'Discount:'}</span>
                    <span className="font-mono tabular-nums">
                      - {cartDiscount.toLocaleString()} {currency}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'رسوم الشحن والتوصيل السريع:' : 'Shipping:'}</span>
                  <span className="font-mono tabular-nums">
                    {cartShipping === 0 ? (
                      <span className="text-emerald-400 font-semibold">
                        {language === 'ar' ? 'مجاني (عرض خاص)' : 'Free'}
                      </span>
                    ) : (
                      `${cartShipping} ${currency}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline text-base font-bold text-white">
                  <span>{language === 'ar' ? 'الإجمالي النهائي:' : 'Total:'}</span>
                  <span className="text-xl text-cyan-400 font-mono tabular-nums">
                    {cartTotal.toLocaleString()} {currency}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => setActiveView('checkout')}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 active:scale-95 text-[#070D1A] font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/30"
              >
                <span>{language === 'ar' ? 'متابعة إلى إتمام الطلب' : 'Proceed to Checkout'}</span>
                <Arrow className="w-4 h-4" />
              </button>

              {/* Trust markers */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>دفع آمن 100% ومشفر بأحدث بروتوكولات الأمان</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>توصيل مباشر إلى باب المنزل مع خيار الدفع عند الاستلام</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
