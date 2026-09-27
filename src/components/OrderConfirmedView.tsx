import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  CheckCircle2, 
  Truck, 
  Package, 
  ArrowLeft, 
  ArrowRight, 
  Copy, 
  Calendar,
  ShieldCheck
} from 'lucide-react';

export const OrderConfirmedView: React.FC = () => {
  const { 
    language, 
    currency, 
    activeTrackingOrder, 
    setActiveView, 
    showToast 
  } = useMarketplace();

  if (!activeTrackingOrder) {
    setActiveView('home');
    return null;
  }

  const order = activeTrackingOrder;
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  const copyOrderNumber = () => {
    navigator.clipboard?.writeText(order.orderNumber);
    showToast(
      language === 'ar' ? 'تم نسخ رقم الطلب' : 'Order number copied',
      order.orderNumber,
      'info'
    );
  };

  return (
    <div className="py-12 bg-[#070D1A] min-h-[80vh] flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#091224] border border-cyan-500/40 text-center space-y-6 shadow-2xl shadow-cyan-950/40">
          {/* Animated check icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
              {language === 'ar' ? 'تم استلام وتأكيد الطلب' : 'Order Confirmed'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {language === 'ar' ? 'شكراً لثقتك بـ General Tech Hub Pro!' : 'Thank you for your order!'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              {language === 'ar'
                ? `مرحباً ${order.customer.fullName}، طلبك قيد التجهيز الآن في مستودعاتنا المركزية وسيتم تسليمه خلال 24-48 ساعة.`
                : `Hello ${order.customer.fullName}, your order is currently being prepared for express delivery.`}
            </p>
          </div>

          {/* Order ID Badge */}
          <div className="p-4 rounded-2xl bg-[#070D1A] border border-slate-800 flex items-center justify-between gap-4 max-w-md mx-auto">
            <div className="text-start">
              <div className="text-[11px] text-slate-400">
                {language === 'ar' ? 'رقم تتبع الشحنة المعتمد:' : 'Tracking Number:'}
              </div>
              <div className="text-lg font-bold text-cyan-400 font-mono tracking-wider">
                {order.orderNumber}
              </div>
            </div>

            <button
              onClick={copyOrderNumber}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="نسخ رقم الطلب"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          {/* Quick summary box */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-start text-xs pt-2">
            <div className="p-3 rounded-xl bg-[#070D1A] border border-slate-800/80">
              <div className="text-slate-400">{language === 'ar' ? 'الإجمالي المطلوب:' : 'Total:'}</div>
              <div className="font-bold text-white font-mono mt-0.5">
                {order.total.toLocaleString()} {currency}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#070D1A] border border-slate-800/80">
              <div className="text-slate-400">{language === 'ar' ? 'طريقة الدفع:' : 'Payment:'}</div>
              <div className="font-bold text-cyan-300 mt-0.5">
                {order.paymentMethod === 'cod' ? 'عند الاستلام' : order.paymentMethod === 'card' ? 'بطاقة بنكية' : 'محفظة رقمية'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#070D1A] border border-slate-800/80 col-span-2 sm:col-span-1">
              <div className="text-slate-400">{language === 'ar' ? 'الموعد المتوقع:' : 'Delivery:'}</div>
              <div className="font-bold text-emerald-400 mt-0.5">
                {order.estimatedDelivery}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
            <button
              onClick={() => setActiveView('order-tracking')}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 active:scale-95 text-[#070D1A] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/25"
            >
              <Truck className="w-4 h-4" />
              <span>{language === 'ar' ? 'تتبع حالة الشحنة المباشرة' : 'Track Order Status'}</span>
            </button>

            <button
              onClick={() => setActiveView('catalog')}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              <span>{language === 'ar' ? 'متابعة التسوق بالمتجر' : 'Continue Shopping'}</span>
              <Arrow className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
