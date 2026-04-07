

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import GlassCard from "../components/GlassCard";
import GlitchText from "../components/GlitchText";
import FAQ from "../components/FAQ";
import SEO from "../SEO/SEO";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "Who is the founder of T-ImoExo?",
      answer: "T-ImoExo was founded by Mr. Yash Bhalekar, an entrepreneur from Pune, India, with expertise in international trade, export management, and logistics."
    },
    {
      question: "What is the mission of T-ImoExo?",
      answer: "Our mission is to simplify global trade for Indian exporters by offering reliable sourcing, logistics, and compliance services that build long-term partnerships."
    },
    {
      question: "Where is T-ImoExo located?",
      answer: "We are headquartered in Pune, Maharashtra, India, and operate through partner offices near major ports like Nhava Sheva and Mumbai for on-ground logistics support."
    },
    {
      question: "What industries does T-ImoExo serve?",
      answer: "We work with agriculture, FMCG, industrial goods, and small-scale manufacturers looking to export their products worldwide."
    },
    {
      question: "Why is T-ImoExo considered a reliable export company in India?",
      answer: "Because we combine transparency, timely delivery, and compliance-first operations backed by verified supplier networks and a professional documentation team."
    }
  ];

  const values = [
    {
      icon: "fa-handshake",
      title: "Integrity",
      description:
        "We operate with honesty, fairness, and accountability in every transaction",
      color: "from-[#1E3A8A] to-[#0D9488]",
    },
    {
      icon: "fa-lightbulb",
      title: "Innovation",
      description:
        "Leveraging technology to make trade smarter and more efficient",
      color: "from-[#0D9488] to-[#1E3A8A]",
    },
    {
      icon: "fa-users",
      title: "Customer Focus",
      description:
        "Tailoring every solution to client goals and specific needs",
      color: "from-[#0D9488] to-[#1E3A8A]",
    },
    {
      icon: "fa-leaf",
      title: "Sustainability",
      description:
        "Promoting responsible global trade practices for a better tomorrow",
      color: "from-[#0D9488] to-[#1E3A8A]",
    },
  ];

  const differentiators = [
    {
      title: "Technology-First Approach",
      description:
        "Proprietary analytics tools to identify market trends and optimize supply chain routes",
      icon: "fa-microchip",
    },
    {
      title: "Tailored Trade Solutions",
      description:
        "Custom trade strategies aligned with your industry, geography, and growth objectives",
      icon: "fa-cogs",
    },
    {
      title: "Global Network with Local Expertise",
      description:
        "Worldwide reach combined with deep understanding of the Indian trade ecosystem",
      icon: "fa-globe-asia",
    },
    {
      title: "Quality & Compliance Assurance",
      description:
        "Strict inspection, documentation, and regulatory adherence for risk-free operations",
      icon: "fa-shield-alt",
    },
  ];

  const team = [
    {
      name: "YASH BHALEKAR",
      role: "Founder",
      icon: "fa-user-tie",
      phone: "+91 8237439036",
      email: "yash@t-imoexo.com",
      linkedin: "https://www.linkedin.com/in/yash-bhalekar-imoexo/",
    },
    {
      name: "Rohan Bhosale",
      role: "Director",
      icon: "fa-user-cog",
      phone: "+91 8530171515",
      email: "rohan@t-imoexo.com",
      linkedin: "https://www.linkedin.com/in/rohanbhosale15/",
    },
  ];

  return (
    <>
      <SEO page="about" />

      <motion.div
        //  initial={{ opacity: 0, scale: 0.95 }}
        //       whileInView={{ opacity: 1, scale: 1 }}
        //       viewport={{ once: true }}
        //       className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center bg-gradient-to-br from-[#E0F2FE] via-[#F0FDFA] to-[#F5F3FF] shadow-2xl"

        className="min-h-screen relative overflow-hidden pt-32 pb-20"
        animate={{
          background: [
            "radial-gradient(circle at 25% 40%, rgba(13,148,136,0.15) 0%, transparent 60%)",
            "radial-gradient(circle at 75% 60%, rgba(30,58,138,0.15) 0%, transparent 60%)",
            "radial-gradient(circle at 25% 40%, rgba(13,148,136,0.15) 0%, transparent 60%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* <BackgroundEffects /> */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-[#1E3A8A]/10 to-[#0D9488]/10 border border-[#1E3A8A]/20 rounded-full text-[#1E3A8A] font-medium shadow-md"
          >
            Our Story
          </motion.div> */}

            <GlitchText>
              <h1 className="font-display font-bold text-5xl md:text-6xl text-gray-900 mb-5">
                About{" "}
                <motion.span
                  animate={{ color: ["#1E3A8A", "#0D9488", "#1E3A8A"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-accent-600"
                >
                  T-Imoexo
                </motion.span>
              </h1>
            </GlitchText>

            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4">
              Your trusted partner in{" "}
              <motion.span
                animate={{
                  color: ["#1E3A8A", "#0D9488", "#15803D", "#1E3A8A"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                global trade and supply chain solutions
              </motion.span>
            </p>
          </motion.div>

          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4.5xl mx-auto mb-24"
          >
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 25% 40%, rgba(13,148,136,0.15) 0%, transparent 60%)",
                  "radial-gradient(circle at 75% 60%, rgba(30,58,138,0.15) 0%, transparent 60%)",
                  "radial-gradient(circle at 25% 40%, rgba(13,148,136,0.15) 0%, transparent 60%)",
                ],
              }}
              className="bg-gradient-to-br from-white to-gray-50 p-12 rounded-3xl shadow-xl border border-gray-100"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Founded in Pune,{" "}
                  <span className="text-accent-600 font-semibold">
                    <motion.span
                      animate={{
                        color: ["#1E3A8A", "#0D9488", "#15803D", "#1E3A8A"],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      T-Imoexo International
                    </motion.span>
                  </span>{" "}
                  Founded in Pune, T-Imoexo International simplifies cross-border
                  trade for businesses worldwide. From a local import-export
                  facilitator, we’ve grown into a global trade management company
                  connecting clients across continents.
                </p>
                <p>
                  We deliver intelligent sourcing, seamless logistics, and
                  transparent trade operations through a trusted network spanning
                  Asia, Europe, Africa, and the Americas.
                </p>
                <p>
                  Built on ethics, clarity, and reliability, we use data-driven
                  insights to reduce costs, streamline supply chains, and empower
                  smarter trade decisions.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-accent-50 to-accent-50 p-10 rounded-3xl shadow-xl "
            >
              <div className="flex items-center mb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] rounded-xl flex items-center justify-center mr-4 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <i className="fas fa-bullseye text-white text-2xl"></i>
                </motion.div>
                <h3 className="font-display text-3xl font-bold text-[#1E3A8A]">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To empower enterprises with seamless, data-driven, and compliant
                import-export solutions that accelerate growth and reduce global
                trade complexity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-accent-50 to-accent-50 p-10 rounded-3xl shadow-xl"
            >
              <div className="flex items-center mb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] rounded-xl flex items-center justify-center mr-4 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <i className="fas fa-eye text-white text-2xl"></i>
                </motion.div>
                <h3 className="font-display text-3xl font-bold text-[#1E3A8A]">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become India's most trusted name in international sourcing,
                logistics, and trade intelligence — connecting businesses through
                innovation and reliability.
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <motion.h2
              className="font-display text-4xl md:text-5xl font-bold text-center mb-16"
              whileInView={{ scale: [0.9, 1] }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-[#1E3A8A] via-[#0D9488] to-[#1E3A8A] bg-clip-text text-transparent">
                Our Core
              </span>{" "}
              <span className="text-accent-600">Values</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 shadow-lg mx-auto`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className={`fas ${value.icon} text-white text-2xl`}></i>
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-3 text-center">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 text-center">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* What Makes Us Different */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-[#1E3A8A] via-[#0D9488] to-[#1E3A8A] bg-clip-text text-transparent">
                What Makes Us
              </span>{" "}
              <span className="text-accent-600">Different</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {differentiators.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] rounded-xl flex items-center justify-center mb-4 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className={`fas ${item.icon} text-white text-xl`}></i>
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Leadership Team */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-[#1E3A8A] via-[#0D9488] to-[#1E3A8A] bg-clip-text text-transparent">
                Our Leadership Team
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  animate={{
                    background: [
                      "radial-gradient(circle at 15% 40%, rgba(13,148,136,0.06) 0%, transparent 45%), radial-gradient(circle at 85% 60%, rgba(30,58,138,0.12) 0%, transparent 70%)",
                      // Frame 2 — subtle shift with smooth breathing motion
                      "radial-gradient(circle at 10% 35%, rgba(13,148,136,0.05) 0%, transparent 40%), radial-gradient(circle at 90% 55%, rgba(30,58,138,0.15) 0%, transparent 75%)",
                      // Frame 3 — return to gentle balance
                      "radial-gradient(circle at 15% 40%, rgba(13,148,136,0.06) 0%, transparent 45%), radial-gradient(circle at 85% 60%, rgba(30,58,138,0.12) 0%, transparent 70%)",
                    ],
                  }}
                  // transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}

                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-gradient-to-br from-accent-50 to-accent-50 p-8 rounded-2xl shadow-xl "
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <i className={`fas ${member.icon} text-white text-2xl`}></i>
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-xl font-bold text-gray-900">
                          {member.name}
                        </h3>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0A66C2] hover:text-[#004182] transition-colors"
                          title="View LinkedIn Profile"
                        >
                          <i className="fab fa-linkedin text-2xl"></i>
                        </a>
                      </div>
                      <p className="text-accent-600 font-medium mb-4">
                        {member.role}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-700">
                          <i className="fas fa-phone w-5 text-accent-500"></i>
                          <a
                            href={`tel:${member.phone}`}
                            className="hover:text-accent-600 transition-colors ml-2"
                          >
                            {member.phone}
                          </a>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <i className="fas fa-envelope w-5 text-accent-500"></i>
                          <a
                            href={`mailto:${member.email}`}
                            className="hover:text-accent-600 transition-colors ml-2"
                          >
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Office */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
              Our{" "}
              <span className="bg-gradient-to-r from-[#1E3A8A] via-[#0D9488] to-[#1E3A8A] bg-clip-text text-transparent">
                Office
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl shadow-xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <i className="fas fa-map-marker-alt text-white text-2xl"></i>
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  Head Office
                </h3>
                <p className="text-xl text-gray-700 mb-6">
                  Gat No. 171, Talawade, Tal Haveli,
                  <br />
                  PCMC, Pune 411062, Maharashtra, India
                </p>
                <motion.a
                  href="https://maps.google.com/?q=Gat+No.+171,+Talawade,+Pune+411062"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#0D9488] text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all"
                >
                  <i className="fas fa-directions mr-2"></i>
                  Get Directions
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden shadow-xl h-full min-h-[400px]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.0167244686754!2d73.76!3d18.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM5JzAwLjAiTiA3M8KwNDUnMzYuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="T-Imoexo Office Location"
                ></iframe>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA */}
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
      </motion.div>
    </>
  );
};

export default About;
