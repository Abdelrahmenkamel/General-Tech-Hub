import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  Store, 
  Truck, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setActiveView, updateFilter } = useMarketplace();

  return (
    <footer className="bg-[#050912] border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white font-extrabold text-sm">
                GT
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                GENERAL TECH HUB PRO
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {language === 'ar'
                ? 'السوق والمنصة التقنية المتكاملة لبيع وشراء أحدث الأجهزة الذكية، الحواسيب، ملحقات الذكاء الاصطناعي وأنظمة الأمان مع شحن فوري وضمان معتمد.'
                : 'The premier technology marketplace for high-performance computing, smart hardware, smartphones, and neural AI accelerators.'}
            </p>

            <div className="text-xs text-slate-300 space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>support@generaltechhub.pro</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 font-mono" />
                <span>+966 55 000 1234 (الرقم الموحد المعتمد)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => { updateFilter('category', 'all'); setActiveView('catalog'); }}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'متجر المنتجات بالكامل' : 'All Products'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { updateFilter('category', 'deals'); setActiveView('catalog'); }}
                  className="hover:text-rose-400 transition-colors cursor-pointer text-rose-300"
                >
                  {language === 'ar' ? 'العروض والتخفيضات' : 'Special Offers'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveView('order-tracking')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'تتبع حالة الشحنة' : 'Track Order'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveView('account')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'حساب العميل والطلبات' : 'My Account'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveView('seller-dashboard')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-cyan-300 font-semibold"
                >
                  {language === 'ar' ? 'بوابة التجار (سوق البائعين)' : 'Seller Marketplace'}
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'ar' ? 'الأقسام التقنية' : 'Categories'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => { updateFilter('category', 'smartphones'); setActiveView('catalog'); }}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'الهواتف الذكية' : 'Smartphones'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { updateFilter('category', 'laptops'); setActiveView('catalog'); }}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'اللابتوبات والكمبيوتر' : 'Laptops & PC'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { updateFilter('category', 'ai-devices'); setActiveView('catalog'); }}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-cyan-300"
                >
                  {language === 'ar' ? 'أجهزة الذكاء الاصطناعي' : 'AI Hardware'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { updateFilter('category', 'audio'); setActiveView('catalog'); }}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'السماعات والصوتيات' : 'Audio & Sound'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { updateFilter('category', 'security'); setActiveView('catalog'); }}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'الأمن والمراقبة الذكية' : 'Security Systems'}
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'ar' ? 'السياسات والضمان' : 'Policies'}
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-slate-300 cursor-pointer">
                  {language === 'ar' ? 'سياسة الشحن والتوصيل' : 'Shipping Policy'}
                </span>
              </li>
              <li>
                <span className="hover:text-slate-300 cursor-pointer">
                  {language === 'ar' ? 'شروط الضمان المعتمد عامين' : '2-Year Warranty Policy'}
                </span>
              </li>
              <li>
                <span className="hover:text-slate-300 cursor-pointer">
                  {language === 'ar' ? 'سياسة الاستبدال والاسترجاع' : 'Returns & Refunds'}
                </span>
              </li>
              <li>
                <span className="hover:text-slate-300 cursor-pointer">
                  {language === 'ar' ? 'الخصوصية وأمان البيانات' : 'Privacy & Security'}
                </span>
              </li>
              <li>
                <span className="hover:text-slate-300 cursor-pointer">
                  {language === 'ar' ? 'الشروط والأحكام العامة' : 'Terms of Service'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-[11px]">
            © 2026 General Tech Hub Pro. {language === 'ar' ? 'جميع الحقوق محفوظة · منصة تجارة تقنية معتمدة' : 'All rights reserved.'}
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="p-1 px-2 rounded bg-slate-900 border border-slate-800 font-mono">مدى Mada</span>
            <span className="p-1 px-2 rounded bg-slate-900 border border-slate-800 font-mono">Visa / Mastercard</span>
            <span className="p-1 px-2 rounded bg-slate-900 border border-slate-800 font-mono">Apple Pay</span>
            <span className="p-1 px-2 rounded bg-slate-900 border border-slate-800">الدفع عند الاستلام</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
