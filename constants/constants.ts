import { ILang } from "@/types/lang";

export const BASE_URL='https://egypt-green-api.vercel.app/api';

export const Languages: ILang[] = [
    { code: "en", name: "English", flag: "/icons/enFlag.svg" },
    { code: "ar", name: "Arabic", flag: "/icons/arFlag.svg" },
    { code: "fr", name: "French", flag: "/icons/frFlag.svg" },
];

export const translations:any = {
    hero: {
      badge: {
        en: "We are Producing Natural Products",
        ar: "نحن ننتج منتجات طبيعية",
        fr: "Nous Produisons des Produits Naturels",
      },
      title: {
        en: "Cultivating Trust, Harvesting Success Premium Agricultural Fertilizers & Soil Conditioners from Egypt to Africa & Asia",
        ar: `نزرع الثقة ... لنحصد النجاح مخصبات زراعية من قلب مصر خصيصاً إلى تربة أفريقيا والخليج`,
        fr: "Cultivons la Confiance, Récoltons le Succès Engrais Agricoles & Amendements de Sol Premium d'Égypte vers l'Afrique et l'Asie",
      },
      subtitle: {
        en: "We manufacture and export high-quality fertilizers and soil amendments to treat soil diseases, enhance soil properties, and boost crop yield Supporting farmers from planting to harvest",
        ar:`نقوم بتصنيع وتصدير أسمدة ومخصبات زراعية لعلاج أمراض التربة، وتحسين خواص التربة، وتعزيز إنتاجية المحاصيل بجودة عالية، من الزراعة حتى الحصاد`,
        fr: "Nous fabriquons et exportons des engrais et amendements de haute qualité pour traiter les maladies du sol, améliorer ses propriétés, et booster le rendement des cultures avec des solutions égyptiennes. ",
      },
      cta1: {
        en: "Discover More",
        ar: "اكتشف المزيد",
        fr: "Découvrir Plus",
      },
      cta2: {
        en: "Become a Local Agent",
        ar: "كن وكيل في بلدك",
        fr: "Devenir Agent Local",
      },
    },
    features: {
      title: {
        en: "Why Choose Egypt Green",
        ar: "لماذا تختار ايجبت جرين",
        fr: "Pourquoi Choisir Ecoland",
      },
      organic: {
        title: {
          en: "Customized Soil Solutions for Africa & Asia",
          ar: "حلول مخصصة لتربة أفريقيا و آسيا",
          fr: "Solutions Sur-Mesure pour les Sols d'Afrique & d'Asie",
        },
        description: {
          en: `Premium agricultural inputs engineered for regional        climate challenges 
                Combating soil diseases, Enhancing fertility, and boosting crop resilience across Africa and Asia`,
          ar: `منتجات مصممة لتناسب الظروف المناخية
                والتحديات الزراعية في أفريقيا والخليج.`,
          fr: `Formulées pour les défis climatiques et l'amélioration de la fertilité des sols.`,
        },
      },
      quality: {
        title: {
          en: "Many Years of Global Trust in Agricultural Excellence",
          ar: "سنوات من الثقة في الأسواق",
          fr: "Des Années de Confiance Mondiale en Excellence Agricole",
        },
        description: {
          en: "With over 15 years of expertise in manufacturing premium agricultural fertilizers and soil conditioners for international markets",
          ar: ` بخدمة أكثر من 60 عميلًا محلياً ودولياً،
                وبخبرة تزيد عن 15 عام في تصنيع المخصبات والأسمدة الزراعية.`,
          fr: "Fort de plus de 15 ans d'expertise dans la fabrication d'engrais agricoles premium et d'amendements de sol pour les marchés internationaux",
        },
      },
      support: {
        title: {
          en: "Expert Support",
          ar: "جودة موثوقة في كل بيئة",
          fr: "Support Expert",
        },
        description: {
          en: "Professional agricultural advice and technical support",
          ar: ` منتجاتنا تخضع لاختبارات حقلية دقيقة، 
وتثبت كفاءتها في مختلف أنواع التربة والمناخات الزراعية.
`,
          fr: "Conseils agricoles professionnels et support technique",
        },
      },
      sustainable: {
        title: {
          en: "Sustainable Farming",
          ar: "دعم فنى وتسويقى ",
          fr: "Agriculture Durable",
        },
        description: {
          en: "Solutions that promote long-term agricultural sustainability",
          ar:` إرشاد زراعي دوري، 
نقدم للوكلاء والفنيين مواد تسويقية، ومتابعة دائمة
`,
          fr: "Solutions qui favorisent la durabilité agricole à long terme",
        },
      },
    },
    products: {
      title: {
        en: "Our Featured Products",
        ar: "منتجاتنا المميزة",
        fr: "Nos Produits Vedettes",
      },
      viewAll: {
        en: "View All Products",
        ar: "عرض جميع المنتجات",
        fr: "Voir Tous Les Produits",
      },
    },
}
