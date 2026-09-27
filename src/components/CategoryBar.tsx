import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  Smartphone, 
  Laptop, 
  Tv, 
  Headphones, 
  Watch, 
  Gamepad2, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  Home, 
  Flame,
  Grid
} from 'lucide-react';
import { CategoryId } from '../types';

export const CategoryBar: React.FC = () => {
  const { language, categories, filters, updateFilter, setActiveView } = useMarketplace();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Tv': return <Tv className="w-5 h-5" />;
      case 'Headphones': return <Headphones className="w-5 h-5" />;
      case 'Watch': return <Watch className="w-5 h-5" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5 text-rose-400" />;
      default: return <Grid className="w-5 h-5" />;
    }
  };

  const handleSelectCategory = (catId: CategoryId | 'all') => {
    updateFilter('category', catId);
    setActiveView('catalog');
  };

  return (
    <section className="py-8 bg-[#070D1A] border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {language === 'ar' ? 'تصفح حسب القسم' : 'Shop by Category'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'ar' ? 'اختر القسم التقني وتصفح أرقى الماركات' : 'Explore high-performance hardware and gadgets'}
            </p>
          </div>

          <button
            onClick={() => handleSelectCategory('all')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              filters.category === 'all'
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? 'عرض كل الأقسام' : 'View All'}
          </button>
        </div>

        {/* Scrollable Category Grid / Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => {
            const isSelected = filters.category === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border text-start transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900/40 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950/40'
                    : 'bg-[#0d172e] border-slate-800/80 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/60 text-slate-400'}`}>
                  {getIcon(cat.iconName)}
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">
                    {language === 'ar' ? cat.nameAr : cat.nameEn}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono tabular-nums">
                    {cat.count} {language === 'ar' ? 'منتج' : 'items'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
