// Vactech images
import vactechSuction from "@/assets/products/vactech-suction-apparatus.jpg";
import vactechAutoclave from "@/assets/products/vactech-autoclave.jpg";
import vactechAnaesthesia from "@/assets/products/vactech-anaesthesia.jpg";
import vactechFogger from "@/assets/products/vactech-fogger.jpg";
import vactechLedLight from "@/assets/products/vactech-led-ot-light.jpg";

// Aastha Meditec images
// import aasthaOT from "@/assets/products/aastha-operation-theatre.jpg";
// import aasthaICU from "@/assets/products/aastha-icu-solutions.jpg";
// import aasthaIVF from "@/assets/products/aastha-ivf-lab.jpg";
// import aasthaNICU from "@/assets/products/aastha-nicu.jpg";
// import aasthaCathLab from "@/assets/products/aastha-cath-lab.jpg";
// import aasthaInterior from "@/assets/products/aastha-interior.jpg";
// import aasthaSterileDoors from "@/assets/products/aastha-sterile-doors.jpg";
// import aasthaBedHead from "@/assets/products/aastha-bed-head-panel.jpg";

// G-Aim images
import gaimInstantCoffee from "@/assets/products/gaim-instant-coffee.jpg";
import gaimFilterCoffee from "@/assets/products/gaim-filter-coffee.jpg";
import RoastedBeans from "@/assets/products/RoastedBeans.png";
// Farm Growers images
import farmGranola from "@/assets/products/farm-granola-bar.jpg";
// import farmCrackers from "@/assets/products/farm-millet-crackers.jpg";
import farmJowarPuff from "@/assets/products/farm-millet-crackers.jpg";
import farmCookies from "@/assets/products/farm-millet-cookies.jpg";

// Success Plus images
import successProducts from "@/assets/products/success-plastic-products.jpg";

// HOTSHOT images
import hotshotProducts from "@/assets/products/hotshot-products.jpg";

// Condom Products images
const dots1600 = "/img/products/1600-dots.png";
const textured3in1 = "/img/products/3in1-textured.png";
const delay4in1 = "/img/products/4in1-delay.png";
const bananaCondom = "/img/products/banana-condom.png";
const champagneCondom = "/img/products/champagne-condom.png";
const chocolateCondom = "/img/products/chocolate-condom.png";
const redwineCondom = "/img/products/redwine-condom.png";
const strawberryCondom = "/img/products/strawberry-condom.png";
const superDotted = "/img/products/super-dotted.png";
const ultraThin = "/img/products/ultra-thin.png";
const whiskeyCondom = "/img/products/whiskey-condom.png";
// import gaimFilterCoffee from "@/assets/products/gaim-filter-coffee.jpg";

// Logos
import vactechLogo from "@/assets/logos/vactech-logo.jpg";
import aasthaLogo from "@/assets/logos/aastha-logo.jpg";
import gaimLogo from "@/assets/logos/gaim-logo.jpg";
import farmGrowersLogo from "@/assets/logos/farm-growers-logo.jpg";
import successPlusLogo from "@/assets/logos/success-plus-logo.jpg";
import hotshotLogo from "@/assets/logos/hotshot-logo.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  variants?: string[];
}

export interface Company {
  id: string;
  name: string;
  tagline: string;
  started: string;
  overview: string;
  sector: string;
  color: string;
  logo: string;
  products: Product[];
}

export const companies: Company[] = [
  {
    id: "vactech",
    name: "Vactech",
    tagline: "Advanced Medical & Industrial Equipment Solutions",
    started: "1999",
    overview:
      "Vactech Surgical Equipment describes itself as an Indian manufacturer and exporter focused on hospital equipment. The company says it began in 1999 with a core objective of building noiseless suction apparatus systems. Its current range covers suction units, OT lights, anesthesia apparatus, autoclaves, and aerosol disinfection products for clinical use.",
    sector: "Medical Equipment",
    color: "hsl(217 71% 45%)",
    logo: vactechLogo,
    products: [
      {
        id: "vt-001",
        name: "Suction Apparatus",
        description: "High-performance medical suction apparatus for hospitals and clinics. Designed for reliable continuous and intermittent suction with adjustable vacuum pressure.",
        image: vactechSuction,
        category: "Medical",
      },
      {
        id: "vt-002",
        name: "Autoclave",
        description: "Hospital-grade steam sterilizer autoclave for surgical instruments and medical supplies. Stainless steel chamber with digital controls and safety interlocks.",
        image: vactechAutoclave,
        category: "Sterilization",
      },
      {
        id: "vt-003",
        name: "Anaesthesia Apparatus",
        description: "Advanced anaesthesia workstation with integrated ventilator, multi-parameter monitoring, and precision vaporizer for safe patient sedation.",
        image: vactechAnaesthesia,
        category: "Medical",
      },
      {
        id: "vt-004",
        name: "Fogger",
        description: "Industrial-grade disinfection fogger machine for large area sanitization. Suitable for hospitals, factories, and public spaces with adjustable mist output.",
        image: vactechFogger,
        category: "Sanitization",
      },
      {
        id: "vt-005",
        name: "LED Operation Room Light",
        description: "High-intensity LED surgical ceiling light with shadow-free illumination, adjustable color temperature, and long operational life for modern operating theatres.",
        image: vactechLedLight,
        category: "OT Equipment",
      },
    ],
  },
  {
    id: "hotshot",
    name: "HOTSHOT",
    tagline: "Premium Intimate Wellness Products",
    started: "2024",
    overview:
      "HOTSHOT brings a premium range of intimate wellness products designed for safety, comfort, and pleasure. Our collection features high-quality latex condoms in various textures and flavors, ensuring the highest standards of protection and reliability for a better experience.",
    sector: "Wellness & Protection",
    color: "hsl(340 80% 50%)",
    logo: hotshotLogo,
    products: [
      {
        id: "hs-001",
        name: "1600 Dots Condoms",
        description: "Experience enhanced stimulation with 1600 raised dots for maximum intensity and pleasure. Premium quality latex for safety and comfort.",
        image: dots1600,
        category: "Textured",
      },
      {
        id: "hs-002",
        name: "3-in-1 Textured",
        description: "The ultimate combination of dots, ribs, and contoured shape for varied sensations and a superior intimate experience.",
        image: textured3in1,
        category: "Textured",
      },
      {
        id: "hs-003",
        name: "4-in-1 Delay",
        description: "Specially formulated for extended performance and pleasure, featuring a combination of texture and delay technology.",
        image: delay4in1,
        category: "Performance",
      },
      {
        id: "hs-004",
        name: "Super Dotted",
        description: "Strategically placed dots for targeted stimulation and enhanced pleasure without compromising on safety.",
        image: superDotted,
        category: "Textured",
      },
      {
        id: "hs-005",
        name: "Ultra Thin",
        description: "Feel everything with our ultra-thin latex design. Provides a natural feel while maintaining high strength and reliability.",
        image: ultraThin,
        category: "Classic",
      },
      {
        id: "hs-006",
        name: "Banana Flavor",
        description: "Sweet and tropical banana flavored condoms for a fun and aromatic intimate session. Made with safe food-grade flavors.",
        image: bananaCondom,
        category: "Flavored",
      },
      {
        id: "hs-007",
        name: "Chocolate Flavor",
        description: "Indulge in the rich and smooth aroma of chocolate. Adds a delicious twist to your protection with premium flavored latex.",
        image: chocolateCondom,
        category: "Flavored",
      },
      {
        id: "hs-008",
        name: "Strawberry Flavor",
        description: "A classic favorite with the sweet scent of fresh strawberries. High-quality protection with a delightful fruity aroma.",
        image: strawberryCondom,
        category: "Flavored",
      },
      {
        id: "hs-009",
        name: "Red Wine Flavor",
        description: "Elegant and sophisticated red wine aroma for a unique and romantic atmosphere. Premium protection with a touch of luxury.",
        image: redwineCondom,
        category: "Flavored",
      },
      {
        id: "hs-010",
        name: "Whiskey Flavor",
        description: "A bold and distinctive whiskey flavored condom for those seeking a unique and adventurous experience.",
        image: whiskeyCondom,
        category: "Flavored",
      },
      {
        id: "hs-011",
        name: "Champagne Flavor",
        description: "Celebrate intimacy with the bubbly and light aroma of champagne. Premium quality for special moments.",
        image: champagneCondom,
        category: "Flavored",
      },
    ],
  },
  {
    id: "g-aim",
    name: "Premium Coffee",
    tagline: "Premium Coffee - From Bean to Cup",
    started: "2024",
    overview:
      "G-Aim Internationals presents itself as an export-focused coffee company based in Pune with sourcing links to Indian coffee-growing regions. Its profile emphasizes direct farmer relationships, quality checks from grading to packaging, and traceable supply. Public business listings for the same brand report establishment in 2024 with a focus on global coffee buyers.",
    sector: "Coffee & Beverages",
    color: "hsl(30 60% 30%)",
    logo: gaimLogo,
    products: [
      {
        id: "ga-001",
        name: "Premium Instant Coffee",
        description: "Rich, aromatic instant coffee made from carefully selected Arabica and Robusta beans. Freeze-dried for maximum flavor retention and quick dissolving convenience.",
        image: gaimInstantCoffee,
        category: "Instant Coffee",
      },
      {
        id: "ga-002",
        name: "Filter Coffee",
        description: "Authentic South Indian filter coffee powder crafted from premium plantation beans. Perfectly roasted and ground for a bold, smooth decoction with traditional flavor.",
        image: gaimFilterCoffee,
        category: "Filter Coffee",
      },
      {
        id: "ga-003",
        name: "Roasted Beans",
        description: "Freshly roasted coffee beans from India, crafted for bold aroma, rich body, and consistent cup quality.",
        image: RoastedBeans,
        category: "Roasted Beans",
      },
    ],
  },
  {
    id: "farm-growers",
    name: "Farm Growers",
    tagline: "Healthy Millet-Based Snacks & Foods",
    started: "2020 (Pasmo Global Trade LLP)",
    overview:
      "Farm Growers is presented as a seed-to-snack initiative by Pasmo Global Trade LLP and associated with Booster Plant Genetics. The brand narrative focuses on millet-first nutrition, baked-not-fried snacks, and ingredient quality from the seed stage onward. Its model emphasizes direct farmer collaboration, cleaner processing practices, and healthier everyday snacking.",
    sector: "Health Foods",
    color: "hsl(120 50% 35%)",
    logo: farmGrowersLogo,
    products: [
      {
        id: "fg-001",
        name: "Millet Granola Bar",
        description: "Nutritious millet-based granola bars packed with wholesome goodness. Made with natural ingredients for a healthy on-the-go snack.",
        image: farmGranola,
        category: "Granola Bars",
        variants: ["Cranberry", "Orange", "Fruit n Nut"],
      },
      // {
      //   id: "fg-002",
      //   name: "Millet Crackers",
      //   description: "Crunchy millet crackers baked to perfection. A guilt-free savory snack with bold flavors and the nutritional benefits of millets.",
      //   image: farmCrackers,
      //   category: "Crackers",
      //   variants: ["Peri Peri", "Cheese", "Swadesh Masala"],
      // },
      {
        id: "fg-003",
        name: "Jowar Puff",
        description: "Light and crispy jowar (sorghum) puffs that are naturally gluten-free. A healthy alternative to regular chips with exciting flavors.",
        image: farmJowarPuff,
        category: "Puffs",
        variants: ["Peri Peri", "Cheese", "Swadesh Masala"],
      },
      {
        id: "fg-004",
        name: "Millet Cookies",
        description: "Wholesome cookies made with ragi and other millet flours. Deliciously baked with natural ingredients for a healthier treat.",
        image: farmCookies,
        category: "Cookies",
        variants: ["Ragi Choco", "Orange"],
      },
    ],
  },
  {
    id: "success-plus",
    name: "Success Plus",
    tagline: "Precision Plastic Injection Molding & Manufacturing",
    started: "Not publicly listed",
    overview:
      "Success Plus is positioned as a precision plastic injection molding partner serving industrial and commercial product requirements. The portfolio highlights production capability across multiple machine tonnage classes and custom molded output. Its offering is aimed at repeatable, quality-focused manufacturing for scaled component supply.",
    sector: "Manufacturing",
    color: "hsl(0 70% 45%)",
    logo: successPlusLogo,
    products: [
    
      {
        id: "sp-005",
        name: "Injection Molded Products",
        description: "Wide range of custom injection molded plastic products including industrial components, consumer goods, automotive parts, and precision-engineered plastic solutions.",
        image: successProducts,
        category: "Our Products",
      },
    ],
  },
];
