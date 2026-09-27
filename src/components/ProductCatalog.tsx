import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from './ProductCard';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles, 
  Check, 
  ChevronDown,
  Layers,
  Search
} from 'lucide-react';
import { CategoryId } from '../types';

export const ProductCatalog: React.FC = () => {
  const { 
    language, 
    currency, 
    categories, 
    filteredProducts, 
    filters, 
    updateFilter, 
    resetFilters 
  } = useMarketplace();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Unique brands list
  const availableBrands = ['all', 'NexusTech', 'ApexForge', 'AcousticAI', 'Chronos', 'SecurAI', 'PowerMatrix', 'SynapseLabs'];

  return (
    <div className="py-8 bg-[#070D1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Header & Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {filters.category === 'all'
                ? (language === 'ar' ? 'جميع المنتجات والأجهزة' : 'All Hardware & Devices')
                : (categories.find(c => c.id === filters.category)?.[language === 'ar' ? 'nameAr' : 'nameEn'] || 'المتجر')}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ar'
                ? `تم العثور على ${filteredProducts.length} منتج تقني بمواصفات أصلية`
                : `Showing ${filteredProducts.length} verified technology products`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-[#0c162c] border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>{language === 'ar' ? 'تصفية النتائج' : 'Filters'}</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">
                {language === 'ar' ? 'الترتيب حسب:' : 'Sort by:'}
              </span>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value as any)}
                className="bg-[#0c162c] text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-700 focus:border-cyan-400 focus:outline-none cursor-pointer"
              >
                <option value="featured">{language === 'ar' ? 'المختارة والمميزة' : 'Featured'}</option>
                <option value="newest">{language === 'ar' ? 'الأحدث أولاً' : 'Newest Arrivals'}</option>
                <option value="price-asc">{language === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                <option value="price-desc">{language === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                <option value="rating">{language === 'ar' ? 'الأعلى تقييماً' : 'Highest Rated'}</option>
                <option value="discount">{language === 'ar' ? 'أكبر نسبة خصم' : 'Biggest Discount'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Body with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-[#091224] p-5 rounded-2xl border border-slate-800/80 h-fit sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                <span>{language === 'ar' ? 'تصفية المتجر' : 'Filter Store'}</span>
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer"
                title="إعادة ضبط"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'إعادة ضبط' : 'Reset'}</span>
              </button>
            </div>

            {/* Category filter list */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {language === 'ar' ? 'القسم الرئيسي' : 'Category'}
              </div>
              <div className="space-y-1 max-h-56 overflow-y-auto scrollbar-thin pe-1">
                <button
                  onClick={() => updateFilter('category', 'all')}
                  className={`w-full text-start px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    filters.category === 'all'
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  {language === 'ar' ? 'جميع الأقسام' : 'All Categories'}
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => updateFilter('category', c.id)}
                    className={`w-full text-start px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      filters.category === c.id
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <span>{language === 'ar' ? c.nameAr : c.nameEn}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{c.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
                </span>
                <span className="text-xs text-cyan-400 font-mono">
                  {filters.maxPrice.toLocaleString()} {currency}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="200"
                value={filters.maxPrice}
                onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>0 {currency}</span>
                <span>10,000+ {currency}</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {language === 'ar' ? 'العلامة التجارية' : 'Brand'}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {availableBrands.map((b) => (
                  <button
                    key={b}
                    onClick={() => updateFilter('brand', b)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium text-center border transition-all cursor-pointer ${
                      filters.brand === b
                        ? 'bg-blue-600/30 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {b === 'all' ? (language === 'ar' ? 'الكل' : 'All') : b}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox Toggles */}
            <div className="space-y-2.5 pt-3 border-t border-slate-800">
              <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />
                <span>{language === 'ar' ? 'المتوفر في المخزون فقط' : 'In Stock Only'}</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.hasAiOnly}
                  onChange={(e) => updateFilter('hasAiOnly', e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>{language === 'ar' ? 'أجهزة مدعومة بالذكاء الاصطناعي' : 'AI Powered Only'}</span>
                </span>
              </label>
            </div>
          </aside>

          {/* Product Cards Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center rounded-2xl bg-[#091224] border border-slate-800 p-8">
                <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">
                  {language === 'ar' ? 'لا توجد منتجات مطابقة لخيارات البحث' : 'No products found'}
                </h3>
                <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                  {language === 'ar'
                    ? 'جرب تقليل شروط التصفية أو تغيير عبارة البحث للعثور على ما ترغب به'
                    : 'Try changing your search keywords or resetting active filters.'}
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/30 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'إعادة ضبط كل خيارات التصفية' : 'Reset All Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-md bg-[#091224] rounded-t-2xl sm:rounded-2xl border border-slate-800 p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {language === 'ar' ? 'تصفية المنتجات' : 'Filter Products'}
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300">
                {language === 'ar' ? 'القسم' : 'Category'}
              </div>
              <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto">
                <button
                  onClick={() => updateFilter('category', 'all')}
                  className={`p-2 rounded text-xs text-start ${filters.category === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
                >
                  {language === 'ar' ? 'الكل' : 'All'}
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => updateFilter('category', c.id)}
                    className={`p-2 rounded text-xs text-start truncate ${filters.category === c.id ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
                  >
                    {language === 'ar' ? c.nameAr : c.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                />
                <span>{language === 'ar' ? 'المتوفر في المخزون فقط' : 'In Stock Only'}</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={filters.hasAiOnly}
                  onChange={(e) => updateFilter('hasAiOnly', e.target.checked)}
                />
                <span>{language === 'ar' ? 'أجهزة الذكاء الاصطناعي فقط' : 'AI Only'}</span>
              </label>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                {language === 'ar' ? 'إعادة ضبط' : 'Reset'}
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-cyan-400 text-[#070D1A] text-xs font-bold"
              >
                {language === 'ar' ? 'تطبيق الفلتر' : 'Apply'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
