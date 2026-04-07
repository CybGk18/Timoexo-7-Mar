
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import GlitchText from "../components/GlitchText";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import SEO from "../SEO/SEO";
import ResponsiveImage from "@/components/ResponsiveImage";

const Solutions = () => {
  const faqs = [
    {
      question: "What type of trade solutions does T-ImoExo offer?",
      answer: "We offer business-specific trade solutions — from sourcing and supplier verification to logistics optimization, cost analysis, and compliance automation."
    },
    {
      question: "Do you assist startups entering export markets?",
      answer: "Yes. We provide step-by-step guidance for startups — IEC registration, product feasibility, export market targeting, and connecting with verified overseas buyers."
    },
    {
      question: "How do your logistics solutions improve export efficiency?",
      answer: "Our team uses port-level coordination, container tracking, and partner freight forwarders in Mumbai and Pune to reduce delays and cost overruns."
    },
    {
      question: "Can I get country-specific export insights from T-ImoExo?",
      answer: "Yes. We deliver data-driven market insights and trade reports tailored for destinations such as UAE, UK, and Singapore."
    },
    {
      question: "Do you offer digital trade documentation solutions?",
      answer: "We help you digitize invoices, packing lists, BL/AWB, and export documents with secure cloud storage to simplify trade audits and compliance."
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const industries = [
    {
      id: 1,
      name: "Agriculture & Processed Products",
      image: "/img/agriculture.jpg",
      description:
        "Delivering farm-to-market excellence through quality agricultural produce, processed foods, and sustainable sourcing solutions.",
      features: [
        "Fresh & certified supply chain",
        "Processed and packaged goods",
        "Global export compliance",
        "Bulk order availability",
      ],
    },
    {
      id: 2,
      name: "Medical Devices",
      image: "/img/medical.jpg",
      description:
        "Supplying advanced and regulatory-compliant medical devices, equipment, and healthcare technologies worldwide.",
      features: [
        "CE & ISO certified devices",
        "Modern diagnostic tools",
        "Sterile packaging",
        "Trusted global suppliers",
      ],
    },
    {
      id: 3,
      name: "IT Hardware",
      image: "/img/it-hardware.jpg",
      description:
        "Reliable IT infrastructure solutions from servers to networking hardware and computing devices that power global enterprises.",
      features: [
        "Top-tier brands",
        "Enterprise-grade quality",
        "Scalable hardware solutions",
        "Warranty and support",
      ],
    },
    {
      id: 4,
      name: "Consumer Electronics",
      image: "/img/consumer-electronics.jpg",
      description:
        "Latest consumer electronics designed for innovation and everyday efficiency, sourced from trusted global manufacturers.",
      features: [
        "Smart home devices",
        "Wearables & appliances",
        "Energy-efficient tech",
        "International warranty",
      ],
    },
    {
      id: 5,
      name: "Nutraceuticals",
      image: "/img/nutraceutical.jpg",
      description:
        "Premium nutraceutical products supporting health, wellness, and preventive care — sourced with purity and compliance in mind.",
      features: [
        "GMP certified facilities",
        "Nutrient-rich formulations",
        "Custom private labeling",
        "Export-ready packaging",
      ],
    },
  ];

  const [selectedIndustry, setSelectedIndustry] = useState(null);

  return (
    <>
      <SEO page="solutions" />
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FAFF] to-[#F1F5FF] relative overflow-hidden pt-28 pb-20">

        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 30%, rgba(13,148,136,0.08) 0%, transparent 40%)",
                "radial-gradient(circle at 80% 70%, rgba(30,58,138,0.06) 0%, transparent 45%)",
              ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-[#E6F6F3] to-[#EAF1FF] border border-[#D6EDF0] rounded-full text-[#0D9488] font-medium shadow-sm"
            >
              Explore Our Industries
            </motion.div>

            <GlitchText className="font-display font-bold text-5xl md:text-6xl text-gray-900 mb-4">
              Industry{" "}
              <span className="bg-gradient-to-r from-[#1E3A8A] to-[#0D9488] bg-clip-text text-transparent">
                Segments
              </span>
            </GlitchText>

            <motion.p
              className="text-gray-700 max-w-3xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Empowering global growth through innovation, compliance, and trust —
              the <span className="font-semibold text-[#0D9488]">T-Imoexo</span>{" "}
              commitment.
            </motion.p>
          </motion.div>

          {/* Industry Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(16,24,40,0.06)] overflow-hidden cursor-pointer transition-all"
                onClick={() => setSelectedIndustry(industry)}
              >
                <div className="relative h-64 overflow-hidden">
                  <ResponsiveImage
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why Buy From Us */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20 mt-12"
          >
            <motion.h2
              className="font-display text-4xl md:text-5xl font-bold text-center mb-12"
              whileInView={{ scale: [0.96, 1] }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-[#1E3A8A] via-[#0D9488] to-[#1E3A8A] bg-clip-text text-transparent">
                Why Choose
              </span>{" "}
              <span className="text-[#0D9488]"> Us</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "fa-check-circle",
                  title: "Verified Suppliers",
                  desc: "International suppliers with proven track records",
                  color: "from-[#0D9488] to-[#1E3A8A]",
                },
                {
                  icon: "fa-shield-alt",
                  title: "Quality Control",
                  desc: "Strict quality control and packaging standards",
                  color: "from-[#1E3A8A] to-[#0D9488]",
                },
                {
                  icon: "fa-tags",
                  title: "Competitive Pricing",
                  desc: "Best pricing and flexible payment terms",
                  color: "from-[#06B6D4] to-[#0D9488]",
                },
                {
                  icon: "fa-truck",
                  title: "Delivery Support",
                  desc: "Complete delivery and customs support",
                  color: "from-[#38BDF8] to-[#1E3A8A]",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100 text-center"
                >
                  <motion.div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto bg-gradient-to-br ${item.color} shadow-md`}
                    whileHover={{ rotate: 360, scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className={`fas ${item.icon} text-white text-xl`} />
                  </motion.div>
                  <h4 className="font-display font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center bg-gradient-to-br from-[#EAF6F3] via-white to-[#F5F7FF] shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/6 via-transparent to-[#0D9488]/6 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
                <motion.span
                  animate={{ color: ["#1E3A8A", "#0D9488", "#1E3A8A"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-clip-text text-transparent"
                >
                  Ready to Partner with Us?
                </motion.span>
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Let's build your global trade success together. Reliable sourcing,
                trusted logistics and actionable intelligence.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    y: -4,
                    boxShadow: "0 20px 40px rgba(13,148,136,0.18)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#0D9488] text-white font-semibold rounded-xl shadow-lg"
                >
                  Contact Us Today <i className="fas fa-arrow-right ml-2" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <FAQ faqs={faqs} />
        </div>
      </div>
    </>
  );
};

export default Solutions;
