import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  Phone, 
  User, 
  ShieldCheck, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { OrderStatus } from '../types';

export const OrderTrackingView: React.FC = () => {
  const { 
    language, 
    currency, 
    orders, 
    lookupOrder, 
    activeTrackingOrder, 
    setActiveTrackingOrder 
  } = useMarketplace();

  const [searchQuery, setSearchQuery] = useState('');
  const [notFound, setNotFound] = useState(false);

  const order = activeTrackingOrder || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const found = lookupOrder(searchQuery.trim());
    if (found) {
      setActiveTrackingOrder(found);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };

  const statusIcons: Record<OrderStatus, React.ReactNode> = {
    received: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    processing: <Clock className="w-5 h-5 text-cyan-400" />,
    shipped: <Package className="w-5 h-5 text-blue-400" />,
    in_transit: <Truck className="w-5 h-5 text-indigo-400" />,
    delivered: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
  };

  return (
    <div className="py-8 bg-[#070D1A] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
            <Truck className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'بوابة تتبع الشحنات الذكية' : 'Smart Tracking Portal'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {language === 'ar' ? 'تتبع مسار شحنتك المباشر' : 'Live Order Tracking'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            {language === 'ar'
              ? 'أدخل رقم الطلب (مثل GTH-89421) أو رقم هاتفك المسجل لمعرفة موقع الشحنة الحالي'
              : 'Enter your order ID (e.g. GTH-89421) or phone number to track delivery updates.'}
          </p>
        </div>

        {/* Search bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#091224] border border-slate-800 shadow-xl">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setNotFound(false);
                }}
                placeholder={language === 'ar' ? 'ابحث برقم الطلب (GTH-89421) أو رقم الجوال...' : 'Search by order ID or phone number...'}
                className="w-full bg-[#070D1A] border border-slate-700 rounded-xl py-3 ps-11 pe-4 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
              <Search className="w-4 h-4 text-cyan-400 absolute start-4 top-3.5" />
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 active:scale-95 text-[#070D1A] font-extrabold text-xs sm:text-sm transition-all cursor-pointer shadow-md shadow-cyan-950/40 shrink-0"
            >
              {language === 'ar' ? 'استعلام وتتبع' : 'Track Order'}
            </button>
          </form>

          {/* Quick sample chips */}
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 overflow-x-auto pb-1">
            <span>{language === 'ar' ? 'طلبات تجريبية سريعة:' : 'Quick samples:'}</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setActiveTrackingOrder(o);
                  setSearchQuery(o.orderNumber);
                  setNotFound(false);
                }}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-colors cursor-pointer ${
                  order?.id === o.id
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-[#070D1A] border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {o.orderNumber}
              </button>
            ))}
          </div>

          {notFound && (
            <div className="mt-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
              {language === 'ar'
                ? 'لم يتم العثور على طلب مطابق لهذا الرقم. يرجى التحقق من الرقم أو التواصل مع خدمة العملاء.'
                : 'No order found matching this query.'}
            </div>
          )}
        </div>

        {/* Order Details & Live Timeline */}
        {order && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Meta Card */}
            <div className="p-6 rounded-2xl bg-[#091224] border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs text-slate-400">
                  {language === 'ar' ? 'رقم تتبع الشحنة المباشر:' : 'Tracking Number:'}
                </div>
                <div className="text-xl font-extrabold text-cyan-400 font-mono">
                  {order.orderNumber}
                </div>
                <div className="text-xs text-slate-400">
                  <span>{language === 'ar' ? 'تاريخ الإنشاء:' : 'Date:'} </span>
                  <span className="text-slate-300">
                    {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="p-3 rounded-xl bg-[#070D1A] border border-slate-800">
                  <div className="text-[11px] text-slate-400">{language === 'ar' ? 'الموعد المتوقع للتسليم:' : 'Estimated Delivery:'}</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">{order.estimatedDelivery}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#070D1A] border border-slate-800">
                  <div className="text-[11px] text-slate-400">{language === 'ar' ? 'الحالة الحالية:' : 'Status:'}</div>
                  <div className="text-xs font-bold text-cyan-300 mt-0.5">
                    {order.status === 'received' && 'تم استلام الطلب'}
                    {order.status === 'processing' && 'جاري التجهيز بالمستودع'}
                    {order.status === 'shipped' && 'تم التسليم للشحن'}
                    {order.status === 'in_transit' && 'في الطريق مع المندوب'}
                    {order.status === 'delivered' && 'تم التسليم بنجاح'}
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Step Progress Timeline */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#091224] border border-slate-800 space-y-6">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{language === 'ar' ? 'المسار الزمني للشحنة والتسليم' : 'Shipment Timeline'}</span>
              </h2>

              <div className="space-y-6 relative before:absolute before:inset-0 before:start-4 sm:before:start-5 before:w-0.5 before:bg-slate-800">
                {order.trackingUpdates.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 sm:gap-5">
                    {/* Circle icon */}
                    <div
                      className={`relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 shrink-0 ${
                        step.completed
                          ? 'bg-[#091224] border-cyan-400 text-cyan-400 shadow-md shadow-cyan-950/60'
                          : 'bg-[#070D1A] border-slate-700 text-slate-600'
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                      )}
                    </div>

                    {/* Step details */}
                    <div className="flex-1 bg-[#070D1A] p-4 rounded-xl border border-slate-800/80 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className={`text-xs sm:text-sm font-bold ${step.completed ? 'text-white' : 'text-slate-500'}`}>
                          {step.titleAr}
                        </h4>
                        <span className="text-[11px] font-mono text-cyan-400/80">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {step.descriptionAr}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient & Items Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer info */}
              <div className="p-6 rounded-2xl bg-[#091224] border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'ar' ? 'بيانات المستلم وعنوان التوصيل' : 'Recipient Details'}</span>
                </h3>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{language === 'ar' ? 'الاسم:' : 'Name:'}</span>
                    <span className="font-semibold text-white">{order.customer.fullName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{language === 'ar' ? 'الهاتف:' : 'Phone:'}</span>
                    <span className="font-mono text-cyan-400">{order.customer.phone}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 shrink-0">{language === 'ar' ? 'العنوان:' : 'Address:'}</span>
                    <span>{order.customer.city}، {order.customer.governorate} - {order.customer.address}</span>
                  </div>

                  {order.customer.notes && (
                    <div className="p-2.5 rounded-lg bg-[#070D1A] border border-slate-800 text-[11px] text-slate-400">
                      <span className="text-cyan-400 font-semibold">{language === 'ar' ? 'ملاحظة للمندوب: ' : 'Note: '}</span>
                      <span>{order.customer.notes}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order items */}
              <div className="p-6 rounded-2xl bg-[#091224] border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Package className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'ar' ? 'المنتجات في هذه الشحنة' : 'Order Items'}</span>
                </h3>

                <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin pe-1">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-800 last:border-0 text-xs">
                      <img
                        src={item.product.image}
                        alt={item.product.nameAr}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white truncate">{item.product.nameAr}</div>
                        <div className="text-[11px] text-slate-400">{item.selectedColor} · {item.quantity} قطعة</div>
                      </div>
                      <div className="font-mono text-cyan-400 font-bold">
                        {(item.product.price * item.quantity).toLocaleString()} {currency}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-bold text-white">
                  <span>{language === 'ar' ? 'الإجمالي المدفوع:' : 'Total:'}</span>
                  <span className="font-mono text-cyan-400 text-sm">{order.total.toLocaleString()} {currency}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
