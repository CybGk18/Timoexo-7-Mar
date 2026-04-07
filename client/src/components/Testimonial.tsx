import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "CEO, TechVista Solutions",
      content:
        "Imoexo International transformed our global supply chain. Their data-driven approach and seamless logistics have been game-changing for our business.",
      rating: 5,
    },
    {
      name: "Sarah Mitchell",
      role: "Director, Global Imports Inc.",
      content:
        "Working with Imoexo has been exceptional. Their expertise in international trade and commitment to excellence sets them apart from competitors.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      role: "Founder, ExportPro",
      content:
        "The team at Imoexo provided invaluable guidance through complex customs regulations. Highly professional and results-driven.",
      rating: 5,
    },
  ];

  // Auto slide every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative max-w-4xl mx-auto overflow-hidden">
      <motion.div
        className="flex"
        animate={{ x: `-${activeIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="min-w-full px-4">
            <motion.div
              className="bg-white rounded-3xl p-10 relative overflow-hidden cursor-pointer"
              whileHover={{
                y: -6, // lift on hover
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(255,255,255,0.2) inset",
              }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              style={{
                boxShadow:
                  "0 10px 20px rgba(0,0,0,0.05), 0 0 10px rgba(255,255,255,0.15) inset",
              }}
            >
              {/* Subtle animated overlay */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(30,58,138,0.1) 0%, rgba(13,148,136,0.1) 100%)",
                }}
                animate={{ opacity: [0.2, 0.1, 0.2] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.i
                      key={i}
                      className="fas fa-star text-yellow-400 mr-1"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>

                <motion.p
                  className="text-gray-900 text-lg mb-6 italic font-medium leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  "{testimonial.content}"
                </motion.p>

                <div className="flex items-center justify-center mt-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] via-[#0D9488] to-[#6D28D9] font-bold text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "bg-gradient-to-r from-[#1E3A8A] via-[#0D9488] to-[#6D28D9] w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
