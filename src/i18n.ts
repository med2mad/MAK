import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        // Navigation
        yourCart: "Your Cart",
        freeDelivery: "Free delivery",
        
        // Cart
        total: "Total",
        yourInformations: "Your Informations",
        fullName: "Full Name",
        phoneNumber: "Phone Number",
        email: "Email",
        couponCode: "Coupon Code",
        shippingAddress: "Shipping Address",
        submitOrder: "Submit Order",
        
        // Banner
        natural: "100% natural",
        discoverArganOil: "Discover Moroccan Argan Oil with \"KATY\"",
        arganOilDescription: "In the argan oil production process there are no additives or shortcuts. All hand made and natural.",
        shopNow: "Shop Now",
        foodAndBeauty: "Food and beauty",
        shopCollection: "Shop Collection",
        bakedCleanProducts: "Baked & clean products",
        
        // Products
        trendingProducts: "Trending Products",
        
        // Ads
        upto25Off: "Upto 25% Off",
        honey: "Honey",
        honeyDescription: "Very tasty, from our cozy garden.",
        organic100: "100% Organic",
        organicDescription: "From a farm, natural ingredients only.",
        showNow: "Shop Now",
        
        // Blog
        ourRecentBlogs: "Our Recent Blogs",
        readAllArticles: "Read All Articles",
        tipsTricks: "tips & tricks",
        trending: "trending",
        inspiration: "inspiration",
        aboutMe: "About me",
        aboutMeContent: "As a young ambassador, I am an active member of the Morocco-China Association, enthusiastically participating in conferences and events across Beijing, Xian, Yulin and Shanghai.",
        moroccanJourney: "A Moroccan Journey for Chinese Visitors",
        moroccanJourneyContent: "I invite Chinese visitors to discover our country, its culture and way of life. They'll get to experience authentic moments and participate in traditional activities.",
        professionalIdentity: "My professional identity",
        professionalIdentityContent: "I obtained my master's degree in Xian, specializing in teaching Chinese as a second language to foreigners. I had experience teaching Chinese language at Hassan 2 University and London Academy, and also teaching Arabic language at the primary school of Shanghai International Studies University."
      }
    },
    fr: {
      translation: {
        // Navigation
        yourCart: "Votre Panier",
        freeDelivery: "Livraison gratuite",
        
        // Cart
        total: "Total",
        yourInformations: "Vos Informations",
        fullName: "Nom Complet",
        phoneNumber: "Numéro de Téléphone",
        email: "Email",
        couponCode: "Code de Réduction",
        shippingAddress: "Adresse de Livraison",
        submitOrder: "Passer la Commande",
        
        // Banner
        natural: "100% naturel",
        discoverArganOil: "Découvrez l'huile d'argan marocaine avec \"KATY\"",
        arganOilDescription: "Dans le processus de production de l'huile d'argan, il n'y a aucun additif ou raccourci. Tout est fait à la main et naturel.",
        shopNow: "Acheter Maintenant",
        foodAndBeauty: "Nourriture et beauté",
        shopCollection: "Voir la Collection",
        bakedCleanProducts: "Produits cuits & propres",
        
        // Products
        trendingProducts: "Produits Tendances",
        
        // Ads
        upto25Off: "Jusqu'à 25% de Réduction",
        honey: "Miel",
        honeyDescription: "Très savoureux, de notre jardin confortable.",
        organic100: "100% Biologique",
        organicDescription: "D'une ferme, uniquement des ingrédients naturels.",
        showNow: "Acheter Maintenant",
        
        // Blog
        ourRecentBlogs: "Nos Derniers Blogs",
        readAllArticles: "Lire Tous les Articles",
        tipsTricks: "astuces & conseils",
        trending: "tendance",
        inspiration: "inspiration",
        aboutMe: "À propos de moi",
        aboutMeContent: "En tant que jeune ambassadeur, je suis un membre actif de l'Association Maroc-Chine, participant avec enthousiasme à des conférences et événements à travers Beijing, Xian, Yulin et Shanghai.",
        moroccanJourney: "Un Voyage Marocain pour les Visiteurs Chinois",
        moroccanJourneyContent: "J'invite les visiteurs chinois à découvrir notre pays, sa culture et son mode de vie. Ils pourront vivre des moments authentiques et participer à des activités traditionnelles.",
        professionalIdentity: "Mon identité professionnelle",
        professionalIdentityContent: "J'ai obtenu mon master à Xian, spécialisé dans l'enseignement du chinois comme langue seconde aux étrangers. J'ai eu l'expérience d'enseigner la langue chinoise à l'Université Hassan II et à la London Academy, et aussi d'enseigner la langue arabe à l'école primaire de l'Université des études internationales de Shanghai."
      }
    },
    ch: {
      translation: {
        // Navigation
        yourCart: "您的购物车",
        freeDelivery: "免费送货",
        
        // Cart
        total: "总计",
        yourInformations: "您的信息",
        fullName: "全名",
        phoneNumber: "电话号码",
        email: "电子邮件",
        couponCode: "优惠券代码",
        shippingAddress: "送货地址",
        submitOrder: "提交订单",
        
        // Banner
        natural: "100% 天然",
        discoverArganOil: "与\"KATY\"一起探索摩洛哥坚果油",
        arganOilDescription: "在摩洛哥坚果油的生产过程中没有任何添加剂或捷径。全部手工制作且天然。",
        shopNow: "立即购买",
        foodAndBeauty: "食品与美容",
        shopCollection: "查看系列",
        bakedCleanProducts: "烘焙和清洁产品",
        
        // Products
        trendingProducts: "热门产品",
        
        // Ads
        upto25Off: "高达25%折扣",
        honey: "蜂蜜",
        honeyDescription: "非常美味，来自我们舒适的花园。",
        organic100: "100% 有机",
        organicDescription: "来自农场，仅使用天然成分。",
        showNow: "立即购买",
        
        // Blog
        ourRecentBlogs: "我们的最新博客",
        readAllArticles: "阅读所有文章",
        tipsTricks: "提示与技巧",
        trending: "趋势",
        inspiration: "灵感",
        aboutMe: "关于我",
        aboutMeContent: "作为年轻的摩洛哥-中国协会大使，我积极参与在北京、西安、榆林和上海等地举办的会议和活动。",
        moroccanJourney: "中国游客的摩洛哥之旅",
        moroccanJourneyContent: "我邀请中国游客来探索我们的国家、文化和生活方式。他们将体验真实的时刻并参与传统活动。",
        professionalIdentity: "我的专业身份",
        professionalIdentityContent: "我在西安获得了硕士学位，专业是向外国人教授汉语作为第二语言。我有在哈桑二世大学和伦敦学院教授汉语的经验，也在上海外国语大学附属小学教授阿拉伯语。"
      }
    }
  }
});

export default i18n;