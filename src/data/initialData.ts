import { Category, Product, Order, Seller } from '../types';

export const HERO_BANNER_IMAGE = '/src/assets/images/hero_tech_marketplace_1790518331028.jpg';

export const CATEGORIES: Category[] = [
  {
    id: 'smartphones',
    nameAr: 'الهواتف الذكية',
    nameEn: 'Smartphones',
    iconName: 'Smartphone',
    count: 24,
    descriptionAr: 'أحدث هواتف الفئة الرائدة والمتوسطة مع أقوى معالجات الذكاء الاصطناعي وكاميرات احترافية',
  },
  {
    id: 'laptops',
    nameAr: 'اللابتوبات والكمبيوتر',
    nameEn: 'Laptops & PC',
    iconName: 'Laptop',
    count: 18,
    descriptionAr: 'محطات عمل للمطورين والمصممين وأجهزة ألعاب فائقة القوة مع تبريد بخاري',
  },
  {
    id: 'monitors',
    nameAr: 'الشاشات الذكية',
    nameEn: 'Monitors & Displays',
    iconName: 'Tv',
    count: 12,
    descriptionAr: 'شاشات OLED وMini-LED بدقة 4K و 8K مع معدل تحديث يصل إلى 240Hz',
  },
  {
    id: 'audio',
    nameAr: 'السماعات والصوتيات',
    nameEn: 'Audio & Acoustics',
    iconName: 'Headphones',
    count: 29,
    descriptionAr: 'سماعات إلغاء ضوضاء نشط ANC وصوت مكاني ثلاثي الأبعاد وتقنيات Hi-Res Lossless',
  },
  {
    id: 'smartwatches',
    nameAr: 'الساعات والأجهزة القابلة للارتداء',
    nameEn: 'Smartwatches',
    iconName: 'Watch',
    count: 15,
    descriptionAr: 'مستشعرات حيوية دقيقة لتخطيط القلب والأكسجين مع هياكل تيتانيوم مقاومة للغوص',
  },
  {
    id: 'gaming',
    nameAr: 'الألعاب وملحقاتها',
    nameEn: 'Gaming Gear',
    iconName: 'Gamepad2',
    count: 31,
    descriptionAr: 'لوحات مفاتيح ميكانيكية، ماوسات بصرية، وحدات تحكم لاسلكية وأحدث منصات الألعاب',
  },
  {
    id: 'chargers',
    nameAr: 'الشواحن والكابلات السريعة',
    nameEn: 'Fast Chargers & Cables',
    iconName: 'Zap',
    count: 42,
    descriptionAr: 'شواحن GaN فائقة السرعة بقدرة 100W و 240W وبنوك طاقة مغناطيسية متطورة',
  },
  {
    id: 'ai-devices',
    nameAr: 'أجهزة الذكاء الاصطناعي والروبوتات',
    nameEn: 'AI Hardware & Robotics',
    iconName: 'Cpu',
    count: 16,
    descriptionAr: 'معالجات NPU طرفية، أجهزة حوسبة عصبية، ومساعدات ذكاء اصطناعي فيزيائية مخصصة',
  },
  {
    id: 'security',
    nameAr: 'الأمن والمراقبة الذكية',
    nameEn: 'Security & Surveillance',
    iconName: 'ShieldCheck',
    count: 14,
    descriptionAr: 'كاميرات بدقة 4K مع رؤية ليلية بالألوان الكاملة وتعرف ذكي على الوجوه والمحركات',
  },
  {
    id: 'smart-home',
    nameAr: 'الأجهزة المنزلية الذكية',
    nameEn: 'Smart Home Automation',
    iconName: 'Home',
    count: 20,
    descriptionAr: 'أنظمة تحكم مركزية متوافقة مع Matter و Zigbee وحساسات استشعار بيئي',
  },
  {
    id: 'deals',
    nameAr: 'عروض اليوم الحصرية',
    nameEn: 'Exclusive Deals',
    iconName: 'Flame',
    count: 19,
    descriptionAr: 'خصومات مميزة تصل حتى 40% على أرقى المنتجات التقنية المعتمدة',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-phone-titanium',
    nameAr: 'هاتف Titan Pro X Cyber 5G',
    nameEn: 'Titan Pro X Cyber 5G Smartphone',
    brand: 'NexusTech',
    categoryId: 'smartphones',
    price: 3899,
    originalPrice: 4499,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 148,
    stock: 24,
    image: '/src/assets/images/phone_pro_titanium_1790518344761.jpg',
    gallery: [
      '/src/assets/images/phone_pro_titanium_1790518344761.jpg',
      '/src/assets/images/smartwatch_ultra_pro_1790518382717.jpg',
    ],
    descriptionAr: 'الهاتف الأقوى من الجيل القادم بإطار تيتانيوم من الدرجة الفضائية، شاشة Dynamic AMOLED 2X بمعدل تحديث 144Hz، مدعوم بمعالج عصبي NPU للذكاء الاصطناعي مع معالجة صور فورية بالتعلم العميق.',
    descriptionEn: 'Next-generation flagship smartphone with aerospace titanium frame, 144Hz Dynamic AMOLED display, and neural NPU engine for on-device AI tasks.',
    specs: {
      'المعالج': 'Snapdragon 8 Gen 4 AI (3nm)',
      'الذاكرة العشوائية': '16GB LPDDR5X',
      'سعة التخزين': '512GB UFS 4.0',
      'الشاشة': '6.8 بوصة OLED 144Hz HDR10+',
      'الكاميرا': '200MP رئيسية + 50MP زووم بصري 10x + 50MP فائقة الاتساع',
      'البطارية': '5400mAh مع شحن سريع 100W سلكي و 50W لاسلكي',
      'مقاومة الماء': 'معيار IP68 حتى عمق 6 أمتار'
    },
    colors: [
      { nameAr: 'تيتانيوم أسود فضائي', nameEn: 'Space Black Titanium', hex: '#1C1F26' },
      { nameAr: 'تيتانيوم أزرق محيطي', nameEn: 'Oceanic Blue Titanium', hex: '#1E3A8A' },
      { nameAr: 'فضي قطبي نقي', nameEn: 'Polar Silver', hex: '#CBD5E1' }
    ],
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    hasAi: true,
    sellerId: 'seller-official',
    sellerName: 'General Tech Store (المتجر الرسمي)',
    condition: 'new',
    warranty: 'سنتان ضمان الوكيل المعتمد واستبدال فوري'
  },
  {
    id: 'prod-laptop-workstation',
    nameAr: 'حاسوب المحترفين Blade AI Studio Pro',
    nameEn: 'Blade AI Studio Pro 16 Workstation',
    brand: 'ApexForge',
    categoryId: 'laptops',
    price: 7650,
    originalPrice: 8800,
    discountPercent: 15,
    rating: 4.95,
    reviewCount: 92,
    stock: 11,
    image: '/src/assets/images/laptop_ai_workstation_1790518357331.jpg',
    gallery: [
      '/src/assets/images/laptop_ai_workstation_1790518357331.jpg',
      '/src/assets/images/hero_tech_marketplace_1790518331028.jpg',
    ],
    descriptionAr: 'محطة عمل متنقلة موجهة لمهندسي الذكاء الاصطناعي والمصممين ثلاثيي الأبعاد وصناع المحتوى. جسم أحادي من الألومنيوم المؤكسد مع نظام تبريد بحجرة بخار مزدوجة ولوحة مفاتيح برمجية عالية الاستجابة.',
    descriptionEn: 'Flagship creator workstation tailored for AI local training, 3D render pipelines, and compiling heavy codebases with quiet dual-vapor chamber cooling.',
    specs: {
      'المعالج': 'Intel Core Ultra 9 285H (16 Cores, 5.4GHz)',
      'كرت الشاشة': 'NVIDIA GeForce RTX 5080 Laptop (16GB GDDR7, 175W TGP)',
      'الذاكرة العشوائية': '64GB DDR5 6400MHz',
      'وحدة التخزين': '2TB PCIe Gen 5 NVMe SSD',
      'الشاشة': '16 بوصة Mini-LED 4K 120Hz (100% DCI-P3, 1600 nits)',
      'الوزن': '1.98 كجم',
      'المنافذ': '2x Thunderbolt 5, HDMI 2.1, SD Express 7.0'
    },
    colors: [
      { nameAr: 'رمادي غامق كربوني', nameEn: 'Carbon Charcoal', hex: '#0F172A' },
      { nameAr: 'أزرق ليلي معدني', nameEn: 'Midnight Blue Metal', hex: '#1E293B' }
    ],
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    hasAi: true,
    sellerId: 'seller-official',
    sellerName: 'General Tech Store (المتجر الرسمي)',
    condition: 'new',
    warranty: '3 سنوات ضمان شامل ضد عيوب الصناعة'
  },
  {
    id: 'prod-headphones-hifi',
    nameAr: 'سماعات رأس لاسلكية SonicMatrix ANC Pro',
    nameEn: 'SonicMatrix ANC Pro Hi-Res Headphones',
    brand: 'AcousticAI',
    categoryId: 'audio',
    price: 1290,
    originalPrice: 1590,
    discountPercent: 19,
    rating: 4.85,
    reviewCount: 215,
    stock: 35,
    image: '/src/assets/images/audio_hifi_pro_1790518367687.jpg',
    gallery: [
      '/src/assets/images/audio_hifi_pro_1790518367687.jpg',
    ],
    descriptionAr: 'صوت سينمائي متكامل بنظام 8 ميكروفونات هجينة لإلغاء الضوضاء المحيطة حتى 48dB، مع مرمزات LDAC و aptX Lossless، ووسائد أذن من رغوة الذاكرة المغطاة بالجلد المبرد للارتداء طوال اليوم.',
    descriptionEn: 'Studio-grade wireless over-ear headphones with 48dB active noise cancellation, graphene drivers, lossless transmission, and 60-hour battery life.',
    specs: {
      'السواقات الصوتية': '40mm Graphene Composite Dynamic Drivers',
      'إلغاء الضوضاء': 'Adaptive Hybrid ANC حتى 48dB مع عزل ذكي للرياح',
      'عمر البطارية': '60 ساعة تشغيل (45 ساعة مع تفعيل ANC)',
      'الشحن السريع': '10 دقائق شحن تعطي 6 ساعات استماع',
      'الاتصال': 'Bluetooth 5.4 مع Multi-point (توصيل جهازين معاً)',
      'الوزن': '248 جرام'
    },
    colors: [
      { nameAr: 'أزرق كحلي عميق', nameEn: 'Deep Navy', hex: '#0B1E3F' },
      { nameAr: 'أسود فحمي غير لامع', nameEn: 'Matte Charcoal', hex: '#18181B' },
      { nameAr: 'فضي بلاتيني', nameEn: 'Platinum Mist', hex: '#E2E8F0' }
    ],
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    hasAi: true,
    sellerId: 'seller-audio-direct',
    sellerName: 'AudioMaster Hub',
    condition: 'new',
    warranty: 'سنة كاملة ضمان تبديل مع كابل مجاني'
  },
  {
    id: 'prod-smartwatch-titanium',
    nameAr: 'ساعة Apex Ultra Smart Titanium Watch',
    nameEn: 'Apex Ultra Smart Titanium Watch',
    brand: 'Chronos',
    categoryId: 'smartwatches',
    price: 1850,
    originalPrice: 2200,
    discountPercent: 16,
    rating: 4.88,
    reviewCount: 164,
    stock: 19,
    image: '/src/assets/images/smartwatch_ultra_pro_1790518382717.jpg',
    gallery: [
      '/src/assets/images/smartwatch_ultra_pro_1790518382717.jpg',
    ],
    descriptionAr: 'الساعة الذكية التكتيكية الأقوى المصنوعة من كتلة تيتانيوم صلبة مع زجاج ياقوتي لا يخدش. شاشة Micro-OLED بسطوع خارق 3000 nits تحت أشعة الشمس المباشرة، مع نظام GPS مزدوج التردد للرحلات والمغامرات.',
    descriptionEn: 'Rugged titanium adventure smartwatch with 3000-nit sapphire display, ECG and blood oxygen monitoring, dual-frequency GPS, and 100m water resistance.',
    specs: {
      'هيكل الساعة': 'تيتانيوم مصقول فئة 5 مقاوم للصدمات',
      'الزجاج': 'ياقوتي كريستالي Sapphire Crystal',
      'الشاشة': '1.96 بوصة Micro-OLED Always-On (3000 nits)',
      'المستشعرات': 'تخطيط قلب ECG، قياس SpO2، حرارة الجسم، مستشعر عمق وضغط الغوص',
      'البطارية': 'حتى 7 أيام استخدام طبيعي و 72 ساعة في وضع الرياضة',
      'المقاومة': '100 متر معيار الغوص EN13319'
    },
    colors: [
      { nameAr: 'حزام تيتانيوم كحلي رياضي', nameEn: 'Navy Sport Titanium', hex: '#0F2B5C' },
      { nameAr: 'حزام سيليكون برتقالي تكتيكي', nameEn: 'Tactical Orange', hex: '#EA580C' },
      { nameAr: 'حزام أسود حديدي', nameEn: 'Iron Black', hex: '#111827' }
    ],
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    hasAi: true,
    sellerId: 'seller-official',
    sellerName: 'General Tech Store (المتجر الرسمي)',
    condition: 'new',
    warranty: 'سنتان ضمان ضد الكسر والعيوب المصنعية'
  },
  {
    id: 'prod-ai-vision-hub',
    nameAr: 'منظومة الأمان الذكية AI Vision Sentry Hub 4K',
    nameEn: 'AI Vision Sentry Hub 4K Security System',
    brand: 'SecurAI',
    categoryId: 'security',
    price: 2150,
    originalPrice: 2600,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 78,
    stock: 14,
    image: '/src/assets/images/ai_smart_cam_hub_1790518393383.jpg',
    gallery: [
      '/src/assets/images/ai_smart_cam_hub_1790518393383.jpg',
    ],
    descriptionAr: 'منظومة حماية متقدمة تعمل محلياً بذكاء اصطناعي مشفر دون الحاجة لاشتراك سحابي. تتعرف على الوجوه، الحيوانات الأليفة، والطرود البريدية والمركبات فوراً مع إنذار صوتي وضوئي ذكي ورؤية ليلية ملونة بدقة 4K.',
    descriptionEn: 'On-device AI security hub with 4K color night vision, neural face recognition, local encrypted storage, and zero subscription fees.',
    specs: {
      'دقة التصوير': '4K Ultra HD (3840 x 2160) بـ 30 إطار/ثانية',
      'الرؤية الليلية': 'Full-Color Starlight Night Vision مع كشاف مدمج 1000 لومن',
      'التخزين المحلي': 'سعة مدمجة 1TB SSD مشفر بـ AES-256',
      'الذكاء الاصطناعي': 'معالجة محلية بالكامل للوجوه ولوحات السيارات دون إرسال للخوادم',
      'مقاومة الطقس': 'IP67 من -25 درجة مئوية إلى 60 درجة مئوية',
      'البطارية والتغذية': 'تعمل بالطاقة الشمسية مع بطارية مدمجة تدوم 365 يوماً'
    },
    colors: [
      { nameAr: 'جرافيت ليلي داكن', nameEn: 'Night Graphite', hex: '#1E293B' },
      { nameAr: 'أبيض سيراميكي غير لامع', nameEn: 'Matte Ceramic White', hex: '#F8FAFC' }
    ],
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    hasAi: true,
    sellerId: 'seller-smart-defense',
    sellerName: 'TechGuard Solutions',
    condition: 'new',
    warranty: 'سنتان ضمان صيانة ودعم فني وتركيب متاح'
  },
  {
    id: 'prod-gan-fast-charger',
    nameAr: 'شاحن GaN فائق السرعة HyperVolt 140W Dual',
    nameEn: 'HyperVolt 140W GaN Fast Charger',
    brand: 'PowerMatrix',
    categoryId: 'chargers',
    price: 340,
    originalPrice: 420,
    discountPercent: 19,
    rating: 4.82,
    reviewCount: 310,
    stock: 58,
    image: '/src/assets/images/phone_pro_titanium_1790518344761.jpg',
    descriptionAr: 'شاحن نيتريد الغاليوم (GaN) الثوري بحجم أصغر بنسبة 45% من الشواحن التقليدية. يشحن لابتوبك وهاتفك وجهازك اللوحي في نفس اللحظة بأعلى سرعة مدعومة ببروتوكول PD 3.1 مع حماية حرارية متقدمة.',
    descriptionEn: 'Compact 140W GaN power adapter supporting Power Delivery 3.1, multiple smart distribution ports, and intelligent temperature safety management.',
    specs: {
      'القدرة الإجمالية': '140 واط مع بروتوكول PD 3.1',
      'المنافذ': '3x USB-C + 1x USB-A سريع',
      'تقنية التبريد': 'GaNFast V مع تشتيت حراري سيليكوني',
      'التوافق': 'شحن كامل لـ MacBook Pro 16 و iPhone و Galaxy و iPad'
    },
    colors: [
      { nameAr: 'أسود كربوني مطفأ', nameEn: 'Matte Carbon', hex: '#18181B' },
      { nameAr: 'أزرق كوني كهربائي', nameEn: 'Cosmic Blue', hex: '#0284C7' }
    ],
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    hasAi: false,
    sellerId: 'seller-official',
    sellerName: 'General Tech Store (المتجر الرسمي)',
    condition: 'new',
    warranty: 'سنة ضمان ضد ارتفاع الجهد أو التلف'
  },
  {
    id: 'prod-monitor-oled-gaming',
    nameAr: 'شاشة الألعاب المنحنية VisionCurve Quantum 34" OLED',
    nameEn: 'VisionCurve Quantum 34" Curved OLED Monitor',
    brand: 'NexusTech',
    categoryId: 'monitors',
    price: 4350,
    originalPrice: 5100,
    discountPercent: 15,
    rating: 4.93,
    reviewCount: 64,
    stock: 8,
    image: '/src/assets/images/laptop_ai_workstation_1790518357331.jpg',
    descriptionAr: 'شاشة OLED ألترا وايد فائقة الاستجابة بمعدل تحديث 240Hz وزمن استجابة 0.03ms، مع انحناءة مثالية 1800R وتغطية ألوان سينمائية 99.3% DCI-P3 لمحترفي الألعاب وإنتاج الفيديو.',
    descriptionEn: 'Ultrawide 34-inch QD-OLED display with 240Hz refresh rate, 0.03ms response time, 1800R curvature, and True Black 400 certification.',
    specs: {
      'الحجم والدقة': '34 بوصة UWQHD (3440 x 1440)',
      'نوع اللوحة': 'Quantum Dot OLED مع سواد حقيقي مطلق',
      'معدل التحديث': '240Hz مع دعم G-Sync و FreeSync Premium Pro',
      'زمن الاستجابة': '0.03ms (GtG)',
      'المنافذ': 'DisplayPort 2.1, 2x HDMI 2.1, USB-C 90W Power Delivery'
    },
    colors: [
      { nameAr: 'رمادي تيتانيوم داكن', nameEn: 'Dark Titanium', hex: '#1E293B' }
    ],
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    hasAi: false,
    sellerId: 'seller-official',
    sellerName: 'General Tech Store (المتجر الرسمي)',
    condition: 'new',
    warranty: '3 سنوات ضمان ضد احتراق الشاشة وتلف البيكسلات'
  },
  {
    id: 'prod-ai-companion-robot',
    nameAr: 'وحدة الذكاء الاصطناعي الطرفي NeuralCore Edge Node',
    nameEn: 'NeuralCore Edge Node AI Accelerator',
    brand: 'SynapseLabs',
    categoryId: 'ai-devices',
    price: 3100,
    originalPrice: 3500,
    discountPercent: 11,
    rating: 4.92,
    reviewCount: 43,
    stock: 12,
    image: '/src/assets/images/ai_smart_cam_hub_1790518393383.jpg',
    descriptionAr: 'خادم ذكاء اصطناعي مصغر للمكاتب الذكية والمطورين لتشغيل نماذج LLM ونماذج الرؤية الحاسوبية محلياً دون إرسال البيانات إلى السحابة، مع دعم كامل لـ Ollama و PyTorch و Docker.',
    descriptionEn: 'Miniature edge AI accelerator for running open-source local LLMs, private inference pipelines, and vision models with zero cloud latency.',
    specs: {
      'قدرة الحوسبة العصبية': '100 TOPS NPU AI Accelerator',
      'الذاكرة الموحدة': '32GB LPDDR5 Unified High-Bandwidth',
      'استهلاك الطاقة': 'فائق الكفاءة بمتوسط 35 واط فقط',
      'نظام التشغيل': 'NeuralOS مخصص مبني على Linux Kernel'
    },
    colors: [
      { nameAr: 'أزرق كوانتوم مع حلقة إضاءة سيان', nameEn: 'Quantum Blue Cyan', hex: '#0369A1' }
    ],
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    hasAi: true,
    sellerId: 'seller-ai-direct',
    sellerName: 'NextGen AI Labs',
    condition: 'new',
    warranty: 'سنتان دعم برمجي وهاردوير متواصل'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-101',
    orderNumber: 'GTH-89421',
    createdAt: '2026-09-26T14:30:00Z',
    status: 'in_transit',
    customer: {
      fullName: 'أحمد محمود التميمي',
      phone: '+966 55 123 4567',
      email: 'ahmed.tamimi@example.com',
      governorate: 'الرياض',
      city: 'الرياض',
      address: 'حي النرجس، شارع الأمير فيصل بن بندر، عمارة 42',
      notes: 'يرجى الاتصال قبل الوصول بنصف ساعة'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedColor: 'تيتانيوم أسود فضائي'
      },
      {
        product: INITIAL_PRODUCTS[5],
        quantity: 1,
        selectedColor: 'أسود كربوني مطفأ'
      }
    ],
    paymentMethod: 'cod',
    subtotal: 4239,
    shipping: 0,
    discount: 100,
    total: 4139,
    estimatedDelivery: 'خلال 24-48 ساعة (اليوم أو غداً)',
    trackingUpdates: [
      {
        status: 'received',
        titleAr: 'تم استلام الطلب وتأكيد البيانات',
        descriptionAr: 'تم استلام طلبك بنجاح من خلال بوابة General Tech Hub Pro',
        timestamp: '26 سبتمبر 2026 - 02:30 م',
        completed: true
      },
      {
        status: 'processing',
        titleAr: 'جاري فحص المنتجات والتجهيز في المستودع المركزي',
        descriptionAr: 'تم فحص جودة الأجهزة ومطابقة الأرقام التسلسلية والتغليف الآمن',
        timestamp: '26 سبتمبر 2026 - 04:15 م',
        completed: true
      },
      {
        status: 'shipped',
        titleAr: 'تم تسليم الشحنة لشركة النقل السريع',
        descriptionAr: 'تم إصدار بوليصة الشحن مع الشريك اللوجستي المعتمد',
        timestamp: '27 سبتمبر 2026 - 09:00 ص',
        completed: true
      },
      {
        status: 'in_transit',
        titleAr: 'الشحنة في طريقها مع مندوب التوصيل',
        descriptionAr: 'المندوب في نطاق منطقتك وسيصل إليك اليوم قبل الساعة 6 مساءً',
        timestamp: '27 سبتمبر 2026 - 11:45 ص',
        completed: true
      },
      {
        status: 'delivered',
        titleAr: 'تم التسليم بنجاح للعميل',
        descriptionAr: 'سيتم تأكيد الاستلام واستلام الإيصال المعتمد',
        timestamp: 'الموعد المتوقع: اليوم 04:30 م',
        completed: false
      }
    ]
  },
  {
    id: 'order-102',
    orderNumber: 'GTH-91204',
    createdAt: '2026-09-27T08:15:00Z',
    status: 'processing',
    customer: {
      fullName: 'سارة خالد الدوسري',
      phone: '+966 50 987 6543',
      email: 'sara.aldosari@example.com',
      governorate: 'المنطقة الشرقية',
      city: 'الخبر',
      address: 'حي الحزام الذهبي، شارع الملك عبد الله',
      notes: ''
    },
    items: [
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        selectedColor: 'أزرق كحلي عميق'
      }
    ],
    paymentMethod: 'card',
    subtotal: 1290,
    shipping: 0,
    discount: 0,
    total: 1290,
    estimatedDelivery: '28 سبتمبر 2026',
    trackingUpdates: [
      {
        status: 'received',
        titleAr: 'تم استلام وتأكيد الدفع الإلكتروني',
        descriptionAr: 'تم تأكيد العملية المصرفية وإرسال الفاتورة عبر البريد',
        timestamp: '27 سبتمبر 2026 - 08:15 ص',
        completed: true
      },
      {
        status: 'processing',
        titleAr: 'جاري تجهيز الشحنة وفحص الجودة',
        descriptionAr: 'يتم تجهيز المنتج في المركز اللوجستي',
        timestamp: '27 سبتمبر 2026 - 09:30 ص',
        completed: true
      },
      {
        status: 'shipped',
        titleAr: 'تسليم الشحنة لشركة التوصيل',
        descriptionAr: 'في انتظار الاستلام من المستودع',
        timestamp: 'متوقع اليوم 05:00 م',
        completed: false
      },
      {
        status: 'in_transit',
        titleAr: 'في الطريق إلى الخبر',
        descriptionAr: 'شحن بري سريع ومباشر',
        timestamp: 'متوقع غداً',
        completed: false
      },
      {
        status: 'delivered',
        titleAr: 'التسليم للعميل',
        descriptionAr: 'التسليم المباشر على العنوان',
        timestamp: '28 سبتمبر 2026',
        completed: false
      }
    ]
  }
];

export const INITIAL_SELLER: Seller = {
  id: 'seller-official',
  storeName: 'General Tech Store (المتجر الرسمي)',
  ownerName: 'م. عبد الرحمن كامل',
  email: 'store@generaltechhub.pro',
  phone: '+966 55 000 1234',
  rating: 4.98,
  totalSales: 1420,
  revenue: 845200,
  activeProductsCount: 8,
  joinedDate: '2025-01-10',
  verified: true
};
