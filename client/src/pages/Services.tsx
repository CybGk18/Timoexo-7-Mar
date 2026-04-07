
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import SEO from "../SEO/SEO";
import GlobalServices from "@/components/GlobalServices";
import ResponsiveImage from "@/components/ResponsiveImage";
// import BackgroundEffects from "../components/BackgroundEffects";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ FAQ Data
  const faqs = [
    {
      question: "What import-export services does T-ImoExo provide?",
      answer: "We provide end-to-end import-export support — sourcing, customs clearance, logistics, documentation, packaging, insurance, and compliance with Indian export laws."
    },
    {
      question: "Do you handle both air and sea shipments?",
      answer: "Yes. We manage both air freight for faster deliveries and sea freight for bulk export shipments from ports like Nhava Sheva and Mundra."
    },
    {
      question: "Can T-ImoExo manage customs clearance in India?",
      answer: "Absolutely. Our team works with licensed customs brokers to ensure smooth clearance of goods with proper HS codes, commercial invoices, and packing lists."
    },
    {
      question: "Do you provide packaging and labeling as per international standards?",
      answer: "Yes. We follow international packaging standards (ISPM-15, barcodes, and export labels) to ensure goods meet destination-country requirements."
    },
    {
      question: "How does T-ImoExo ensure trade compliance?",
      answer: "We verify all export documents — IEC, FSSAI, Phyto certificates, COO — and ensure your shipment aligns with DGFT and customs regulations in India."
    }
  ];

  // ✅ Industries
  const industries = [
    {
      name: "Textiles & Apparel",
      icon: "fa-tshirt",
      color: "from-[#1E3A8A] to-[#0D9488]",
    },
    {
      name: "Automotive & Manufacturing",
      icon: "fa-car",
      color: "from-[#0D9488] to-[#1E3A8A]",
    },
    {
      name: "Electronics & IT Hardware",
      icon: "fa-microchip",
      color: "from-[#1E3A8A] to-[#0D9488]",
    },
    {
      name: "Consumer Goods & Retail",
      icon: "fa-shopping-cart",
      color: "from-[#0D9488] to-[#1E3A8A]",
    },
    {
      name: "Food Processing & Agriculture",
      icon: "fa-seedling",
      color: "from-[#1E3A8A] to-[#0D9488]",
    },
    {
      name: "Industrial Components",
      icon: "fa-cogs",
      color: "from-[#0D9488] to-[#1E3A8A]",
    },
  ];

  // ✅ Services Data
  const services = [
    {
      icon: "fa-search",
      title: "Sourcing & Procurement",
      description:
        "We connect you to the right suppliers globally — ensuring quality, cost-effectiveness, and reliability.",
      details: [
        "Market analysis & supplier identification",
        "Product sampling & quality audit",
        "Price negotiation & contract management",
        "Integrated logistics & order tracking",
      ],
      color: "from-[#1E3A8A] to-[#0D9488]",
      cta: "Request a Sourcing Consultation",
    },
    {
      icon: "fa-shipping-fast",
      title: "Logistics & Shipping",
      description:
        "We manage all modes of transport — sea, air, and road — with complete visibility and accountability.",
      details: [
        "Freight forwarding & cargo consolidation",
        "Warehousing & packaging",
        "Real-time tracking & updates",
        "Multi-modal shipping options",
      ],
      color: "from-[#0D9488] to-[#1E3A8A]",
      cta: "Get a Logistics Quote",
    },
    {
      icon: "fa-file-contract",
      title: "Customs & Compliance",
      description:
        "Navigating customs regulations can be complex — we simplify it with end-to-end compliance management.",
      details: [
        "IEC registration & documentation",
        "HS code classification & tariff management",
        "Import/export licensing & clearance",
        "Regulatory compliance across jurisdictions",
      ],
      color: "from-[#1E3A8A] to-[#0D9488]",
      cta: "Talk to Our Compliance Expert",
    },
    {
      icon: "fa-chart-line",
      title: "Consultation & Trade Strategy",
      description:
        "We advise clients on global trade strategy, market entry, and supply chain transformation.",
      details: [
        "Feasibility studies & cost forecasting",
        "Risk assessment & mitigation",
        "Trade finance planning",
        "Digital transformation for trade",
      ],
      color: "from-[#0D9488] to-[#1E3A8A]",
      cta: "Book a Strategic Consultation",
    },
  ];

  // ✅ Corresponding Service Images
  const serviceImages = [
    "/img/services/Sourcing.png",
    "/img/services/shipping.jpg",
    "/img/services/Logistic.png",
    "/img/services/Consultation.png",
  ];

  return (
    <>
      <SEO page="services" />

      <motion.div
        className="min-h-screen relative overflow-hidden pt-32 pb-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(15,23,42,0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(30,58,138,0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(15,23,42,0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* <BackgroundEffects /> */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-center mb-8 text-gray-900"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Global{"  "}
            <motion.span
              animate={{
                color: ["#1E3A8A", "#0D9488", "#15803D", "#1E3A8A"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Services
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Global trade, logistics, and consultation solutions —{" "}
            <motion.span
              animate={{
                color: ["#1E3A8A", "#0D9488", "#15803D", "#1E3A8A"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              empowering your business to expand seamlessly worldwide.
            </motion.span>
          </motion.p>

          {/* Industries Section */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {industries.map((industry, i) => (
              <motion.div
                key={i}
                className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col items-center justify-center text-center"
                whileHover={{ scale: 1.05 }}
              >
                <i
                  className={`fas ${industry.icon} text-3xl bg-gradient-to-r ${industry.color} bg-clip-text text-transparent`}
                ></i>
                <p className="text-gray-800 font-medium">{industry.name}</p>
              </motion.div>
            ))}
          </motion.div>

          <GlobalServices />


          <header className="mb-12 md:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900 px-4">
              Where We Can  <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Help You?</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 md:text-xl max-w-3xl mx-auto px-4">
              Specialized solutions tailored to your industry
            </p>
          </header>

          {/* Services Cards */}
          <div className="grid md:grid-cols-2 gap-10">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
              >
                <ResponsiveImage
                  src={serviceImages[i]}
                  alt={service.title}
                  className="w-full h-64 object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <i
                      className={`fas ${service.icon} text-3xl bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                    ></i>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-700 mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="text-gray-600 mb-6 list-disc list-inside text-left space-y-2">
                    {service.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className={`px-8 py-3 bg-gradient-to-r ${service.color} text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all`}
                  >
                    {service.cta}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-16 sm:mt-20 px-4">
            <motion.div whileHover={{ scale: 1.05 }} className="w-full sm:w-auto">
              <Link
                to="/contact"
                className="block text-center w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 
                 bg-gradient-to-r from-[#1E3A8A] via-[#0D9488] to-[#1E3A8A] 
                 text-white text-base sm:text-lg font-bold 
                 rounded-xl shadow-2xl shadow-blue-900/30 
                 hover:from-[#0D9488] hover:to-[#1E3A8A] 
                 transition-all duration-300"
              >
                Contact Us
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="w-full sm:w-auto">
              <Link
                to="/about"
                className="block text-center w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 
                 bg-gradient-to-r from-[#0D9488] via-[#1E3A8A] to-[#0D9488] 
                 text-white text-base sm:text-lg font-bold 
                 rounded-xl shadow-2xl shadow-blue-900/30 
                 hover:from-[#1E3A8A] hover:to-[#0D9488] 
                 transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <FAQ faqs={faqs} />
        </div>
      </motion.div>
    </>
  );
};

export default Services;
