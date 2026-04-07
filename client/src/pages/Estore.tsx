// import { motion } from "framer-motion";
// import GlassCard from "../components/GlassCard";
// // import BackgroundEffects from "../components/BackgroundEffects";
// import GlitchText from "../components/GlitchText";
// import { useState } from "react";
// // Using public path instead of import for image
// const img1 = "/img/products/led-display.jpg";


// const Estore = () => {
//   const [showAllProducts, setShowAllProducts] = useState(false);
//   const [activeCategory, setActiveCategory] = useState("All Products");

//   const categories = [
//     {
//       name: "Electronics & Components",
//       count: 6,
//       icon: "fa-microchip",
//       color: "from-accent-500 to-accent-600",
//     },
//     {
//       name: "Industrial Equipment",
//       count: 4,
//       icon: "fa-industry",
//       color: "from-accent-500 to-accent-700",
//     },
//     { 
//       name: "Consumer Goods",
//       count: 3,
//       icon: "fa-shopping-bag",
//       color: "from-accent-600 to-accent-700",
//     },
//     {
//       name: "All Products",
//       count: 13,
//       icon: "fa-boxes",
//       color: "from-accent-500 to-accent-600",
//     },
//   ];

//   const products = [
//     // Electronics & Components
//     {
//       id: 1,
//       name: "Industrial LED Display Panels",
//       category: "Electronics & Components",
//       price: "Contact for Quote",
//       rating: 4.8,
//       image: img1,
//       description: "High-resolution LED panels for industrial applications",
//     },
//     {
//       id: 2,
//       name: "PCB Circuit Boards",
//       category: "Electronics & Components",
//       price: "Contact for Quote",
//       rating: 4.6,
//       image: "/img/products/pcb.jpg",
//       description: "Custom PCB manufacturing and assembly services",
//     },
//     {
//       id: 3,
//       name: "Power Supply Units",
//       category: "Electronics & Components",
//       price: "Contact for Quote",
//       rating: 4.7,
//       image: "/img/products/power-supply.jpg",
//       description: "Industrial-grade power supply units with certification",
//     },
//     {
//       id: 4,
//       name: "Semiconductor Components",
//       category: "Electronics & Components",
//       price: "Contact for Quote",
//       rating: 4.5,
//       image: "/img/products/semiconductors.jpg",
//       description: "Bulk semiconductor components from verified manufacturers",
//     },
//     {
//       id: 5,
//       name: "Wireless Communication Modules",
//       category: "Electronics & Components",
//       price: "Contact for Quote",
//       rating: 4.8,
//       image: "/img/products/wireless.jpg",
//       description: "IoT and wireless communication modules for integration",
//     },
//     {
//       id: 6,
//       name: "Sensors & Automation Parts",
//       category: "Electronics & Components",
//       price: "Contact for Quote",
//       rating: 4.6,
//       image: "/img/products/sensors.jpg",
//       description: "Industrial sensors and automation components",
//     },

//     // Industrial Equipment
//     {
//       id: 7,
//       name: "CNC Machine Parts",
//       category: "Industrial Equipment",
//       price: "Contact for Quote",
//       rating: 4.9,
//       image: "/img/products/cnc.jpg",
//       description: "Precision CNC machine components and spare parts",
//     },
//     {
//       id: 8,
//       name: "Hydraulic Systems",
//       category: "Industrial Equipment",
//       price: "Contact for Quote",
//       rating: 4.7,
//       image: "/img/products/hydraulic.jpg",
//       description: "Industrial hydraulic pumps and systems",
//     },
//     {
//       id: 9,
//       name: "Conveyor Belt Systems",
//       category: "Industrial Equipment",
//       price: "Contact for Quote",
//       rating: 4.8,
//       image: "/img/products/conveyor.jpg",
//       description: "Heavy-duty conveyor belts for manufacturing facilities",
//     },
//     {
//       id: 10,
//       name: "Packaging Machinery",
//       category: "Industrial Equipment",
//       price: "Contact for Quote",
//       rating: 4.6,
//       image: "/img/products/packaging.jpg",
//       description: "Automated packaging solutions for various industries",
//     },

//     // Consumer Goods
//     {
//       id: 11,
//       name: "Textile & Apparel",
//       category: "Consumer Goods",
//       price: "Contact for Quote",
//       rating: 4.7,
//       image: "/img/products/textile.jpg",
//       description: "Bulk textile and apparel sourcing from global manufacturers",
//     },
//     {
//       id: 12,
//       name: "Home & Kitchen Products",
//       category: "Consumer Goods",
//       price: "Contact for Quote",
//       rating: 4.5,
//       image: "/img/products/home-kitchen.jpg",
//       description: "Quality home and kitchen products for retail distribution",
//     },
//     {
//       id: 13,
//       name: "Sports & Fitness Equipment",
//       category: "Consumer Goods",
//       price: "Contact for Quote",
//       rating: 4.6,
//       image: "/img/products/sports.jpg",
//       description: "Sports and fitness equipment from certified suppliers",
//     },
//   ];

//   const benefits = [
//     {
//       icon: "fa-shield-alt",
//       title: "Quality Assured",
//       description: "All products verified and quality-tested by our experts",
//     },
//     {
//       icon: "fa-globe",
//       title: "Global Sourcing",
//       description: "Access to 500+ verified suppliers across 50+ countries",
//     },
//     {
//       icon: "fa-certificate",
//       title: "Certified Products",
//       description: "International standards and compliance certifications",
//     },
//     {
//       icon: "fa-headset",
//       title: "Dedicated Support",
//       description: "24/7 customer support and trade consultation",
//     },
//   ];

//   // Filter products based on active category
//   const filteredProducts = products.filter((product) => {
//     if (activeCategory === "All Products") return true;
//     return product.category === activeCategory;
//   });

//   // Show only 6 products initially, or all when showAllProducts is true or when filtered by category
//   const displayedProducts =
//     !showAllProducts && activeCategory === "All Products"
//       ? filteredProducts.slice(0, 6)
//       : filteredProducts;

//   const handleCategoryClick = (categoryName) => {
//     setActiveCategory(categoryName);
//     // If user clicks on a specific category, show all products of that category
//     if (categoryName !== "All Products") {
//       setShowAllProducts(true);
//     }
//   };

//   const handleViewAllProducts = () => {
//     setShowAllProducts(true);
//     setActiveCategory("All Products");
//   };

//   return (
//     <div className="min-h-screen bg-white pt-32 pb-20 relative">
//       {/* <BackgroundEffects /> */}
//       <div className="container mx-auto px-4 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-20"
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2 }}
//             className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-accent-100 to-accent-50 border border-accent-300 rounded-full text-accent-700 font-medium shadow-lg"
//           >
//             Global Trade Solutions
//           </motion.div>

//           <GlitchText>
//             <h1 className="font-display font-bold text-5xl md:text-7xl text-gray-900 mb-6">
//               Product{" "}
//               <span className="text-accent-600">
//                 Catalog
//               </span>
//             </h1>
//           </GlitchText>
//           <p className="text-xl text-gray-700 max-w-3xl mx-auto">
//             Discover our comprehensive range of globally sourced products with end-to-end
//             procurement and logistics support
//           </p>
//         </motion.div>

//         {/* Categories Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//           {categories.map((category, index) => (
//             <motion.button
//               key={index}
//               whileHover={{ scale: 1.02, y: -4 }}
//               whileTap={{ scale: 0.98 }}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="relative group"
//               onClick={() => handleCategoryClick(category.name)}
//             >
//               <GlassCard
//                 className={`text-center cursor-pointer transition-all duration-300 ${
//                   activeCategory === category.name
//                     ? "ring-2 ring-accent-600 shadow-xl shadow-accent-500/30"
//                     : ""
//                 }`}
//               >
//                 <div
//                   className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
//                 >
//                   <i
//                     className={`fas ${category.icon} text-white text-2xl`}
//                   ></i>
//                 </div>
//                 <h3 className="font-display text-lg font-bold text-gray-900 mb-1">
//                   {category.name}
//                 </h3>
//                 <p className="text-sm text-gray-700">
//                   {category.count} Products
//                 </p>
//               </GlassCard>
//             </motion.button>
//           ))}
//         </div>

//         {/* Active Category Indicator */}
//         {activeCategory !== "All Products" && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center mb-8"
//           >
//             <div className="inline-flex items-center px-4 py-2 bg-accent-100 border border-accent-300 rounded-full shadow-md">
//               <span className="text-accent-700 font-medium">
//                 Showing: {activeCategory}
//               </span>
//               <button
//                 onClick={() => {
//                   setActiveCategory("All Products");
//                   setShowAllProducts(false);
//                 }}
//                 className="ml-2 text-accent-600 hover:text-accent-800"
//               >
//                 <i className="fas fa-times"></i>
//               </button>
//             </div>
//           </motion.div>
//         )}

//         {/* Products Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {displayedProducts.map((product, index) => (
//             <GlassCard
//               key={product.id}
//               delay={index * 0.1}
//               className="group cursor-pointer overflow-hidden hover:shadow-xl"
//             >
//               <div className="relative overflow-hidden rounded-xl mb-6 bg-gray-100">
//                 <motion.div
//                   whileHover={{ scale: 1.1 }}
//                   transition={{ duration: 0.4 }}
//                   className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
//                 >
//                   <i className={`fas ${categories.find(c => c.name === product.category)?.icon || 'fa-box'} text-6xl text-gray-400`}></i>
//                 </motion.div>
//                 <div className="absolute top-4 right-4">
//                   <div className="px-3 py-1 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full text-white text-sm font-medium shadow-lg">
//                     {product.category.split(' ')[0]}
//                   </div>
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     className="px-6 py-2 bg-white text-accent-600 font-semibold rounded-lg shadow-xl"
//                   >
//                     Request Quote
//                   </motion.button>
//                 </div>
//               </div>

//               <div className="flex items-center mb-2">
//                 {[...Array(5)].map((_, i) => (
//                   <i
//                     key={i}
//                     className={`fas fa-star text-sm ${
//                       i < Math.floor(product.rating)
//                         ? "text-yellow-500"
//                         : "text-gray-300"
//                     }`}
//                   ></i>
//                 ))}
//                 <span className="ml-2 text-gray-700 text-sm font-medium">
//                   ({product.rating})
//                 </span>
//               </div>

//               <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
//                 {product.name}
//               </h3>
//               <p className="text-gray-600 text-sm mb-4">
//                 {product.description}
//               </p>

//               <div className="flex justify-between items-center">
//                 <span className="text-lg font-bold text-accent-600">
//                   {product.price}
//                 </span>
//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: 5 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-accent-500/50 transition-all"
//                 >
//                   <i className="fas fa-shopping-cart"></i>
//                 </motion.button>
//               </div>
//             </GlassCard>
//           ))}
//         </div>

//         {/* Show View All Products button only when not viewing all products */}
//         {(!showAllProducts || activeCategory !== "All Products") && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mt-20 text-center"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(30, 58, 138, 0.3)' }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleViewAllProducts}
//               className="px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl shadow-xl hover:from-accent-600 hover:to-accent-700 transition-all"
//             >
//               {activeCategory === "All Products"
//                 ? "View All Products"
//                 : `View All ${activeCategory}`}
//               <i className="fas fa-arrow-right ml-2"></i>
//             </motion.button>
//           </motion.div>
//         )}

//         {/* Show Back to Top button when viewing all products */}
//         {showAllProducts && activeCategory === "All Products" && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mt-20 text-center"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => {
//                 setShowAllProducts(false);
//                 window.scrollTo({ top: 0, behavior: "smooth" });
//               }}
//               className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl shadow-xl hover:from-gray-700 hover:to-gray-800 transition-all"
//             >
//               Show Less Products
//               <i className="fas fa-arrow-up ml-2"></i>
//             </motion.button>
//           </motion.div>
//         )}

//         {/* Why Buy from Us Section */}
//         <motion.section
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mt-32 py-20 bg-gradient-to-br from-accent-50 via-blue-50 to-white rounded-3xl shadow-xl relative overflow-hidden"
//         >
//           <div className="absolute inset-0 bg-gradient-to-br from-accent-100/20 via-transparent to-purple-100/20" />
//           <div className="relative z-10 px-8">
//             <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
//               Why Buy from <span className="text-accent-600">Us</span>
//             </h2>
//             <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16">
//               Experience the IMOEXO advantage in global trade and procurement
//             </p>

//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {benefits.map((benefit, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   whileHover={{ y: -10, scale: 1.02 }}
//                   className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all"
//                 >
//                   <motion.div
//                     className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg"
//                     whileHover={{ rotate: 360 }}
//                     transition={{ duration: 0.6 }}
//                   >
//                     <i className={`fas ${benefit.icon} text-white text-2xl`}></i>
//                   </motion.div>
//                   <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
//                     {benefit.title}
//                   </h3>
//                   <p className="text-gray-700">{benefit.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </motion.section>
//       </div>
//     </div>
//   );
// };

// export default Estore;


import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import GlitchText from "../components/GlitchText";
import { useState } from "react";

const Estore = () => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Products");

  const categories = [
    {
      name: "Flavored Condoms",
      count: 6,
      icon: "fa-heart",
      color: "from-cyan-500 to-blue-600",
    },
    {
      name: "Textured Condoms",
      count: 4,
      icon: "fa-texture",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Specialty Condoms",
      count: 3,
      icon: "fa-star",
      color: "from-teal-500 to-cyan-600",
    },
    {
      name: "All Products",
      count: 13,
      icon: "fa-shopping-bag",
      color: "from-cyan-600 to-blue-700",
    },
  ];

  const products = [
    {
      id: 1,
      name: "CHOCOLATE Flavored Condoms",
      category: "Flavored Condoms",
      price: "$12.99",
      rating: 4.5,
      image: "/img/products/chocolate-condom.png",
      description: "10 pieces of chocolate flavored protection",
    },
    {
      id: 2,
      name: "RED WINE Flavored Condoms",
      category: "Flavored Condoms",
      price: "$13.99",
      rating: 4.3,
      image: "/img/products/redwine-condom.png",
      description: "10 pieces of red wine flavored protection",
    },
    {
      id: 3,
      name: "CHAMPAGNE Flavored Condoms",
      category: "Flavored Condoms",
      price: "$14.99",
      rating: 4.6,
      image: "/img/products/champagne-condom.png",
      description: "10 pieces of champagne flavored protection",
    },
    {
      id: 4,
      name: "BANANA Flavored Condoms",
      category: "Flavored Condoms",
      price: "$11.99",
      rating: 4.4,
      image: "/img/products/banana-condom.png",
      description: "10 pieces of banana flavored protection",
    },
    {
      id: 5,
      name: "STRAWBERRY Flavored Condoms",
      category: "Flavored Condoms",
      price: "$12.99",
      rating: 4.7,
      image: "/img/products/strawberry-condom.png",
      description: "10 pieces of strawberry flavored protection",
    },
    {
      id: 6,
      name: "WHISKEY Flavored Condoms",
      category: "Flavored Condoms",
      price: "$14.99",
      rating: 4.5,
      image: "/img/products/whiskey-condom.png",
      description: "10 pieces of whiskey flavored protection",
    },
    {
      id: 7,
      name: "3 IN 1 Multi-Textured Condoms",
      category: "Textured Condoms",
      price: "$16.99",
      rating: 4.8,
      image: "/img/products/3in1-textured.png",
      description: "Ribbed, dotted, and contoured for enhanced pleasure",
    },
    {
      id: 8,
      name: "SUPER DOTTED Delay Condoms",
      category: "Textured Condoms",
      price: "$15.99",
      rating: 4.6,
      image: "/img/products/super-dotted.png",
      description: "Extra dotted texture with delay feature",
    },
    {
      id: 9,
      name: "1600 DOTS Dotted Condoms",
      category: "Textured Condoms",
      price: "$14.99",
      rating: 4.7,
      image: "/img/products/1600-dots.png",
      description: "Ultimate dotted experience with 1600 dots",
    },
    {
      id: 10,
      name: "4 IN 1 Delay Condoms",
      category: "Textured Condoms",
      price: "$17.99",
      rating: 4.9,
      image: "/img/products/4in1-delay.png",
      description: "Ribbed, dotted, contoured with delay technology",
    },
    {
      id: 11,
      name: "ULTRA THIN Lubricated Condoms",
      category: "Specialty Condoms",
      price: "$18.99",
      rating: 4.8,
      image: "/img/products/ultra-thin.png",
      description: "Ultra thin for natural feel with lubrication",
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (activeCategory === "All Products") return true;
    return product.category === activeCategory;
  });

  const displayedProducts =
    !showAllProducts && activeCategory === "All Products"
      ? filteredProducts.slice(0, 6)
      : filteredProducts;

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    if (categoryName !== "All Products") {
      setShowAllProducts(true);
    }
  };

  const handleViewAllProducts = () => {
    setShowAllProducts(true);
    setActiveCategory("All Products");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 relative">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-cyan-600 font-medium"
          >
            Premium Protection
          </motion.div>

          <GlitchText>
            <h1 className="font-display font-bold text-5xl md:text-7xl text-slate-900 mb-6">
              HotShot{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Collection
              </span>
            </h1>
          </GlitchText>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our range of premium flavored, textured, and specialty condoms designed for comfort and pleasure.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
              onClick={() => handleCategoryClick(category.name)}
            >
              <GlassCard
                className={`text-center cursor-pointer transition-all duration-300 ${activeCategory === category.name
                    ? "ring-2 ring-cyan-500 shadow-lg"
                    : ""
                  }`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <i
                    className={`fas ${category.icon} text-white text-2xl`}
                  ></i>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.count} Products
                </p>
              </GlassCard>
            </motion.button>
          ))}
        </div>

        {/* Active Category Indicator */}
        {activeCategory !== "All Products" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-blue-700 font-medium">
                Showing: {activeCategory}
              </span>
              <button
                onClick={() => {
                  setActiveCategory("All Products");
                  setShowAllProducts(false);
                }}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product, index) => (
            <GlassCard
              key={product.id}
              delay={index * 0.1}
              className="group cursor-pointer overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all"
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover bg-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/img/products/placeholder.png";
                  }}
                />
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white text-sm font-medium">
                    {product.category}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-2 bg-white text-blue-900 font-semibold rounded-lg"
                  >
                    Quick View
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star text-sm ${i < Math.floor(product.rating)
                        ? "text-cyan-500"
                        : "text-gray-400"
                      }`}
                  ></i>
                ))}
                <span className="ml-2 text-gray-600 text-sm">
                  ({product.rating})
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  {product.price}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-blue-500/40 transition-all"
                >
                  <i className="fas fa-shopping-cart"></i>
                </motion.button>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Buttons */}
        {(!showAllProducts || activeCategory !== "All Products") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewAllProducts}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl shadow-xl hover:from-cyan-700 hover:to-blue-700 transition-all"
            >
              {activeCategory === "All Products"
                ? "View All Products"
                : `View All ${activeCategory}`}
              <i className="fas fa-arrow-right ml-2"></i>
            </motion.button>
          </motion.div>
        )}

        {showAllProducts && activeCategory === "All Products" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowAllProducts(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-semibold rounded-xl shadow-xl hover:from-gray-600 hover:to-gray-800 transition-all"
            >
              Show Less Products
              <i className="fas fa-arrow-up ml-2"></i>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Estore;
