import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  Store, 
  PlusCircle, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Trash2, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  ShoppingBag,
  Clock,
  Truck,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { CategoryId, Product, OrderStatus } from '../types';

export const SellerDashboard: React.FC = () => {
  const { 
    language, 
    currency, 
    seller, 
    products, 
    orders, 
    addProduct, 
    deleteProduct, 
    updateOrderStatus,
    categories,
    setActiveView 
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'overview' | 'add-product' | 'my-products' | 'orders'>('overview');

  // Form state for adding new product
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [brand, setBrand] = useState('NexusTech');
  const [categoryId, setCategoryId] = useState<CategoryId>('smartphones');
  const [price, setPrice] = useState(1999);
  const [originalPrice, setOriginalPrice] = useState(2499);
  const [stock, setStock] = useState(20);
  const [descriptionAr, setDescriptionAr] = useState('');
  const [condition, setCondition] = useState<'new' | 'open_box' | 'refurbished'>('new');
  const [warranty, setWarranty] = useState('سنتان ضمان الوكيل المعتمد');
  const [hasAi, setHasAi] = useState(false);
  const [specsText, setSpecsText] = useState('المعالج: Octa-core AI 3nm\nالذاكرة العشوائية: 16GB\nسعة التخزين: 256GB');

  // Filter seller's own products
  const sellerProducts = products.filter(p => p.sellerId === seller.id || p.sellerId === 'seller-official');

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr || !price) return;

    // Parse specs from lines
    const parsedSpecs: Record<string, string> = {};
    specsText.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        parsedSpecs[parts[0].trim()] = parts.slice(1).join(':').trim();
      }
    });

    const discountPercent = originalPrice > price 
      ? Math.round(((originalPrice - price) / originalPrice) * 100) 
      : 0;

    // Use high-end studio image matching category
    let image = '/src/assets/images/phone_pro_titanium_1790518344761.jpg';
    if (categoryId === 'laptops' || categoryId === 'monitors') {
      image = '/src/assets/images/laptop_ai_workstation_1790518357331.jpg';
    } else if (categoryId === 'audio') {
      image = '/src/assets/images/audio_hifi_pro_1790518367687.jpg';
    } else if (categoryId === 'smartwatches') {
      image = '/src/assets/images/smartwatch_ultra_pro_1790518382717.jpg';
    } else if (categoryId === 'security' || categoryId === 'ai-devices') {
      image = '/src/assets/images/ai_smart_cam_hub_1790518393383.jpg';
    }

    addProduct({
      nameAr,
      nameEn: nameEn || nameAr,
      brand,
      categoryId,
      price: Number(price),
      originalPrice: Number(originalPrice || price),
      discountPercent,
      stock: Number(stock),
      image,
      gallery: [image],
      descriptionAr: descriptionAr || 'منتج عالي الجودة بمواصفات تقنية ممتازة وضمان كامل.',
      descriptionEn: 'High quality technology product with official warranty.',
      specs: Object.keys(parsedSpecs).length > 0 ? parsedSpecs : { 'الضمان': warranty, 'الحالة': condition },
      colors: [
        { nameAr: 'تيتانيوم أسود', nameEn: 'Titanium Black', hex: '#1E293B' },
        { nameAr: 'أزرق كحلي نقي', nameEn: 'Pure Navy', hex: '#0B2545' }
      ],
      isNew: true,
      hasAi,
      sellerId: seller.id,
      sellerName: seller.storeName,
      condition,
      warranty
    });

    // Reset & switch to my-products
    setNameAr('');
    setNameEn('');
    setDescriptionAr('');
    setActiveTab('my-products');
  };

  return (
    <div className="py-8 bg-[#070D1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0c1a36] via-[#09152b] to-[#070D1A] border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl shadow-cyan-950/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-lg">
              <Store className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  {seller.storeName}
                </h1>
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'ar'
                  ? `بوابة إدارة المبيعات والمخزون والطلبات · التاجر: ${seller.ownerName}`
                  : `Seller Portal & Inventory Management · ${seller.ownerName}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('add-product')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-[#070D1A] font-extrabold text-xs flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md shadow-cyan-950/40"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === 'ar' ? 'إضافة منتج جديد للبيع' : 'Add New Product'}</span>
            </button>

            <button
              onClick={() => setActiveView('catalog')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'معاينة المتجر العام' : 'View Storefront'}
            </button>
          </div>
        </div>

        {/* Seller Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? '📊 مؤشرات الأداء والأرباح' : 'Overview & Sales'}
          </button>

          <button
            onClick={() => setActiveTab('add-product')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'add-product'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? '➕ إضافة منتج جديد' : 'Add Product'}
          </button>

          <button
            onClick={() => setActiveTab('my-products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'my-products'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? `📦 إدارة المنتجات والمخزون (${sellerProducts.length})` : 'My Inventory'}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? `🚚 طلبات المشترين (${orders.length})` : 'Orders'}
          </button>
        </div>

        {/* Tab 1: Overview & Metrics */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#091224] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>{language === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono tabular-nums">
                  {seller.revenue.toLocaleString()} {currency}
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+18.4% نمو هذا الشهر</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#091224] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>{language === 'ar' ? 'الطلبات المكتملة' : 'Completed Sales'}</span>
                  <ShoppingBag className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono tabular-nums">
                  {seller.totalSales.toLocaleString()}
                </div>
                <div className="text-[11px] text-cyan-400">
                  <span>{orders.length} طلبات نشطة حالياً</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#091224] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>{language === 'ar' ? 'المنتجات المعروضة' : 'Active Listings'}</span>
                  <Package className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono tabular-nums">
                  {sellerProducts.length}
                </div>
                <div className="text-[11px] text-slate-400">
                  <span>كلها متوفرة في المستودعات</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#091224] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>{language === 'ar' ? 'تقييم المتجر' : 'Store Rating'}</span>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums flex items-center gap-1">
                  <span>{seller.rating}</span>
                  <span className="text-xs text-slate-400">/ 5.0</span>
                </div>
                <div className="text-[11px] text-emerald-400">
                  <span>تاجر معتمد فئة ممتازة Pro</span>
                </div>
              </div>
            </div>

            {/* Quick action banners */}
            <div className="p-6 rounded-2xl bg-[#091224] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-start">
                <h3 className="text-sm font-bold text-white">
                  {language === 'ar' ? 'هل تود بيع أجهزة ومعدات ذكاء اصطناعي جديدة؟' : 'Ready to list new hardware?'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'ar'
                    ? 'يمكنك إضافة عدد غير محدود من الهواتف والحواسيب ومحطات العمل مع مزامنة فورية في السوق العام.'
                    : 'List unlimited hardware with instant sync across the General Tech Hub Pro platform.'}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('add-product')}
                className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#070D1A] font-bold text-xs shrink-0 transition-colors cursor-pointer"
              >
                {language === 'ar' ? 'ابدأ إضافة منتجك الآن' : 'Add Product'}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Add Product Form */}
        {activeTab === 'add-product' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#091224] border border-slate-800 space-y-6 animate-in fade-in">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-cyan-400" />
                <span>{language === 'ar' ? 'نشر منتج جديد في سوق General Tech' : 'Publish Product to Marketplace'}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'ar'
                  ? 'أدخل بيانات الجهاز بدقة وسيظهر فوراً للمتسوقين في الصفحة الرئيسية والكتالوج'
                  : 'Enter device specs. The item will be live instantly for all shoppers.'}
              </p>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">
                    {language === 'ar' ? 'اسم المنتج بالعربية *' : 'Product Name (Arabic) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    placeholder="مثال: لابتوب Blade AI Studio 2026"
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">
                    {language === 'ar' ? 'اسم المنتج بالإنجليزية' : 'Product Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder="e.g. Blade AI Studio Laptop"
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">
                    {language === 'ar' ? 'القسم التقني *' : 'Category *'}
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value as CategoryId)}
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                  >
                    {categories.filter(c => c.id !== 'deals').map((c) => (
                      <option key={c.id} value={c.id}>
                        {language === 'ar' ? c.nameAr : c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">
                    {language === 'ar' ? 'العلامة التجارية / الشركة المصنعة' : 'Brand Name'}
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">
                    {language === 'ar' ? 'سعر البيع النهائي (ر.س) *' : 'Selling Price (SAR) *'}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">
                    {language === 'ar' ? 'السعر الأصلي قبل الخصم (ر.س)' : 'Original Price (for discount)'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">
                    {language === 'ar' ? 'الكمية المتوفرة بالمخزون' : 'Stock Quantity'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">
                    {language === 'ar' ? 'حالة الجهاز' : 'Item Condition'}
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as any)}
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="new">جديد في الصندوق الأصلي (Brand New)</option>
                    <option value="open_box">صندوق مفتوح بحالة الجديد (Open Box)</option>
                    <option value="refurbished">مجدد معتمد مع ضمان (Certified Refurbished)</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-semibold">
                    {language === 'ar' ? 'المواصفات التقنية (سطر لكل مواصفة)' : 'Specifications (one per line: Key: Value)'}
                  </label>
                  <textarea
                    rows={3}
                    value={specsText}
                    onChange={(e) => setSpecsText(e.target.value)}
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400 font-mono text-xs"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-semibold">
                    {language === 'ar' ? 'وصف المنتج التفصيلي ومميزاته' : 'Product Description'}
                  </label>
                  <textarea
                    rows={3}
                    value={descriptionAr}
                    onChange={(e) => setDescriptionAr(e.target.value)}
                    placeholder="اكتب نبذة شيقة عن أداء ومميزات هذا الجهاز..."
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="hasAi"
                  checked={hasAi}
                  onChange={(e) => setHasAi(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-400 cursor-pointer"
                />
                <label htmlFor="hasAi" className="text-slate-300 cursor-pointer flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{language === 'ar' ? 'تمييز هذا المنتج كجهاز مدعوم بالذكاء الاصطناعي (AI Gear)' : 'Mark as AI hardware'}</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold cursor-pointer"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 active:scale-95 text-[#070D1A] font-extrabold cursor-pointer shadow-md shadow-cyan-950/40"
                >
                  {language === 'ar' ? 'نشر المنتج فوراً في المتجر' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: My Products List */}
        {activeTab === 'my-products' && (
          <div className="p-6 rounded-3xl bg-[#091224] border border-slate-800 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>{language === 'ar' ? 'المخزون والمنتجات المعروضة للبيع' : 'Inventory Management'}</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {sellerProducts.length} {language === 'ar' ? 'منتج معروض' : 'items'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-4 text-start font-semibold">{language === 'ar' ? 'المنتج' : 'Product'}</th>
                    <th className="py-3 px-4 text-start font-semibold">{language === 'ar' ? 'القسم' : 'Category'}</th>
                    <th className="py-3 px-4 text-start font-semibold">{language === 'ar' ? 'السعر' : 'Price'}</th>
                    <th className="py-3 px-4 text-start font-semibold">{language === 'ar' ? 'المخزون' : 'Stock'}</th>
                    <th className="py-3 px-4 text-start font-semibold">{language === 'ar' ? 'التقييم' : 'Rating'}</th>
                    <th className="py-3 px-4 text-end font-semibold">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {sellerProducts.map((p) => (
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
                      <td className="py-3 px-4 text-slate-300">{p.categoryId}</td>
                      <td className="py-3 px-4 font-mono font-bold text-cyan-400">
                        {p.price.toLocaleString()} {currency}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-emerald-400 font-mono font-semibold">{p.stock} قطعة</span>
                      </td>
                      <td className="py-3 px-4 text-amber-400 font-mono">
                        ⭐ {p.rating}
                      </td>
                      <td className="py-3 px-4 text-end">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                          title="حذف المنتج"
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

        {/* Tab 4: Seller Orders & Status changer */}
        {activeTab === 'orders' && (
          <div className="p-6 rounded-3xl bg-[#091224] border border-slate-800 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400" />
                <span>{language === 'ar' ? 'إدارة وتحديث طلبات المشترين' : 'Order Fulfillment'}</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {orders.length} {language === 'ar' ? 'طلب مسجل' : 'orders'}
              </span>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-5 rounded-2xl bg-[#070D1A] border border-slate-800/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/60">
                    <div>
                      <span className="text-xs font-bold text-cyan-400 font-mono me-3">{order.orderNumber}</span>
                      <span className="text-xs text-slate-300 font-semibold">{order.customer.fullName}</span>
                      <span className="text-slate-500 mx-2">·</span>
                      <span className="text-xs text-slate-400">{order.customer.phone}</span>
                    </div>

                    {/* Status updater dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">تحديث الحالة:</span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-[#0c162c] text-cyan-300 text-xs font-semibold py-1.5 px-3 rounded-lg border border-cyan-500/40 focus:outline-none cursor-pointer"
                      >
                        <option value="received">تم استلام الطلب</option>
                        <option value="processing">جاري التجهيز بالمستودع</option>
                        <option value="shipped">تم التسليم للشحن</option>
                        <option value="in_transit">في الطريق مع المندوب</option>
                        <option value="delivered">تم التسليم للعميل</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="text-slate-400">
                      <span>العنوان: </span>
                      <span className="text-slate-200">{order.customer.city}، {order.customer.address}</span>
                    </div>
                    <div className="text-slate-400 sm:text-end">
                      <span>الإجمالي: </span>
                      <span className="text-cyan-400 font-bold font-mono text-sm">{order.total.toLocaleString()} {currency}</span>
                      <span className="text-slate-500 ms-1">({order.paymentMethod === 'cod' ? 'عند الاستلام' : 'دفع إلكتروني'})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
