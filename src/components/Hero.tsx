import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { HERO_BANNER_IMAGE } from '../data/initialData';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Cpu, 
  Store,
  Layers
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { language, setActiveView, updateFilter, openProductDetails } = useMarketplace();
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#070D1A] via-[#0B1528] to-[#070D1A] border-b border-cyan-900/20 py-12 lg:py-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 end-1/4 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (Copy & Call to actions) */}
          <div className="lg:col-span-6 space-y-6 text-start">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-500/30 px-3.5 py-1.5 rounded-lg shadow-inner">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>
                {language === 'ar' 
                  ? 'منصة General Tech Hub Pro · التكنولوجيا. التسوق. المستقبل.' 
                  : 'General Tech Hub Pro · Technology. Shopping. Future.'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              {language === 'ar' ? (
                <>
                  اكتشف <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">مستقبل التكنولوجيا</span> بين يديك
                </>
              ) : (
                <>
                  Discover the <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Future of Technology</span>
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              {language === 'ar'
                ? 'أحدث الأجهزة والإلكترونيات والإكسسوارات التقنية، بأسعار تنافسية وتجربة شراء سهلة وآمنة مع ضمان معتمد وشحن سريع إلى باب منزلك.'
                : 'The latest gadgets, electronics, smartphones, and neural AI hardware in one premium marketplace with fast delivery and authorized warranty.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  updateFilter('category', 'all');
                  setActiveView('catalog');
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-[#070D1A] font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'ar' ? 'تسوق الآن' : 'Shop Now'}</span>
                <Arrow className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  updateFilter('category', 'ai-devices');
                  setActiveView('catalog');
                }}
                className="px-5 py-3.5 rounded-xl bg-[#0e1b34] hover:bg-[#132446] border border-cyan-500/30 text-cyan-300 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>{language === 'ar' ? 'منتجات الذكاء الاصطناعي' : 'AI Products'}</span>
              </button>

              <button
                onClick={() => setActiveView('seller-dashboard')}
                className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Store className="w-4 h-4 text-slate-400" />
                <span>{language === 'ar' ? 'انضم كبائع معتمد' : 'Become a Seller'}</span>
              </button>
            </div>

            {/* Quick Metrics & Adjacency Proof */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
                  15,000+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {language === 'ar' ? 'منتج إلكتروني موثوق' : 'Verified Products'}
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono tabular-nums">
                  24-48h
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {language === 'ar' ? 'شحن فائق السرعة' : 'Express Delivery'}
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-indigo-400 font-mono tabular-nums">
                  100%
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {language === 'ar' ? 'ضمان رسمي الوكلاء' : 'Official Warranty'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#0B1528] shadow-2xl shadow-cyan-950/50 group">
              <img
                src={HERO_BANNER_IMAGE}
                alt="General Tech Hub Pro Showcase"
                className="w-full h-[320px] sm:h-[420px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D1A] via-[#070D1A]/40 to-transparent pointer-events-none" />

              {/* High-Tech Overlay Badges */}
              <div className="absolute top-4 start-4 flex items-center gap-2">
                <span className="text-xs font-semibold text-white bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 px-3 py-1 rounded-lg">
                  Flagship Selection 2026
                </span>
              </div>

              {/* Bottom Showcase Panel */}
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-[#091326]/90 backdrop-blur-md border border-cyan-500/30 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs text-cyan-300 font-medium">
                      {language === 'ar' ? 'وصل حديثاً للمستودعات' : 'Just Landed in Warehouse'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    Titan Pro X & Blade AI Studio
                  </h4>
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'شحن مجاني + ضمان استبدال فوري سنتان' : 'Free Shipping + 2-Year Warranty'}
                  </p>
                </div>

                <button
                  onClick={() => openProductDetails('prod-phone-titanium')}
                  className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-[#070D1A] font-bold text-xs shrink-0 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'عرض المواصفات' : 'Inspect Specs'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
