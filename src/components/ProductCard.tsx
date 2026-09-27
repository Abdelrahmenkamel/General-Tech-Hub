import React from 'react';
import { Product } from '../types';
import { useMarketplace } from '../context/MarketplaceContext';
import { Star, ShoppingCart, Zap, Heart, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    language, 
    currency, 
    addToCart, 
    buyNow, 
    toggleWishlist, 
    isInWishlist, 
    openProductDetails 
  } = useMarketplace();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group relative rounded-2xl bg-[#0c162c] border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-cyan-950/20">
      {/* Top Media Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#08101f]">
        <img
          src={product.image}
          alt={language === 'ar' ? product.nameAr : product.nameEn}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => openProductDetails(product.id)}
          referrerPolicy="no-referrer"
        />

        {/* Ambient Gradient Scrim */}
        <div 
          onClick={() => openProductDetails(product.id)}
          className="absolute inset-0 bg-gradient-to-t from-[#0c162c] via-transparent to-transparent opacity-80 cursor-pointer" 
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 end-3 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
            isFavorited
              ? 'bg-rose-500/20 border border-rose-500/50 text-rose-400'
              : 'bg-[#070D1A]/70 border border-slate-700/50 text-slate-300 hover:text-white hover:border-slate-500'
          }`}
          title={isFavorited ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quiet Discount & Status Tag */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5 pointer-events-none">
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="text-[11px] font-bold text-rose-300 bg-rose-950/80 border border-rose-500/30 px-2 py-0.5 rounded-md backdrop-blur-sm">
              {product.discountPercent}% {language === 'ar' ? 'خصم' : 'OFF'}
            </span>
          )}

          {product.hasAi && (
            <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded-md backdrop-blur-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>AI</span>
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        {/* Brand & Stock Status (Unboxed metadata) */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-slate-400">
            {product.brand}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{language === 'ar' ? `متوفر (${product.stock})` : `In Stock (${product.stock})`}</span>
          </span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => openProductDetails(product.id)}
          className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
        >
          {language === 'ar' ? product.nameAr : product.nameEn}
        </h3>

        {/* Rating and Reviews (Clean unboxed line) */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="ms-1 font-semibold font-mono text-white tabular-nums">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>
            {product.reviewCount} {language === 'ar' ? 'تقييم' : 'reviews'}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-[11px] text-slate-400 truncate max-w-[120px]">
            {product.sellerName.replace(' (المتجر الرسمي)', '')}
          </span>
        </div>

        {/* Price row */}
        <div className="pt-2 border-t border-slate-800/80 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-cyan-400 font-mono tabular-nums">
              {product.price.toLocaleString()} {currency}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                {product.originalPrice.toLocaleString()} {currency}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2.5 px-2 rounded-xl bg-[#111e3b] hover:bg-[#16274e] border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
            <span className="whitespace-nowrap">{language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
          </button>

          <button
            onClick={() => buyNow(product, 1)}
            className="w-full py-2.5 px-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 active:scale-95 text-[#070D1A] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-950/40 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-[#070D1A] fill-[#070D1A]" />
            <span className="whitespace-nowrap">{language === 'ar' ? 'شراء الآن' : 'Buy Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
