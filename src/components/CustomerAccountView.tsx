import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Bell, 
  Truck, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ProductCard } from './ProductCard';

export const CustomerAccountView: React.FC = () => {
  const { 
    language, 
    currency, 
    orders, 
    wishlist, 
    products, 
    setActiveView, 
    setActiveTrackingOrder,
    openProductDetails 
  } = useMarketplace();

  const [tab, setTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');

  const favoritedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="py-8 bg-[#070D1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Profile Header */}
        <div className="p-6 rounded-3xl bg-[#091224] border border-cyan-500/30 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-[#070D1A] font-extrabold text-2xl flex items-center justify-center shadow-lg">
            GT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">أحمد محمود التميمي</h1>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">عضو مميز</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">ahmed.tamimi@example.com · +966 55 123 4567</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              tab === 'orders' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            📦 طلباتي السابقة والحالية ({orders.length})
          </button>
          <button
            onClick={() => setTab('wishlist')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              tab === 'wishlist' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            ❤️ قائمتي المفضلة ({favoritedProducts.length})
          </button>
          <button
            onClick={() => setTab('addresses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              tab === 'addresses' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            📍 العناوين المحفوظة
          </button>
          <button
            onClick={() => setTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              tab === 'profile' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚙️ بيانات الحساب
          </button>
        </div>

        {/* Orders list */}
        {tab === 'orders' && (
          <div className="space-y-4 animate-in fade-in">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-[#091224] rounded-2xl border border-slate-800">
                لا توجد طلبات سابقة حتى الآن.
              </div>
            ) : (
              orders.map((o) => (
                <div key={o.id} className="p-6 rounded-2xl bg-[#091224] border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-cyan-400 font-mono">{o.orderNumber}</span>
                        <span className="text-xs text-slate-400">{new Date(o.createdAt).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        الحالة: <span className="text-cyan-300 font-semibold">{o.trackingUpdates.find(u => u.status === o.status)?.titleAr}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTrackingOrder(o);
                        setActiveView('order-tracking');
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#070D1A] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>تتبع الشحنة الآن</span>
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    {o.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                          <img src={item.product.image} alt={item.product.nameAr} className="w-8 h-8 rounded object-cover" />
                          <span className="text-white">{item.product.nameAr} × {item.quantity}</span>
                        </div>
                        <span className="font-mono text-cyan-400">{(item.product.price * item.quantity).toLocaleString()} {currency}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-bold text-white">
                    <span>الإجمالي الكلي:</span>
                    <span className="font-mono text-cyan-400 text-sm">{o.total.toLocaleString()} {currency}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Wishlist */}
        {tab === 'wishlist' && (
          <div className="animate-in fade-in">
            {favoritedProducts.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-[#091224] rounded-2xl border border-slate-800">
                قائمتك المفضلة فارغة حالياً.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Addresses */}
        {tab === 'addresses' && (
          <div className="p-6 rounded-2xl bg-[#091224] border border-slate-800 space-y-4 animate-in fade-in">
            <h3 className="text-sm font-bold text-white">العنوان الأساسي للتوصيل</h3>
            <div className="p-4 rounded-xl bg-[#070D1A] border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-white">الرياض - حي النرجس (المنزل)</div>
              <div className="text-slate-400">شارع الأمير فيصل بن بندر، عمارة 42، شقة 5</div>
              <div className="text-cyan-400 font-mono">+966 55 123 4567</div>
            </div>
          </div>
        )}

        {/* Profile */}
        {tab === 'profile' && (
          <div className="p-6 rounded-2xl bg-[#091224] border border-slate-800 space-y-4 animate-in fade-in text-xs">
            <h3 className="text-sm font-bold text-white">البيانات الشخصية وإعدادات الأمان</h3>
            <div className="space-y-3 max-w-md">
              <div>
                <label className="text-slate-400 block mb-1">الاسم الكامل</label>
                <input type="text" readOnly value="أحمد محمود التميمي" className="w-full bg-[#070D1A] border border-slate-800 rounded-lg p-2.5 text-white" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">البريد الإلكتروني</label>
                <input type="email" readOnly value="ahmed.tamimi@example.com" className="w-full bg-[#070D1A] border border-slate-800 rounded-lg p-2.5 text-white" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">حالة التوثيق</label>
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>الحساب موثق بالهوية الوطنية</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
