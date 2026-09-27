import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  ShieldCheck, 
  BarChart3, 
  Package, 
  Users, 
  Store, 
  Truck, 
  Settings, 
  DollarSign, 
  Sparkles,
  CheckCircle,
  Trash2,
  Layers
} from 'lucide-react';
import { OrderStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    language, 
    currency, 
    products, 
    orders, 
    categories, 
    seller, 
    deleteProduct, 
    updateOrderStatus,
    setActiveView 
  } = useMarketplace();

  const [adminTab, setAdminTab] = useState<'analytics' | 'products' | 'orders' | 'sellers'>('analytics');

  // Compute platform aggregate stats
  const totalMarketplaceGMV = orders.reduce((sum, o) => sum + o.total, 0) + 1284500;
  const totalOrdersCount = orders.length + 3840;

  return (
    <div className="py-8 bg-[#070D1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top bar */}
        <div className="p-6 rounded-3xl bg-[#091224] border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <span>General Tech Hub Pro · لوحة الإدارة العليا (Admin)</span>
                <span className="text-[10px] bg-indigo-900/60 text-indigo-300 px-2 py-0.5 rounded font-mono">Root Access</span>
              </h1>
              <p className="text-xs text-slate-400">
                إدارة كاملة لكافة منتجات المنصة، حسابات التجار، المبيعات والطلبات
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveView('home')}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            العودة للمتجر الرئيسي
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setAdminTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'analytics'
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📈 المؤشرات العامة والتحليلات
          </button>
          <button
            onClick={() => setAdminTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'products'
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🛍️ المنتجات والموافقة عليها ({products.length})
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'orders'
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🚚 مراقبة الطلبات والشحن ({orders.length})
          </button>
          <button
            onClick={() => setAdminTab('sellers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'sellers'
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🏪 شبكة التجار والبائعين
          </button>
        </div>

        {/* Analytics Tab */}
        {adminTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#091224] border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">إجمالي حجم تداول المنصة (GMV)</div>
                <div className="text-2xl font-bold text-white font-mono">{totalMarketplaceGMV.toLocaleString()} {currency}</div>
                <div className="text-[11px] text-emerald-400">+24% خلال الربع الحالي</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#091224] border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">إجمالي الطلبات المنفذة</div>
                <div className="text-2xl font-bold text-white font-mono">{totalOrdersCount.toLocaleString()}</div>
                <div className="text-[11px] text-cyan-400">متوسط التوصيل 1.4 يوم</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#091224] border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">التجار المعتمدون في المنصة</div>
                <div className="text-2xl font-bold text-white font-mono">48 تاجر معتمد</div>
                <div className="text-[11px] text-indigo-400">12 طلب انضمام قيد المراجعة</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#091224] border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">العملاء النشطون</div>
                <div className="text-2xl font-bold text-white font-mono">19,450 عميل</div>
                <div className="text-[11px] text-amber-400">تقييم الرضا 98.7%</div>
              </div>
            </div>

            {/* Platform Health and Categories breakdown */}
            <div className="p-6 rounded-2xl bg-[#091224] border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">توزيع المنتجات والمبيعات حسب الأقسام</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
                {categories.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-[#070D1A] border border-slate-800">
                    <div className="font-semibold text-white">{c.nameAr}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{c.count} منتج مسجل</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Manager */}
        {adminTab === 'products' && (
          <div className="p-6 rounded-3xl bg-[#091224] border border-slate-800 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">قائمة كافة منتجات المتجر</h2>
              <span className="text-xs text-slate-400 font-mono">{products.length} منتج</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-4 text-start">المنتج</th>
                    <th className="py-3 px-4 text-start">التاجر / البائع</th>
                    <th className="py-3 px-4 text-start">السعر</th>
                    <th className="py-3 px-4 text-start">المخزون</th>
                    <th className="py-3 px-4 text-start">الحالة</th>
                    <th className="py-3 px-4 text-end">حذف</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.nameAr} className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
                          <div>
                            <div className="font-bold text-white">{p.nameAr}</div>
                            <div className="text-[11px] text-slate-400">{p.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{p.sellerName}</td>
                      <td className="py-3 px-4 font-mono font-bold text-cyan-400">{p.price.toLocaleString()} {currency}</td>
                      <td className="py-3 px-4 font-mono text-emerald-400">{p.stock}</td>
                      <td className="py-3 px-4">
                        <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px]">
                          معتمد ونشط
                        </span>
                      </td>
                      <td className="py-3 px-4 text-end">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Manager */}
        {adminTab === 'orders' && (
          <div className="p-6 rounded-3xl bg-[#091224] border border-slate-800 space-y-4 animate-in fade-in">
            <h2 className="text-base font-bold text-white">إدارة وتحديث كافة طلبات المشترين</h2>
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="p-4 rounded-xl bg-[#070D1A] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-white font-mono">{o.orderNumber} - {o.customer.fullName}</div>
                    <div className="text-slate-400">{o.customer.city} · {o.total.toLocaleString()} {currency}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">الحالة:</span>
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                      className="bg-[#0c162c] text-cyan-300 text-xs py-1.5 px-3 rounded-lg border border-slate-700"
                    >
                      <option value="received">تم الاستلام</option>
                      <option value="processing">جاري التجهيز</option>
                      <option value="shipped">تم الشحن</option>
                      <option value="in_transit">في الطريق</option>
                      <option value="delivered">تم التسليم</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sellers Network */}
        {adminTab === 'sellers' && (
          <div className="p-6 rounded-3xl bg-[#091224] border border-slate-800 space-y-4 animate-in fade-in">
            <h2 className="text-base font-bold text-white">شبكة التجار والبائعين المعتمدين</h2>
            <div className="p-4 rounded-xl bg-[#070D1A] border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">{seller.storeName}</div>
                <div className="text-xs text-slate-400">{seller.ownerName} · {seller.email}</div>
              </div>
              <div className="text-end">
                <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  تاجر موثق Pro
                </span>
                <div className="text-xs text-slate-400 font-mono mt-1">مبيعات: {seller.totalSales}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
