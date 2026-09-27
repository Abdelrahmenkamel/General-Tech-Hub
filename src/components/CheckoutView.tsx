import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Lock, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Truck,
  AlertCircle
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { 
    language, 
    currency, 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal, 
    createOrder, 
    setActiveView 
  } = useMarketplace();

  // Form states
  const [fullName, setFullName] = useState('أحمد محمود التميمي');
  const [phone, setPhone] = useState('+966 55 123 4567');
  const [email, setEmail] = useState('ahmed.tamimi@example.com');
  const [governorate, setGovernorate] = useState('منطقة الرياض');
  const [city, setCity] = useState('الرياض');
  const [address, setAddress] = useState('حي النرجس، شارع الأمير فيصل بن بندر، عمارة 42، شقة 5');
  const [notes, setNotes] = useState('يرجى الاتصال قبل الوصول للتأكد من التواجد');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'wallet'>('cod');
  
  // Card details state (mock)
  const [cardNumber, setCardNumber] = useState('4123 4567 8901 2345');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('321');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  if (cart.length === 0) {
    setActiveView('catalog');
    return null;
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !city || !address) {
      alert(language === 'ar' ? 'يرجى إكمال جميع الحقول الإلزامية' : 'Please complete all required fields');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      createOrder({
        customer: {
          fullName,
          phone,
          email,
          governorate,
          city,
          address,
          notes
        },
        items: [...cart],
        paymentMethod,
        subtotal: cartSubtotal,
        shipping: cartShipping,
        discount: cartDiscount,
        total: cartTotal,
        estimatedDelivery: 'خلال 24-48 ساعة'
      });

      setIsSubmitting(false);
      setActiveView('order-confirmed');
    }, 600);
  };

  return (
    <div className="py-8 bg-[#070D1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {language === 'ar' ? 'إتمام الطلب وتأكيد الشحن' : 'Checkout & Order Confirmation'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ar' ? 'أدخل تفاصيل التوصيل واختر طريقة الدفع المناسبة' : 'Enter shipping details and select payment method'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
            <Lock className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'اتصال مصرفي آمن ومشفّر 256-bit' : '256-bit Secure Checkout'}</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left / Center Column: Delivery Info & Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery address section */}
            <div className="p-6 rounded-2xl bg-[#091224] border border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400" />
                <span>{language === 'ar' ? 'بيانات التوصيل والشحن' : 'Shipping Address'}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">
                    {language === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: أحمد محمود"
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">
                    {language === 'ar' ? 'رقم الهاتف للتواصل والتوصيل *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+966 5X XXX XXXX"
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400 font-mono text-left dir-ltr"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">
                    {language === 'ar' ? 'البريد الإلكتروني لإرسال الفاتورة' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">
                    {language === 'ar' ? 'المنطقة / المحافظة *' : 'Region / Province *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">
                    {language === 'ar' ? 'المدينة *' : 'City *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">
                    {language === 'ar' ? 'العنوان بالتفصيل (الحي، الشارع، رقم المبنى) *' : 'Detailed Address *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="الحي، اسم الشارع، رقم العمارة أو الفيلا"
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-medium">
                    {language === 'ar' ? 'ملاحظات التوصيل (اختياري)' : 'Delivery Notes'}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أي تعليمات إضافية لمندوب الشحن والتسليم..."
                    className="w-full bg-[#070D1A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="p-6 rounded-2xl bg-[#091224] border border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                <span>{language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border text-start cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-blue-900/30 border-cyan-400 text-white shadow-md shadow-cyan-950/40'
                      : 'bg-[#070D1A] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Banknote className="w-5 h-5 text-cyan-400" />
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'cod' ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                    }`}>
                      {paymentMethod === 'cod' && <span className="w-1.5 h-1.5 bg-[#070D1A] rounded-full" />}
                    </span>
                  </div>
                  <div className="text-xs font-bold">{language === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery'}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{language === 'ar' ? 'ادفع نقداً أو بالشبكة عند وصول المندوب' : 'Pay when delivered'}</div>
                </div>

                {/* Credit Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border text-start cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-blue-900/30 border-cyan-400 text-white shadow-md shadow-cyan-950/40'
                      : 'bg-[#070D1A] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className="w-5 h-5 text-cyan-400" />
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'card' ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                    }`}>
                      {paymentMethod === 'card' && <span className="w-1.5 h-1.5 bg-[#070D1A] rounded-full" />}
                    </span>
                  </div>
                  <div className="text-xs font-bold">{language === 'ar' ? 'بطاقة بنكية (مدى / فيزا)' : 'Credit / Mada'}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{language === 'ar' ? 'دفع إلكتروني فوري ومؤمّن' : 'Instant secure payment'}</div>
                </div>

                {/* Apple Pay / Digital Wallet */}
                <div
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-4 rounded-xl border text-start cursor-pointer transition-all ${
                    paymentMethod === 'wallet'
                      ? 'bg-blue-900/30 border-cyan-400 text-white shadow-md shadow-cyan-950/40'
                      : 'bg-[#070D1A] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Smartphone className="w-5 h-5 text-cyan-400" />
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'wallet' ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                    }`}>
                      {paymentMethod === 'wallet' && <span className="w-1.5 h-1.5 bg-[#070D1A] rounded-full" />}
                    </span>
                  </div>
                  <div className="text-xs font-bold">{language === 'ar' ? 'المحفظة الذكية' : 'Digital Wallet'}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{language === 'ar' ? 'Apple Pay / STC Pay' : 'Apple Pay / STC'}</div>
                </div>
              </div>

              {/* Mock card inputs if card selected */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-xl bg-[#070D1A] border border-cyan-500/20 space-y-3 mt-3 animate-in fade-in">
                  <div className="text-xs font-semibold text-cyan-300">
                    {language === 'ar' ? 'بيانات البطاقة البنكية' : 'Card Credentials'}
                  </div>
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="رقم البطاقة (16 رقم)"
                      className="w-full bg-[#0c162c] border border-slate-700 rounded-lg p-2.5 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full bg-[#0c162c] border border-slate-700 rounded-lg p-2.5 text-xs text-white font-mono text-center"
                    />
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="CVV"
                      className="w-full bg-[#0c162c] border border-slate-700 rounded-lg p-2.5 text-xs text-white font-mono text-center"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Review & Submit */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-[#091224] border border-cyan-500/30 space-y-5 sticky top-28 shadow-xl shadow-cyan-950/20">
              <h2 className="text-base font-bold text-white pb-3 border-b border-slate-800">
                {language === 'ar' ? 'محتويات طلبك' : 'Items in Order'} ({cart.length})
              </h2>

              {/* Mini Item List */}
              <div className="space-y-3 max-h-56 overflow-y-auto scrollbar-thin pe-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-2 border-b border-slate-800/60 last:border-0">
                    <img
                      src={item.product.image}
                      alt={item.product.nameAr}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">
                        {language === 'ar' ? item.product.nameAr : item.product.nameEn}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.quantity} × {item.product.price.toLocaleString()} {currency}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-cyan-400 font-mono">
                      {(item.product.price * item.quantity).toLocaleString()} {currency}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                  <span className="font-mono text-white">{cartSubtotal.toLocaleString()} {currency}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>{language === 'ar' ? 'الخصم المطبق:' : 'Discount:'}</span>
                    <span className="font-mono">- {cartDiscount.toLocaleString()} {currency}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'رسوم الشحن والتوصيل:' : 'Shipping:'}</span>
                  <span className="font-mono">
                    {cartShipping === 0 ? <span className="text-emerald-400 font-semibold">مجاني</span> : `${cartShipping} ${currency}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline text-base font-bold text-white">
                  <span>{language === 'ar' ? 'الإجمالي المطلوب دفعه:' : 'Total Amount:'}</span>
                  <span className="text-xl text-cyan-400 font-mono tabular-nums">
                    {cartTotal.toLocaleString()} {currency}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 active:scale-95 text-[#070D1A] font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/30 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{language === 'ar' ? 'جاري تأكيد وتسجيل الطلب...' : 'Processing...'}</span>
                ) : (
                  <>
                    <span>{language === 'ar' ? 'تأكيد وإتمام الطلب الآن' : 'Place Order Now'}</span>
                    <Arrow className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-400 text-center leading-relaxed">
                {language === 'ar'
                  ? 'بالنقر على تأكيد الطلب، فإنك توافق على شروط وسياسة الضمان في General Tech Hub Pro.'
                  : 'By confirming your order, you agree to our warranty policy and terms.'}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
