import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  Truck, 
  ShieldCheck, 
  CheckCircle, 
  Headphones, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const TrustSection: React.FC = () => {
  const { language } = useMarketplace();

  const trustItems = [
    {
      icon: <Truck className="w-6 h-6 text-cyan-400" />,
      titleAr: 'شحن فائق السرعة',
      titleEn: 'Express Delivery',
      descAr: 'توصيل مبرد ومحمي خلال 24-48 ساعة مباشرة إلى باب منزلك في جميع المدن',
      descEn: 'Fast insured shipping within 24-48 hours to your door.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      titleAr: 'دفع آمن 100%',
      titleEn: 'Secure Payments',
      descAr: 'خيارات متعددة تشمل الدفع عند الاستلام، بطاقات مدى وفيزا ومحافظ Apple Pay المشفرة',
      descEn: 'Cash on delivery, credit cards, and encrypted digital wallets.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-cyan-400" />,
      titleAr: 'منتجات أصلية معتمدة',
      titleEn: '100% Authentic',
      descAr: 'ضمان رسمي من الوكلاء المعتمدين سنتان مع فحص صارم للأرقام التسلسلية',
      descEn: 'Official 2-year warranty on all brand devices.'
    },
    {
      icon: <Headphones className="w-6 h-6 text-cyan-400" />,
      titleAr: 'دعم فني متخصص 24/7',
      titleEn: '24/7 Expert Support',
      descAr: 'فريق من مهندسي التكنولوجيا جاهزون للإجابة عن استفساراتك ومساعدتك في اختيار الجهاز',
      descEn: 'Certified hardware engineers ready to assist around the clock.'
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-cyan-400" />,
      titleAr: 'استرجاع سلس 14 يوماً',
      titleEn: 'Easy 14-Day Returns',
      descAr: 'سياسة استبدال واسترجاع واضحة ومرنة تضمن حقك وراحة بالك التامة',
      descEn: 'Hassle-free 14-day replacement and return guarantee.'
    }
  ];

  return (
    <section className="py-12 bg-[#060B16] border-t border-b border-cyan-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-[#091224]/80 border border-slate-800/80 hover:border-cyan-500/30 transition-all flex flex-col items-start space-y-3 group"
            >
              <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {language === 'ar' ? item.titleAr : item.titleEn}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'ar' ? item.descAr : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
